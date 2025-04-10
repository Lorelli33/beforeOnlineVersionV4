import React, { useState, useEffect } from 'react';
import { Search, Filter, ExternalLink, ArrowRight, ChevronRight, X, Shield, Clock, Plane, MapPin } from 'lucide-react';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import LanguageSelector from '../../components/LanguageSelector';
import ThemeToggle from '../../components/ThemeToggle';
import UserMenu from '../../components/UserMenu';
import WalletMenu from '../../components/WalletMenu';
import NavigationMenu from '../../components/NavigationMenu';
import { supabase } from '../../lib/supabase';
import { useAccount } from 'wagmi';

interface Flight {
  id: string;
  callsign: string;
  aircraft_type: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  status: 'scheduled' | 'in-flight' | 'landed' | 'delayed';
  transaction_hash: string;
  block_number: number;
  operator: string;
  nft?: {
    token_id: string;
    opensea_url: string;
    owner_address: string;
  };
}

export default function FlightTracker() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const { data: flightData, error: flightError } = await supabase
        .from('flights')
        .select(`
          *,
          nft:flight_nfts(
            token_id,
            opensea_url,
            owner_address
          )
        `)
        .order('departure_time', { ascending: false });

      if (flightError) throw flightError;
      
      setFlights(flightData || []);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-flight':
        return 'bg-green-100 text-green-800';
      case 'landed':
        return 'bg-gray-100 text-gray-800';
      case 'delayed':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredFlights = flights.filter(flight => {
    const searchLower = searchTerm.toLowerCase();
    return (
      flight.callsign.toLowerCase().includes(searchLower) ||
      flight.origin.toLowerCase().includes(searchLower) ||
      flight.destination.toLowerCase().includes(searchLower) ||
      flight.aircraft_type.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-between py-4 px-6">
            <div className="flex items-center gap-8">
              <Logo />
              <NavigationMenu />
            </div>
            <div className="flex items-center gap-4">
              <WalletMenu onShowDashboard={() => {}} />
              <UserMenu onLogout={() => {}} />
              <ThemeToggle isDark={isDarkTheme} onToggle={() => setIsDarkTheme(!isDarkTheme)} />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-[88px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mission Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Flight Tracker</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our mission is to bring unprecedented transparency to private aviation. By recording every flight on the blockchain, we're creating an immutable record of private aviation activity worldwide.
            </p>
          </div>

          {/* Flight Tracker Interface */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-16">
            {/* Search Bar */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by flight number, route, or aircraft type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Filter size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Flights Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NFT</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredFlights.map((flight) => (
                    <tr key={flight.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Plane size={20} className="text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{flight.callsign}</div>
                            <div className="text-sm text-gray-500">{flight.aircraft_type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <MapPin size={16} className="text-gray-400 mr-1" />
                          <span>{flight.origin}</span>
                          <ArrowRight size={14} className="mx-2 text-gray-400" />
                          <span>{flight.destination}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDateTime(flight.departure_time)}</div>
                        <div className="text-sm text-gray-500">{formatDateTime(flight.arrival_time)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(flight.status)}`}>
                          {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {flight.nft ? (
                          <div className="space-y-1">
                            <a
                              href={flight.nft.opensea_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                            >
                              View on OpenSea
                              <ExternalLink size={14} />
                            </a>
                            {flight.nft.owner_address === address && (
                              <div className="text-xs text-green-600">You own this NFT</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Not minted</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedFlight(flight);
                            setShowDetails(true);
                          }}
                          className="text-black hover:text-gray-700"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-2xl h-[300px] overflow-y-auto custom-scrollbar">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <Shield size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-gray-600">
                Every private flight is recorded on the blockchain, creating an immutable and verifiable record of aviation activity. This unprecedented level of transparency allows stakeholders to track and verify flight operations, ensuring accountability and trust in the private aviation sector.
              </p>
              <div className="mt-4">
                <h4 className="font-bold text-sm mb-2">Key Benefits:</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Immutable flight records</li>
                  <li>• Verifiable aircraft operations</li>
                  <li>• Public accessibility</li>
                  <li>• Decentralized storage</li>
                  <li>• Transparent pricing</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl h-[300px] overflow-y-auto custom-scrollbar">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <Clock size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">
                Monitor private flights worldwide in real-time with accurate departure and arrival information. Our advanced tracking system provides detailed insights into flight operations, enabling better planning and coordination.
              </p>
              <div className="mt-4">
                <h4 className="font-bold text-sm mb-2">Features:</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Live flight status updates</li>
                  <li>• Accurate arrival predictions</li>
                  <li>• Route visualization</li>
                  <li>• Historical flight data</li>
                  <li>• Custom alerts and notifications</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl h-[300px] overflow-y-auto custom-scrollbar">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Data</h3>
              <p className="text-gray-600">
                All flight data is cryptographically secured and verified through blockchain technology. Each flight record is permanently stored and can be independently verified by any interested party.
              </p>
              <div className="mt-4">
                <h4 className="font-bold text-sm mb-2">Security Measures:</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Blockchain verification</li>
                  <li>• Cryptographic security</li>
                  <li>• Tamper-proof records</li>
                  <li>• Distributed storage</li>
                  <li>• Audit trail</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Flight Details Modal */}
          {showDetails && selectedFlight && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedFlight(null);
                  }}
                  className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>

                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Plane size={24} className="text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedFlight.callsign}</h3>
                      <p className="text-gray-600">{selectedFlight.aircraft_type}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Route Information */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold mb-3">Route Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Origin</span>
                        <span className="font-medium">{selectedFlight.origin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Destination</span>
                        <span className="font-medium">{selectedFlight.destination}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Departure</span>
                        <span className="font-medium">{formatDateTime(selectedFlight.departure_time)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Arrival</span>
                        <span className="font-medium">{formatDateTime(selectedFlight.arrival_time)}</span>
                      </div>
                    </div>
                  </div>

                  {/* NFT Information */}
                  {selectedFlight.nft && (
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="font-bold mb-3">NFT Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Token ID</span>
                          <span className="font-medium">{selectedFlight.nft.token_id}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Owner</span>
                          <span className="font-mono text-sm">
                            {selectedFlight.nft.owner_address === address ? (
                              <span className="text-green-600">You</span>
                            ) : (
                              `${selectedFlight.nft.owner_address.slice(0, 6)}...${selectedFlight.nft.owner_address.slice(-4)}`
                            )}
                          </span>
                        </div>
                        <div className="mt-4">
                          <a
                            href={selectedFlight.nft.opensea_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            View on OpenSea
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Blockchain Information */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold mb-3">Blockchain Record</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Transaction Hash</span>
                        <a
                          href={`https://sepolia.etherscan.io/tx/${selectedFlight.transaction_hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          {selectedFlight.transaction_hash.slice(0, 6)}...{selectedFlight.transaction_hash.slice(-4)}
                          <ExternalLink size={14} />
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Block Number</span>
                        <span className="font-medium">{selectedFlight.block_number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Operator</span>
                        <span className="font-medium">{selectedFlight.operator}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    This flight record is permanently stored on the Ethereum blockchain and cannot be modified.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}