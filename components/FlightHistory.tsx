import React from 'react';
import { ArrowLeft, Plane } from 'lucide-react';

interface FlightHistoryProps {
  onBack: () => void;
}

export default function FlightHistory({ onBack }: FlightHistoryProps) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-end">
      <div className="w-full max-w-md h-screen bg-white border-l border-gray-100 shadow-2xl flex flex-col">
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
              <h2 className="text-xl font-bold">Flight History</h2>
              <p className="text-sm text-gray-500">View your past and upcoming flights</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plane size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No flights yet</h3>
            <p className="text-gray-500 mt-2">
              Your flight history will appear here once you make your first booking.
            </p>
            <button 
              onClick={onBack}
              className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}