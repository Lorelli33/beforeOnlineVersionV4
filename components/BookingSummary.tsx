import React, { useState, useEffect, useRef } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { Plane, Calendar, Clock, Users, Briefcase, Dog, ArrowRight, RotateCcw, Mail, ArrowLeft, Coins, ChevronDown, MapPin } from 'lucide-react';
import type { Location, Stop, JetCategory, BookingDetails } from '../types';
import { calculateRequiredStops, calculateTotalFlightTime, calculateTotalPrice, calculatePVCXRewards } from '../data/jets';
import CheckoutForm from './CheckoutForm';

interface BookingSummaryProps {
  origin: Location;
  destination: Location;
  stops: Stop[];
  selectedDate: string;
  selectedTime: string;
  returnDate?: string;
  returnTime?: string;
  isReturn: boolean;
  bookingDetails: BookingDetails;
  selectedJet: JetCategory;
  onBack: () => void;
}

type Currency = {
  code: string;
  symbol: string;
  rate: number;
};

const currencies: Currency[] = [
  { code: 'EUR', symbol: '€', rate: 1 },
  { code: 'USD', symbol: '$', rate: 1.08 },
  { code: 'GBP', symbol: '£', rate: 0.85 },
  { code: 'CHF', symbol: 'CHF', rate: 0.95 }
];

// Service prices
const SERVICE_PRICES = {
  airportTransfer: 250,
  catering: 350,
  concierge: 200,
  hotelBooking: 150
};

export default function BookingSummary({
  origin,
  destination,
  stops,
  selectedDate,
  selectedTime,
  returnDate,
  returnTime,
  isReturn,
  bookingDetails,
  selectedJet,
  onBack
}: BookingSummaryProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(3);
  const [selectedServices, setSelectedServices] = useState({
    airportTransfer: false,
    catering: false,
    concierge: false,
    hotelBooking: false
  });
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setShowCurrencyDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set total steps based on whether there are stops
  useEffect(() => {
    setTotalSteps(stops.length > 0 ? 4 : 3);
  }, [stops]);

  // Scroll to top of content when step changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentStep]);

  const formatLocation = (location: Location) => {
    if (!location?.address) return { city: '', code: '' };
    const parts = location.address.split('(');
    return {
      city: parts[0].trim(),
      code: parts[1]?.replace(')', '') || ''
    };
  };

  const formatDateTime = (date: string, time: string): string => {
    try {
      // Ensure we have valid inputs
      if (!date || !time) return 'Not available';

      // Create a proper ISO date string
      const dateTimeString = `${date}T${time}`;
      const parsedDate = parseISO(dateTimeString);

      // Validate the parsed date
      if (!isValid(parsedDate)) {
        return 'Invalid date';
      }

      return format(parsedDate, 'MMM d, yyyy h:mm a');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const formatPrice = (price: number, currency: Currency = selectedCurrency): string => {
    const convertedPrice = price * currency.rate;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(convertedPrice);
  };

  const calculateTotalDistance = (): number => {
    if (!origin?.lat || !destination?.lat) return 0;

    const R = 6371; // Earth's radius in km
    const points = [origin, ...stops, destination];
    let totalDistance = 0;

    for (let i = 0; i < points.length - 1; i++) {
      const point1 = points[i];
      const point2 = points[i + 1];
      
      if (!point1?.lat || !point2?.lat) continue;

      const dLat = (point2.lat - point1.lat) * Math.PI / 180;
      const dLon = (point2.lng - point1.lng) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      totalDistance += R * c;
    }

    return Math.round(isReturn ? totalDistance * 2 : totalDistance);
  };

  const totalDistance = calculateTotalDistance();
  const requiredStops = calculateRequiredStops(totalDistance, selectedJet.range);
  const flightTime = calculateTotalFlightTime(totalDistance, selectedJet.speed, requiredStops);
  const basePrice = calculateTotalPrice(totalDistance, selectedJet.speed, selectedJet.pricePerHour, requiredStops);
  
  // Calculate additional services cost
  const getAdditionalServicesCost = () => {
    let total = 0;
    if (selectedServices.airportTransfer) total += SERVICE_PRICES.airportTransfer;
    if (selectedServices.catering) total += SERVICE_PRICES.catering;
    if (selectedServices.concierge) total += SERVICE_PRICES.concierge;
    if (selectedServices.hotelBooking) total += SERVICE_PRICES.hotelBooking;
    return total;
  };
  
  const additionalServicesCost = getAdditionalServicesCost();
  const totalPrice = basePrice + additionalServicesCost;
  
  // Calculate price range for display
  const minPrice = Math.floor(basePrice * 0.9);
  const maxPrice = Math.ceil(basePrice * 1.1);
  const priceRange = `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;

  const handleRequestQuote = () => {
    setShowCheckout(true);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleServiceToggle = (service: keyof typeof selectedServices) => {
    setSelectedServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center space-x-2 mb-6">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`w-2.5 h-2.5 rounded-full ${
              index + 1 === currentStep 
                ? 'bg-black' 
                : index + 1 < currentStep 
                  ? 'bg-gray-400' 
                  : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Flight Details
        return (
          <div className="space-y-6">
            {/* Route Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="text-xl font-bold">{formatLocation(origin).city}</div>
                  <div className="text-sm text-gray-500">{formatLocation(origin).code}</div>
                </div>
                <ArrowRight size={20} className="hidden md:block text-gray-400" />
                <div className="flex-1 md:text-right">
                  <div className="text-xl font-bold">{formatLocation(destination).city}</div>
                  <div className="text-sm text-gray-500">{formatLocation(destination).code}</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Departure</div>
                  <div className="font-medium">{formatDateTime(selectedDate, selectedTime)}</div>
                </div>
                {isReturn && returnDate && returnTime && (
                  <div>
                    <div className="text-gray-500">Return</div>
                    <div className="font-medium">{formatDateTime(returnDate, returnTime)}</div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Total Distance</div>
                  <div className="font-medium">{totalDistance} km</div>
                </div>
              </div>
            </div>

            {/* Aircraft & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedJet.imageUrl}
                    alt={selectedJet.name}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h4 className="font-bold">{selectedJet.name}</h4>
                    <div className="text-sm text-gray-500">{selectedJet.category}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{selectedJet.capacity} seats</span>
                      <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full">{selectedJet.speed} km/h</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="space-y-4">
                  {/* Currency Selector */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Estimated Price Range</div>
                    <div className="relative" ref={currencyDropdownRef}>
                      <button
                        onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                        className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-medium">{selectedCurrency.code}</span>
                        <ChevronDown size={16} className={`transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      {showCurrencyDropdown && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                          {currencies.map((currency) => (
                            <button
                              key={currency.code}
                              onClick={() => {
                                setSelectedCurrency(currency);
                                setShowCurrencyDropdown(false);
                              }}
                              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                            >
                              <span>{currency.code}</span>
                              {selectedCurrency.code === currency.code && (
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <div className="text-2xl font-bold">{priceRange}</div>
                    <div className="text-sm text-gray-500">
                      {formatPrice(selectedJet.pricePerHour)}/hour • {Math.round(flightTime * 10) / 10} hours
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Final price will be confirmed after review
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2: // Passenger Details & Additional Services
        return (
          <div className="space-y-6">
            {/* Passenger Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold mb-4">Passenger Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Users size={16} />
                    <span>Passengers</span>
                  </div>
                  <div className="font-bold">{bookingDetails.passengers}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Briefcase size={16} />
                    <span>Luggage</span>
                  </div>
                  <div className="font-bold">{bookingDetails.luggage}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Dog size={16} />
                    <span>Pets</span>
                  </div>
                  <div className="font-bold">{bookingDetails.pets}</div>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold mb-4">Additional Services</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="airportTransfer"
                    checked={selectedServices.airportTransfer}
                    onChange={() => handleServiceToggle('airportTransfer')}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <div>
                    <label htmlFor="airportTransfer" className="font-medium text-gray-900">Airport Transfer</label>
                    <p className="text-sm text-gray-500">Ground transportation to/from the airport</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="catering"
                    checked={selectedServices.catering}
                    onChange={() => handleServiceToggle('catering')}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <div>
                    <label htmlFor="catering" className="font-medium text-gray-900">Premium Catering</label>
                    <p className="text-sm text-gray-500">Gourmet meals and beverages</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="concierge"
                    checked={selectedServices.concierge}
                    onChange={() => handleServiceToggle('concierge')}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <div>
                    <label htmlFor="concierge" className="font-medium text-gray-900">Concierge Service</label>
                    <p className="text-sm text-gray-500">Personalized assistance throughout your journey</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="hotelBooking"
                    checked={selectedServices.hotelBooking}
                    onChange={() => handleServiceToggle('hotelBooking')}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <div>
                    <label htmlFor="hotelBooking" className="font-medium text-gray-900">Hotel Booking Assistance</label>
                    <p className="text-sm text-gray-500">Help with finding and booking accommodations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Updated Price Summary */}
            {additionalServicesCost > 0 && (
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-medium text-gray-700 mb-2">Updated Price Estimate</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price</span>
                    <span className="font-medium">{formatPrice(basePrice)}</span>
                  </div>
                  {selectedServices.airportTransfer && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Airport Transfer</span>
                      <span className="font-medium">{formatPrice(SERVICE_PRICES.airportTransfer)}</span>
                    </div>
                  )}
                  {selectedServices.catering && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Premium Catering</span>
                      <span className="font-medium">{formatPrice(SERVICE_PRICES.catering)}</span>
                    </div>
                  )}
                  {selectedServices.concierge && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Concierge Service</span>
                      <span className="font-medium">{formatPrice(SERVICE_PRICES.concierge)}</span>
                    </div>
                  )}
                  {selectedServices.hotelBooking && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hotel Booking Assistance</span>
                      <span className="font-medium">{formatPrice(SERVICE_PRICES.hotelBooking)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
                    <span>Total (Estimated)</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 3: // Contact Information
        return (
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactInfo.name}
                    onChange={handleContactInfoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleContactInfoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleContactInfoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold mb-4">Special Requests</h3>
              <textarea
                name="specialRequests"
                value={contactInfo.specialRequests}
                onChange={handleContactInfoChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                placeholder="Any special requirements or preferences..."
              ></textarea>
            </div>

            {/* Final Price Summary */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-medium text-gray-700 mb-2">Price Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Price</span>
                  <span className="font-medium">{formatPrice(basePrice)}</span>
                </div>
                {additionalServicesCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Additional Services</span>
                    <span className="font-medium">{formatPrice(additionalServicesCost)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
                  <span>Total (Estimated)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 4: // Multi-leg Journey
        return (
          <div className="space-y-6">
            {/* Multi-leg Journey */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold mb-4">Multi-leg Journey</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                  <div>
                    <div className="font-medium">{formatLocation(origin).city}</div>
                    <div className="text-sm text-gray-500">{formatDateTime(selectedDate, selectedTime)}</div>
                  </div>
                </div>
                
                {stops.map((stop, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{index + 2}</div>
                    <div>
                      <div className="font-medium">{formatLocation(stop).city}</div>
                      <div className="text-sm text-gray-500">{formatDateTime(stop.date, stop.time)}</div>
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{stops.length + 2}</div>
                  <div>
                    <div className="font-medium">{formatLocation(destination).city}</div>
                    <div className="text-sm text-gray-500">Final Destination</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Price Summary */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-medium text-gray-700 mb-2">Price Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Price</span>
                  <span className="font-medium">{formatPrice(basePrice)}</span>
                </div>
                {additionalServicesCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Additional Services</span>
                    <span className="font-medium">{formatPrice(additionalServicesCost)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
                  <span>Total (Estimated)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Contact Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold mb-4">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium">{contactInfo.name || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">{contactInfo.email || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium">{contactInfo.phone || 'Not provided'}</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isFormValid = () => {
    if (currentStep === 3) {
      return contactInfo.name && contactInfo.email && contactInfo.phone;
    }
    return true;
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={prevStep}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-xl font-bold">Booking Summary</h2>
            <div className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              <span>{formatLocation(origin).city}</span>
              <ArrowRight size={14} className="text-gray-400" />
              <span>{formatLocation(destination).city}</span>
            </div>
          </div>
        </div>
      </div>

      {showCheckout ? (
        <CheckoutForm
          offerId={`custom-${Date.now()}`}
          offerType="fixed_offer"
          title={`${formatLocation(origin).city} to ${formatLocation(destination).city}`}
          price={totalPrice}
          currency={selectedCurrency.code}
          onClose={onBack}
          onSuccess={() => setShowCheckout(false)}
          userInfo={{
            name: contactInfo.name,
            email: contactInfo.email,
            phone: contactInfo.phone,
            specialRequests: contactInfo.specialRequests,
            additionalServices: selectedServices
          }}
        />
      ) : (
        <>
          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto" ref={contentRef}>
            <div className="p-6 space-y-6">
              {renderStepContent()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex-shrink-0 bg-white border-t border-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  {currentStep === 1 ? 'Back' : 'Previous'}
                </button>
                
                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    disabled={!isFormValid()}
                    className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleRequestQuote}
                    disabled={!isFormValid()}
                    className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Request Quote</span>
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
              <div className="text-center text-sm text-gray-500 mt-4">
                All bookings are subject to availability and confirmation
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}