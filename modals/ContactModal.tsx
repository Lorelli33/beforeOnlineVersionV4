import React from 'react';
import { X, Phone, Mail, MapPin } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto font-sans">
      <div className="min-h-screen py-10">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with close button */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Contact Us</h1>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
                Have questions or need assistance? Our team is here to help you with any inquiries about our private jet charter services.
              </p>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-50 p-8 rounded-2xl text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-base text-gray-600 mb-4">Our team is available 24/7</p>
                <a href="tel:+41447978853" className="text-black font-medium hover:underline">
                  +41 44 797 88 53
                </a>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-2xl text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-base text-gray-600 mb-4">We'll respond within 2 hours</p>
                <a href="mailto:contact@privatecharterx.com" className="text-black font-medium hover:underline">
                  contact@privatecharterx.com
                </a>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-2xl text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                <p className="text-base text-gray-600 mb-4">Our global offices</p>
                <div className="text-black font-medium">
                  London · Zurich · Miami
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">Our Global Offices</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">London Office</h4>
                      <p className="text-base text-gray-600">
                        71-75 Shelton Street, Covent Garden<br />
                        London, WC2H 9JQ<br />
                        United Kingdom
                      </p>
                      <a href="tel:+41447978853" className="text-black font-medium hover:underline mt-2 inline-block">
                        +41 44 797 88 53
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Zurich Office</h4>
                      <p className="text-base text-gray-600">
                        Bahnhofstrasse 10<br />
                        8001 Zurich<br />
                        Switzerland
                      </p>
                      <a href="tel:+41447978853" className="text-black font-medium hover:underline mt-2 inline-block">
                        +41 44 797 88 53
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Miami Office</h4>
                      <p className="text-base text-gray-600">
                        1000 Brickell Ave, Suite 715<br />
                        Miami, FL 33131<br />
                        United States
                      </p>
                      <a href="tel:+41447978853" className="text-black font-medium hover:underline mt-2 inline-block">
                        +41 44 797 88 53
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <h4 className="font-medium">What information do I need to provide for a quote?</h4>
                      <span className="transition-transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0 text-base text-gray-600">
                      To provide you with an accurate quote, we'll need your departure and arrival locations, preferred travel dates and times, number of passengers, and any special requirements. The more details you can provide, the more precise our quote will be.
                    </div>
                  </details>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <h4 className="font-medium">How quickly will I receive a response to my inquiry?</h4>
                      <span className="transition-transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0 text-base text-gray-600">
                      We pride ourselves on quick response times. For general inquiries, you can expect a response within 2 hours during business hours. For urgent matters, our 24/7 phone support is always available to assist you immediately.
                    </div>
                  </details>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <h4 className="font-medium">Can I visit one of your offices in person?</h4>
                      <span className="transition-transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0 text-base text-gray-600">
                      Yes, we welcome visitors to our offices in London, Zurich, and Miami. We recommend scheduling an appointment in advance to ensure that a member of our team is available to meet with you and address your specific needs.
                    </div>
                  </details>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-black text-white p-10 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Experience Luxury Travel?</h3>
              <p className="text-base mb-8 max-w-2xl mx-auto">
                Contact us today to book your private jet charter or learn more about our services. Our team is standing by to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+41447978853" 
                  className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <Phone size={18} />
                  <span>Call Us</span>
                </a>
                <a 
                  href="mailto:contact@privatecharterx.com" 
                  className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  <Mail size={18} />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}