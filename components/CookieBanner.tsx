'use client';

import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Cookie size={24} className="text-gray-600" />
          <p className="text-sm text-gray-600">
            We use cookies to enhance your experience while prioritizing your privacy and data protection. By continuing to visit this site you agree to our use of cookies.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleAccept}
            className="px-6 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors min-w-[100px]"
          >
            Accept
          </button>
          <Link
            href="/cookie-policy"
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors min-w-[100px] text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}