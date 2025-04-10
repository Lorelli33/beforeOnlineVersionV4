import React from 'react';
import { X, Check, Award, Shield, FileCheck, AlertTriangle, Users } from 'lucide-react';

interface SafetyModalProps {
  onClose: () => void;
}

export default function SafetyModal({ onClose }: SafetyModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto font-sans">
      <div className="min-h-screen py-10">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with close button */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Safety</h1>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-10 modal-content">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Safety First, Always</h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
                At PrivateCharterX, safety is not just a priority—it's our foundation. We maintain the highest safety standards in the industry to ensure your peace of mind on every journey.
              </p>
            </div>

            {/* Safety Standards */}
            <div className="mb-16">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                    alt="Safety Standards" 
                    className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">Our Safety Standards</h3>
                  <p className="text-base text-gray-600 mb-6">
                    Every aircraft in our network undergoes rigorous safety checks and is operated by experienced professionals. We exceed industry safety requirements to provide you with the safest private aviation experience possible.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={18} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold">ARG/US Platinum & IS-BAO Stage 3</h4>
                        <p className="text-base text-gray-600">All operators in our network hold the highest safety ratings in the industry.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={18} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold">Experienced Flight Crews</h4>
                        <p className="text-base text-gray-600">Our pilots exceed FAA and EASA requirements for flight hours and training.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={18} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold">Regular Maintenance</h4>
                        <p className="text-base text-gray-600">Aircraft undergo comprehensive maintenance checks that exceed regulatory requirements.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Certifications */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">Industry-Leading Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award size={32} className="text-blue-600" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">ARG/US Platinum</h4>
                  <p className="text-base text-gray-600">
                    The highest level of ARG/US ratings, representing the elite status for private jet operators who exceed industry safety standards.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield size={32} className="text-blue-600" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">IS-BAO Stage 3</h4>
                  <p className="text-base text-gray-600">
                    The highest level of compliance with International Standard for Business Aircraft Operations, demonstrating a fully developed safety management system.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileCheck size={32} className="text-blue-600" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Wyvern Wingman</h4>
                  <p className="text-base text-gray-600">
                    A prestigious safety certification that requires operators to meet rigorous safety standards beyond regulatory requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Safety Protocols */}
            <div className="mb-16">
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="w-full md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1521727857535-28d2047619b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                    alt="Safety Protocols" 
                    className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">Comprehensive Safety Protocols</h3>
                  <p className="text-base text-gray-600 mb-6">
                    Our multi-layered approach to safety encompasses every aspect of your journey, from pre-flight checks to in-flight monitoring and post-flight analysis.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold flex items-center gap-2">
                        <Users size={18} className="text-gray-700" />
                        Crew Requirements
                      </h4>
                      <p className="text-base text-gray-600 mt-2">
                        All flight crews undergo regular training, medical checks, and proficiency tests. Our pilots have a minimum of 5,000 flight hours and extensive experience on their specific aircraft type.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold flex items-center gap-2">
                        <AlertTriangle size={18} className="text-gray-700" />
                        Risk Assessment
                      </h4>
                      <p className="text-base text-gray-600 mt-2">
                        Every flight undergoes a comprehensive risk assessment that evaluates weather conditions, airport facilities, crew experience, and aircraft performance to ensure optimal safety.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold flex items-center gap-2">
                        <Shield size={18} className="text-gray-700" />
                        Safety Management System
                      </h4>
                      <p className="text-base text-gray-600 mt-2">
                        Our robust Safety Management System (SMS) continuously monitors and improves safety performance through data analysis, hazard identification, and risk mitigation strategies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COVID-19 Safety Measures */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">Enhanced Health & Safety Measures</h3>
              <div className="bg-gray-50 p-8 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4">Aircraft Sanitization</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-base text-gray-600">Enhanced cleaning protocols using hospital-grade disinfectants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-base text-gray-600">Complete sanitization of all high-touch surfaces before every flight</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-base text-gray-600">HEPA filtration systems on all aircraft</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-base text-gray-600">UV-C light treatment for additional disinfection</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold mb-4">Crew & Ground Staff Protocols</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-base text-gray-600">Regular health screenings for all staff</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-base text-gray-600">Comprehensive training on health safety protocols</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-base text-gray-600">Personal protective equipment available on all flights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-base text-gray-600">Contactless procedures whenever possible</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">Safety FAQs</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <h4 className="font-medium">How do you select aircraft operators for your network?</h4>
                      <span className="transition-transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0 text-base text-gray-600">
                      We have a rigorous vetting process for all operators in our network. They must hold ARG/US Platinum, Wyvern Wingman, or IS-BAO Stage 3 certification. We also conduct our own audits that evaluate their safety management systems, maintenance programs, crew training, and operational history. Only operators that meet our stringent requirements are included in our network.
                    </div>
                  </details>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <h4 className="font-medium">What training do your pilots undergo?</h4>
                      <span className="transition-transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0 text-base text-gray-600">
                      All pilots in our network exceed FAA and EASA requirements for flight hours and training. They undergo simulator training every six months, which includes emergency procedures and scenario-based training. Additionally, they receive specialized training for specific aircraft types and routes, as well as regular crew resource management training to enhance teamwork and communication in the cockpit.
                    </div>
                  </details>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <h4 className="font-medium">How often are the aircraft maintained?</h4>
                      <span className="transition-transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0 text-base text-gray-600">
                      Aircraft in our network follow maintenance schedules that exceed manufacturer and regulatory requirements. They undergo daily inspections before the first flight of the day, as well as more comprehensive inspections based on flight hours and calendar time. Additionally, we require operators to have a proactive maintenance program that addresses potential issues before they become problems.
                    </div>
                  </details>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <h4 className="font-medium">What happens if there's inclement weather?</h4>
                      <span className="transition-transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="p-4 pt-0 text-base text-gray-600">
                      Safety is our top priority, and we never compromise it for scheduling convenience. Our flight operations team continuously monitors weather conditions along your route. If inclement weather poses a safety risk, we'll work with you to either reschedule your flight or propose alternative routes or airports to ensure your safety while minimizing disruption to your travel plans.
                    </div>
                  </details>
                </div>
              </div>
            </div>

            {/* Testimonials Section - New */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-10 text-center">Safety Excellence Testimonials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3" 
                      alt="Captain Michael Roberts" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold">Capt. Michael Roberts</h4>
                      <p className="text-sm text-gray-600">Chief Safety Officer</p>
                    </div>
                  </div>
                  <p className="text-base text-gray-600 italic">
                    "In my 25 years of aviation experience, I've never seen a more comprehensive approach to safety. PrivateCharterX's commitment to maintaining the highest safety standards is truly exceptional."
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3" 
                      alt="Dr. Elena Martinez" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold">Dr. Elena Martinez</h4>
                      <p className="text-sm text-gray-600">Aviation Safety Consultant</p>
                    </div>
                  </div>
                  <p className="text-base text-gray-600 italic">
                    "The implementation of safety protocols at PrivateCharterX sets a new benchmark for the industry. Their proactive approach to risk management is exemplary."
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3" 
                      alt="Thomas Anderson" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold">Thomas Anderson</h4>
                      <p className="text-sm text-gray-600">Director of Operations</p>
                    </div>
                  </div>
                  <p className="text-base text-gray-600 italic">
                    "The dedication to safety excellence is evident in every aspect of PrivateCharterX's operations. From crew training to maintenance protocols, no detail is overlooked."
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3" 
                      alt="Jennifer Chen" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold">Jennifer Chen</h4>
                      <p className="text-sm text-gray-600">Safety Systems Specialist</p>
                    </div>
                  </div>
                  <p className="text-base text-gray-600 italic">
                    "PrivateCharterX's investment in advanced safety technology and continuous improvement of their safety management system demonstrates their unwavering commitment to passenger safety."
                  </p>
                </div>
              </div>
            </div>

            {/* Safety Commitment */}
            <div className="bg-black text-white p-12 rounded-2xl text-center mb-16">
              <Shield size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Commitment to Excellence</h3>
              <p className="text-base mb-0 max-w-3xl mx-auto">
                "We are dedicated to providing the highest standards of safety, luxury, and service in private aviation. Our commitment to excellence ensures that every flight delivers an exceptional experience, combining cutting-edge technology with unparalleled attention to detail."
              </p>
              <p className="text-base mt-4 font-medium">— The PrivateCharterX Team</p>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 p-10 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4">Experience Safe, Worry-Free Travel</h3>
              <p className="text-base mb-8 max-w-2xl mx-auto">
                Book your next journey with PrivateCharterX and experience the peace of mind that comes with our unwavering commitment to safety.
              </p>
              <button 
                onClick={onClose}
                className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Book Your Flight
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}