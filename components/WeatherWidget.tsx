import React, { useState, useEffect } from 'react';
import { Cloud, Sun, Wind, X } from 'lucide-react';
import type { Location } from '../types';
import { logger } from '../utils/logger';

interface WeatherWidgetProps {
  location: Location;
  onClose: () => void;
}

interface WeatherData {
  temp: number;
  wind: number;
  description?: string;
  error?: string;
}

export default function WeatherWidget({ location, onClose }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch weather data immediately when location changes
  useEffect(() => {
    let isMounted = true;

    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lng}&current=temperature_2m,wind_speed_10m&timezone=auto`
        );
        
        if (!isMounted) return;

        if (!response.ok) {
          throw new Error('Weather API request failed');
        }

        const data = await response.json();
        
        if (!data?.current) {
          throw new Error('Invalid weather data received');
        }

        setWeather({
          temp: Math.round(data.current.temperature_2m),
          wind: Math.round(data.current.wind_speed_10m),
          description: data.current.temperature_2m > 20 ? 'Warm' : 'Cool'
        });
      } catch (error) {
        if (!isMounted) return;
        logger.error('Error fetching weather:', error);
        setWeather({
          temp: 0,
          wind: 0,
          error: 'Unable to fetch weather data'
        });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (location?.lat && location?.lng) {
      fetchWeather();
    }

    return () => {
      isMounted = false;
    };
  }, [location]);

  const getLocationName = () => {
    if (!location?.address) return '';
    return location.address.split('(')[0].trim();
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="text-orange-500">
            {weather && weather.temp > 20 ? (
              <Sun size={24} />
            ) : (
              <Cloud size={24} />
            )}
          </div>
          <div>
            <div className="text-sm font-medium">
              {getLocationName()}
            </div>
            <div className="text-xs text-gray-500">
              {isLoading ? (
                'Loading weather data...'
              ) : weather?.error ? (
                weather.error
              ) : (
                <div className="flex items-center gap-2">
                  <span>{weather?.temp}°C</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Wind size={12} className="text-gray-400" />
                    <span>{weather?.wind} km/h</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}