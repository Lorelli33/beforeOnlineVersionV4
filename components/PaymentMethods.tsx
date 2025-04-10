import React from 'react';
import { ArrowLeft, Plus, CreditCard, Ban as Bank, Wallet, MoreVertical } from 'lucide-react';

interface PaymentMethodsProps {
  onBack: () => void;
}

export default function PaymentMethods({ onBack }: PaymentMethodsProps) {
  const paymentMethods = [
    {
      type: 'card',
      name: 'Visa ending in 4242',
      icon: CreditCard,
      details: 'Expires 12/25'
    },
    {
      type: 'bank',
      name: 'Bank Account',
      icon: Bank,
      details: 'CH** **** **** 1234'
    },
    {
      type: 'crypto',
      name: 'Ethereum Wallet',
      icon: Wallet,
      details: '0x1234...5678'
    }
  ];

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
              <h2 className="text-xl font-bold">Payment Methods</h2>
              <p className="text-sm text-gray-500">Manage your payment methods</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Payment Methods List */}
          <div className="space-y-3">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                    <method.icon size={20} className="text-gray-700" />
                  </div>
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-gray-500">{method.details}</div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical size={18} className="text-gray-400" />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Method Button */}
          <button className="w-full flex items-center justify-center gap-2 p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
            <Plus size={18} className="text-gray-700" />
            <span className="font-medium">Add New Payment Method</span>
          </button>
        </div>
      </div>
    </div>
  );
}