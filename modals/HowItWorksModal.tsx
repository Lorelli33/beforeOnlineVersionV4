import React from 'react';
import { X, Check, ArrowRight } from 'lucide-react';

interface HowItWorksModalProps {
  onClose: () => void;
}

export default function HowItWorksModal({ onClose }: HowItWorksModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto font-sans">
      <div className="min-h-screen py-10">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with close button */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">How It Works</h1>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
                Booking a private jet has never been easier. Our streamlined process combines cutting-edge technology with personalized service to provide you with a seamless experience.
              </p>
            </div>

            {/* Process Steps */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-2xl relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-4">Search & Select</h3>
                  <p className="text-base text-gray-600 mb-4">
                    Enter your departure and arrival locations, preferred date, and passenger count. Browse available aircraft options tailored to your needs.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Real-time availability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Transparent pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Aircraft details & specifications</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-2xl relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-4">Book & Pay</h3>
                  <p className="text-base text-gray-600 mb-4">
                    Complete your booking with our secure payment system. Choose from traditional payment methods or cryptocurrency options.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Secure transactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Multiple payment options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Instant confirmation</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-2xl relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-4">Fly & Enjoy</h3>
                  <p className="text-base text-gray-600 mb-4">
                    Arrive at the private terminal just 15 minutes before departure. Our concierge team will handle all details for a stress-free experience.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">VIP terminal access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Personalized service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Earn PVCX tokens with every flight</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Web3 Integration */}
            <div className="mb-16">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80" 
                    alt="Web3 Integration" 
                    className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h2 className="text-3xl font-bold mb-4">Web3 Integration</h2>
                  <p className="text-base text-gray-600 mb-6">
                    PrivateCharterX leverages blockchain technology to enhance your private aviation experience. Our platform integrates with popular Web3 wallets for seamless transactions and rewards.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-bold mb-2">PVCX Token Rewards</h3>
                      <p className="text-base text-gray-600">
                        Earn PVCX tokens with every flight you book. These tokens can be used for discounts on future bookings, exclusive upgrades, and more.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-bold mb-2">Cryptocurrency Payments</h3>
                      <p className="text-base text-gray-600">
                        Pay for your flights using popular cryptocurrencies like ETH and BTC, with real-time conversion rates and secure transactions.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-bold mb-2">Transparent Transactions</h3>
                      <p className="text-base text-gray-600">
                        All transactions are recorded on the blockchain, ensuring complete transparency and security for your bookings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
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
                      <h3 className="font-medium">What happens if my flight is delayed or canceled?</h3>
                      <span className="transition-transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0 text-base text-gray-600">
                      In the rare event of a delay or cancellation, our team will immediately notify you and provide alternatives. If the delay is due to factors within our control, we'll arrange a replacement aircraft at no additional cost. Our flexible rescheduling policy allows you to adjust your travel plans with minimal disruption.
                    </div>
                  </details>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <h3 className="font-medium">How can I book a Jet?</h3>
                      <span className="transition-transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0 text-base text-gray-600">
                      You can type in directly your travel details and see immediately available jets worldwide, choose, request and book in less than 5 minutes. Our platform makes it incredibly simple to find and book the perfect aircraft for your journey with real-time availability and transparent pricing.
                    </div>
                  </details>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <h3 className="font-medium">Can I bring pets on board?</h3>
                      <span className="transition-transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0 text-base text-gray-600">
                      Yes, pets are welcome on most of our flights. Simply indicate that you'll be traveling with a pet during the booking process, and we'll ensure the aircraft is pet-friendly. There may be additional cleaning fees depending on the size and number of pets. International travel with pets may require additional documentation.
                    </div>
                  </details>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-black text-white p-12 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Experience Private Aviation?</h3>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Book your first flight today and discover the convenience, comfort, and luxury of flying private with PrivateCharterX.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={onClose}
                  className="inline-block bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Book Now
                </button>
                <button 
                  onClick={() => {
                    onClose();
                    // Trigger the Contact modal
                    const contactLink = document.querySelector('a[href="/contact"]');
                    if (contactLink) {
                      contactLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                    }
                  }}
                  className="inline-block bg-transparent text-white border border-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}