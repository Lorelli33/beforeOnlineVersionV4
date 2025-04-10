import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Clock, RotateCcw, Users, Briefcase, Dog, Plus, X, ChevronRight, ChevronDown } from 'lucide-react';
import type { Location, BookingDetails, Stop } from '@/types';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { airports } from '@/data/airports';

interface LocationSearchProps {
  onOriginChange: (location: Location) => void;
  onDestinationChange: (location: Location) => void;
  onDateSelect: () => void;
  onCalculate: () => void;
  isReturn: boolean;
  onReturnChange: (isReturn: boolean) => void;
  stops: Stop[];
  onStopChange: (stop: Stop, index: number) => void;
  onAddStop: () => void;
  onRemoveStop: (index: number) => void;
  selectedDate?: string;
  selectedTime?: string;
  returnDate?: string;
  returnTime?: string;
  onReturnDateSelect?: () => void;
  showMultiLeg?: boolean;
  onMultiLegChange?: (show: boolean) => void;
}

export default function LocationSearch({
  onOriginChange,
  onDestinationChange,
  onDateSelect,
  onCalculate,
  isReturn,
  onReturnChange,
  stops,
  onStopChange,
  onAddStop,
  onRemoveStop,
  selectedDate,
  selectedTime,
  returnDate,
  returnTime,
  onReturnDateSelect,
  showMultiLeg,
  onMultiLegChange
}: LocationSearchProps) {
  const { t } = useTranslation();
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [originInput, setOriginInput] = useState("");
  const [destInput, setDestInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [newStopInput, setNewStopInput] = useState("");
  const [showNewStopDropdown, setShowNewStopDropdown] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const originInputRef = useRef<HTMLInputElement>(null);
  const destInputRef = useRef<HTMLInputElement>(null);
  const originDropdownRef = useRef<HTMLDivElement>(null);
  const destDropdownRef = useRef<HTMLDivElement>(null);
  const newStopDropdownRef = useRef<HTMLDivElement>(null);

  // Load saved search data from localStorage
  useEffect(() => {
    const savedSearch = localStorage.getItem('searchData');
    if (savedSearch) {
      try {
        const { origin, destination } = JSON.parse(savedSearch);
        if (origin) {
          setOriginInput(origin.address);
          onOriginChange(origin);
        }
        if (destination) {
          setDestInput(destination.address);
          onDestinationChange(destination);
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  // Auto-collapse when both locations are set
  useEffect(() => {
    if (originInput && destInput) {
      setShowOptions(true);
    }
  }, [originInput, destInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside the container
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowOriginDropdown(false);
        setShowDestDropdown(false);
        setShowNewStopDropdown(false);
        return;
      }

      // Check if click is outside specific dropdowns
      if (originDropdownRef.current && !originDropdownRef.current.contains(event.target as Node) && 
          event.target !== originInputRef.current) {
        setShowOriginDropdown(false);
      }
      if (destDropdownRef.current && !destDropdownRef.current.contains(event.target as Node) && 
          event.target !== destInputRef.current) {
        setShowDestDropdown(false);
      }
      if (newStopDropdownRef.current && !newStopDropdownRef.current.contains(event.target as Node)) {
        setShowNewStopDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMultiLegToggle = (checked: boolean) => {
    if (onMultiLegChange) {
      onMultiLegChange(checked);
    }
    
    // If turning off multi-leg, remove all stops
    if (!checked && stops.length > 0) {
      stops.forEach((_, index) => onRemoveStop(index));
    }
    
    setNewStopInput("");
  };

  const filterAirports = (input: string) => {
    if (!input.trim()) return {};
    const searchTerm = input.toLowerCase().trim();
    
    const filtered = Object.entries(airports).filter(([name, { code }]) => {
      const nameParts = name.toLowerCase().split(/[\s()-]+/);
      const codePart = code.toLowerCase();
      
      return nameParts.some(part => part.includes(searchTerm)) ||
             codePart.includes(searchTerm) ||
             name.toLowerCase().includes(searchTerm);
    });

    const grouped = filtered.reduce((acc, [name, data]) => {
      const region = data.region;
      if (!acc[region]) acc[region] = [];
      acc[region].push([name, data]);
      return acc;
    }, {} as Record<string, typeof filtered>);

    return grouped;
  };

  const handleLocationSelect = (address: string, coords: { lat: number; lng: number; code: string; region: string }, type: 'origin' | 'destination' | 'stop', index?: number) => {
    const location = { 
      address, 
      ...coords,
      date: selectedDate || '',
      time: selectedTime || ''
    };
    
    if (type === 'origin') {
      setOriginInput(address);
      setShowOriginDropdown(false);
      onOriginChange(location);
      // Save to localStorage
      const savedSearch = localStorage.getItem('searchData');
      const searchData = savedSearch ? JSON.parse(savedSearch) : {};
      localStorage.setItem('searchData', JSON.stringify({
        ...searchData,
        origin: location
      }));
    } else if (type === 'destination') {
      setDestInput(address);
      setShowDestDropdown(false);
      onDestinationChange(location);
      // Save to localStorage
      const savedSearch = localStorage.getItem('searchData');
      const searchData = savedSearch ? JSON.parse(savedSearch) : {};
      localStorage.setItem('searchData', JSON.stringify({
        ...searchData,
        destination: location
      }));
    } else if (type === 'stop' && typeof index === 'number') {
      onStopChange({ ...location, date: selectedDate || '', time: selectedTime || '' }, index);
      setNewStopInput('');
      setShowNewStopDropdown(false);
    }
  };

  const handleClearOrigin = () => {
    setOriginInput("");
    onOriginChange({ lat: 0, lng: 0, address: "" });
    setShowOptions(false);
    // Update localStorage
    const savedSearch = localStorage.getItem('searchData');
    if (savedSearch) {
      const searchData = JSON.parse(savedSearch);
      delete searchData.origin;
      localStorage.setItem('searchData', JSON.stringify(searchData));
    }
  };

  const handleClearDestination = () => {
    setDestInput("");
    onDestinationChange({ lat: 0, lng: 0, address: "" });
    setShowOptions(false);
    // Update localStorage
    const savedSearch = localStorage.getItem('searchData');
    if (savedSearch) {
      const searchData = JSON.parse(savedSearch);
      delete searchData.destination;
      localStorage.setItem('searchData', JSON.stringify(searchData));
    }
  };

  const renderDropdown = (input: string, onSelect: (name: string, data: any) => void, dropdownRef: React.RefObject<HTMLDivElement>) => {
    const results = filterAirports(input);
    const hasResults = Object.keys(results).length > 0;

    return (
      <div 
        ref={dropdownRef}
        className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden z-30"
        style={{ maxHeight: '300px', overflowY: 'auto' }}
      >
        {hasResults ? (
          Object.entries(results).map(([region, airports]) => (
            <div key={region}>
              <div className="sticky top-0 px-4 py-2 bg-gray-50 text-sm font-medium text-gray-600 z-10">
                {region}
              </div>
              {airports.map(([name, data]) => (
                <button
                  key={name}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 border-t border-gray-100 first:border-0"
                  onClick={() => onSelect(name, data)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 text-sm">{name}</span>
                    <span className="text-gray-500 text-xs font-mono">{data.code}</span>
                  </div>
                </button>
              ))}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No airports found
          </div>
        )}
      </div>
    );
  };

  return (
    <form className="flex flex-col bg-white rounded-2xl" ref={containerRef} noValidate>
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Search Flight</h2>
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronDown
            size={20}
            className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'h-0 overflow-hidden' : 'h-auto'}`}>
        <div className="p-4 space-y-4">
          {/* Location Inputs */}
          <div className="relative bg-gray-50 p-2 rounded-xl">
            {/* Origin Input */}
            <div className="relative">
              <div className="absolute left-3 top-2.5 text-gray-400">
                <MapPin size={18} />
              </div>
              <input
                type="text"
                ref={originInputRef}
                required
                value={originInput}
                onChange={(e) => {
                  setOriginInput(e.target.value);
                  setShowOriginDropdown(true);
                }}
                onFocus={() => setShowOriginDropdown(true)}
                placeholder={t('departure')}
                className="w-full pl-10 pr-10 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm shadow-sm"
              />
              {originInput && (
                <button
                  type="button"
                  onClick={handleClearOrigin}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
              {showOriginDropdown && renderDropdown(originInput, (name, data) => handleLocationSelect(name, data, 'origin'), originDropdownRef)}
            </div>

            {/* Destination Input */}
            <div className="relative mt-1">
              <div className="absolute left-3 top-2.5 text-gray-400">
                <MapPin size={18} />
              </div>
              <input
                type="text"
                ref={destInputRef}
                value={destInput}
                onChange={(e) => {
                  setDestInput(e.target.value);
                  setShowDestDropdown(true);
                }}
                onFocus={() => setShowDestDropdown(true)}
                placeholder={t('arrival')}
                className="w-full pl-10 pr-10 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm shadow-sm"
              />
              {destInput && (
                <button
                  type="button"
                  onClick={handleClearDestination}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
              {showDestDropdown && renderDropdown(destInput, (name, data) => handleLocationSelect(name, data, 'destination'), destDropdownRef)}
            </div>

            {/* Multi-leg Stops */}
            {showMultiLeg && (
              <div className="mt-2 space-y-2">
                {stops.map((stop, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-700">{stop.address}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveStop(index)}
                        className="p-1 hover:bg-gray-200 rounded-full text-gray-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* New Stop Input */}
                <div className="relative mt-2">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <div className="absolute left-3 top-2.5 text-gray-400">
                        <MapPin size={18} />
                      </div>
                      <input
                        type="text"
                        value={newStopInput}
                        onChange={(e) => {
                          setNewStopInput(e.target.value);
                          setShowNewStopDropdown(true);
                        }}
                        onFocus={() => setShowNewStopDropdown(true)}
                        placeholder="Add stop location"
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm shadow-sm"
                      />
                      {showNewStopDropdown && renderDropdown(newStopInput, (name, data) => {
                        handleLocationSelect(name, data, 'stop', stops.length);
                        onAddStop();
                      }, newStopDropdownRef)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Options */}
          {showOptions && (
            <div className="space-y-3">
              {/* Flight Type Selection */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <label className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={showMultiLeg}
                    onChange={(e) => handleMultiLegToggle(e.target.checked)}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-gray-700">{t('multiLeg')}</span>
                </label>
                <label className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={isReturn}
                    onChange={(e) => onReturnChange(e.target.checked)}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <RotateCcw size={16} className="text-gray-500" />
                  <span className="text-gray-700">{t('returnFlight')}</span>
                </label>
              </div>

              {/* Date and Time Buttons */}
              <div className="space-y-2">
                {/* Departure Date/Time */}
                <button
                  type="button"
                  onClick={onDateSelect}
                  className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="text-gray-400" size={18} />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {selectedDate ? format(new Date(selectedDate), 'EEE, MMM d') : t('selectDate')}
                      </div>
                      {selectedTime && (
                        <div className="text-xs text-gray-500">{selectedTime}</div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={18} />
                </button>

                {/* Return Date/Time - Only show when isReturn is true */}
                {isReturn && (
                  <button
                    type="button"
                    onClick={onReturnDateSelect}
                    className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="text-gray-400" size={18} />
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {returnDate ? format(new Date(returnDate), 'EEE, MMM d') : t('selectReturnDate')}
                        </div>
                        {returnTime && (
                          <div className="text-xs text-gray-500">{returnTime}</div>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400" size={18} />
                  </button>
                )}
              </div>

              <button 
                type="button"
                onClick={onCalculate}
                disabled={!originInput || !destInput || (isReturn && (!returnDate || !returnTime))}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('continue')}
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}