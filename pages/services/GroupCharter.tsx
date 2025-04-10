import React, { useState } from 'react';
import { Users, Send, ArrowRight } from 'lucide-react';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import LanguageSelector from '../../components/LanguageSelector';
import ThemeToggle from '../../components/ThemeToggle';
import UserMenu from '../../components/UserMenu';
import WalletMenu from '../../components/WalletMenu';
import NavigationMenu from '../../components/NavigationMenu';
import PageNavigation from '../../components/PageNavigation';

export default function GroupCharter() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    passengers: '',
    departure: '',
    destination: '',
    date: '',
    returnDate: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigationItems = [
    { id: 'features', label: 'Features' },
    { id: 'aircraft', label: 'Aircraft' },
    { id: 'request-form', label: 'Request Quote' },
    { id: 'faq', label: 'FAQ' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      passengers: '',
      departure: '',
      destination: '',
      date: '',
      returnDate: '',
      message: ''
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
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
              <ThemeToggle isDark={isDarkTheme} onToggle={() => setIsDarkTheme(!isDarkTheme)} />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <PageNavigation items={navigationItems} />

      <main className="flex-1 pt-[88px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden mb-16">
            <img 
              src="https://images.unsplash.com/photo-1583373834259-46cc92173cb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
              alt="Group Charter" 
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
              <div className="px-8 md:px-16 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Group Charter</h1>
                <p className="text-xl text-white/90 mb-8">
                  Specialized aircraft solutions for groups of 20 or more passengers. Perfect for corporate events, sports teams, or large group travel.
                </p>
                <a 
                  href="#request-form" 
                  className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Request a Quote <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 scroll-mt-32">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Large Group Capacity</h3>
              <p className="text-base text-gray-600">
                Aircraft options accommodating 20 to 400+ passengers with flexible seating configurations.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Customized Service</h3>
              <p className="text-base text-gray-600">
                Tailored catering, ground transportation, and special requirements for your group.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
              <p className="text-base text-gray-600">
                Personal account manager and 24/7 support for seamless group travel coordination.
              </p>
            </div>
          </div>

          {/* Aircraft Section */}
          <div id="aircraft" className="mb-16 scroll-mt-32">
            <h2 className="text-3xl font-bold mb-8 text-center">Available Aircraft</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1583373834259-46cc92173cb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                    alt="Regional Jets" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Regional Jets</h3>
                  <p className="text-base text-gray-600 mb-4">
                    Perfect for medium-sized groups with regional travel needs.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">20-100 passengers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="text-sm text-gray-600">2-4 hour range</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1583373834259-46cc92173cb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                    alt="Narrow-body Jets" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Narrow-body Jets</h3>
                  <p className="text-base text-gray-600 mb-4">
                    Ideal for larger groups requiring continental travel.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">100-200 passengers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="text-sm text-gray-600">4-6 hour range</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1583373834259-46cc92173cb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                    alt="Wide-body Jets" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Wide-body Jets</h3>
                  <p className="text-base text-gray-600 mb-4">
                    Suitable for very large groups and long-haul flights.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">200-400+ passengers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="text-sm text-gray-600">6+ hour range</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Request Form */}
          <div id="request-form" className="mb-16 scroll-mt-32">
            <div className="bg-gray-50 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <h2 className="text-3xl font-bold mb-4">Request a Quote</h2>
                  <p className="text-base text-gray-600 mb-8">
                    Fill out the form below and our team will provide you with a customized quote for your group charter needs.
                  </p>
                  
                  {isSubmitted ? (
                    <div className="bg-green-50 text-green-700 p-6 rounded-xl flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Request Sent Successfully!</h3>
                        <p>Thank you for your inquiry. Our team will contact you shortly at the email address provided.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
                          Number of Passengers
                        </label>
                        <select
                          id="passengers"
                          name="passengers"
                          value={formData.passengers}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                          <option value="">Select number of passengers</option>
                          <option value="20-50">20-50 passengers</option>
                          <option value="51-100">51-100 passengers</option>
                          <option value="101-200">101-200 passengers</option>
                          <option value="201-300">201-300 passengers</option>
                          <option value="300+">300+ passengers</option>
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">
                            Departure Location
                          </label>
                          <input
                            type="text"
                            id="departure"
                            name="departure"
                            value={formData.departure}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                            Destination
                          </label>
                          <input
                            type="text"
                            id="destination"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                            Departure Date
                          </label>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Return Date (Optional)
                          </label>
                          <input
                            type="date"
                            id="returnDate"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Requirements
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                          placeholder="Special requirements, catering preferences, etc."
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            <span>Send Request</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
                
                <div className="hidden lg:block relative">
                  <img 
                    src="https://images.unsplash.com/photo-1583373834259-46cc92173cb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                    alt="Group Charter" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div id="faq" className="mb-16 scroll-mt-32">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer">
                    <h3 className="font-medium">What types of groups typically use charter services?</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-600">
                    Our group charter services are popular among corporate groups for events and conferences, sports teams, music tours, religious pilgrimages, and large family gatherings. We have experience accommodating groups of all sizes and types.
                  </div>
                </details>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer">
                    <h3 className="font-medium">What's included in a group charter?</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-600">
                    Our group charters include the aircraft, crew, catering, and ground handling. We can also arrange additional services such as ground transportation, custom catering menus, and special equipment transport. Each charter is customized to your group's specific needs.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}