import React from 'react';
import { Wallet, ChevronDown, ExternalLink, LogOut } from 'lucide-react';
import { web3Service, SUPPORTED_WALLETS } from '../lib/web3';

interface WalletConnectProps {
  onShowDashboard?: () => void;
}

function WalletConnect({ onShowDashboard }: WalletConnectProps) {
  const [address, setAddress] = React.useState<string | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    // Check if already connected
    const checkConnection = () => {
      const isConnected = web3Service.isConnected();
      const currentAccount = web3Service.getAccount();
      setIsConnected(isConnected);
      setAddress(currentAccount);
    };

    checkConnection();
  }, []);

  const handleConnect = async (walletId: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const account = await web3Service.connect(walletId as 'metamask' | 'walletconnect');
      if (account) {
        setAddress(account);
        setIsConnected(true);
      }
      setShowDropdown(false);
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
      setAddress(null);
      setIsConnected(false);
      setShowDropdown(false);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/95 backdrop-blur-sm hover:bg-white/100 transition-colors shadow-lg border border-white/20"
      >
        <div className="flex items-center gap-2">
          <Wallet size={18} className="text-gray-700" />
          {isConnected ? (
            <>
              <span className="font-mono text-sm hidden md:block">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
              </span>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </>
          ) : (
            <>
              <span className="text-sm font-medium hidden md:block">Connect</span>
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            </>
          )}
        </div>
        <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      {showDropdown && (
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
                {onShowDashboard && (
                  <button
                    onClick={() => {
                      onShowDashboard();
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                  >
                    <Wallet size={14} />
                    Token Dashboard
                  </button>
                )}
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

export default WalletConnect;