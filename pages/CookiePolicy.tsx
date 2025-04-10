import React from 'react';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import LanguageSelector from '../components/LanguageSelector';
import ThemeToggle from '../components/ThemeToggle';
import UserMenu from '../components/UserMenu';
import WalletMenu from '../components/WalletMenu';

export default function CookiePolicy() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
            <p className="text-lg text-gray-600">
              Your privacy is our top priority. Learn how we use cookies to enhance your experience while protecting your data.
            </p>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <Shield size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Privacy First</h3>
              <p className="text-gray-600">
                We prioritize your privacy and data protection above all else. Our cookie usage is designed to be minimal and transparent.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <Lock size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure by Design</h3>
              <p className="text-gray-600">
                All cookies are encrypted and securely stored. We never collect or store sensitive personal information in cookies.
              </p>
            </div>
          </div>

          {/* Cookie Types */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Essential Cookies</h3>
                <p className="text-gray-600 mb-4">
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <FileCheck size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Authentication and security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileCheck size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Session management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileCheck size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">User preferences</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Performance Cookies</h3>
                <p className="text-gray-600 mb-4">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <FileCheck size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Page load times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileCheck size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Site usage analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileCheck size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Error reporting</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Functional Cookies</h3>
                <p className="text-gray-600 mb-4">
                  These cookies enable enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <FileCheck size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Language preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileCheck size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Location-based content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileCheck size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Live chat services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Privacy Controls */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Your Privacy Controls</h2>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Managing Your Cookie Preferences</h3>
                  <p className="text-gray-600 mb-6">
                    You have full control over which cookies you allow on your device. While essential cookies cannot be disabled as they are necessary for the website to function, you can choose to enable or disable other cookie types.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold mb-2">Browser Settings</h4>
                      <p className="text-gray-600">
                        Most web browsers allow you to control cookies through their settings preferences. You can typically find these settings in the "options" or "preferences" menu of your browser.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold mb-2">Cookie Banner</h4>
                      <p className="text-gray-600">
                        Our cookie banner allows you to easily manage your cookie preferences when you first visit our site. You can update these preferences at any time by clicking the "Cookie Settings" link in the footer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="bg-black text-white p-12 rounded-2xl text-center">
            <Shield size={48} className="mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Your Data is Protected</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              We implement industry-leading security measures to ensure your data is always protected. Your privacy and security are fundamental to everything we do.
            </p>
            <a 
              href="/privacy-policy" 
              className="inline-block bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              View Privacy Policy
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}