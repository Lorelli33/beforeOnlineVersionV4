import React, { useState, useEffect, useRef } from 'react';
import { jetCategories, calculateRequiredStops, calculateTotalFlightTime, calculateTotalPrice } from '../data/jets';
import type { JetCategory, Location } from '../types';
import { ArrowLeft, Users, Gauge, Clock, MapPin, Plane, Filter, Check, Info, Shield, Briefcase, Coffee, ChevronDown, ArrowRight, X } from 'lucide-react';

interface JetSelectorProps {
  selectedJet: string | undefined;
  onSelect: (jetId: string) => void;
  requiredCapacity: number;
  distance: number;
  onBack: () => void;
  isFullscreen?: boolean;
  origin?: Location | null;
  destination?: Location | null;
}

type Currency = {
  code: string;
  symbol: string;
  rate: number;
};

const currencies: Currency[] = [
  { code: 'EUR', symbol: '€', rate: 1 },
  { code: 'USD', symbol: '$', rate: 1.08 },
  { code: 'GBP', symbol: '£', rate: 0.85 },
  { code: 'CHF', symbol: 'CHF', rate: 0.95 }
];

export default function JetSelector({ 
  selectedJet, 
  onSelect, 
  requiredCapacity, 
  distance, 
  onBack,
  isFullscreen = false,
  origin,
  destination 
}: JetSelectorProps) {
  const [loading, setLoading] = useState(true);
  const [showJets, setShowJets] = useState(false);
  const [selectedJetDetails, setSelectedJetDetails] = useState<(JetCategory & { 
    stops: number;
    flightTime: number;
    totalPrice: number;
  }) | null>(null);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    maxPrice: Infinity,
    minCapacity: requiredCapacity,
    maxStops: 1
  });
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Debug logging
  console.log('JetSelector props:', { requiredCapacity, distance });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowJets(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setShowCurrencyDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDistance = (km: number): string => {
    const miles = Math.round(km * 0.621371);
    return `${Math.round(km)} km (${miles} mi)`;
  };

  const formatDuration = (hours: number): string => {
    const fullHours = Math.floor(hours);
    const minutes = Math.round((hours - fullHours) * 60);
    return `${fullHours}h ${minutes}m`;
  };

  const formatPrice = (price: number): string => {
    const convertedPrice = price * selectedCurrency.rate;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(convertedPrice);
  };

  const categories = [...new Set(jetCategories.map(jet => jet.category))];
  const priceRanges = [
    { label: 'All Prices', value: Infinity },
    { label: `Under ${selectedCurrency.symbol}5,000/h`, value: 5000 },
    { label: `Under ${selectedCurrency.symbol}10,000/h`, value: 10000 },
    { label: `Under ${selectedCurrency.symbol}15,000/h`, value: 15000 }
  ];

  const availableJets = React.useMemo(() => {
    console.log('Calculating available jets with distance:', distance);
    return jetCategories
      .map(jet => {
        const stops = calculateRequiredStops(distance, jet.range);
        const flightTime = calculateTotalFlightTime(distance, jet.speed, stops);
        const totalPrice = calculateTotalPrice(distance, jet.speed, jet.pricePerHour, stops);
        
        return {
          ...jet,
          stops,
          flightTime,
          totalPrice
        };
      })
      .filter(jet => {
        const meetsCapacity = jet.capacity >= filters.minCapacity;
        const meetsStops = jet.stops <= filters.maxStops;
        const meetsPrice = jet.pricePerHour <= filters.maxPrice;
        const meetsCategory = filters.categories.length === 0 || filters.categories.includes(jet.category);
        
        return meetsCapacity && meetsStops && meetsPrice && meetsCategory;
      })
      .sort((a, b) => a.totalPrice - b.totalPrice);
  }, [distance, filters]);

  // Debug logging
  console.log('availableJets:', availableJets);

  useEffect(() => {
    if (selectedJet) {
      const jet = availableJets.find(j => j.id === selectedJet);
      if (jet) {
        setSelectedJetDetails(jet);
      }
    } else {
      setSelectedJetDetails(null);
    }
  }, [selectedJet, availableJets]);

  const getLocationDetails = (location?: Location | null) => {
    if (!location?.address) return { city: '', code: '' };
    const parts = location.address.split('(');
    return {
      city: parts[0].trim(),
      code: parts[1]?.replace(')', '') || ''
    };
  };

  const handleJetSelect = (jetId: string) => {
    if (showDetails) {
      onSelect(jetId);
    } else {
      const jet = availableJets.find(j => j.id === jetId);
      if (jet) {
        setSelectedJetDetails(jet);
        setShowDetails(true);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-gray-600"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {origin && destination ? (
            <span className="hidden md:flex items-center gap-2">
              <span>{getLocationDetails(origin).city}</span>
              <ArrowRight size={16} className="text-gray-400" />
              <span>{getLocationDetails(destination).city}</span>
            </span>
          ) : (
            'Select Aircraft'
          )}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Filter size={20} className="text-gray-600" />
          </button>
          <div className="relative" ref={currencyDropdownRef}>
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium">{selectedCurrency.code}</span>
              <ChevronDown size={16} className={`transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showCurrencyDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => {
                      setSelectedCurrency(currency);
                      setShowCurrencyDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span>{currency.code}</span>
                    {selectedCurrency.code === currency.code && (
                      <Check size={16} className="text-black" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {origin && destination && (
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-sm text-gray-500">From</div>
                <div className="font-medium text-lg">{getLocationDetails(origin).city}</div>
                <div className="text-sm font-mono text-gray-600">{getLocationDetails(origin).code}</div>
              </div>
              <ArrowRight size={20} className="text-gray-400" />
              <div>
                <div className="text-sm text-gray-500">To</div>
                <div className="font-medium text-lg">{getLocationDetails(destination).city}</div>
                <div className="text-sm font-mono text-gray-600">{getLocationDetails(destination).code}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Distance</div>
              <div className="font-medium">{formatDistance(distance)}</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <div className={`
          h-full
          ${isFullscreen 
            ? 'grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 lg:gap-8 p-4 lg:p-8' 
            : 'grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 p-4'
          }
        `}>
          <div className={`space-y-6 overflow-y-auto custom-scrollbar ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Flight Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance</span>
                  <span className="font-medium">{formatDistance(distance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Passengers</span>
                  <span className="font-medium">{requiredCapacity}</span>
                </div>
              </div>
            </div>

            {selectedJetDetails && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <h4 className="font-medium text-gray-900">Selected Aircraft Details</h4>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Basic Information</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-gray-400" />
                        <span>{selectedJetDetails.capacity} passengers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge size={14} className="text-gray-400" />
                        <span>{selectedJetDetails.speed} km/h</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Plane size={14} className="text-gray-400" />
                        <span>{formatDistance(selectedJetDetails.range)} range</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={14} className="text-gray-400" />
                        <span>8 bags</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Flight Details</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Flight Time</span>
                        <span>{formatDuration(selectedJetDetails.flightTime)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Required Stops</span>
                        <span>{selectedJetDetails.stops}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Price</span>
                        <span className="font-medium">{formatPrice(selectedJetDetails.totalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Amenities</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Coffee size={14} className="text-gray-400" />
                        <span>Full Bar</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-gray-400" />
                        <span>Wi-Fi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info size={14} className="text-gray-400" />
                        <span>Entertainment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!loading && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Aircraft Category</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category)}
                          onChange={(e) => {
                            setFilters(prev => ({
                              ...prev,
                              categories: e.target.checked
                                ? [...prev.categories, category]
                                : prev.categories.filter(c => c !== category)
                            }));
                          }}
                          className="rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="text-sm text-gray-600">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <label key={range.value} className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={filters.maxPrice === range.value}
                          onChange={() => {
                            setFilters(prev => ({
                              ...prev,
                              maxPrice: range.value
                            }));
                          }}
                          className="rounded-full border-gray-300 text-black focus:ring-black"
                        />
                        <span className="text-sm text-gray-600">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Maximum Stops</h4>
                  <select
                    value={filters.maxStops}
                    onChange={(e) => {
                      setFilters(prev => ({
                        ...prev,
                        maxStops: Number(e.target.value)
                      }));
                    }}
                    className="w-full rounded-lg border-gray-200 text-sm focus:ring-black focus:border-black"
                  >
                    <option value={0}>No stops</option>
                    <option value={1}>1 stop maximum</option>
                  </select>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                <p className="mt-4 text-sm text-gray-600">Finding suitable aircraft...</p>
              </div>
            )}
          </div>

          <div className={`overflow-y-auto custom-scrollbar pr-4 space-y-3 ${showFilters ? 'hidden md:block' : 'block'}`}>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                <p className="mt-4 text-sm text-gray-600">Finding suitable aircraft from operators...</p>
                <p className="text-xs text-gray-500 mt-2">This may take a moment as we check availability</p>
              </div>
            ) : showJets && availableJets.length > 0 ? (
              availableJets.map((jet, index) => (
                <div
                  key={jet.id}
                  className="opacity-0 animate-fadeIn"
                  style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
                >
                  <button
                    onClick={() => handleJetSelect(jet.id)}
                    className={`relative w-full text-left p-4 rounded-xl border transition-all ${
                      selectedJet === jet.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-shrink-0 w-full md:w-32 h-20">
                        <img
                          src={jet.imageUrl}
                          alt={jet.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-0">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">{jet.name}</h4>
                            <p className="text-sm text-gray-500">{jet.description}</p>
                          </div>
                          <div className="text-xl font-semibold">{formatPrice(jet.totalPrice)}</div>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            <Users size={14} />
                            {jet.capacity} passengers
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <Clock size={14} />
                            {formatDuration(jet.flightTime)}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                            <Gauge size={14} />
                            {jet.speed} km/h
                          </span>
                          {jet.stops > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                              <MapPin size={14} />
                              {jet.stops} {jet.stops === 1 ? 'stop' : 'stops'} required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))
            ) : showJets && availableJets.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No aircraft available with the selected filters.</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or requirements.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Jet Details Modal */}
      {showDetails && selectedJetDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden">
            <div className="relative h-[250px]">
              <img 
                src={selectedJetDetails.imageUrl}
                alt={selectedJetDetails.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 p-2 bg-black/80 text-white rounded-full hover:bg-black/90"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 max-h-[calc(100vh-400px)] overflow-y-auto">
              <div className="flex justify-between items-start gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedJetDetails.name}</h2>
                  <p className="text-gray-600">{selectedJetDetails.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{formatPrice(selectedJetDetails.totalPrice)}</div>
                  <div className="text-sm text-gray-500">Total Price</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold mb-3">Aircraft Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium">{selectedJetDetails.category}</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600">Capacity</span>
                      <span className="font-medium">{selectedJetDetails.capacity} passengers</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600">Range</span>
                      <span className="font-medium">{formatDistance(selectedJetDetails.range)}</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600">Speed</span>
                      <span className="font-medium">{selectedJetDetails.speed} km/h</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Flight Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600">Flight Time</span>
                      <span className="font-medium">{formatDuration(selectedJetDetails.flightTime)}</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600">Required Stops</span>
                      <span className="font-medium">{selectedJetDetails.stops}</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600">Hourly Rate</span>
                      <span className="font-medium">{formatPrice(selectedJetDetails.pricePerHour)}/hour</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600">Total Price</span>
                      <span className="font-medium">{formatPrice(selectedJetDetails.totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <Coffee size={18} className="text-gray-500" />
                    <span className="text-sm">Full Bar</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <Shield size={18} className="text-gray-500" />
                    <span className="text-sm">Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <Briefcase size={18} className="text-gray-500" />
                    <span className="text-sm">Baggage Space</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <Info size={18} className="text-gray-500" />
                    <span className="text-sm">Entertainment</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onSelect(selectedJetDetails.id)}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}