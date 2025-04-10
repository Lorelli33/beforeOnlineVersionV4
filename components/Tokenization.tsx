import React, { useState } from 'react';
import { ArrowLeft, Coins, Lock, Shield, ChevronRight, ExternalLink } from 'lucide-react';
import { useBalance } from 'wagmi';
import { PVCX_TOKEN_ADDRESS } from '../lib/web3';

interface TokenizationProps {
  onBack: () => void;
}

export default function Tokenization({ onBack }: TokenizationProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: tokenBalance } = useBalance({
    token: PVCX_TOKEN_ADDRESS.sepolia
  });

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
              <h2 className="text-xl font-bold">Tokenization</h2>
              <p className="text-sm text-gray-500">Learn about PVCX token and its benefits</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Token Info Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Coins size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-white/70">PVCX Token Balance</div>
                  <div className="text-2xl font-bold">
                    {tokenBalance?.formatted ? Number(tokenBalance.formatted).toFixed(2) : '0.00'} PVCX
                  </div>
                </div>
              </div>
              <div className="text-sm text-white/70">
                Current Value: €{tokenBalance?.formatted ? (Number(tokenBalance.formatted) * 1.5).toFixed(2) : '0.00'}
              </div>
            </div>

            {/* Token Details */}
            <div className="space-y-6">
              {/* Token Information */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-bold mb-4">Token Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Token Name</span>
                    <span className="font-medium">PrivateCharterX Token</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Symbol</span>
                    <span className="font-medium">PVCX</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Network</span>
                    <span className="font-medium">Ethereum (Sepolia)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Contract</span>
                    <a 
                      href={`https://sepolia.etherscan.io/token/${PVCX_TOKEN_ADDRESS.sepolia}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      View <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Token Features */}
              <div>
                <h3 className="font-bold mb-4">Token Features</h3>
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Coins size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Flight Rewards</div>
                        <div className="text-sm text-gray-500">Earn 1.5 PVCX tokens for every kilometer flown</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Lock size={18} className="text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Smart Contract Security</div>
                        <div className="text-sm text-gray-500">Audited and secure token contract with built-in safety features</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield size={18} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">Governance Rights</div>
                        <div className="text-sm text-gray-500">Participate in platform decisions and feature voting</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Token Utility */}
              <div>
                <h3 className="font-bold mb-4">Token Utility</h3>
                <div className="space-y-3">
                  <button className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors text-left">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Flight Discounts</div>
                        <div className="text-sm text-gray-500">Use tokens for discounts on future bookings</div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </button>

                  <button className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors text-left">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Cabin Upgrades</div>
                        <div className="text-sm text-gray-500">Redeem tokens for cabin class upgrades</div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </button>

                  <button className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors text-left">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">VIP Benefits</div>
                        <div className="text-sm text-gray-500">Access exclusive services and amenities</div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}