import React from 'react';
import { X } from 'lucide-react';
import { SUPPORTED_WALLETS } from '../lib/web3';
import { useConnect } from 'wagmi';

interface WalletConnectModalProps {
  onClose: () => void;
}

export default function WalletConnectModal({ onClose }: WalletConnectModalProps) {
  const { connect, connectors } = useConnect();

  const handleConnect = async (walletId: string) => {
    const connector = connectors.find(c => c.id === walletId);
    if (connector) {
      try {
        await connect({ connector });
        onClose();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="space-y-3">
          {SUPPORTED_WALLETS.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => handleConnect(wallet.id)}
              className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <img
                src={wallet.icon}
                alt={wallet.name}
                className="w-8 h-8 object-contain"
              />
              <div className="text-left">
                <div className="font-medium">{wallet.name}</div>
                <div className="text-sm text-gray-500">{wallet.description}</div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500">
          By connecting a wallet, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}