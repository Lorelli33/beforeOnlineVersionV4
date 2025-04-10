'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Wallet, ChevronDown, ExternalLink, LogOut } from 'lucide-react';
import { web3Service, SUPPORTED_WALLETS } from '@/lib/web3';

interface WalletMenuProps {
  onShowDashboard?: () => void;
}

function WalletMenu({ onShowDashboard }: WalletMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { address, isConnected } = web3Service.useAccount();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleConnect = async (walletId: string) => {
    try {
      setError(null);
      setIsLoading(true);
      await web3Service.connect(walletId as 'metamask' | 'walletconnect');
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setError(error instanceof Error ? error.message : 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await web3Service.disconnect();
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/95 backdrop-blur-sm hover:bg-white/100 transition-colors shadow-lg border border-white/20"
      >
        <div className="flex items-center gap-2">
          <Wallet size={18} className="text-gray-700" />
          {isConnected ? (
            <>
              <span className="font-mono text-sm hidden md:block">
                {formatAddress(address)}
              </span>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </>
          ) : (
            <>
              <span className="text-sm font-medium hidden md:block">Connect</span>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </>
          )}
        </div>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
          {isConnected ? (
            <>
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="text-sm text-gray-500">Connected Wallet</div>
                <div className="font-mono text-sm">{address}</div>
              </div>

              <div className="py-1">
                <a
                  href={`https://sepolia.etherscan.io/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  View on Etherscan
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="border-t border-gray-100 py-1">
                <button
                  onClick={handleDisconnect}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  <LogOut size={14} />
                  Disconnect
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="text-sm font-medium">Connect Wallet</div>
                <div className="text-xs text-gray-500">Select your preferred wallet</div>
                {error && (
                  <div className="mt-2 text-xs text-red-600">
                    {error}
                  </div>
                )}
              </div>

              <div className="py-2">
                {SUPPORTED_WALLETS.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleConnect(wallet.id)}
                    disabled={isLoading}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <img 
                      src={wallet.icon}
                      alt={wallet.name}
                      className="w-6 h-6"
                    />
                    <div className="text-left">
                      <div className="text-sm font-medium">{wallet.name}</div>
                      <div className="text-xs text-gray-500">{wallet.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default WalletMenu;