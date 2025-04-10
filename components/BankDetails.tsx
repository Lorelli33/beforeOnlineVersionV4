import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Info } from 'lucide-react';

interface BankDetailsProps {
  onBack: () => void;
}

export default function BankDetails({ onBack }: BankDetailsProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankDetails = {
    name: 'PrivatecharterX',
    address: 'Bahnhofstrasse 37\n8001 Zurich',
    swift: 'UBSWCHZH80A',
    iban: 'CH33 0022 3223 1415 8801 Z'
  };

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-end p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slideIn">
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
              <p className="text-sm text-gray-500">Bank Transfer Details</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Bank Logo */}
            <div className="flex justify-center">
              <img 
                src="https://i.imgur.com/a/v3O6OAk.png" 
                alt="PrivatecharterX" 
                className="h-12 object-contain"
              />
            </div>

            {/* Bank Details */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-900">Beneficiary Name</div>
                    <div className="text-gray-600 mt-2 text-lg">{bankDetails.name}</div>
                  </div>
                  <button
                    onClick={() => handleCopy(bankDetails.name, 'name')}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {copiedField === 'name' ? (
                      <Check size={18} className="text-green-600" />
                    ) : (
                      <Copy size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-900">Address</div>
                    <div className="text-gray-600 mt-2 text-lg whitespace-pre-line">{bankDetails.address}</div>
                  </div>
                  <button
                    onClick={() => handleCopy(bankDetails.address, 'address')}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {copiedField === 'address' ? (
                      <Check size={18} className="text-green-600" />
                    ) : (
                      <Copy size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-900">SWIFT/BIC</div>
                    <div className="text-gray-600 mt-2 text-lg font-mono">{bankDetails.swift}</div>
                  </div>
                  <button
                    onClick={() => handleCopy(bankDetails.swift, 'swift')}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {copiedField === 'swift' ? (
                      <Check size={18} className="text-green-600" />
                    ) : (
                      <Copy size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-900">IBAN</div>
                    <div className="text-gray-600 mt-2 text-lg font-mono tracking-wider">{bankDetails.iban}</div>
                  </div>
                  <button
                    onClick={() => handleCopy(bankDetails.iban, 'iban')}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {copiedField === 'iban' ? (
                      <Check size={18} className="text-green-600" />
                    ) : (
                      <Copy size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 p-6 rounded-xl space-y-3">
              <div className="flex items-start gap-3">
                <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900">Important Information</h3>
                  <ul className="mt-2 space-y-2 text-sm text-blue-800">
                    <li>• Funds will be available in your account within 1-24 hours after receipt</li>
                    <li>• You can withdraw funds back to your original bank account within 1-24 hours</li>
                    <li>• Alternative payout methods require identity verification by our risk management department</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Coming Soon Notice */}
            <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-100">
              <p>Credit card payments coming soon.</p>
              <p>Currently only bank transfers are accepted.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}