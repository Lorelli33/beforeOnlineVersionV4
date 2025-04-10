import React from 'react';
import { Coins, X } from 'lucide-react';

interface TokenRewardsWidgetProps {
  distance: number;
  onClose: () => void;
}

export default function TokenRewardsWidget({ distance, onClose }: TokenRewardsWidgetProps) {
  const totalTokens = Math.round(distance * 1.5); // 1.5 PVCX per km

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="text-blue-500">
            <Coins size={24} />
          </div>
          <div>
            <div className="text-sm font-medium">
              Flight Rewards
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {totalTokens} PVCX
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}