import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import LanguageSelector from '../../components/LanguageSelector';
import ThemeToggle from '../../components/ThemeToggle';
import UserMenu from '../../components/UserMenu';
import WalletMenu from '../../components/WalletMenu';
import NavigationMenu from '../../components/NavigationMenu';
import PageNavigation from '../../components/PageNavigation';

export default function HelicopterCharter() {
  const navigationItems = [
    { id: 'features', label: 'Features' },
    { id: 'fleet', label: 'Our Fleet' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'request-form', label: 'Request Quote' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' }
  ];

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

      <PageNavigation items={navigationItems} />

      <main className="flex-1 pt-[88px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden mb-16">
            <img 
              src="https://images.unsplash.com/photo-1608236465209-5e8b7ef9c4d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
              alt="Helicopter Charter" 
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
              <div className="px-8 md:px-16 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Helicopter Charter</h1>
                <p className="text-xl text-white/90 mb-8">
                  Experience the ultimate in flexibility and convenience with our helicopter charter services. Perfect for short-distance travel and city-to-city transfers.
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
                All helicopters in our fleet meet the highest safety standards with experienced pilots and rigorous maintenance.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Time Efficient</h3>
              <p className="text-base text-gray-600">
                Skip traffic and reduce travel time significantly with point-to-point helicopter transfers.
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
              <h3 className="text-xl font-bold mb-2">Flexible Service</h3>
              <p className="text-base text-gray-600">
                Customized routes and schedules to meet your specific needs, with access to private helipads.
              </p>
            </div>
          </div>

          {/* Fleet Section */}
          <div id="fleet" className="mb-16 scroll-mt-32">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Helicopter Fleet</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1608236465209-5e8b7ef9c4d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                    alt="Light Helicopter" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Light Helicopters</h3>
                  <p className="text-base text-gray-600 mb-4">
                    Perfect for city transfers and short trips with 3-4 passengers.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-sm text-gray-600">3-4 passengers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-sm text-gray-600">1-2 hour range</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-sm text-gray-600">Ideal for city transfers</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1608236465209-5e8b7ef9c4d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                    alt="Medium Helicopter" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Medium Helicopters</h3>
                  <p className="text-base text-gray-600 mb-4">
                    Versatile aircraft for longer trips and larger groups.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-sm text-gray-600">5-8 passengers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-sm text-gray-600">2-3 hour range</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-sm text-gray-600">VIP configuration</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1608236465209-5e8b7ef9c4d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                    alt="VIP Helicopter" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">VIP Helicopters</h3>
                  <p className="text-base text-gray-600 mb-4">
                    Luxury helicopters with premium amenities and extended range.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-sm text-gray-600">6-12 passengers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-sm text-gray-600">3-4 hour range</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-sm text-gray-600">Luxury interior</span>
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
                    Contact us for a customized quote for your helicopter charter needs. Our team will respond within 2 hours during business hours.
                  </p>
                  
                  <div className="space-y-6">
                    <a 
                      href="mailto:info@privatecharterx.com?subject=Helicopter Charter Inquiry"
                      className="block w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-center"
                    >
                      Email Us Now
                    </a>
                    
                    <div className="text-center text-sm text-gray-500">
                      Or call us directly at
                      <a href="tel:+41447978853" className="text-black font-medium hover:underline ml-1">
                        +41 44 797 88 53
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:block relative">
                  <img 
                    src="https://images.unsplash.com/photo-1608236465209-5e8b7ef9c4d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                    alt="Helicopter Interior" 
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
                    <h3 className="font-medium">What is the range of your helicopters?</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-600">
                    Our helicopter fleet has varying ranges depending on the model. Light helicopters typically have a range of 1-2 hours, medium helicopters can fly for 2-3 hours, and our VIP helicopters have extended ranges of 3-4 hours. These ranges can be affected by factors such as weather conditions and passenger load.
                  </div>
                </details>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer">
                    <h3 className="font-medium">What are the luggage restrictions?</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-600">
                    Luggage capacity varies by helicopter model. As a general guide, each passenger can bring one medium-sized soft bag. We recommend discussing your specific luggage requirements when booking to ensure we can accommodate your needs.
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-black text-white p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Helicopter Travel?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today to book your helicopter charter or learn more about our services.
            </p>
            <a 
              href="#request-form" 
              className="inline-block bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}