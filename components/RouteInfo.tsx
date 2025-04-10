import React from 'react';
import { Clock, Navigation, Cloud, X } from 'lucide-react';
import type { RouteInfo, Weather } from '../types';

interface RouteInfoProps {
  routeInfo: RouteInfo;
  destinationWeather: Weather | null;
  onClose: () => void;
}

function formatDistance(distance: string): string {
  const numericDistance = parseFloat(distance);
  const kmDistance = `${numericDistance.toFixed(1)} km`;
  const milesDistance = `${(numericDistance * 0.621371).toFixed(1)} mi`;
  return `${kmDistance} (${milesDistance})`;
}

export default function RouteInfo({ routeInfo, destinationWeather, onClose }: RouteInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Trip Details</h3>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center space-x-3">
          <Navigation className="text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Distance</p>
            <p className="font-semibold">{formatDistance(routeInfo.distance)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Clock className="text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Flight Time</p>
            <p className="font-semibold">{routeInfo.duration}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Cloud className="text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Destination Weather</p>
            <p className="font-semibold">
              {destinationWeather ? `${destinationWeather.temp}°C, ${destinationWeather.description}` : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}