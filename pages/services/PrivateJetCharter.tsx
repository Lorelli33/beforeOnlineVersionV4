import React, { useState } from 'react';
import { Plane, Check, ArrowRight } from 'lucide-react';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import LanguageSelector from '../../components/LanguageSelector';
import ThemeToggle from '../../components/ThemeToggle';
import UserMenu from '../../components/UserMenu';
import WalletMenu from '../../components/WalletMenu';
import NavigationMenu from '../../components/NavigationMenu';
import PageNavigation from '../../components/PageNavigation';

export default function PrivateJetCharter() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

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
              src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
              alt="Private Jet Charter" 
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
              <div className="px-8 md:px-16 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Private Jet Charter</h1>
                <p className="text-xl text-white/90 mb-8">
                  Experience unparalleled luxury and convenience with our private jet charter services. Available 24/7 worldwide.
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

          {/* FAQ Section */}
          <div id="faq" className="mb-16 scroll-mt-32">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer">
                    <h3 className="font-medium">How far in advance should I book a private jet?</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-base text-gray-600">
                    While we can accommodate last-minute bookings, we recommend booking at least 48-72 hours in advance to ensure the best aircraft options and pricing. For peak travel periods or specific aircraft preferences, booking 1-2 weeks ahead is ideal.
                  </div>
                </details>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer">
                    <h3 className="font-medium">What amenities are available on board?</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-base text-gray-600">
                    Our private jets feature luxurious amenities including comfortable seating, Wi-Fi connectivity, entertainment systems, and gourmet catering options. Specific amenities vary by aircraft type, and we can customize the experience to meet your preferences.
                  </div>
                </details>
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
                    Contact us for a customized quote for your private jet needs. Our team will respond within 2 hours during business hours.
                  </p>
                  
                  <div className="space-y-6">
                    <a 
                      href="mailto:info@privatecharterx.com?subject=Private Jet Charter Inquiry"
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
                    src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                    alt="Private Jet Interior" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-black text-white p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Take Flight?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book your private jet charter today and experience the ultimate in luxury air travel.
            </p>
            <a 
              href="#request-form" 
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Request a Quote <Plane size={18} />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}