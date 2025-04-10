import React from 'react';
import { ArrowRight, Globe, Briefcase, Code, BarChart as ChartBar, Coins, Shield, Plane } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import LanguageSelector from '../components/LanguageSelector';
import UserMenu from '../components/UserMenu';
import WalletMenu from '../components/WalletMenu';
import NavigationMenu from '../components/NavigationMenu';

export default function BehindTheScene() {
  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Behind the Scenes</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the innovative minds shaping the future of private aviation. Our diverse team combines expertise in aviation, technology, and finance to deliver exceptional experiences.
            </p>
          </div>

          {/* Leadership Team */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Executive Leadership */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
                  <Briefcase className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Lorenzo Vanza</h3>
                <p className="text-gray-600 font-medium mb-1">Founder & General Manager</p>
                <p className="text-sm text-gray-500 mb-4">Switzerland</p>
                <p className="text-gray-600">
                  A visionary leader with over 15 years in private aviation, Lorenzo combines deep industry knowledge with entrepreneurial innovation.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
                  <ChartBar className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Andrin Schaufelberger</h3>
                <p className="text-gray-600 font-medium mb-1">Chief Financial Officer</p>
                <p className="text-sm text-gray-500 mb-4">Switzerland</p>
                <p className="text-gray-600">
                  With extensive experience in financial strategy and investment management, Andrin leads our financial operations.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
                  <Globe className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Claudio Steyskal</h3>
                <p className="text-gray-600 font-medium mb-1">Head of Branch, Switzerland</p>
                <p className="text-sm text-gray-500 mb-4">Switzerland</p>
                <p className="text-gray-600">
                  Leading our Swiss operations, Claudio brings strategic vision and operational excellence to our core market.
                </p>
              </div>

              {/* Marketing & Technology */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
                  <ChartBar className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Moreno Guerini</h3>
                <p className="text-gray-600 font-medium mb-1">Head of Marketing</p>
                <p className="text-sm text-gray-500 mb-4">Switzerland</p>
                <p className="text-gray-600">
                  A creative force in luxury marketing, Moreno crafts our brand strategy and digital presence.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
                  <Code className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Simon Kulik</h3>
                <p className="text-gray-600 font-medium mb-1">IT Specialist & Crypto Expert</p>
                <p className="text-sm text-gray-500 mb-4">Germany</p>
                <p className="text-gray-600">
                  A certified Business IT Specialist with Federal Diploma of Higher Education, Simon leads our technological innovation.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
                  <Coins className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Dylan Fechner</h3>
                <p className="text-gray-600 font-medium mb-1">Head of Crypto Management</p>
                <p className="text-sm text-gray-500 mb-4">Germany</p>
                <p className="text-gray-600">
                  Spearheading our cryptocurrency initiatives, Dylan brings extensive knowledge in digital assets and blockchain technology.
                </p>
              </div>

              {/* Operations & Support */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
                  <Shield className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Marisa Clarks</h3>
                <p className="text-gray-600 font-medium mb-1">Head of Administration</p>
                <p className="text-sm text-gray-500 mb-4">United Kingdom</p>
                <p className="text-gray-600">
                  With meticulous attention to detail, Marisa oversees our administrative operations.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
                  <Plane className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Niels Bartels</h3>
                <p className="text-gray-600 font-medium mb-1">Business Aviation Coordinator</p>
                <p className="text-sm text-gray-500 mb-4">Germany</p>
                <p className="text-gray-600">
                  A seasoned aviation professional, Niels coordinates our flight operations with precision.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
                  <ChartBar className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">David Schoch</h3>
                <p className="text-gray-600 font-medium mb-1">Head of Sales</p>
                <p className="text-sm text-gray-500 mb-4">Switzerland</p>
                <p className="text-gray-600">
                  Leading our sales initiatives, David brings strategic vision and deep market understanding.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-base text-gray-600 mb-6">
                  Our mission is to provide a simple yet sophisticated booking & travel experience, powered by cutting-edge technology. We believe that private aviation should be accessible, transparent, and exceptional.
                </p>
                <p className="text-base text-gray-600 mb-6">
                  By combining blockchain technology with our extensive network of premium aircraft, we're revolutionizing the way people book and experience private flights.
                </p>
                <button 
                  onClick={() => {
                    const howItWorksLink = document.querySelector('a[href="/how-it-works"]');
                    if (howItWorksLink) {
                      howItWorksLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                    }
                  }}
                  className="inline-flex items-center gap-2 text-black font-medium hover:underline"
                >
                  Learn how it works <ArrowRight size={16} />
                </button>
              </div>
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                  alt="Our Mission" 
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Join Us CTA */}
          <div className="bg-gradient-to-br from-black to-gray-800 text-white p-12 rounded-2xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <Globe size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
              <p className="text-base mb-8 max-w-2xl mx-auto">
                Follow our journey and stay updated with the latest news, insights, and exclusive offers in private aviation. Visit our blog for expert perspectives and industry updates.
              </p>
              <a 
                href="https://journal.privatecharterx.com"
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-block bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Visit Our Blog
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}