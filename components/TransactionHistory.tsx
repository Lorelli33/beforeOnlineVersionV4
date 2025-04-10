import React from 'react';
import { ArrowLeft, History } from 'lucide-react';

interface TransactionHistoryProps {
  onBack: () => void;
}

export default function TransactionHistory({ onBack }: TransactionHistoryProps) {
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
              <h2 className="text-xl font-bold">Transaction History</h2>
              <p className="text-sm text-gray-500">View your recent transactions</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <History size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No transactions yet</h3>
          <p className="text-gray-500 mt-2">
            Your transaction history will appear here once you make your first transaction.
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
  );
}