import React, { useState, useRef } from 'react';
import { Import as Passport, CreditCard, Clock, Check, ArrowRight, Upload, AlertTriangle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../lib/supabase';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import LanguageSelector from '../components/LanguageSelector';
import ThemeToggle from '../components/ThemeToggle';
import UserMenu from '../components/UserMenu';
import WalletMenu from '../components/WalletMenu';
import NavigationMenu from '../components/NavigationMenu';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface VisaPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const visaPackages: VisaPackage[] = [
  {
    id: 'visa-standard',
    name: 'Standard Visa Service',
    price: 129,
    description: 'Perfect for individual travelers',
    features: [
      '24-hour application processing',
      'Document review and verification',
      'Basic support via email',
      'Standard processing time',
      'Digital document delivery'
    ]
  },
  {
    id: 'visa-family',
    name: 'Family Visa Package',
    price: 399,
    description: 'Ideal for families up to 4 members',
    features: [
      '24-hour application processing',
      'Document review and verification',
      'Priority support via email & phone',
      'Expedited processing time',
      'Digital document delivery',
      'Family document organization',
      'Additional family member support'
    ],
    isPopular: true
  },
  {
    id: 'visa-express',
    name: 'Express Visa Service',
    price: 199,
    description: 'Fast-track processing for up to 2 persons',
    features: [
      'Immediate processing start',
      'Up to 2 persons included',
      'Priority document review',
      'Express processing time',
      'Digital document delivery',
      '24/7 support access',
      'Real-time status updates'
    ]
  }
];

export default function VisaServices() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [nationality, setNationality] = useState('');
  const [loading, setLoading] = useState(false);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<'passport' | 'id'>('passport');
  const [documentError, setDocumentError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      setDocumentError('Please upload a valid image or PDF file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setDocumentError('File size should be less than 5MB');
      return;
    }

    // Check if file is less than 6 months old
    const fileDate = new Date(file.lastModified);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    if (fileDate < sixMonthsAgo) {
      setDocumentError('Document must not be older than 6 months');
      return;
    }

    setDocumentError(null);
    setDocumentFile(file);
  };

  const handleCheckout = async (packageId: string) => {
    try {
      if (!documentFile) {
        setDocumentError('Please upload your passport or ID document');
        return;
      }

      setLoading(true);
      const selectedPackage = visaPackages.find(pkg => pkg.id === packageId);
      
      if (!selectedPackage) return;

      // First upload the document
      const fileExt = documentFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `visa-documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('secure_documents')
        .upload(filePath, documentFile);

      if (uploadError) throw uploadError;

      // Create document record
      const { error: docError } = await supabase
        .from('user_documents')
        .insert([{
          document_type: documentType,
          file_path: filePath,
          status: 'pending'
        }]);

      if (docError) throw docError;

      // Create checkout session
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offerId: packageId,
          offerType: 'visa',
          price: selectedPackage.price,
          currency: 'EUR',
          title: selectedPackage.name
        }),
      });

      const { sessionId } = await response.json();
      
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setDocumentError('Failed to process request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-between py-4 px-6">
            <div className="flex items-center gap-8">
              <Logo />
              <NavigationMenu />
            </div>
            <div className="flex items-center gap-4">
              <WalletMenu onShowDashboard={() => {}} />
              <UserMenu onLogout={() => {}} />
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-[88px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Visa Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fast and reliable visa processing services for all your travel needs. Get your visa within 24 hours with our expert assistance.
            </p>
          </div>

          {/* Document Upload Section */}
          <div className="max-w-2xl mx-auto mb-16 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Required Documents</h2>
            <p className="text-gray-600 mb-6">
              Please upload a copy of your passport or ID. The document must be less than 6 months old.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type
                </label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value as 'passport' | 'id')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="passport">Passport</option>
                  <option value="id">ID Card</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Document
                </label>
                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <Upload size={20} className="text-gray-400" />
                    <span className="text-gray-600">
                      {documentFile ? documentFile.name : 'Click to upload document'}
                    </span>
                  </button>
                </div>
                {documentError && (
                  <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertTriangle size={14} />
                    <span>{documentError}</span>
                  </div>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Accepted formats: JPG, PNG, PDF. Maximum file size: 5MB.
                </p>
              </div>
            </div>
          </div>

          {/* Service Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">24-Hour Processing</h3>
              <p className="text-gray-600">
                Quick turnaround time with most visas processed within 24 hours
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Passport size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Assistance</h3>
              <p className="text-gray-600">
                Professional guidance through the entire visa application process
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                Safe and transparent payment process with no hidden fees
              </p>
            </div>
          </div>

          {/* Pricing Packages */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Choose Your Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {visaPackages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`bg-white rounded-2xl border ${
                    pkg.isPopular ? 'border-blue-500 shadow-xl' : 'border-gray-200'
                  } p-6 relative`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <div className="text-3xl font-bold">€{pkg.price}</div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleCheckout(pkg.id)}
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                      pkg.isPopular
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Select Package</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6">Important Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-2">Required Documents</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Valid passport with at least 6 months validity</li>
                  <li>• Recent passport-sized photographs</li>
                  <li>• Proof of travel arrangements</li>
                  <li>• Bank statements (last 3 months)</li>
                  <li>• Travel insurance documentation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Additional Fees</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• US Visa: Additional embassy fees may apply</li>
                  <li>• Express processing: +€100</li>
                  <li>• Document translation: €50 per page</li>
                  <li>• Additional family members: €75 per person</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer">
                    <h3 className="font-medium">How long does the visa process take?</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-600">
                    Most visa applications are processed within 24 hours of receiving all required documents. However, processing times may vary depending on the destination country and visa type.
                  </div>
                </details>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer">
                    <h3 className="font-medium">What happens if my visa is denied?</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-600">
                    In the rare case of a visa denial, we will assist you in understanding the reasons and help you reapply if possible. Our service fee is non-refundable, but embassy fees may be refundable depending on the circumstances.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}