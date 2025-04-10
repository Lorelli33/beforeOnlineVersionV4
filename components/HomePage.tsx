import React from 'react';
import LanguageSelector from './LanguageSelector';
import LocationSearch from './LocationSearch';
import MapboxMap from './Map';
import Logo from './Logo';

interface HomePageProps {
  onRequestJet: () => void;
}

export default function HomePage({ onRequestJet }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo />

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-sm text-black">Home</a>
              <a href="/project" className="text-sm text-black hover:text-gray-600">Project</a>
              <a href="/services" className="text-sm text-black hover:text-gray-600">Services</a>
              <a href="/about" className="text-sm text-black hover:text-gray-600">About</a>
              <a href="/contact" className="text-sm text-black hover:text-gray-600">Contact</a>
            </nav>

            {/* Language Selector */}
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <span className="text-sm text-black">Eng</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Booking Modal */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-3">
            <h1 className="text-[56px] leading-tight font-medium text-gray-900">
              Private Jet Charter
            </h1>
          </div>

          {/* Booking Modal */}
          <div className="mx-12 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6">
              <LocationSearch
                onOriginChange={() => {}}
                onDestinationChange={() => {}}
                onDateChange={() => {}}
                onCalculate={() => {}}
                isReturn={false}
                onReturnChange={() => {}}
                stops={[]}
                onStopChange={() => {}}
                onAddStop={() => {}}
                onRemoveStop={() => {}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                title: 'Web3 Integration',
                description: 'Seamlessly integrated with blockchain technology for secure and transparent transactions',
                icon: '🔗'
              },
              {
                title: 'Private Jet Network',
                description: 'Access to an exclusive fleet of luxury private jets worldwide',
                icon: '✈️'
              },
              {
                title: 'Simple Booking Process',
                description: 'Easy 3-step booking process with instant confirmation',
                icon: '📱'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}