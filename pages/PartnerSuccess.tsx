import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Users, Anchor } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

export default function PartnerSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const sessionId = searchParams.get('session_id');
  const [partnerType, setPartnerType] = useState<'business' | 'yacht'>('business');

  useEffect(() => {
    // Auto-redirect after 10 seconds
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/partners');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Determine partner type from session ID (in a real app, you'd fetch this from the server)
    // This is just a placeholder implementation
    if (sessionId && sessionId.includes('yacht')) {
      setPartnerType('yacht');
    }

    return () => clearInterval(timer);
  }, [navigate, sessionId]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-between py-4 px-6">
            <Logo />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-[88px] flex items-center justify-center">
        <div className="max-w-3xl w-full mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">
                {partnerType === 'business' ? 'Partnership Confirmed!' : 'Yacht Listing Confirmed!'}
              </h1>
              <p className="text-xl text-gray-600">
                {partnerType === 'business' 
                  ? 'Thank you for partnering with PrivateCharterX.' 
                  : 'Thank you for listing your yacht with PrivateCharterX.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                {partnerType === 'business' 
                  ? <Users size={20} className="text-gray-700" />
                  : <Anchor size={20} className="text-gray-700" />
                }
                Next Steps
              </h2>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Check Your Email</p>
                    <p className="text-gray-600 text-sm">
                      We've sent a detailed confirmation to your email with all the information about your 
                      {partnerType === 'business' ? ' partnership.' : ' yacht listing.'}
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Complete Your Profile</p>
                    <p className="text-gray-600 text-sm">
                      {partnerType === 'business'
                        ? 'Log in to your partner dashboard to complete your company profile and upload additional materials.'
                        : 'Log in to your dashboard to complete your yacht profile and upload photos and specifications.'}
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">
                      {partnerType === 'business' ? 'Partner Onboarding Call' : 'Listing Review'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {partnerType === 'business'
                        ? 'Our partnership team will contact you within 24 hours to schedule your onboarding call.'
                        : 'Our yacht specialist will review your listing and contact you within 24 hours to finalize the details.'}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <a 
                href="/dashboard" 
                className="flex-1 bg-black text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>Go to Dashboard</span>
                <ArrowRight size={18} />
              </a>
              
              <a 
                href="/partners" 
                className="flex-1 bg-white border border-gray-300 text-gray-800 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <span>Return to Partners Page</span>
              </a>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              <p>Need assistance? Contact our partnership team:</p>
              <p className="font-medium">partners@privatecharterx.com | +41 44 797 88 53</p>
              <p className="mt-4">Redirecting to partners page in {countdown} seconds...</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}