import React from 'react';
import { X, ChevronDown, Phone } from 'lucide-react';
import LocationSearch from './LocationSearch';
import MapboxMap from './Map';
import WeatherWidget from './WeatherWidget';
import JetSelector from './JetSelector';
import LanguageSelector from './LanguageSelector';
import { useBookingState } from '../hooks/useBookingState';
import Logo from './Logo';

interface BookingModalProps {
  onClose: () => void;
}

export default function BookingModal({ onClose }: BookingModalProps) {
  const {
    origin,
    destination,
    selectedDate,
    selectedTime,
    isReturn,
    stops,
    showWeather,
    showJetSelector,
    selectedJet,
    routeDistance,
    isFullscreen,
    bookingDetails,
    handleOriginChange,
    handleDestinationChange,
    handleStopChange,
    addStop,
    removeStop,
    setShowWeather,
    calculateRoute,
    handleJetSelect,
    handleBack,
    setBookingDetails,
  } = useBookingState();

  return (
    <div className="fixed inset-2.5 bg-black/50 backdrop-blur-sm z-50 rounded-[25px] overflow-hidden transition-all duration-300">
      <div className="absolute inset-0 bg-white/95 backdrop-blur-md">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
          <div className="max-w-8xl mx-auto">
            <div className="flex items-center justify-between py-4 px-6">
              {/* Logo */}
              <div className="flex items-center gap-12">
                <Logo />
              </div>

              {/* Right side */}
              <div className="flex items-center gap-6">
                <a 
                  href="tel:+41447978853" 
                  className="hidden lg:flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <Phone size={16} />
                  <span className="text-sm font-medium">+41 44 797 88 53</span>
                </a>
                
                {/* Currency Selector */}
                <div className="relative group">
                  <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                    <span className="text-sm font-medium">EUR</span>
                    <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  <div className="absolute right-0 mt-2 w-24 py-1 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button className="w-full px-3 py-1.5 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50">USD</button>
                    <button className="w-full px-3 py-1.5 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50">CHF</button>
                    <button className="w-full px-3 py-1.5 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50">GBP</button>
                  </div>
                </div>

                <LanguageSelector />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map background */}
        <div className="absolute inset-0 pt-[72px]">
          <MapboxMap
            origin={origin}
            destination={destination}
            isReturn={isReturn}
            stops={stops}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        </div>

        {/* Booking interface */}
        <div 
          className={`absolute z-10 transition-all duration-300 ease-in-out ${
            isFullscreen 
              ? 'inset-4 top-[88px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20' 
              : 'top-[88px] left-4'
          }`}
        >
          <div 
            className={`bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 ${
              isFullscreen ? 'h-full' : ''
            }`}
            style={{ width: isFullscreen ? 'auto' : '320px' }}
          >
            {showJetSelector ? (
              <JetSelector
                selectedJet={selectedJet}
                onSelect={handleJetSelect}
                requiredCapacity={bookingDetails.passengers}
                distance={routeDistance}
                onBack={handleBack}
                isFullscreen={isFullscreen}
                origin={origin}
                destination={destination}
              />
            ) : (
              <LocationSearch
                onOriginChange={handleOriginChange}
                onDestinationChange={handleDestinationChange}
                onDateChange={() => {}}
                onCalculate={calculateRoute}
                isReturn={isReturn}
                onReturnChange={() => {}}
                stops={stops}
                onStopChange={handleStopChange}
                onAddStop={addStop}
                onRemoveStop={removeStop}
              />
            )}
          </div>
        </div>

        {/* Weather widget */}
        {showWeather && destination && (
          <div className="absolute bottom-4 right-4 z-50">
            <WeatherWidget 
              location={destination}
              onClose={() => setShowWeather(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}