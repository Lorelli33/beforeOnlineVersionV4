import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface YachtTierProps {
  id: string;
  name: string;
  size: string;
  price: number;
  period: string;
  features: string[];
  onSelect: (id: string) => void;
}

export default function YachtTierCard({
  id,
  name,
  size,
  price,
  period,
  features,
  onSelect
}: YachtTierProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-600 mt-1">Yacht size: {size}</p>
        </div>
        
        <div className="mb-6">
          <div className="text-3xl font-bold">€{price}</div>
          <div className="text-gray-500">per year</div>
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
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <span>List Your Yacht</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}