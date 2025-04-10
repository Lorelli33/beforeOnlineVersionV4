import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Building2, Wallet } from 'lucide-react';
import BankDetails from './BankDetails';

interface AddFundsProps {
  onBack: () => void;
}

export default function AddFunds({ onBack }: AddFundsProps) {
  const [showBankDetails, setShowBankDetails] = useState(false);

  if (showBankDetails) {
    return <BankDetails onBack={() => setShowBankDetails(false)} />;
  }

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
              <h2 className="text-xl font-bold">Add Funds</h2>
              <p className="text-sm text-gray-500">Select payment method</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <button
              onClick={() => setShowBankDetails(true)}
              className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Building2 size={20} className="text-white" />
              </div>
              <div>
                <div className="font-medium">Bank Transfer</div>
                <div className="text-sm text-gray-500">Add funds via bank transfer</div>
              </div>
            </button>

            <button
              disabled
              className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl opacity-50 cursor-not-allowed text-left"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <CreditCard size={20} className="text-gray-400" />
              </div>
              <div>
                <div className="font-medium">Credit Card</div>
                <div className="text-sm text-gray-500">Coming soon</div>
              </div>
            </button>

            <button
              disabled
              className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl opacity-50 cursor-not-allowed text-left"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <Wallet size={20} className="text-gray-400" />
              </div>
              <div>
                <div className="font-medium">Cryptocurrency</div>
                <div className="text-sm text-gray-500">Coming soon</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}