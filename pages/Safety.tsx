import React from 'react';
import { Shield, Check, Award, Users, FileCheck, AlertTriangle } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import LanguageSelector from '../components/LanguageSelector';
import ThemeToggle from '../components/ThemeToggle';
import UserMenu from '../components/UserMenu';
import WalletMenu from '../components/WalletMenu';

export default function Safety() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-between py-4 px-6">
            <Logo />
            <div className="flex items-center gap-4">
              <WalletMenu onShowDashboard={() => {}} />
              <UserMenu onLogout={() => {}} />
              <ThemeToggle isDark={isDarkTheme} onToggle={() => setIsDarkTheme(!isDarkTheme)} />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-[88px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Safety First, Always</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At PrivateCharterX, safety is not just a priority—it's our foundation. We maintain the highest safety standards in the industry to ensure your peace of mind on every journey.
            </p>
          </div>

          {/* Safety Standards */}
          <div className="mb-20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                  alt="Safety Standards" 
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Our Safety Standards</h2>
                <p className="text-gray-600 mb-6">
                  Every aircraft in our network undergoes rigorous safety checks and is operated by experienced professionals. We exceed industry safety requirements to provide you with the safest private aviation experience possible.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={18} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold">ARG/US Platinum & IS-BAO Stage 3</h3>
                      <p className="text-gray-600">All operators in our network hold the highest safety ratings in the industry.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={18} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold">Experienced Flight Crews</h3>
                      <p className="text-gray-600">Our pilots exceed FAA and EASA requirements for flight hours and training.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={18} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold">Regular Maintenance</h3>
                      <p className="text-gray-600">Aircraft undergo comprehensive maintenance checks that exceed regulatory requirements.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Certifications */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Industry-Leading Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">ARG/US Platinum</h3>
                <p className="text-gray-600">
                  The highest level of ARG/US ratings, representing the elite status for private jet operators who exceed industry safety standards.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">IS-BAO Stage 3</h3>
                <p className="text-gray-600">
                  The highest level of compliance with International Standard for Business Aircraft Operations, demonstrating a fully developed safety management system.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Wyvern Wingman</h3>
                <p className="text-gray-600">
                  A prestigious safety certification that requires operators to meet rigorous safety standards beyond regulatory requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Safety Protocols */}
          <div className="mb-20">
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1521727857535-28d2047619b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                  alt="Safety Protocols" 
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Comprehensive Safety Protocols</h2>
                <p className="text-gray-600 mb-6">
                  Our multi-layered approach to safety encompasses every aspect of your journey, from pre-flight checks to in-flight monitoring and post-flight analysis.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold flex items-center gap-2">
                      <Users size={18} className="text-gray-700" />
                      Crew Requirements
                    </h3>
                    <p className="text-gray-600 mt-2">
                      All flight crews undergo regular training, medical checks, and proficiency tests. Our pilots have a minimum of 5,000 flight hours and extensive experience on their specific aircraft type.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold flex items-center gap-2">
                      <AlertTriangle size={18} className="text-gray-700" />
                      Risk Assessment
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Every flight undergoes a comprehensive risk assessment that evaluates weather conditions, airport facilities, crew experience, and aircraft performance to ensure optimal safety.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold flex items-center gap-2">
                      <Shield size={18} className="text-gray-700" />
                      Safety Management System
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Our robust Safety Management System (SMS) continuously monitors and improves safety performance through data analysis, hazard identification, and risk mitigation strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COVID-19 Safety Measures */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Enhanced Health & Safety Measures</h2>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Aircraft Sanitization</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Enhanced cleaning protocols using hospital-grade disinfectants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Complete sanitization of all high-touch surfaces before every flight</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">HEPA filtration systems on all aircraft</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">UV-C light treatment for additional disinfection</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Crew & Ground Staff Protocols</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Regular health screenings for all staff</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Comprehensive training on health safety protocols</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Personal protective equipment available on all flights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Contactless procedures whenever possible</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Commitment */}
          <div className="bg-black text-white p-12 rounded-2xl text-center mb-20">
            <Shield size={48} className="mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Safety Commitment</h2>
            <p className="text-xl mb-0 max-w-3xl mx-auto">
              "At PrivateCharterX, we will never compromise on safety. It is the foundation of everything we do, and we are committed to maintaining the highest safety standards in the industry."
            </p>
            <p className="text-lg mt-4 font-medium">— Lorenzo Vanza, Founder & CEO</p>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Safety FAQs</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer">
                    <h3 className="font-medium">How do you select aircraft operators for your network?</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-600">
                    We have a rigorous vetting process for all operators in our network. They must hold ARG/US Platinum, Wyvern Wingman, or IS-BAO Stage 3 certification. We also conduct our own audits that evaluate their safety management systems, maintenance programs, crew training, and operational history. Only operators that meet our stringent requirements are included in our network.
                  </div>
                </details>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer">
                    <h3 className="font-medium">What training do your pilots undergo?</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-600">
                    All pilots in our network exceed FAA and EASA requirements for flight hours and training. They undergo simulator training every six months, which includes emergency procedures and scenario-based training. Additionally, they receive specialized training for specific aircraft types and routes, as well as regular crew resource management training to enhance teamwork and communication in the cockpit.
                  </div>
                </details>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer">
                    <h3 className="font-medium">How often are the aircraft maintained?</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-600">
                    Aircraft in our network follow maintenance schedules that exceed manufacturer and regulatory requirements. They undergo daily inspections before the first flight of the day, as well as more comprehensive inspections based on flight hours and calendar time. Additionally, we require operators to have a proactive maintenance program that addresses potential issues before they become problems.
                  </div>
                </details>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer">
                    <h3 className="font-medium">What happens if there's inclement weather?</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-600">
                    Safety is our top priority, and we never compromise it for scheduling convenience. Our flight operations team continuously monitors weather conditions along your route. If inclement weather poses a safety risk, we'll work with you to either reschedule your flight or propose alternative routes or airports to ensure your safety while minimizing disruption to your travel plans.
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gray-50 p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Experience Safe, Worry-Free Travel</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book your next journey with PrivateCharterX and experience the peace of mind that comes with our unwavering commitment to safety.
            </p>
            <a 
              href="/" 
              className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Book Your Flight
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}