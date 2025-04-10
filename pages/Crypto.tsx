import React, { useState, useEffect } from 'react';
import { Coins, Wallet, ArrowUpDown, ExternalLink, ChevronDown, Info } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import LanguageSelector from '../components/LanguageSelector';
import ThemeToggle from '../components/ThemeToggle';
import UserMenu from '../components/UserMenu';
import WalletMenu from '../components/WalletMenu';
import axios from 'axios';

interface CryptoAsset {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  price_usd: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap_usd: number;
  volume24: number;
}

export default function Crypto() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [activeTab, setActiveTab] = useState<'crypto' | 'pvcx'>('crypto');
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof CryptoAsset; direction: 'ascending' | 'descending' }>({
    key: 'rank',
    direction: 'ascending'
  });

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        // Using a free API for demo purposes
        const response = await axios.get('https://api.coincap.io/v2/assets?limit=20');
        
        const formattedData: CryptoAsset[] = response.data.data.map((asset: any) => ({
          id: asset.id,
          rank: parseInt(asset.rank),
          symbol: asset.symbol,
          name: asset.name,
          price_usd: parseFloat(asset.priceUsd),
          percent_change_24h: parseFloat(asset.changePercent24Hr),
          percent_change_7d: 0, // Not available in this API
          market_cap_usd: parseFloat(asset.marketCapUsd),
          volume24: parseFloat(asset.volumeUsd24Hr)
        }));
        
        setCryptoAssets(formattedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching crypto data:', err);
        setError('Failed to load cryptocurrency data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  const requestSort = (key: keyof CryptoAsset) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedAssets = React.useMemo(() => {
    const sortableAssets = [...cryptoAssets];
    if (sortConfig.key) {
      sortableAssets.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableAssets;
  }, [cryptoAssets, sortConfig]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 6 : 2
    }).format(value);
  };

  const formatLargeNumber = (value: number): string => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    }
    if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-between py-4 px-6">
            <Logo />
            <div className="flex items-center gap-4">
              <WalletMenu onShowDashboard={() => {}} />
              <UserMenu onLogout={() => {}} />
              <ThemeToggle isDark={isDarkTheme} onToggle={() => setIsDarkTheme(!isDarkTheme)} />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-[88px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Book, pay, earn</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The world's first crypto token reward system for private jets, yachts & more
            </p>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Register by Email or Web3-Wallet</h3>
              <p className="text-gray-600">
                Register by entering your email to activate your account or connect your Web3 wallet for seamless access
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Your Services</h3>
              <p className="text-gray-600">
                Select from our range of luxury services, including private jets, yachts, and more
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pay & Earn</h3>
              <p className="text-gray-600">
                Clients earn PCX for every kilometer flown. Enjoy rewards while you travel!
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('crypto')}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === 'crypto' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Crypto Payments
              </button>
              <button
                onClick={() => setActiveTab('pvcx')}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === 'pvcx' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                PVCX Token
              </button>
            </div>
          </div>

          {activeTab === 'crypto' ? (
            <>
              <div className="bg-gray-50 p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold mb-4">Cryptocurrency Payments</h2>
                <p className="text-gray-600 mb-6">
                  PrivateCharterX accepts over 80 different cryptocurrencies as payment for our services. 
                  Enjoy the convenience, security, and privacy of blockchain transactions when booking your next private jet or yacht charter.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-bold mb-3">Benefits of Crypto Payments</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Fast global transactions without banking delays</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Enhanced privacy and security</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Lower transaction fees compared to traditional banking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Real-time price conversion at market rates</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-bold mb-3">Supported Cryptocurrencies</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025" alt="Bitcoin" className="w-6 h-6" />
                        <span className="text-sm font-medium">Bitcoin</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025" alt="Ethereum" className="w-6 h-6" />
                        <span className="text-sm font-medium">Ethereum</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=025" alt="Solana" className="w-6 h-6" />
                        <span className="text-sm font-medium">Solana</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <img src="https://cryptologos.cc/logos/binance-usd-busd-logo.png?v=025" alt="BUSD" className="w-6 h-6" />
                        <span className="text-sm font-medium">BUSD</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <img src="https://cryptologos.cc/logos/tether-usdt-logo.png?v=025" alt="USDT" className="w-6 h-6" />
                        <span className="text-sm font-medium">USDT</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=025" alt="USDC" className="w-6 h-6" />
                        <span className="text-sm font-medium">USDC</span>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <a href="#" className="text-sm text-black font-medium hover:underline inline-flex items-center gap-1">
                        View all supported cryptocurrencies <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crypto Market Data */}
              <div className="mb-16">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Live Cryptocurrency Prices</h2>
                  <div className="text-sm text-gray-500">
                    Data updates every 5 minutes
                  </div>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                    {error}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-xl overflow-hidden shadow">
                      <thead className="bg-gray-50">
                        <tr>
                          <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => requestSort('rank')}
                          >
                            <div className="flex items-center gap-1">
                              <span>#</span>
                              {sortConfig.key === 'rank' && (
                                <ChevronDown 
                                  size={14} 
                                  className={`transition-transform ${sortConfig.direction === 'descending' ? 'rotate-180' : ''}`} 
                                />
                              )}
                            </div>
                          </th>
                          <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => requestSort('name')}
                          >
                            <div className="flex items-center gap-1">
                              <span>Name</span>
                              {sortConfig.key === 'name' && (
                                <ChevronDown 
                                  size={14} 
                                  className={`transition-transform ${sortConfig.direction === 'descending' ? 'rotate-180' : ''}`} 
                                />
                              )}
                            </div>
                          </th>
                          <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => requestSort('price_usd')}
                          >
                            <div className="flex items-center gap-1">
                              <span>Price</span>
                              {sortConfig.key === 'price_usd' && (
                                <ChevronDown 
                                  size={14} 
                                  className={`transition-transform ${sortConfig.direction === 'descending' ? 'rotate-180' : ''}`} 
                                />
                              )}
                            </div>
                          </th>
                          <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => requestSort('percent_change_24h')}
                          >
                            <div className="flex items-center gap-1">
                              <span>24h %</span>
                              {sortConfig.key === 'percent_change_24h' && (
                                <ChevronDown 
                                  size={14} 
                                  className={`transition-transform ${sortConfig.direction === 'descending' ? 'rotate-180' : ''}`} 
                                />
                              )}
                            </div>
                          </th>
                          <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => requestSort('market_cap_usd')}
                          >
                            <div className="flex items-center gap-1">
                              <span>Market Cap</span>
                              {sortConfig.key === 'market_cap_usd' && (
                                <ChevronDown 
                                  size={14} 
                                  className={`transition-transform ${sortConfig.direction === 'descending' ? 'rotate-180' : ''}`} 
                                />
                              )}
                            </div>
                          </th>
                          <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => requestSort('volume24')}
                          >
                            <div className="flex items-center gap-1">
                              <span>Volume (24h)</span>
                              {sortConfig.key === 'volume24' && (
                                <ChevronDown 
                                  size={14} 
                                  className={`transition-transform ${sortConfig.direction === 'descending' ? 'rotate-180' : ''}`} 
                                />
                              )}
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {sortedAssets.map((asset) => (
                          <tr key={asset.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {asset.rank}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center">
                                  <img 
                                    src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`} 
                                    alt={asset.name} 
                                    className="h-6 w-6"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = 'https://assets.coincap.io/assets/icons/generic@2x.png';
                                    }}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                                  <div className="text-xs text-gray-500">{asset.symbol}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatCurrency(asset.price_usd)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 py-1 rounded-full ${
                                asset.percent_change_24h > 0 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {asset.percent_change_24h > 0 ? '+' : ''}{asset.percent_change_24h.toFixed(2)}%
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatCurrency(asset.market_cap_usd)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatCurrency(asset.volume24)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* PVCX Token Section */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl mb-8 border border-blue-100">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-48 h-48 bg-white rounded-full shadow-lg flex items-center justify-center p-4">
                      <img 
                        src="https://i.imgur.com/iu42DU1.png" 
                        alt="PVCX Token" 
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">PVCX Token</h2>
                    <p className="text-gray-700 mb-6">
                      PVCX is our ecosystem and utility token designed specifically for the private aviation and luxury travel industry. 
                      It powers our reward system, offering travelers unprecedented benefits and creating a seamless connection between traditional luxury services and blockchain technology.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-xl shadow-sm">
                        <div className="text-blue-600 font-bold text-lg">1 km = 1 Token</div>
                        <div className="text-sm text-gray-600">Earn tokens for every kilometer flown</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl shadow-sm">
                        <div className="text-blue-600 font-bold text-lg">Launching Soon</div>
                        <div className="text-sm text-gray-600">Join our whitelist for early access</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl shadow-sm">
                        <div className="text-blue-600 font-bold text-lg">Utility Token</div>
                        <div className="text-sm text-gray-600">Use for discounts, upgrades & more</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PVCX Benefits */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">PVCX Token Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Coins size={20} className="text-blue-600" />
                      Earn While You Travel
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Automatically earn PVCX tokens for every kilometer you fly with our private jet services. The more you travel, the more you earn.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">1 PVCX token for each kilometer flown</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Bonus tokens for frequent flyers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Special promotions for token holders</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <ArrowUpDown size={20} className="text-blue-600" />
                      Redeem for Exclusive Benefits
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Use your accumulated PVCX tokens to unlock premium services, discounts, and exclusive experiences.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Discounts on future bookings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Cabin upgrades and premium amenities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Access to exclusive events and experiences</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Wallet size={20} className="text-blue-600" />
                      Seamless Web3 Integration
                    </h3>
                    <p className="text-gray-600 mb-4">
                      PVCX tokens are built on blockchain technology, offering security, transparency, and interoperability with the wider crypto ecosystem.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Store in any compatible Web3 wallet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Transfer between users securely</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Future exchange listing planned</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      Governance & Community
                    </h3>
                    <p className="text-gray-600 mb-4">
                      As a PVCX token holder, you'll have a voice in the future development of our platform and services.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Vote on new features and destinations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Join exclusive community events</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-gray-600">Early access to new services and features</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <details className="group">
                      <summary className="flex items-center justify-between p-4 cursor-pointer">
                        <h3 className="font-medium">What is PVCX token?</h3>
                        <span className="transition-transform group-open:rotate-180">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </summary>
                      <div className="p-4 pt-0 text-gray-600">
                        PVCX is our proprietary utility token designed specifically for the private aviation industry. It serves as a reward token for our customers, allowing them to earn tokens based on the distance they travel with our services. These tokens can be redeemed for discounts, upgrades, and exclusive experiences within our ecosystem.
                      </div>
                    </details>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <details className="group">
                      <summary className="flex items-center justify-between p-4 cursor-pointer">
                        <h3 className="font-medium">How do I earn PVCX tokens?</h3>
                        <span className="transition-transform group-open:rotate-180">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </summary>
                      <div className="p-4 pt-0 text-gray-600">
                        You automatically earn PVCX tokens when you book and complete flights with PrivateCharterX. The number of tokens earned is directly proportional to the distance flown, with 1 PVCX token awarded for each kilometer. Premium members and frequent flyers may earn bonus tokens through special promotions and loyalty rewards.
                      </div>
                    </details>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <details className="group">
                      <summary className="flex items-center justify-between p-4 cursor-pointer">
                        <h3 className="font-medium">How do I store my PVCX tokens?</h3>
                        <span className="transition-transform group-open:rotate-180">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </summary>
                      <div className="p-4 pt-0 text-gray-600">
                        PVCX tokens can be stored in any compatible Web3 wallet that supports the token standard. Popular options include MetaMask, Trust Wallet, and Coinbase Wallet. You can also keep your tokens in your PrivateCharterX account wallet for easy access and redemption within our platform.
                      </div>
                    </details>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <details className="group">
                      <summary className="flex items-center justify-between p-4 cursor-pointer">
                        <h3 className="font-medium">When will PVCX token launch?</h3>
                        <span className="transition-transform group-open:rotate-180">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </summary>
                      <div className="p-4 pt-0 text-gray-600">
                        PVCX token is scheduled to launch in Q3 2025. We are currently in the development and testing phase. Join our whitelist to receive updates on the token launch, early access opportunities, and potential pre-sale events. Early supporters will receive special benefits and bonus tokens.
                      </div>
                    </details>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <details className="group">
                      <summary className="flex items-center justify-between p-4 cursor-pointer">
                        <h3 className="font-medium">Can I trade PVCX tokens?</h3>
                        <span className="transition-transform group-open:rotate-180">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </summary>
                      <div className="p-4 pt-0 text-gray-600">
                        Initially, PVCX tokens will be primarily used within our ecosystem for redeeming benefits and rewards. However, our roadmap includes plans for exchange listings and broader trading capabilities in the future. This will provide additional utility and liquidity for token holders while maintaining the core benefits within our platform.
                      </div>
                    </details>
                  </div>
                </div>
              </div>

              {/* Whitelist CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 rounded-2xl text-center">
                <h2 className="text-3xl font-bold mb-4">Join the PVCX Token Whitelist</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                  Be among the first to access our revolutionary token when it launches. Early supporters receive exclusive benefits and bonus tokens.
                </p>
                <div className="max-w-md mx-auto">
                  <div className="flex">
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none text-gray-900"
                    />
                    <button className="bg-black text-white px-6 py-3 rounded-r-lg font-medium hover:bg-gray-800 transition-colors">
                      Join Whitelist
                    </button>
                  </div>
                  <p className="text-sm mt-4 text-white/80">
                    By joining, you agree to receive updates about PVCX token and related services.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}