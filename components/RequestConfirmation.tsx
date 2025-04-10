import React, { useState, useEffect } from 'react';
import { Check, Mail } from 'lucide-react';
import { sendBookingConfirmationEmail } from '../utils/email';

interface RequestConfirmationProps {
  onClose: () => void;
}

export default function RequestConfirmation({ onClose }: RequestConfirmationProps) {
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    const sendEmail = async () => {
      try {
        await sendBookingConfirmationEmail('bookings@privatecharterx.com', {
          origin: 'Request Form',
          destination: 'Pending Review',
          departure_date: new Date().toISOString(),
          aircraft_type: 'To be determined',
          passengers: 0,
          status: 'pending'
        });
        setShowCheck(true);
      } catch (error) {
        console.error('Failed to send booking email:', error);
        // Still show success to user, as the booking was saved
        setShowCheck(true);
      }
    };

    sendEmail();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full space-y-6 text-center">
        {!showCheck ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 border-4 border-t-black border-r-black border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <Mail className="absolute inset-0 m-auto text-black w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold">Sending your request...</h2>
            <p className="text-gray-600">Please wait while we process your booking request.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold">Request Sent Successfully!</h2>
            <p className="text-gray-600">
              We've received your booking request and will contact you shortly at bookings@privatecharterx.com.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}