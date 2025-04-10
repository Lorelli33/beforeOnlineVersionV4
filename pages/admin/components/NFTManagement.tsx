import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Plane, MapPin, Clock, Tag } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface NFTManagementProps {
  onBack: () => void;
}

export default function NFTManagement({ onBack }: NFTManagementProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold">NFT Management</h2>
            <p className="text-gray-600">Manage flight NFTs and monitor listings</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No NFTs found</h3>
          <p className="text-gray-500 mt-2">
            No flight NFTs have been minted yet.
          </p>
        </div>
      )}
    </div>
  );
}