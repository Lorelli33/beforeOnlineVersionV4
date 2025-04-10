'use client';

import React, { useState } from 'react';
import { X, MapPin, Calendar, Clock, Users, Plane, Tag, Check, ArrowRight } from 'lucide-react';
import { FixedOffer } from '@/app/fixed-offers/page';
import { useAuth } from '@/context/AuthContext';
import CheckoutForm from './CheckoutForm';

interface OfferDetailModalProps {
  offer: FixedOffer;
  onClose: () => void;
}

export default function OfferDetailModal({ offer, onClose }: OfferDetailModalProps) {
  const { isAuthenticated } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleBookNow = () => {
    setShowCheckout(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
        <div className="min-h-screen py-10">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header with close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-gray-900 z-10"
            >
              <X size={24} />
            </button>

            {showCheckout ? (
              <CheckoutForm 
                offerId={offer.id}
                offerType={offer.is_empty_leg ? 'empty_leg' : 'fixed_offer'}
                title={offer.title}
                price={offer.price}
                currency={offer.currency}
                onClose={onClose}
                onSuccess={() => {
                  setShowCheckout(false);
                }}
              />
            ) : (
              <>
                {/* Hero Image */}
                <div className="relative h-80">
                  <img 
                    src={offer.image_url || 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'} 
                    alt={offer.title} 
                    className="w-full h-full object-cover"
                  />
                  {offer.is_featured && (
                    <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-4 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  {offer.is_empty_leg && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                      Empty Leg
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Column */}
                    <div className="w-full md:w-2/3">
                      <h1 className="text-3xl font-bold mb-4">{offer.title}</h1>
                      
                      <div className="flex items-center text-gray-700 mb-6">
                        <MapPin size={18} className="mr-2" />
                        <div className="flex items-center">
                          <span className="font-medium">{offer.origin}</span>
                          <ArrowRight size={16} className="mx-2 text-gray-400" />
                          <span className="font-medium">{offer.destination}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Departure</div>
                          <div className="flex items-center mt-1">
                            <Calendar size={16} className="text-gray-700 mr-2" />
                            <span className="font-medium">{formatDate(offer.departure_date)}</span>
                          </div>
                        </div>
                        
                        {offer.return_date && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-500">Return</div>
                            <div className="flex items-center mt-1">
                              <Calendar size={16} className="text-gray-700 mr-2" />
                              <span className="font-medium">{formatDate(offer.return_date)}</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Duration</div>
                          <div className="flex items-center mt-1">
                            <Clock size={16} className="text-gray-700 mr-2" />
                            <span className="font-medium">{offer.duration}</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Passengers</div>
                          <div className="flex items-center mt-1">
                            <Users size={16} className="text-gray-700 mr-2" />
                            <span className="font-medium">Up to {offer.passengers}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">About This Package</h2>
                        <p className="text-gray-600 whitespace-pre-line">{offer.description}</p>
                      </div>

                      <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Aircraft</h2>
                        <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Plane size={32} className="text-gray-500" />
                          </div>
                          <div>
                            <div className="font-bold">{offer.aircraft_type}</div>
                            <div className="text-sm text-gray-600">Luxury private jet with full amenities</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-xl font-bold mb-4">What's Included</h2>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">Private terminal access with expedited security</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">Dedicated concierge service</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">Standard catering and beverages</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">Wi-Fi and entertainment systems</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">Complimentary luggage allowance</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Column - Booking Summary */}
                    <div className="w-full md:w-1/3">
                      <div className="bg-gray-50 p-6 rounded-xl sticky top-6">
                        <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
                        
                        <div className="space-y-4 mb-6">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Package Price</span>
                            <span className="font-medium">{offer.currency}{offer.price.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Taxes & Fees</span>
                            <span className="font-medium">Included</span>
                          </div>
                          <div className="border-t border-gray-200 pt-4 flex justify-between">
                            <span className="font-bold">Total (Estimated)</span>
                            <span className="font-bold">{offer.currency}{offer.price.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-gray-500 text-center">
                            Final price may vary based on additional services and specific requirements
                          </p>
                        </div>
                        
                        <button
                          onClick={handleBookNow}
                          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                          <span>Book Now</span>
                          <ArrowRight size={18} />
                        </button>
                        
                        <div className="mt-4">
                          <a 
                            href="mailto:bookings@privatecharterx.com?subject=Inquiry about Fixed Offer"
                            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700"
                          >
                            Contact for More Info
                          </a>
                        </div>
                        
                        <div className="mt-6 text-xs text-gray-500 text-center">
                          By booking, you agree to our <a href="/terms" className="underline">Terms & Conditions</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}