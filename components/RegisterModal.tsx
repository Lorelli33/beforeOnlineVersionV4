import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, ArrowRight, X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface RegisterModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export default function RegisterModal({ onClose, onLogin }: RegisterModalProps) {
  const { register } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const validateStep1 = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.name) {
      setError('Name is required');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      if (validateStep1()) {
        handleNextStep();
      }
      return;
    }

    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await register(
        formData.email,
        formData.password,
        formData.name,
        formData.phone
      );

      if (error) {
        setError(error);
        setIsLoading(false);
        return;
      }

      onClose();
      router.push('/dashboard');
    } catch (error) {
      setError('Failed to create account. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-gray-600 mt-1">Join PrivateCharterX today</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-lg text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                  <PhoneInput
                    country={'ch'}
                    value={formData.phone}
                    onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                    containerClass="phone-input-container"
                    inputClass="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    buttonClass="!border-0 !bg-transparent"
                    dropdownClass="!bg-white !border !border-gray-200 !rounded-lg !shadow-lg"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between items-center">
            {step === 1 ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLogin();
                }}
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Already have an account?
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePrevStep}
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Back
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating account...</span>
              </>
            ) : step === 1 ? (
              <>
                <span>Continue</span>
                <ArrowRight size={18} />
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="underline hover:text-black">Terms of Service</a> and{' '}
            <a href="/privacy" className="underline hover:text-black">Privacy Policy</a>
          </p>
        </form>
      </div>
    </div>
  );
}