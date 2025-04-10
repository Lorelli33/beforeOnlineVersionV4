import React, { useState } from 'react';
import { ArrowLeft, Wallet, AlertTriangle, ExternalLink } from 'lucide-react';
import { useBalance, useAccount, useConnect, useWriteContract, useWatchContractEvent } from 'wagmi';
import { parseEther } from 'viem';
import { PVCX_TOKEN_ADDRESS, TOKEN_ABI, SUPPORTED_WALLETS } from '../lib/web3';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface TokenWithdrawalProps {
  onBack: () => void;
}

export default function TokenWithdrawal({ onBack }: TokenWithdrawalProps) {
  const { user } = useAuth();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  const { data: tokenBalance } = useBalance({
    address,
    token: PVCX_TOKEN_ADDRESS.sepolia
  });

  // Contract write hook for token transfer
  const { writeContract, isError, isPending } = useWriteContract();

  // Watch for Transfer events
  useWatchContractEvent({
    address: PVCX_TOKEN_ADDRESS.sepolia,
    abi: TOKEN_ABI,
    eventName: 'Transfer',
    onLogs(logs) {
      // Check if the transfer was successful
      const transferEvent = logs[0];
      if (transferEvent) {
        setSuccess(true);
        setIsSubmitting(false);
      }
    }
  });

  const handleConnectWallet = async (walletId: string) => {
    try {
      const connector = connectors.find(c => c.id === walletId);
      if (connector) {
        await connect({ connector });
        setShowWalletOptions(false);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError('Failed to connect wallet');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const withdrawalAmount = parseFloat(amount);
      
      // Validate minimum amount
      if (withdrawalAmount < 50) {
        throw new Error('Minimum withdrawal amount is 50 PVCX');
      }

      // Validate balance
      if (tokenBalance && withdrawalAmount > parseFloat(tokenBalance.formatted)) {
        throw new Error('Insufficient balance');
      }

      // Create withdrawal request
      const { error: withdrawalError } = await supabase
        .from('token_withdrawals')
        .insert([{
          user_id: user?.id,
          amount: withdrawalAmount,
          wallet_address: address,
          status: 'pending'
        }]);

      if (withdrawalError) throw withdrawalError;

      // Initiate token transfer
      writeContract({
        abi: TOKEN_ABI,
        address: PVCX_TOKEN_ADDRESS.sepolia,
        functionName: 'transfer',
        args: [address, parseEther(amount.toString())]
      });

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process withdrawal');
      setIsSubmitting(false);
    }
  };

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
              <h2 className="text-xl font-bold">Withdraw PVCX Tokens</h2>
              <p className="text-sm text-gray-500">Minimum withdrawal: 50 PVCX</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Balance Display */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="text-sm text-gray-500">Available Balance</div>
              <div className="text-2xl font-bold">
                {tokenBalance?.formatted ? Number(tokenBalance.formatted).toFixed(2) : '0.00'} PVCX
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-2">
                <AlertTriangle size={20} />
                <span>{error}</span>
              </div>
            )}

            {success ? (
              <div className="bg-green-50 text-green-700 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Withdrawal Successful</h3>
                <p>Your tokens have been sent to your wallet.</p>
                <button
                  onClick={onBack}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : showWalletOptions ? (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Connect Your Wallet</h3>
                {SUPPORTED_WALLETS.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleConnectWallet(wallet.id)}
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
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (PVCX)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="50"
                    step="1"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Minimum 50 PVCX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wallet Status
                  </label>
                  {isConnected ? (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Wallet size={18} className="text-gray-500" />
                      <span className="font-mono text-sm">
                        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'No wallet connected'}
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowWalletOptions(true)}
                      className="w-full flex items-center justify-center gap-2 p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <Wallet size={18} />
                      <span>Connect Wallet</span>
                    </button>
                  )}
                </div>

                <div className="bg-blue-50 p-4 rounded-xl space-y-2 text-sm text-blue-700">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Important Notes:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Minimum withdrawal amount is 50 PVCX</li>
                        <li>Make sure your wallet is connected</li>
                        <li>Only ERC-20 compatible wallets are supported</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isPending || !isConnected}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting || isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : !isConnected ? (
                    'Connect Wallet to Withdraw'
                  ) : (
                    'Withdraw Tokens'
                  )}
                </button>

                {/* Uniswap Link */}
                <div className="text-center">
                  <a
                    href={`https://app.uniswap.org/#/swap?outputCurrency=${PVCX_TOKEN_ADDRESS.sepolia}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Trade PVCX on Uniswap
                    <ExternalLink size={14} />
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}