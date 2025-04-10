import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <Logo />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl font-medium text-gray-900 mb-2">Page Not Found</p>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Home size={18} />
            <span>Return Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}