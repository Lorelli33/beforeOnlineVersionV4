import React, { useState, useEffect } from 'react';
import { CreditCard, History, Settings, Bell, Shield, LogOut, Plus, ArrowUpRight, Wallet, ChevronRight, Coins, Plane, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { web3Service } from '../lib/web3';
import { PVCX_TOKEN_ADDRESS } from '../lib/web3';
import AccountSettings from './AccountSettings';
import FlightHistory from './FlightHistory';
import PaymentMethods from './PaymentMethods';
import TransactionHistory from './TransactionHistory';
import RequestHistory from './RequestHistory';
import AddFunds from './AddFunds';
import TransferFunds from './TransferFunds';
import NFTManagement from './NFTManagement';

interface DashboardProps {
  onClose: () => void;
  onShowHistory: () => void;
  initialView?: string;
}

export default function Dashboard({ onClose, onShowHistory, initialView = 'overview' }: DashboardProps) {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState(initialView);
  const [ethBalance, setEthBalance] = useState('0');
  const [tokenBalance, setTokenBalance] = useState('0');

  React.useEffect(() => {
    const fetchBalances = async () => {
      const address = web3Service.getAccount();
      if (address) {
        try {
          const ethBal = await web3Service.getBalance(address);
          const tokenBal = await web3Service.getTokenBalance(PVCX_TOKEN_ADDRESS.sepolia, address);
          setEthBalance(ethBal);
          setTokenBalance(tokenBal);
        } catch (error) {
          console.error('Error fetching balances:', error);
        }
      }
    };

    fetchBalances();
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'settings':
        return <AccountSettings onBack={() => setCurrentView('overview')} />;
      case 'flightHistory':
        return <FlightHistory onBack={() => setCurrentView('overview')} />;
      case 'paymentMethods':
        return <PaymentMethods onBack={() => setCurrentView('overview')} />;
      case 'transactions':
        return <TransactionHistory onBack={() => setCurrentView('overview')} />;
      case 'requests':
        return <RequestHistory onBack={() => setCurrentView('overview')} />;
      case 'addFunds':
        return <AddFunds onBack={() => setCurrentView('overview')} />;
      case 'transfer':
        return <TransferFunds onBack={() => setCurrentView('overview')} />;
      case 'nfts':
        return <NFTManagement onBack={() => setCurrentView('overview')} />;
      default:
        return (
          <div className="p-6 space-y-6">
            {/* Account Overview */}
            <div className="bg-gray-50 text-black p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{user?.name || 'User'}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Fiat Balance */}
                <div>
                  <div className="text-sm text-gray-500">Available Balance</div>
                  <div className="text-2xl font-bold">€0.00</div>
                </div>

                {/* Crypto Balances */}
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Crypto Assets</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-sm text-gray-500">ETH Balance</div>
                      <div className="font-medium">
                        {Number(ethBalance).toFixed(4)} ETH
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-sm text-gray-500">PVCX Tokens</div>
                      <div className="font-medium">
                        {Number(tokenBalance).toFixed(2)} PVCX
                      </div>
                    </div>
                  </div>
                </div>

                {/* PVCX Rewards */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Coins size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium">PVCX Rewards</div>
                      <div className="text-sm text-gray-600">Total earned from flights</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">0.00 PVCX</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Earn 1.5 PVCX per kilometer flown
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setCurrentView('addFunds')}
                className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center"
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <Plus size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-medium">Add Funds</div>
                  <div className="text-xs text-gray-500">Deposit money</div>
                </div>
              </button>
              
              <button 
                onClick={() => setCurrentView('transfer')}
                className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center"
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <ArrowUpRight size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-medium">Send / Transfer</div>
                  <div className="text-xs text-gray-500">Send money</div>
                </div>
              </button>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              <button 
                onClick={() => setCurrentView('paymentMethods')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CreditCard size={20} className="text-gray-700" />
                  <span className="font-medium">Payment Methods</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              <button 
                onClick={() => setCurrentView('transactions')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <History size={20} className="text-gray-700" />
                  <span className="font-medium">Transaction History</span>
                </div>
                <div className="text-sm text-gray-500">No transactions yet</div>
              </button>

              <button 
                onClick={() => setCurrentView('nfts')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Wallet size={20} className="text-gray-700" />
                  <span className="font-medium">NFT Collection</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              <button 
                onClick={() => setCurrentView('flightHistory')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Plane size={20} className="text-gray-700" />
                  <span className="font-medium">Flight History</span>
                </div>
                <div className="text-sm text-gray-500">No flights yet</div>
              </button>

              <button 
                onClick={() => setCurrentView('requests')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-gray-700" />
                  <span className="font-medium">Flight Requests</span>
                </div>
                <div className="text-sm text-gray-500">No requests</div>
              </button>

              <button 
                onClick={() => setCurrentView('settings')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Settings size={20} className="text-gray-700" />
                  <span className="font-medium">Account Settings</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              <button 
                onClick={() => setCurrentView('privacy')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-gray-700" />
                  <span className="font-medium">Privacy & Security</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-end p-4">
      <div className="bg-white/95 backdrop-blur-md w-full max-w-2xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-slideIn">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Account Dashboard</h2>
              <p className="text-sm text-gray-500">Manage your account settings</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100vh-200px)]">
          <div className="flex-1 overflow-y-auto">
            {renderView()}
          </div>
        </div>
      </div>
    </div>
  );
}