import React, { useState } from 'react';
import { ArrowLeft, Search, User } from 'lucide-react';

interface TransferFundsProps {
  onBack: () => void;
}

export default function TransferFunds({ onBack }: TransferFundsProps) {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [searchResults, setSearchResults] = useState([
    { id: '1', name: 'Alice Smith', email: 'alice@example.com' },
    { id: '2', name: 'Bob Johnson', email: 'bob@example.com' }
  ]);

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
              <h2 className="text-xl font-bold">Send / Transfer</h2>
              <p className="text-sm text-gray-500">Transfer funds to another user</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Recipient Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient
            </label>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Search by name or email"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            {recipient && (
              <div className="mt-2 border border-gray-200 rounded-lg divide-y">
                {searchResults.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setRecipient(user.email)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <User size={18} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (EUR)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg font-medium"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">€</span>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note (optional)
            </label>
            <textarea
              placeholder="Add a note"
              rows={3}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <button
            disabled={!amount || !recipient}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Funds
          </button>
        </div>
      </div>
    </div>
  );
}