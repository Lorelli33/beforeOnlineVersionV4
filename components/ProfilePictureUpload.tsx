import React, { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { logger } from '../utils/logger';

interface ProfilePictureUploadProps {
  currentUrl?: string | null;
  onUpload: (url: string) => void;
  onError: (error: string) => void;
}

export default function ProfilePictureUpload({ currentUrl, onUpload, onError }: ProfilePictureUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        onError('Please select an image file');
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        onError('Image size should be less than 2MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setUploading(true);

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `profile-pictures/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      onUpload(publicUrl);
    } catch (error) {
      logger.error('Error uploading profile picture:', error);
      onError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button
              onClick={handleRemove}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
            <Camera size={32} className="text-gray-400" />
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
      >
        {uploading ? 'Uploading...' : 'Change Picture'}
      </button>

      <p className="text-xs text-gray-500">
        Maximum file size: 2MB. Supported formats: JPG, PNG
      </p>
    </div>
  );
}