import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Shield, Check, Upload, Bell } from 'lucide-react';
import ProfilePictureUpload from './ProfilePictureUpload';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface AccountSettingsProps {
  onBack: () => void;
}

export default function AccountSettings({ onBack }: AccountSettingsProps) {
  const { user, profile } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    city: profile?.city || '',
    country: profile?.country || ''
  });

  const [marketingPreferences, setMarketingPreferences] = useState({
    empty_legs: true,
    fixed_offers: true,
    general_aviation: true,
    promotions: true,
    newsletter: true,
    sms_notifications: true
  });

  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [idDocumentType, setIdDocumentType] = useState<'passport' | 'id_card'>('passport');
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMarketingPreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setMarketingPreferences(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsUpdating(true);

    try {
      // Update user profile
      const { error: updateError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user?.id,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          country: formData.country
        });

      if (updateError) throw updateError;

      // Update marketing preferences
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user?.id,
          ...marketingPreferences
        });

      if (preferencesError) throw preferencesError;

      setMessage({
        type: 'success',
        text: 'Profile and preferences updated successfully'
      });

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update profile'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleIdDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdDocument(e.target.files[0]);
    }
  };

  const handleIdDocumentUpload = async () => {
    if (!idDocument || !user?.id) return;

    setIsUploading(true);
    try {
      // Generate secure file path
      const fileExt = idDocument.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const filePath = `id_documents/${fileName}`;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('secure_documents')
        .upload(filePath, idDocument);

      if (uploadError) throw uploadError;

      // Create document record
      const { error: docError } = await supabase
        .from('user_documents')
        .insert([{
          user_id: user.id,
          document_type: idDocumentType,
          status: 'pending',
          file_path: filePath
        }]);

      if (docError) throw docError;

      setMessage({
        type: 'success',
        text: 'ID document uploaded successfully'
      });
      setIdDocument(null);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to upload document'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-end p-4">
      <div className="bg-white/95 backdrop-blur-md w-full max-w-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-slideIn">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h2 className="text-xl font-bold">Account Settings</h2>
              <p className="text-sm text-gray-500">Manage your profile and preferences</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <ProfilePictureUpload
              currentUrl={user?.profile_picture}
              onUpload={async (url) => {
                try {
                  const { error } = await supabase
                    .from('users')
                    .update({ profile_picture: url })
                    .eq('id', user?.id);

                  if (error) throw error;

                  setMessage({
                    type: 'success',
                    text: 'Profile picture updated successfully'
                  });

                  setTimeout(() => setMessage(null), 3000);
                } catch (error) {
                  setMessage({
                    type: 'error',
                    text: 'Failed to update profile picture'
                  });
                }
              }}
              onError={(error) => setMessage({ type: 'error', text: error })}
            />
          </div>

          {/* Status Message */}
          {message && (
            <div className={`p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            } flex items-center gap-2`}>
              {message.type === 'success' ? (
                <Check size={18} className="flex-shrink-0" />
              ) : (
                <Shield size={18} className="flex-shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  disabled
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* ID Document Upload */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Identity Verification</h3>
              <p className="text-sm text-gray-600">
                Please upload a valid government-issued ID document. This is required for booking private jets.
              </p>
              
              <div className="space-y-4">
                <select
                  value={idDocumentType}
                  onChange={(e) => setIdDocumentType(e.target.value as 'passport' | 'id_card')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="passport">Passport</option>
                  <option value="id_card">ID Card</option>
                </select>

                <div className="relative">
                  <input
                    type="file"
                    id="id_document"
                    accept="image/jpeg,image/png,application/pdf"
                    onChange={handleIdDocumentChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="id_document"
                    className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <Upload size={20} className="text-gray-400" />
                    <span className="text-gray-600">
                      {idDocument ? idDocument.name : 'Click to upload document'}
                    </span>
                  </label>
                </div>

                {idDocument && (
                  <button
                    type="button"
                    onClick={handleIdDocumentUpload}
                    disabled={isUploading}
                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={18} />
                        <span>Upload Document</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Marketing Preferences */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <Bell size={18} />
                Marketing Preferences
              </h3>
              <p className="text-sm text-gray-600">
                Choose which updates and offers you'd like to receive
              </p>

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="empty_legs"
                    checked={marketingPreferences.empty_legs}
                    onChange={handleMarketingPreferenceChange}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <div>
                    <div className="font-medium">Empty Leg Offers</div>
                    <div className="text-sm text-gray-500">Get notified about discounted empty leg flights</div>
                  </div>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="fixed_offers"
                    checked={marketingPreferences.fixed_offers}
                    onChange={handleMarketingPreferenceChange}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <div>
                    <div className="font-medium">Fixed Price Offers</div>
                    <div className="text-sm text-gray-500">Receive updates about fixed-price charter packages</div>
                  </div>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="general_aviation"
                    checked={marketingPreferences.general_aviation}
                    onChange={handleMarketingPreferenceChange}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <div>
                    <div className="font-medium">Aviation Updates</div>
                    <div className="text-sm text-gray-500">Stay informed about private aviation news and updates</div>
                  </div>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="promotions"
                    checked={marketingPreferences.promotions}
                    onChange={handleMarketingPreferenceChange}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <div>
                    <div className="font-medium">Special Promotions</div>
                    <div className="text-sm text-gray-500">Receive exclusive deals and promotional offers</div>
                  </div>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={marketingPreferences.newsletter}
                    onChange={handleMarketingPreferenceChange}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <div>
                    <div className="font-medium">Monthly Newsletter</div>
                    <div className="text-sm text-gray-500">Get our monthly newsletter with industry insights</div>
                  </div>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="sms_notifications"
                    checked={marketingPreferences.sms_notifications}
                    onChange={handleMarketingPreferenceChange}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <div>
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-gray-500">Receive important updates via SMS</div>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUpdating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Updating...</span>
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}