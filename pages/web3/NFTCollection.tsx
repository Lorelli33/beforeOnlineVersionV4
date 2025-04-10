import React, { useState } from 'react';
import { Search, X, ExternalLink, Filter, Clock, Plane, MapPin, ArrowRight } from 'lucide-react';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import LanguageSelector from '../../components/LanguageSelector';
import ThemeToggle from '../../components/ThemeToggle';
import UserMenu from '../../components/UserMenu';
import WalletMenu from '../../components/WalletMenu';
import NavigationMenu from '../../components/NavigationMenu';

interface NFT {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  flightNumber: string;
  origin: string;
  destination: string;
  date: string;
  duration: string;
  aircraft: string;
  price: number;
  currency: string;
  openseaUrl: string;
}

const mockNFTs: NFT[] = [
  {
    id: '1',
    title: 'London to New York Private Flight',
    description: 'Historic private charter flight from London Luton to New York JFK on a Gulfstream G650',
    imageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    flightNumber: 'PCX123',
    origin: 'EGGW',
    destination: 'KJFK',
    date: '2025-03-15',
    duration: '7h 30m',
    aircraft: 'Gulfstream G650',
    price: 2.5,
    currency: 'ETH',
    openseaUrl: 'https://opensea.io/Privatecharterx'
  },
  {
    id: '2',
    title: 'Dubai to Maldives Luxury Flight',
    description: 'Exclusive private jet journey from Dubai to Male on a Bombardier Global 7500',
    imageUrl: 'https://images.unsplash.com/photo-1583373834259-46cc92173cb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    flightNumber: 'PCX456',
    origin: 'OMDB',
    destination: 'VRMM',
    date: '2025-03-16',
    duration: '4h 15m',
    aircraft: 'Bombardier Global 7500',
    price: 1.8,
    currency: 'ETH',
    openseaUrl: 'https://opensea.io/Privatecharterx'
  },
  {
    id: '3',
    title: 'Paris to Tokyo Private Charter',
    description: 'Luxurious transcontinental flight from Paris to Tokyo on a Dassault Falcon 8X',
    imageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    flightNumber: 'PCX789',
    origin: 'LFPB',
    destination: 'RJTT',
    date: '2025-03-17',
    duration: '11h 45m',
    aircraft: 'Dassault Falcon 8X',
    price: 3.2,
    currency: 'ETH',
    openseaUrl: 'https://opensea.io/Privatecharterx'
  },
  {
    id: '4',
    title: 'Singapore to Sydney VIP Flight',
    description: 'Ultra-luxury private charter from Singapore to Sydney featuring the Airbus ACJ320neo',
    imageUrl: 'https://images.unsplash.com/photo-1583373834259-46cc92173cb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    flightNumber: 'PCX101',
    origin: 'WSSS',
    destination: 'YSSY',
    date: '2025-03-18',
    duration: '8h 45m',
    aircraft: 'Airbus ACJ320neo',
    price: 4.0,
    currency: 'ETH',
    openseaUrl: 'https://opensea.io/Privatecharterx'
  },
  {
    id: '5',
    title: 'Miami to Aspen Private Jet',
    description: 'Exclusive winter getaway flight from Miami to Aspen on a Cessna Citation Longitude',
    imageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    flightNumber: 'PCX202',
    origin: 'KMIA',
    destination: 'KASE',
    date: '2025-03-19',
    duration: '4h 30m',
    aircraft: 'Cessna Citation Longitude',
    price: 1.5,
    currency: 'ETH',
    openseaUrl: 'https://opensea.io/Privatecharterx'
  }
];

export default function NFTCollection() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredNFTs = mockNFTs.filter(nft => {
    const searchLower = searchTerm.toLowerCase();
    return (
      nft.title.toLowerCase().includes(searchLower) ||
      nft.description.toLowerCase().includes(searchLower) ||
      nft.flightNumber.toLowerCase().includes(searchLower) ||
      nft.origin.toLowerCase().includes(searchLower) ||
      nft.destination.toLowerCase().includes(searchLower) ||
      nft.aircraft.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Flight NFT Collection</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Own a piece of aviation history with our exclusive collection of flight NFTs. Each token represents a unique private jet journey, immortalized on the blockchain.
            </p>
          </div>

          <div className="mb-8">
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by flight number, route, or aircraft type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNFTs.map((nft) => (
              <div 
                key={nft.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 duration-200 flex flex-col"
                onClick={() => {
                  setSelectedNFT(nft);
                  setShowModal(true);
                }}
              >
                <div className="relative h-48">
                  <img 
                    src={nft.imageUrl}
                    alt={nft.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {nft.price} {nft.currency}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-sm mb-2 line-clamp-1">{nft.title}</h3>
                  <div className="flex items-center text-gray-600 text-xs mb-2">
                    <MapPin size={12} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{nft.origin} → {nft.destination}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
                      <Plane size={10} className="mr-1" />
                      <span>{nft.flightNumber}</span>
                    </div>
                    <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
                      <Clock size={10} className="mr-1" />
                      <span>{nft.duration}</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <a
                      href={nft.openseaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Buy on OpenSea
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showModal && selectedNFT && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-2xl max-w-3xl w-full my-8">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-[300px] lg:h-[500px]">
                    <img 
                      src={selectedNFT.imageUrl}
                      alt={selectedNFT.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setSelectedNFT(null);
                      }}
                      className="absolute top-4 right-4 p-2 bg-black/80 text-white rounded-full hover:bg-black/90 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="p-6 max-h-[500px] overflow-y-auto">
                    <div className="mb-6">
                      <div className="flex justify-between items-start gap-4">
                        <h2 className="text-2xl font-bold">{selectedNFT.title}</h2>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{selectedNFT.price} {selectedNFT.currency}</div>
                          <div className="text-xs text-gray-500">Current Price</div>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-3 text-sm">{selectedNFT.description}</p>
                    </div>

                    <div className="space-y-6 mb-6">
                      <div>
                        <h3 className="text-lg font-bold mb-3">Flight Details</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-500">Flight Number</div>
                            <div className="font-medium text-sm">{selectedNFT.flightNumber}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-500">Date</div>
                            <div className="font-medium text-sm">{formatDate(selectedNFT.date)}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-500">Duration</div>
                            <div className="font-medium text-sm">{selectedNFT.duration}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-500">Aircraft</div>
                            <div className="font-medium text-sm">{selectedNFT.aircraft}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-3">Route Information</h3>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-xs text-gray-500">Origin</div>
                              <div className="font-medium text-sm">{selectedNFT.origin}</div>
                            </div>
                            <ArrowRight size={20} className="text-gray-400" />
                            <div>
                              <div className="text-xs text-gray-500">Destination</div>
                              <div className="font-medium text-sm">{selectedNFT.destination}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <a
                      href={selectedNFT.openseaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
                    >
                      View on OpenSea
                      <ExternalLink size={16} />
                    </a>
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