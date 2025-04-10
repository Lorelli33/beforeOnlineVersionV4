import React, { useState } from 'react';
import { Check, ArrowRight, Anchor, Shield, Award, CreditCard, X } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import LanguageSelector from '../components/LanguageSelector';
import ThemeToggle from '../components/ThemeToggle';
import UserMenu from '../components/UserMenu';
import WalletMenu from '../components/WalletMenu';
import NavigationMenu from '../components/NavigationMenu';
import { createCheckoutSession } from '../lib/payments';

interface PartnerTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

interface YachtTier {
  id: string;
  name: string;
  size: string;
  price: number;
  period: string;
  features: string[];
}

const partnerTiers: PartnerTier[] = [
  {
    id: 'partner-basic',
    name: 'Basic Partnership',
    price: 500,
    period: 'year',
    description: 'Essential partnership benefits for small businesses',
    features: [
      'Listing on our partner directory',
      'Access to partner dashboard',
      'Monthly performance reports',
      'Email support',
      'Basic promotion on our platform'
    ]
  },
  {
    id: 'partner-premium',
    name: 'Premium Partnership',
    price: 1500,
    period: 'year',
    description: 'Enhanced visibility and premium benefits',
    features: [
      'Everything in Basic Partnership',
      'Featured listing on our platform',
      'Access to exclusive events',
      'Dedicated account manager',
      'Priority customer referrals',
      'Co-marketing opportunities',
      'Phone and email support'
    ],
    isPopular: true
  },
  {
    id: 'partner-lifetime',
    name: 'Lifetime Partnership',
    price: 5000,
    period: 'one-time',
    description: 'Permanent partnership with exclusive benefits',
    features: [
      'Everything in Premium Partnership',
      'Lifetime partnership status',
      'VIP access to all PrivateCharterX events',
      'Executive-level account management',
      'Custom marketing campaigns',
      'Highest priority for customer referrals',
      'Exclusive industry insights and reports'
    ]
  }
];

const yachtTiers: YachtTier[] = [
  {
    id: 'yacht-small',
    name: 'Small Yacht Listing',
    size: '1-10m',
    price: 200,
    period: 'year',
    features: [
      'Standard listing on yacht directory',
      'Basic yacht profile',
      'Email support',
      'Booking management tools'
    ]
  },
  {
    id: 'yacht-medium',
    name: 'Medium Yacht Listing',
    size: '11-20m',
    price: 349,
    period: 'year',
    features: [
      'Enhanced listing on yacht directory',
      'Detailed yacht profile with gallery',
      'Priority in search results',
      'Email and phone support',
      'Advanced booking management tools'
    ]
  },
  {
    id: 'yacht-large',
    name: 'Large Yacht Listing',
    size: '20m+',
    price: 499,
    period: 'year',
    features: [
      'Premium listing on yacht directory',
      'Featured yacht profile with virtual tour',
      'Top placement in search results',
      'Dedicated account manager',
      'Comprehensive booking management system',
      'Marketing promotion package'
    ]
  }
];

export default function Partners() {
  const [activeTab, setActiveTab] = useState<'partners' | 'yachts'>('partners');
  const [showForm, setShowForm] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PartnerTier | YachtTier | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    yachtName: '',
    yachtSize: '',
    yachtType: '',
    yachtYear: '',
    yachtCapacity: '',
    yachtLocation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTierSelect = (tier: PartnerTier | YachtTier) => {
    setSelectedTier(tier);
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTier) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Validate form data
      if (activeTab === 'partners') {
        if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone) {
          throw new Error('Please fill in all required fields');
        }
      } else {
        if (!formData.yachtName || !formData.yachtSize || !formData.contactName || !formData.email || !formData.phone) {
          throw new Error('Please fill in all required fields');
        }
      }
      
      // Create checkout session
      const { error: checkoutError } = await createCheckoutSession({
        offerId: selectedTier.id,
        offerType: 'fixed_offer', // Using fixed_offer type for simplicity
        price: selectedTier.price,
        currency: 'EUR',
        title: selectedTier.name,
        userInfo: {
          name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          additionalServices: {
            companyName: formData.companyName,
            website: formData.website,
            description: formData.description,
            yachtName: formData.yachtName,
            yachtSize: formData.yachtSize,
            yachtType: formData.yachtType,
            yachtYear: formData.yachtYear,
            yachtCapacity: formData.yachtCapacity,
            yachtLocation: formData.yachtLocation
          }
        }
      });
      
      if (checkoutError) {
        throw new Error(checkoutError);
      }
      
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setError(error instanceof Error ? error.message : 'Failed to process request');
    } finally {
      setLoading(false);
    }
  };

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
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-[88px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Become a Partner</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our exclusive network of partners and grow your business with PrivateCharterX. 
              Whether you're a service provider or yacht owner, we have the perfect partnership option for you.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('partners')}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === 'partners' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Business Partners
              </button>
              <button
                onClick={() => setActiveTab('yachts')}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === 'yachts' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yacht Listings
              </button>
            </div>
          </div>

          {showForm ? (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">{selectedTier?.name}</h2>
                    <p className="text-gray-600">
                      {selectedTier?.price === 5000 
                        ? 'One-time payment' 
                        : `€${selectedTier?.price} per year`}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setSelectedTier(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {activeTab === 'partners' ? (
                    <>
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-700">Company Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Website
                            </label>
                            <input
                              type="url"
                              name="website"
                              value={formData.website}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Description
                          </label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                          ></textarea>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-700">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Contact Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="contactName"
                              value={formData.contactName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-700">Yacht Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Yacht Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="yachtName"
                              value={formData.yachtName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Yacht Size (meters) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="yachtSize"
                              value={formData.yachtSize}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Yacht Type
                            </label>
                            <input
                              type="text"
                              name="yachtType"
                              value={formData.yachtType}
                              onChange={handleInputChange}
                              placeholder="e.g., Motor Yacht, Sailing Yacht"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Year Built
                            </label>
                            <input
                              type="text"
                              name="yachtYear"
                              value={formData.yachtYear}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Guest Capacity
                            </label>
                            <input
                              type="text"
                              name="yachtCapacity"
                              value={formData.yachtCapacity}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Home Port / Location
                            </label>
                            <input
                              type="text"
                              name="yachtLocation"
                              value={formData.yachtLocation}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Yacht Description
                          </label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                          ></textarea>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-700">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Contact Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="contactName"
                              value={formData.contactName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="font-medium text-gray-700 mb-2">Subscription Summary</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{selectedTier?.name}</p>
                        <p className="text-sm text-gray-500">
                          {selectedTier?.price === 5000 
                            ? 'One-time payment' 
                            : `Billed annually (€${selectedTier?.price}/year)`}
                        </p>
                      </div>
                      <div className="text-xl font-bold">€{selectedTier?.price}</div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setSelectedTier(null);
                      }}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Proceed to Payment</span>
                          <CreditCard size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'partners' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {partnerTiers.map((tier) => (
                    <div 
                      key={tier.id}
                      className={`bg-white rounded-2xl border ${
                        tier.isPopular ? 'border-blue-500 shadow-xl' : 'border-gray-200 shadow-md'
                      } overflow-hidden relative`}
                    >
                      {tier.isPopular && (
                        <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-1 text-sm font-medium">
                          Most Popular
                        </div>
                      )}
                      <div className={`p-6 ${tier.isPopular ? 'pt-8' : ''}`}>
                        <div className="mb-4">
                          <h3 className="text-xl font-bold">{tier.name}</h3>
                          <p className="text-gray-600 mt-1">{tier.description}</p>
                        </div>
                        
                        <div className="mb-6">
                          <div className="text-3xl font-bold">€{tier.price}</div>
                          <div className="text-gray-500">
                            {tier.period === 'year' ? 'per year' : 'one-time payment'}
                          </div>
                        </div>
                        
                        <ul className="space-y-3 mb-6">
                          {tier.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <button
                          onClick={() => handleTierSelect(tier)}
                          className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                            tier.isPopular
                              ? 'bg-blue-500 text-white hover:bg-blue-600'
                              : 'bg-black text-white hover:bg-gray-800'
                          } transition-colors`}
                        >
                          <span>Select Plan</span>
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="mb-12 bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Anchor size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-800 mb-2">List Your Yacht with Us</h3>
                        <p className="text-blue-700">
                          Join our exclusive network of yacht listings and reach high-net-worth clients worldwide. 
                          Our platform connects luxury yacht owners with qualified charterers seeking premium experiences.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {yachtTiers.map((tier) => (
                      <div 
                        key={tier.id}
                        className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold">{tier.name}</h3>
                            <p className="text-gray-600 mt-1">Yacht size: {tier.size}</p>
                          </div>
                          
                          <div className="mb-6">
                            <div className="text-3xl font-bold">€{tier.price}</div>
                            <div className="text-gray-500">per year</div>
                          </div>
                          
                          <ul className="space-y-3 mb-6">
                            {tier.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-600">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <button
                            onClick={() => handleTierSelect(tier)}
                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
                          >
                            <span>List Your Yacht</span>
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Benefits Section */}
          {!showForm && (
            <div className="mt-20">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Partner With Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                    <Shield size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Trusted Network</h3>
                  <p className="text-base text-gray-600">
                    Join our vetted network of luxury service providers and gain instant credibility with high-net-worth clients.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Revenue Growth</h3>
                  <p className="text-base text-gray-600">
                    Access a new stream of high-value clients and increase your business revenue through our referral system.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                    <Award size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Premium Exposure</h3>
                  <p className="text-base text-gray-600">
                    Showcase your services to our global audience of luxury travelers and gain visibility in the premium market.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Testimonials */}
          {!showForm && (
            <div className="mt-20">
              <h2 className="text-3xl font-bold mb-8 text-center">What Our Partners Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                          alt="Partner" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">James Wilson</h4>
                      <p className="text-sm text-gray-500">Luxury Yacht Rentals</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "Partnering with PrivateCharterX has transformed our business. The quality of clients and the level of support we receive is exceptional."
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80" 
                          alt="Partner" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">Sophia Chen</h4>
                      <p className="text-sm text-gray-500">Elite Concierge Services</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "The partnership program has connected us with high-value clients we wouldn't have reached otherwise. The ROI has been incredible."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {!showForm && (
            <div className="mt-20">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4 max-w-4xl mx-auto">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <h3 className="font-medium">How does the partnership program work?</h3>
                      <span className="transition-transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0 text-gray-600">
                      Our partnership program connects luxury service providers with our network of high-net-worth clients. Partners are featured on our platform, receive qualified leads, and benefit from our marketing efforts. We offer different tiers of partnership to suit businesses of all sizes.
                    </div>
                  </details>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <h3 className="font-medium">What are the requirements to list my yacht?</h3>
                      <span className="transition-transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0 text-gray-600">
                      To list your yacht, we require detailed information about your vessel, including size, capacity, amenities, and high-quality photos. All yachts must meet our safety and quality standards. Our team will review your application and may request additional documentation before approval.
                    </div>
                  </details>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <h3 className="font-medium">How are partnership fees billed?</h3>
                      <span className="transition-transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0 text-gray-600">
                      Partnership fees are billed annually for our Basic and Premium tiers. The Lifetime Partnership is a one-time payment. All fees are processed securely through our payment system, and you'll receive an invoice for your records. We offer automatic renewal for annual subscriptions, which you can manage through your partner dashboard.
                    </div>
                  </details>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <h3 className="font-medium">Can I upgrade my partnership tier later?</h3>
                      <span className="transition-transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0 text-gray-600">
                      Yes, you can upgrade your partnership tier at any time. When upgrading, we'll prorate the remaining value of your current subscription toward the new tier. Simply contact your account manager or use the upgrade option in your partner dashboard.
                    </div>
                  </details>
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