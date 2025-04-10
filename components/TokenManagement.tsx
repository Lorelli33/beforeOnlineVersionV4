import React, { useState } from 'react';
import { ArrowLeft, Coins, ArrowUpRight, ArrowDownRight, History } from 'lucide-react';
import { useBalance } from 'wagmi';
import { PVCX_TOKEN_ADDRESS } from '../lib/web3';

interface TokenManagementProps {
  onBack: () => void;
}

export default function TokenManagement({ onBack }: TokenManagementProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: tokenBalance } = useBalance({
    token: PVCX_TOKEN_ADDRESS.sepolia
  });

  const transactions = [
    {
      id: '1',
      type: 'earn',
      amount: 150,
      description: 'Flight Reward: LHR → CDG',
      date: new Date('2025-03-15T10:00:00')
    },
    {
      id: '2',
      type: 'spend',
      amount: 50,
      description: 'Cabin Upgrade Redemption',
      date: new Date('2025-03-10T14:30:00')
    }
  ];

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
              <h2 className="text-xl font-bold">Token Management</h2>
              <p className="text-sm text-gray-500">Manage your PVCX tokens</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Token Balance Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Coins size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-white/70">Available Balance</div>
                  <div className="text-2xl font-bold">
                    {tokenBalance?.formatted ? Number(tokenBalance.formatted).toFixed(2) : '0.00'} PVCX
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg py-2 text-sm font-medium">
                  <ArrowUpRight size={16} />
                  <span>Send</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg py-2 text-sm font-medium">
                  <ArrowDownRight size={16} />
                  <span>Receive</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === 'overview' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === 'history' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  History
                </button>
              </div>
            </div>

            {activeTab === 'overview' ? (
              <div className="space-y-6">
                {/* Earning Rate */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-bold mb-2">Earning Rate</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Per kilometer flown</span>
                    <span className="font-medium">1.5 PVCX</span>
                  </div>
                </div>

                {/* Redemption Options */}
                <div>
                  <h3 className="font-bold mb-3">Redemption Options</h3>
                  <div className="space-y-3">
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Cabin Upgrade</div>
                          <div className="text-sm text-gray-500">Upgrade to next cabin class</div>
                        </div>
                        <button className="px-3 py-1 bg-black text-white text-sm rounded-lg">
                          500 PVCX
                        </button>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Flight Discount</div>
                          <div className="text-sm text-gray-500">€100 off your next flight</div>
                        </div>
                        <button className="px-3 py-1 bg-black text-white text-sm rounded-lg">
                          1000 PVCX
                        </button>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">VIP Lounge Access</div>
                          <div className="text-sm text-gray-500">One-time access pass</div>
                        </div>
                        <button className="px-3 py-1 bg-black text-white text-sm rounded-lg">
                          300 PVCX
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'earn' ? 'bg-green-100' : 'bg-orange-100'
                      }`}>
                        {transaction.type === 'earn' ? (
                          <ArrowDownRight size={20} className="text-green-600" />
                        ) : (
                          <ArrowUpRight size={20} className="text-orange-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">
                            {transaction.type === 'earn' ? 'Earned' : 'Spent'} PVCX
                          </div>
                          <div className={`font-medium ${
                            transaction.type === 'earn' ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {transaction.type === 'earn' ? '+' : '-'}{transaction.amount} PVCX
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {transaction.description}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {transaction.date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {transactions.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <History size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">No transactions yet</h3>
                    <p className="text-gray-500 mt-2">
                      Start earning PVCX tokens by booking flights
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}