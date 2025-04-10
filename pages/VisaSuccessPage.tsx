import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, FileText } from 'lucide-react';
import Logo from '../components/Logo';

export default function VisaSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/visa-services');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <Logo />
        </div>
        
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={32} className="text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Visa Application Submitted!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your visa application. We've sent a confirmation email with all the details and next steps.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
          <div className="flex items-start gap-3">
            <FileText size={24} className="text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-800">What's Next?</h3>
              <ul className="mt-2 space-y-2 text-blue-700">
                <li>Our visa specialists will review your application</li>
                <li>You'll receive updates via email</li>
                <li>We may contact you if additional documents are needed</li>
                <li>Track your application status in your account dashboard</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/visa-services')}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>Return to Visa Services</span>
            <ArrowRight size={18} />
          </button>
          
          <p className="text-sm text-gray-500">
            Redirecting in {countdown} seconds...
          </p>
        </div>
      </div>
    </div>
  );
}