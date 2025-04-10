import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Tag, Info, X, ExternalLink, Search, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';
import WalletMenu from '../components/WalletMenu';
import { supabase } from '../lib/supabase';
import OfferDetailModal from '../components/OfferDetailModal';
import EmptyLegsSection from '../components/EmptyLegsSection';
import NavigationMenu from '../components/NavigationMenu';

export interface FixedOffer {
  id: string;
  title: string;
  description: string;
  origin: string;
  destination: string;
  price: number;
  currency: string;
  departure_date: string;
  return_date?: string;
  image_url: string;
  aircraft_type: string;
  passengers: number;
  duration: string;
  is_featured: boolean;
  is_empty_leg: boolean;
  created_at: string;
}

const FixedOffers: React.FC = () => {
  const { user } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [offers, setOffers] = useState<FixedOffer[]>([]);
  const [emptyLegs, setEmptyLegs] = useState<FixedOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<FixedOffer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('packages');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
    fetchOffers();
    
    // Check if URL has hash for empty legs
    if (window.location.hash === '#empty-legs') {
      setActiveTab('empty-legs');
    }
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) return;
    
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (!error && userData) {
        setIsAdmin(userData.is_admin);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const fetchOffers = async () => {
    try {
      setLoading(true);
      
      // Fetch regular fixed offers
      const { data: fixedOffers, error: fixedOffersError } = await supabase
        .from('fixed_offers')
        .select('*')
        .eq('is_empty_leg', false)
        .order('created_at', { ascending: false });
      
      if (fixedOffersError) throw fixedOffersError;
      
      // Fetch empty legs
      const { data: emptyLegsData, error: emptyLegsError } = await supabase
        .from('fixed_offers')
        .select('*')
        .eq('is_empty_leg', true)
        .order('departure_date', { ascending: true });
      
      if (emptyLegsError) throw emptyLegsError;
      
      setOffers(fixedOffers || []);
      setEmptyLegs(emptyLegsData || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOfferClick = (offer: FixedOffer) => {
    setSelectedOffer(offer);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOffer(null);
  };

  const filteredOffers = offers.filter(offer => {
    // First apply category filter
    if (filterCategory !== 'all') {
      if (filterCategory === 'featured' && !offer.is_featured) return false;
      
      // Filter by destination region
      const destinationLower = offer.destination.toLowerCase();
      if (filterCategory === 'europe') {
        if (!['paris', 'london', 'rome', 'barcelona', 'geneva', 'zurich', 'milan', 'vienna', 'berlin', 'amsterdam'].some(
          city => destinationLower.includes(city.toLowerCase())
        )) return false;
      }
      if (filterCategory === 'caribbean') {
        if (!['bahamas', 'jamaica', 'barbados', 'st. barts', 'antigua', 'dominican', 'turks', 'caicos', 'virgin islands'].some(
          place => destinationLower.includes(place.toLowerCase())
        )) return false;
      }
      if (filterCategory === 'usa') {
        if (!['new york', 'miami', 'los angeles', 'las vegas', 'chicago', 'boston', 'san francisco', 'aspen', 'dallas'].some(
          city => destinationLower.includes(city.toLowerCase())
        )) return false;
      }
    }
    
    // Then apply search filter if there is a search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        offer.title.toLowerCase().includes(search) ||
        offer.origin.toLowerCase().includes(search) ||
        offer.destination.toLowerCase().includes(search) ||
        offer.aircraft_type.toLowerCase().includes(search) ||
        offer.description.toLowerCase().includes(search) ||
        offer.departure_date.includes(search)
      );
    }
    
    return true;
  });

  const filteredEmptyLegs = emptyLegs.filter(offer => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        offer.title.toLowerCase().includes(search) ||
        offer.origin.toLowerCase().includes(search) ||
        offer.destination.toLowerCase().includes(search) ||
        offer.aircraft_type.toLowerCase().includes(search) ||
        offer.description.toLowerCase().includes(search) ||
        offer.departure_date.includes(search)
      );
    }
    return true;
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
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-[88px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Fixed Offers & Empty Legs</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our curated selection of fixed-price private jet packages and exclusive empty leg flights at exceptional value.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by destination, origin, aircraft type, or date..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent shadow-sm"
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

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === 'packages' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Fixed Packages
              </button>
              <button
                id="empty-legs"
                onClick={() => setActiveTab('empty-legs')}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === 'empty-legs' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Empty Legs
              </button>
            </div>
          </div>

          {activeTab === 'packages' ? (
            <>
              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterCategory === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Packages
                </button>
                <button
                  onClick={() => setFilterCategory('featured')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterCategory === 'featured' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setFilterCategory('europe')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterCategory === 'europe' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Europe
                </button>
                <button
                  onClick={() => setFilterCategory('caribbean')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterCategory === 'caribbean' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Caribbean
                </button>
                <button
                  onClick={() => setFilterCategory('usa')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterCategory === 'usa' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  USA
                </button>
              </div>

              {/* Fixed Offers Grid */}
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                </div>
              ) : filteredOffers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredOffers.map((offer) => (
                    <div 
                      key={offer.id} 
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 cursor-pointer group"
                      onClick={() => handleOfferClick(offer)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={offer.image_url || 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'} 
                          alt={offer.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {offer.is_featured && (
                          <div className="absolute top-3 right-3 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold mb-2">{offer.title}</h3>
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin size={16} className="mr-1" />
                          <span className="text-sm">{offer.origin} to {offer.destination}</span>
                        </div>
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
                            <Calendar size={14} className="mr-1" />
                            <span>{new Date(offer.departure_date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
                            <Users size={14} className="mr-1" />
                            <span>Up to {offer.passengers} pax</span>
                          </div>
                          <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
                            <Clock size={14} className="mr-1" />
                            <span>{offer.duration}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-lg font-bold">
                            {offer.currency}{offer.price.toLocaleString()}
                          </div>
                          <button className="text-xs bg-black text-white px-3 py-1.5 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">No packages found</h3>
                  <p className="text-gray-500 mt-2">
                    No fixed offers match your current filter criteria.
                  </p>
                </div>
              )}
            </>
          ) : (
            <EmptyLegsSection emptyLegs={filteredEmptyLegs} loading={loading} onOfferClick={handleOfferClick} />
          )}

          {/* Custom Offer Banner */}
          <div className="mt-16 mb-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl overflow-hidden">
            <div className="relative p-8 md:p-12">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '30px 30px'
                }}></div>
              </div>
              
              {/* Content */}
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-white max-w-xl">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Looking for Something More Specific?
                  </h2>
                  <p className="text-white/90 text-lg mb-6">
                    Our expert team can create a custom charter solution tailored to your exact requirements. From unique routes to special amenities, we'll craft the perfect journey for you.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="/contact" 
                      className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors"
                    >
                      <Send size={18} />
                      <span>Request Custom Quote</span>
                    </a>
                    <a 
                      href="/ai-travel-agent" 
                      className="inline-flex items-center gap-2 bg-black/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-black/30 transition-colors backdrop-blur-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.6-6.3 4.6 2.3-7.2-6-4.4h7.6z"></path>
                      </svg>
                      <span>Try AI Travel Agent</span>
                    </a>
                  </div>
                </div>
                
                <div className="hidden md:block">
                  <div className="w-64 h-64 relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl transform rotate-6"></div>
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl transform -rotate-3"></div>
                    <div className="absolute inset-0 bg-white rounded-2xl shadow-lg flex items-center justify-center p-6">
                      <img 
                        src="https://raw.githubusercontent.com/stackblitz/private-jet-icons/main/jets/challenger-350.webp" 
                        alt="Custom Charter" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Link - Only show if user is admin */}
          {isAdmin && (
            <div className="mt-8 text-center">
              <a 
                href="/admin/offers" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
              >
                <ExternalLink size={16} />
                <span>Manage Offers (Admin)</span>
              </a>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Offer Detail Modal */}
      {showModal && selectedOffer && (
        <OfferDetailModal offer={selectedOffer} onClose={closeModal} />
      )}
    </div>
  );
}

export default FixedOffers;