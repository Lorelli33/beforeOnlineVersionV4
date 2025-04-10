'use client';

import React, { useState } from 'react';
import { X, CreditCard, Wallet, Send, ArrowRight } from 'lucide-react';
import { web3Service } from '@/lib/web3';
import { createCheckoutSession, processCryptoPayment, sendPaymentRequest } from '@/lib/payments';

interface PaymentModalProps {
  offerId: string;
  offerType: 'fixed_offer' | 'empty_leg' | 'visa';
  title: string;
  price: number;
  currency: string;
  onClose: () => void;
}

export default function PaymentModal({ offerId, offerType, title, price, currency, onClose }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'request'>('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestDetails, setRequestDetails] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      switch (paymentMethod) {
        case 'card':
          await createCheckoutSession({
            offerId,
            offerType,
            price,
            currency,
            title
          });
          break;

        case 'crypto':
          const address = web3Service.getAccount();
          if (!address) {
            throw new Error('Please connect your wallet first');
          }

          // Convert price to ETH (mock conversion rate)
          const priceInEth = currency === 'EUR' ? price / 3000 : price / 3500;
          
          await processCryptoPayment(
            offerId,
            offerType,
            priceInEth,
            address
          );
          break;

        case 'request':
          await sendPaymentRequest(
            offerId,
            offerType,
            requestDetails.email,
            {
              name: requestDetails.name,
              phone: requestDetails.phone,
              message: requestDetails.message
            }
          );
          break;
      }

      onClose();
    } catch (error) {
      console.error('Payment error:', error);
      setError(error instanceof Error ? error.message : 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Payment Options</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4 mb-6">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors ${
              paymentMethod === 'card'
                ? 'border-black bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <CreditCard size={20} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium">Credit Card</div>
              <div className="text-sm text-gray-500">Pay securely with Stripe</div>
            </div>
          </button>

          <button
            onClick={() => setPaymentMethod('crypto')}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors ${
              paymentMethod === 'crypto'
                ? 'border-black bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Wallet size={20} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium">Cryptocurrency</div>
              <div className="text-sm text-gray-500">Pay with ETH or other tokens</div>
            </div>
          </button>

          <button
            onClick={() => setPaymentMethod('request')}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors ${
              paymentMethod === 'request'
                ? 'border-black bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Send size={20} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium">Request Invoice</div>
              <div className="text-sm text-gray-500">Get contacted by our team</div>
            </div>
          </button>
        </div>

        {paymentMethod === 'request' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={requestDetails.name}
                onChange={(e) => setRequestDetails(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={requestDetails.email}
                onChange={(e) => setRequestDetails(prev => ({ ...prev, email: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={requestDetails.phone}
                onChange={(e) => setRequestDetails(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Information
              </label>
              <textarea
                value={requestDetails.message}
                onChange={(e) => setRequestDetails(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <button
            onClick={handlePayment}
            disabled={loading || (paymentMethod === 'request' && (!requestDetails.name || !requestDetails.email))}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>
                  {paymentMethod === 'request' ? 'Send Request' : `Pay ${currency} ${price.toLocaleString()}`}
                </span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <div className="text-center text-sm text-gray-500">
            {paymentMethod === 'card' && 'Secure payment processed by Stripe'}
            {paymentMethod === 'crypto' && 'Connect your Web3 wallet to proceed'}
            {paymentMethod === 'request' && 'Our team will contact you within 24 hours'}
          </div>
        </div>
      </div>
    </div>
  );
}