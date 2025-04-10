import React, { useState } from 'react';
import { CreditCard, Wallet, Send, ArrowRight, Calendar, User, Mail, Phone, Check } from 'lucide-react';
import { createCheckoutSession, processCryptoPayment, sendPaymentRequest } from '../lib/payments';
import { web3Service } from '../lib/web3';
import { useAuth } from '../context/AuthContext';

interface CheckoutFormProps {
  offerId: string;
  offerType: 'fixed_offer' | 'empty_leg' | 'visa';
  title: string;
  price: number;
  currency: string;
  onClose: () => void;
  onSuccess?: () => void;
  userInfo?: {
    name: string;
    email: string;
    phone: string;
    specialRequests?: string;
    additionalServices?: {
      airportTransfer: boolean;
      catering: boolean;
      concierge: boolean;
      hotelBooking: boolean;
    };
  };
}

export default function CheckoutForm({ 
  offerId, 
  offerType, 
  title, 
  price, 
  currency, 
  onClose,
  onSuccess,
  userInfo
}: CheckoutFormProps) {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'request'>('request');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: userInfo?.name || user?.name || '',
    email: userInfo?.email || user?.email || '',
    phone: userInfo?.phone || '',
    specialRequests: userInfo?.specialRequests || '',
    additionalServices: userInfo?.additionalServices || {
      airportTransfer: false,
      catering: false,
      concierge: false,
      hotelBooking: false
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        additionalServices: {
          ...prev.additionalServices,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate form data
      if (!formData.name || !formData.email || !formData.phone) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Only use direct checkout for fixed offers and empty legs
      if (offerType === 'fixed_offer' && !offerId.startsWith('custom-')) {
        // For fixed offers, use direct checkout
        const { error: checkoutError } = await createCheckoutSession({
          offerId,
          offerType,
          price,
          currency,
          title,
          userInfo: formData
        });

        if (checkoutError) throw new Error(checkoutError);
      } else if (offerType === 'empty_leg') {
        // For empty legs, use direct checkout
        const { error: checkoutError } = await createCheckoutSession({
          offerId,
          offerType,
          price,
          currency,
          title,
          userInfo: formData
        });

        if (checkoutError) throw new Error(checkoutError);
      } else {
        // For custom charters and other types, use request method
        const { success: requestSuccess, error: requestError } = await sendPaymentRequest(
          offerId,
          offerType,
          formData.email,
          formData
        );

        if (requestError) throw new Error(requestError);
        if (requestSuccess) {
          setSuccess(true);
          if (onSuccess) onSuccess();
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(error instanceof Error ? error.message : 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handlePayment();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onClose();
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center space-x-2 mb-6">
        {[1, 2].map((step) => (
          <div 
            key={step}
            className={`w-2.5 h-2.5 rounded-full ${
              step === currentStep 
                ? 'bg-black' 
                : step < currentStep 
                  ? 'bg-gray-400' 
                  : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  if (success) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Request Submitted Successfully!</h3>
        <p className="text-gray-600 mb-6">
          Your booking request has been sent. Our team will contact you shortly.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Contact Information
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Requests
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                placeholder="Any special requirements or preferences..."
              ></textarea>
            </div>
          </div>
        );
      case 2: // Confirmation
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Request Confirmation</h3>
            <div className="bg-blue-50 p-4 rounded-xl text-blue-700">
              <p className="font-medium mb-2">Your request will be sent to our team</p>
              <p className="text-sm">
                Our charter specialists will review your request and contact you within 24 hours with a personalized quote.
              </p>
            </div>

            {/* Contact Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="font-medium text-gray-700 mb-2">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-medium text-gray-700 mb-2">Price Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Price (Estimated)</span>
                  <span className="font-medium">{currency}{price.toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Final price will be confirmed by our team after reviewing your request.
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              By submitting this request, you agree to our <a href="/terms" className="underline">Terms & Conditions</a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isFormValid = () => {
    if (currentStep === 1) {
      return formData.name && formData.email && formData.phone;
    }
    return true;
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold mb-4">Complete Your Booking</h2>

      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {currentStep === 1 ? 'Cancel' : 'Back'}
        </button>
        
        <button
          onClick={nextStep}
          disabled={loading || !isFormValid()}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : currentStep < 2 ? (
            <>
              <span>Continue</span>
              <ArrowRight size={18} />
            </>
          ) : (
            <>
              <span>Submit Request</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}