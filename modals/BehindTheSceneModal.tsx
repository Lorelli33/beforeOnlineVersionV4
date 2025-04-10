import React from 'react';
import { X, ArrowRight, Shield, Globe } from 'lucide-react';

interface BehindTheSceneModalProps {
  onClose: () => void;
}

export default function BehindTheSceneModal({ onClose }: BehindTheSceneModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto font-sans">
      <div className="min-h-screen py-10">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with close button */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Behind the Scenes</h1>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Behind the Scenes</h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
                We are dedicated to excellence, precision, and seamless experiences. Our team of charter specialists, logistics experts, and customer support professionals work tirelessly to ensure every journey is flawless, embodying the passion and commitment that propel PrivateCharterX forward.
              </p>
            </div>

            {/* Team Section - Redesigned */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center">Our Leadership Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-2xl text-center shadow-lg border border-gray-100 transform transition-transform hover:scale-105">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-black">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                      alt="Lorenzo Vanza" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-bold">Lorenzo Vanza</h4>
                  <p className="text-gray-600">Founder & CEO</p>
                  <div className="mt-3 w-10 h-1 bg-black mx-auto"></div>
                  <p className="mt-3 text-xs text-gray-600">
                    With over 15 years in aviation, Lorenzo brings unparalleled expertise and vision to PrivateCharterX.
                  </p>
                </div>
                
                <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-2xl text-center shadow-lg border border-gray-100 transform transition-transform hover:scale-105">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-black">
                    <img 
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80" 
                      alt="Emily Chen" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-bold">Emily Chen</h4>
                  <p className="text-gray-600">Chief Technology Officer</p>
                  <div className="mt-3 w-10 h-1 bg-black mx-auto"></div>
                  <p className="mt-3 text-xs text-gray-600">
                    Emily leads our tech innovation, pioneering the integration of blockchain with luxury travel.
                  </p>
                </div>
                
                <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-2xl text-center shadow-lg border border-gray-100 transform transition-transform hover:scale-105">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-black">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80" 
                      alt="Sarah Johnson" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-bold">Sarah Johnson</h4>
                  <p className="text-gray-600">Chief Operations Officer</p>
                  <div className="mt-3 w-10 h-1 bg-black mx-auto"></div>
                  <p className="mt-3 text-xs text-gray-600">
                    Sarah ensures flawless execution of every flight, overseeing our global operations with precision.
                  </p>
                </div>
                
                <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-2xl text-center shadow-lg border border-gray-100 transform transition-transform hover:scale-105">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-black">
                    <img 
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                      alt="Michael Rodriguez" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-bold">Michael Rodriguez</h4>
                  <p className="text-gray-600">Chief Marketing Officer</p>
                  <div className="mt-3 w-10 h-1 bg-black mx-auto"></div>
                  <p className="mt-3 text-xs text-gray-600">
                    Michael crafts our brand story and ensures our luxury experience extends to every touchpoint.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                  alt="Our Mission" 
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-base text-gray-600 mb-6">
                  Our mission is to provide a simple yet sophisticated booking & travel experience, powered by cutting-edge technology. We believe that private aviation should be accessible, transparent, and exceptional.
                </p>
                <p className="text-base text-gray-600 mb-6">
                  By combining blockchain technology with our extensive network of premium aircraft, we're revolutionizing the way people book and experience private flights.
                </p>
                <button 
                  onClick={() => {
                    onClose();
                    // Trigger the How It Works modal
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
            </div>

            {/* Values Section - Enhanced */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-black opacity-5 rounded-full -mr-12 -mt-12"></div>
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                    <Shield size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Safety First</h4>
                  <p className="text-base text-gray-600">
                    We never compromise on safety. Every aircraft in our network meets the highest industry standards and is operated by experienced professionals.
                  </p>
                </div>
                
                <div className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-black opacity-5 rounded-full -mr-12 -mt-12"></div>
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                      <line x1="16" y1="8" x2="2" y2="22"></line>
                      <line x1="17.5" y1="15" x2="9" y2="15"></line>
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Exceptional Service</h4>
                  <p className="text-base text-gray-600">
                    We're committed to providing personalized, attentive service that exceeds expectations at every touchpoint of your journey.
                  </p>
                </div>
                
                <div className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-black opacity-5 rounded-full -mr-12 -mt-12"></div>
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Innovation</h4>
                  <p className="text-base text-gray-600">
                    We continuously push the boundaries of what's possible in private aviation through technology, sustainability initiatives, and creative solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* Aircraft Network - Updated with larger icon */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-10 text-center">Global Aircraft Network</h2>
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-black text-white rounded-full mb-4">
                      <span className="text-4xl font-bold">3</span>
                    </div>
                    <div className="font-bold text-xl mb-2">Global Offices</div>
                    <p className="text-base text-gray-600">Strategic locations in London, Zurich, and Miami</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-black text-white rounded-full mb-4">
                      <span className="text-4xl font-bold">180+</span>
                    </div>
                    <div className="font-bold text-xl mb-2">Countries Served</div>
                    <p className="text-base text-gray-600">Worldwide coverage for all your travel needs</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-black text-white rounded-full mb-4">
                      <span className="text-4xl font-bold">5,000+</span>
                    </div>
                    <div className="font-bold text-xl mb-2">Aircraft in Network</div>
                    <p className="text-base text-gray-600">Access to the world's finest private jets</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Section - New */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-10 text-center">What Industry Leaders Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3" 
                      alt="Richard Anderson" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold">Richard Anderson</h4>
                      <p className="text-sm text-gray-600">Aviation Industry Consultant</p>
                    </div>
                  </div>
                  <p className="text-base text-gray-600 italic">
                    "PrivateCharterX's innovative approach to private aviation, particularly their integration of blockchain technology, sets a new standard for the industry. Their commitment to transparency and efficiency is truly transformative."
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3" 
                      alt="Maria Sanchez" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold">Maria Sanchez</h4>
                      <p className="text-sm text-gray-600">Luxury Travel Expert</p>
                    </div>
                  </div>
                  <p className="text-base text-gray-600 italic">
                    "The level of service and attention to detail at PrivateCharterX is unmatched. Their team consistently goes above and beyond to ensure every flight is perfect."
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3" 
                      alt="James Mitchell" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold">James Mitchell</h4>
                      <p className="text-sm text-gray-600">Tech Entrepreneur</p>
                    </div>
                  </div>
                  <p className="text-base text-gray-600 italic">
                    "As someone who values efficiency and innovation, I'm impressed by how PrivateCharterX has modernized private aviation booking. Their platform is a game-changer."
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3" 
                      alt="Sarah Thompson" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold">Sarah Thompson</h4>
                      <p className="text-sm text-gray-600">Aviation Safety Auditor</p>
                    </div>
                  </div>
                  <p className="text-base text-gray-600 italic">
                    "The thoroughness of PrivateCharterX's safety protocols and their commitment to maintaining the highest standards in the industry is exemplary."
                  </p>
                </div>
              </div>
            </div>

            {/* Join Us CTA - Updated */}
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
        </div>
      </div>
    </div>
  );
}