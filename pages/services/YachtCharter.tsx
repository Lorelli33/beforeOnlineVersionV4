import React, { useState } from 'react';
import { Anchor, Check, Send, ArrowRight } from 'lucide-react';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import LanguageSelector from '../../components/LanguageSelector';
import ThemeToggle from '../../components/ThemeToggle';
import UserMenu from '../../components/UserMenu';
import WalletMenu from '../../components/WalletMenu';
import NavigationMenu from '../../components/NavigationMenu';
import PageNavigation from '../../components/PageNavigation';

export default function YachtCharter() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    departure: '',
    destination: '',
    date: '',
    passengers: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigationItems = [
    { id: 'features', label: 'Features' },
    { id: 'fleet', label: 'Our Fleet' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'request-form', label: 'Request Quote' },
    { id: 'testimonials', label: 'Testimonials' },
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
      departure: '',
      destination: '',
      date: '',
      passengers: '',
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

      {/* Add PageNavigation */}
      <PageNavigation items={navigationItems} />

      <main className="flex-1 pt-[88px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden mb-16">
            <img 
              src="https://images.unsplash.com/photo-1588019541002-f79d8f50a4f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
              alt="Yacht Charter" 
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
              <div className="px-8 md:px-16 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Yacht Charter</h1>
                <p className="text-xl text-white/90 mb-8">
                  Experience the ultimate in luxury at sea with our premium yacht charter services. Explore the world's most beautiful destinations in unparalleled style and comfort.
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Safety First</h3>
              <p className="text-base text-gray-600">
                All yachts in our fleet meet the highest maritime safety standards with experienced crews and rigorous maintenance.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <Anchor size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Crew</h3>
              <p className="text-base text-gray-600">
                Professional crew members with extensive experience ensure a smooth and enjoyable journey at sea.
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
              <h3 className="text-xl font-bold mb-2">Personalized Service</h3>
              <p className="text-base text-gray-600">
                Enjoy bespoke catering, luxury amenities, and a dedicated concierge to handle every aspect of your journey.
              </p>
            </div>
          </div>

          {/* Yacht Fleet */}
          <div id="fleet" className="mb-16 scroll-mt-32">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Premium Fleet</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                    alt="Motor Yachts" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Motor Yachts</h3>
                  <p className="text-base text-gray-600 mb-4">
                    Luxurious motor yachts perfect for coastal cruising and island hopping. Ideal for those seeking comfort and speed.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-600">30-50m Length</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-600">Up to 12 Guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-600">Professional Crew</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                    alt="Sailing Yachts" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Sailing Yachts</h3>
                  <p className="text-base text-gray-600 mb-4">
                    Experience the thrill of sailing with our luxury sailing yachts. Perfect for adventurous spirits.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-600">20-40m Length</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-600">Up to 8 Guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-600">Expert Sailing Crew</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1577431380157-3f1ca8f76a68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                    alt="Super Yachts" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Super Yachts</h3>
                  <p className="text-base text-gray-600 mb-4">
                    The ultimate in luxury and sophistication. Expansive spaces and world-class amenities.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-600">50m+ Length</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-600">Up to 18 Guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-600">Full Service Staff</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div id="how-it-works" className="mb-16 scroll-mt-32">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-2xl relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 mt-4">Request a Quote</h3>
                <p className="text-base text-gray-600 mb-4">
                  Fill out our simple request form with your travel details, including destination, dates, and number of guests.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-2xl relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 mt-4">Receive Options</h3>
                <p className="text-base text-gray-600 mb-4">
                  Our team will provide you with a selection of yacht options tailored to your specific requirements, along with transparent pricing.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-2xl relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 mt-4">Set Sail</h3>
                <p className="text-base text-gray-600 mb-4">
                  Once confirmed, our concierge team will handle all details. Simply arrive and begin your luxury yachting experience.
                </p>
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
                    Fill out the form below and our team will provide you with a customized quote for your yacht charter needs.
                  </p>
                  
                  {isSubmitted ? (
                    <div className="bg-green-50 text-green-700 p-6 rounded-xl flex items-start gap-3">
                      <Check size={24} className="flex-shrink-0 mt-0.5" />
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">
                            Departure Port
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
                            Charter Start Date
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
                          <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Guests
                          </label>
                          <select
                            id="passengers"
                            name="passengers"
                            value={formData.passengers}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          >
                            <option value="">Select</option>
                            {[2, 4, 6, 8, 10, 12, 14, 16, 18].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Information
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                          placeholder="Special requests, preferences, etc."
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
                    src="https://images.unsplash.com/photo-1588019341337-3a7f4d0e0a7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                    alt="Luxury Yacht Interior" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div id="testimonials" className="mb-16 scroll-mt-32">
            <h2 className="text-3xl font-bold mb-8 text-center">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                        alt="Client" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">James Wilson</h4>
                    <p className="text-sm text-gray-500">CEO, Tech Innovations</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "An unforgettable experience with PrivateCharterX. The yacht was immaculate, the crew was exceptional, and every detail was perfectly arranged."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                        alt="Client" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Emma Martinez</h4>
                    <p className="text-sm text-gray-500">Event Planner</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Organized a corporate retreat on one of their yachts. The attention to detail and level of service exceeded all expectations."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Client" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Robert Chang</h4>
                    <p className="text-sm text-gray-500">Luxury Travel Blogger</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Having chartered yachts worldwide, I can confidently say that PrivateCharterX offers one of the finest experiences in luxury yachting."
                </p>
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
                    <h3 className="font-medium">How much does it cost to charter a yacht?</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-base text-gray-600">
                    Yacht charter costs vary based on the size of the vessel, season, and destination. Motor yachts typically range from €50,000 to €200,000 per week, while sailing yachts range from €30,000 to €150,000 per week. Contact us for a precise quote tailored to your requirements.
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
                    