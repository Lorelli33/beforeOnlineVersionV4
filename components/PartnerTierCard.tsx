import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface PartnerTierProps {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  onSelect: (id: string) => void;
}

export default function PartnerTierCard({
  id,
  name,
  price,
  period,
  description,
  features,
  isPopular,
  onSelect
}: PartnerTierProps) {
  return (
    <div 
      className={`bg-white rounded-2xl border ${
        isPopular ? 'border-blue-500 shadow-xl' : 'border-gray-200 shadow-md'
      } overflow-hidden relative`}
    >
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      <div className={`p-6 ${isPopular ? 'pt-8' : ''}`}>
        <div className="mb-4">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        
        <div className="mb-6">
          <div className="text-3xl font-bold">€{price}</div>
          <div className="text-gray-500">
            {period === 'year' ? 'per year' : 'one-time payment'}
          </div>
        </div>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button
          onClick={() => onSelect(id)}
          className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
            isPopular
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-black text-white hover:bg-gray-800'
          } transition-colors`}
        >
          <span>Select Plan</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}