'use client';

import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Info, ArrowRight, Grid, List } from 'lucide-react';
import { FixedOffer } from '@/app/fixed-offers/page';

interface EmptyLegsSectionProps {
  emptyLegs: FixedOffer[];
  loading: boolean;
  onOfferClick: (offer: FixedOffer) => void;
}

export default function EmptyLegsSection({ emptyLegs, loading, onOfferClick }: EmptyLegsSectionProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div>
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-bold mb-2">What are Empty Legs?</h3>
        <p className="text-gray-700">
          Empty leg flights occur when a private jet needs to return to its home base or reposition for its next booking without passengers. 
          These flights offer significant savings of up to 75% compared to standard charter rates. 
          They're perfect for flexible travelers looking for exceptional value on luxury private jet travel.
        </p>
      </div>

      {/* View Mode Switcher */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Available Empty Legs</h3>
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-label="List view"
          >
            <List size={20} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-label="Grid view"
          >
            <Grid size={20} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : emptyLegs.length > 0 ? (
        viewMode === 'list' ? (
          <div className="space-y-4">
            {emptyLegs.map((emptyLeg) => (
              <div 
                key={emptyLeg.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 cursor-pointer"
                onClick={() => onOfferClick(emptyLeg)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-48 md:h-auto">
                    <img 
                      src={emptyLeg.image_url || 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'} 
                      alt={emptyLeg.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-3/4 flex flex-col md:flex-row">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full mr-2">
                          Empty Leg
                        </span>
                        <span className="text-sm text-gray-500">
                          {emptyLeg.aircraft_type}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{emptyLeg.title}</h3>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          <span className="font-medium">{emptyLeg.origin}</span>
                          <ArrowRight size={16} className="mx-2 text-gray-400" />
                          <span className="font-medium">{emptyLeg.destination}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-2">
                        <div className="flex items-center text-sm">
                          <Calendar size={16} className="mr-1 text-gray-500" />
                          <span>{formatDate(emptyLeg.departure_date)}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock size={16} className="mr-1 text-gray-500" />
                          <span>{emptyLeg.duration}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users size={16} className="mr-1 text-gray-500" />
                          <span>Up to {emptyLeg.passengers} passengers</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-between items-end">
                      <div className="text-right">
                        <div className="text-sm text-gray-500 line-through">
                          Regular price: {emptyLeg.currency}{(emptyLeg.price * 3).toLocaleString()}
                        </div>
                        <div className="text-xl font-bold text-orange-600">
                          {emptyLeg.currency}{emptyLeg.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          Save up to 75%
                        </div>
                      </div>
                      
                      <button className="mt-4 text-sm bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {emptyLegs.map((emptyLeg) => (
              <div 
                key={emptyLeg.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 cursor-pointer group"
                onClick={() => onOfferClick(emptyLeg)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={emptyLeg.image_url || 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'} 
                    alt={emptyLeg.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Empty Leg
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2">{emptyLeg.title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{emptyLeg.origin} to {emptyLeg.destination}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(emptyLeg.departure_date)}</span>
                    </div>
                    <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
                      <Users size={14} className="mr-1" />
                      <span>Up to {emptyLeg.passengers} pax</span>
                    </div>
                    <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
                      <Clock size={14} className="mr-1" />
                      <span>{emptyLeg.duration}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500 line-through">
                        {emptyLeg.currency}{(emptyLeg.price * 3).toLocaleString()}
                      </div>
                      <div className="text-lg font-bold text-orange-600">
                        {emptyLeg.currency}{emptyLeg.price.toLocaleString()}
                      </div>
                    </div>
                    <button className="text-xs bg-black text-white px-3 py-1.5 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No empty legs available</h3>
          <p className="text-gray-500 mt-2">
            No empty leg flights match your search criteria. Please try different search terms or check back later.
          </p>
        </div>
      )}
    </div>
  );
}