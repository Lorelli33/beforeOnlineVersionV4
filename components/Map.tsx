'use client';

import React, { useState, useEffect, useRef } from 'react';
import Map, { 
  Source,
  Layer,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  MapRef
} from 'react-map-gl';
import type { Location, Stop } from '@/types';
import { format } from 'date-fns';
import { Building2, MapPin, Phone, Clock, MapPinned, X } from 'lucide-react';
import { logger } from '@/utils/logger';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxMapProps {
  origin: Location | null;
  destination: Location | null;
  isReturn: boolean;
  stops: Stop[];
  selectedDate?: string;
  selectedTime?: string;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoicHJpdmF0ZWNoYXJ0ZXJ4IiwiYSI6ImNtN2Z4empwNzA2Z2wyanM3NWN2Znpmbm4ifQ.nuvmpND_qtdsauY-n8F_9g';

// Center on Europe by default
const initialViewState = {
  longitude: 10.0,
  latitude: 51.0,
  zoom: 4.0,
  pitch: 45,
  bearing: 0
};

const OFFICE_LOCATIONS = [
  {
    id: "london",
    name: "London Office",
    address: "71-75 Shelton Street, Covent Garden",
    city: "London",
    postcode: "WC2H 9JQ",
    country: "United Kingdom",
    phone: "+41 44 797 88 53",
    hours: "Mo-Su, 00:00 - 23:59",
    lat: 51.5155,
    lng: -0.1229
  },
  {
    id: "zurich",
    name: "Zurich Office",
    address: "Bahnhofstrasse 10",
    city: "Zurich",
    postcode: "8001",
    country: "Switzerland",
    phone: "+41 44 797 88 53",
    hours: "Mo-Su, 00:00 - 23:59",
    lat: 47.3769,
    lng: 8.5417
  },
  {
    id: "miami",
    name: "Miami Office",
    address: "1000 Brickell Ave, Suite 715",
    city: "Miami",
    postcode: "33131",
    country: "United States",
    phone: "+41 44 797 88 53",
    hours: "Mo-Su, 00:00 - 23:59",
    lat: 25.7617,
    lng: -80.1918
  }
];

const LOCATION_COLORS = {
  origin: 'bg-blue-500',
  destination: 'bg-green-500',
  stop1: 'bg-orange-500',
  stop2: 'bg-purple-500',
  stop3: 'bg-pink-500',
  stop4: 'bg-indigo-500'
};

interface ExtendedLocation extends Location {
  id?: string;
  name?: string; 
  address?: string; 
  city?: string; 
  postcode?: string; 
  country?: string;
  phone?: string;
  hours?: string;
  date?: string;
  time?: string;
}

export default function MapboxMap({ 
  origin, 
  destination, 
  isReturn, 
  stops,
  selectedDate,
  selectedTime
}: MapboxMapProps) {
  const [viewState, setViewState] = useState(initialViewState);
  const [selectedLocation, setSelectedLocation] = useState<ExtendedLocation | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<MapRef>(null);
  const animationRef = useRef<number>();

  // Auto-rotation effect when no locations are selected
  useEffect(() => {
    const animate = () => {
      if (!origin && !destination && mapLoaded && mapRef.current) {
        setViewState(prev => ({
          ...prev,
          bearing: (prev.bearing + 0.1) % 360
        }));
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (!origin && !destination && mapLoaded) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [origin, destination, mapLoaded]);

  // Reset view state when locations are cleared
  useEffect(() => {
    if (!origin && !destination) {
      setViewState(initialViewState);
      setSelectedLocation(null);
      setShowPopup(false);
    }
  }, [origin, destination]);

  // Calculate route lines
  const routeGeoJson = React.useMemo(() => {
    if (!origin || !destination) return null;

    try {
      const features = [];
      let lastPoint = [origin.lng, origin.lat];

      // If there are stops, create a route through them
      if (stops.length > 0) {
        // Connect origin to first stop
        features.push({
          type: 'Feature',
          properties: { type: 'main' },
          geometry: {
            type: 'LineString',
            coordinates: [lastPoint, [stops[0].lng, stops[0].lat]]
          }
        });

        // Connect stops in sequence
        for (let i = 0; i < stops.length - 1; i++) {
          features.push({
            type: 'Feature',
            properties: { type: 'main' },
            geometry: {
              type: 'LineString',
              coordinates: [[stops[i].lng, stops[i].lat], [stops[i + 1].lng, stops[i + 1].lat]]
            }
          });
        }

        // Connect last stop to destination
        features.push({
          type: 'Feature',
          properties: { type: 'main' },
          geometry: {
            type: 'LineString',
            coordinates: [[stops[stops.length - 1].lng, stops[stops.length - 1].lat], [destination.lng, destination.lat]]
          }
        });
      } else {
        // Direct route from origin to destination
        features.push({
          type: 'Feature',
          properties: { type: 'main' },
          geometry: {
            type: 'LineString',
            coordinates: [[origin.lng, origin.lat], [destination.lng, destination.lat]]
          }
        });
      }

      // Add return route if selected
      if (isReturn) {
        features.push({
          type: 'Feature',
          properties: { type: 'return' },
          geometry: {
            type: 'LineString',
            coordinates: [[destination.lng, destination.lat], [origin.lng, origin.lat]]
          }
        });
      }

      return {
        type: 'FeatureCollection',
        features
      };
    } catch (error) {
      logger.error('Error calculating route:', error);
      return null;
    }
  }, [origin, destination, isReturn, stops]);

  // Update view state when locations change
  useEffect(() => {
    if (origin && destination && mapLoaded && mapRef.current) {
      try {
        let bounds = {
          minLng: Math.min(origin.lng, destination.lng),
          maxLng: Math.max(origin.lng, destination.lng),
          minLat: Math.min(origin.lat, destination.lat),
          maxLat: Math.max(origin.lat, destination.lat)
        };

        // Include all stops in bounds
        stops.forEach(stop => {
          bounds.minLng = Math.min(bounds.minLng, stop.lng);
          bounds.maxLng = Math.max(bounds.maxLng, stop.lng);
          bounds.minLat = Math.min(bounds.minLat, stop.lat);
          bounds.maxLat = Math.max(bounds.maxLat, stop.lat);
        });

        // Calculate center point
        const centerLng = (bounds.minLng + bounds.maxLng) / 2;
        const centerLat = (bounds.minLat + bounds.maxLat) / 2;

        // Calculate zoom based on bounds
        const dLng = Math.abs(bounds.maxLng - bounds.minLng);
        const dLat = Math.abs(bounds.maxLat - bounds.minLat);
        const maxDiff = Math.max(dLng, dLat);
        const zoom = Math.min(Math.max(2, 6 - Math.log2(maxDiff)), 5);

        setViewState({
          longitude: centerLng,
          latitude: centerLat,
          zoom,
          pitch: 45,
          bearing: 0
        });
      } catch (error) {
        logger.error('Error updating view state:', error);
      }
    }
  }, [origin, destination, stops, mapLoaded]);

  const mainRouteLayer = {
    id: 'main-route',
    type: 'line',
    filter: ['==', ['get', 'type'], 'main'],
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#000000',
      'line-width': 2,
      'line-opacity': 0.8,
      'line-dasharray': [2, 2]
    }
  } as const;

  const returnRouteLayer = {
    id: 'return-route',
    type: 'line',
    filter: ['==', ['get', 'type'], 'return'],
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#000000',
      'line-width': 3,
      'line-opacity': 0.6,
      'line-dasharray': [4, 4]
    }
  } as const;

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const handleMarkerClick = (location: ExtendedLocation) => {
    if (!location) return;
    
    setSelectedLocation(location);
    setShowPopup(true);
  };

  return (
    <Map
      ref={mapRef}
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      onLoad={handleMapLoad}
      style={{ width: '100%', height: '100%', background: '#ffffff' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
      attributionControl={false}
      dragRotate={true}
      touchZoomRotate={true}
      minZoom={2}
      maxZoom={5}
    >
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <NavigationControl />
        <FullscreenControl />
        <GeolocateControl
          trackUserLocation
          showUserHeading
        />
      </div>

      {/* Route lines */}
      {routeGeoJson && mapLoaded && (
        <Source
          id="route"
          type="geojson"
          data={routeGeoJson}
        >
          <Layer {...mainRouteLayer} />
          {isReturn && <Layer {...returnRouteLayer} />}
        </Source>
      )}

      {/* Office Locations */}
      {OFFICE_LOCATIONS.map((office) => (
        <Marker
          key={office.id}
          longitude={office.lng}
          latitude={office.lat}
          anchor="center"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            handleMarkerClick(office);
          }}
        >
          <div className="relative cursor-pointer group">
            <div className="p-2 bg-black rounded-lg shadow-lg transform transition-transform group-hover:scale-110">
              <Building2 size={16} className="text-white" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
          </div>
        </Marker>
      ))}

      {/* Origin marker */}
      {origin && (
        <Marker
          longitude={origin.lng}
          latitude={origin.lat}
          anchor="center"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            handleMarkerClick({
              ...origin,
              date: selectedDate,
              time: selectedTime
            });
          }}
        >
          <div className="relative cursor-pointer group">
            <div className="p-2 bg-blue-500 rounded-full shadow-lg transform transition-transform group-hover:scale-110">
              <MapPin size={16} className="text-white" />
            </div>
          </div>
        </Marker>
      )}

      {/* Stop markers */}
      {stops.map((stop, index) => (
        <Marker
          key={index}
          longitude={stop.lng}
          latitude={stop.lat}
          anchor="center"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            handleMarkerClick(stop);
          }}
        >
          <div className="relative cursor-pointer group">
            <div className={`p-2 ${LOCATION_COLORS[`stop${index + 1}` as keyof typeof LOCATION_COLORS] || LOCATION_COLORS.stop1} rounded-full shadow-lg transform transition-transform group-hover:scale-110`}>
              <MapPin size={16} className="text-white" />
            </div>
          </div>
        </Marker>
      ))}

      {/* Destination marker */}
      {destination && (
        <Marker
          longitude={destination.lng}
          latitude={destination.lat}
          anchor="center"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            handleMarkerClick({
              ...destination,
              date: selectedDate,
              time: selectedTime
            });
          }}
        >
          <div className="relative cursor-pointer group">
            <div className="p-2 bg-green-500 rounded-full shadow-lg transform transition-transform group-hover:scale-110">
              <MapPin size={16} className="text-white" />
            </div>
          </div>
        </Marker>
      )}

      {/* Location popup */}
      {showPopup && selectedLocation && (
        <Popup
          longitude={selectedLocation.lng}
          latitude={selectedLocation.lat}
          anchor="bottom"
          onClose={() => setShowPopup(false)}
          closeButton={false}
          closeOnClick={false}
          className="z-50"
          offset={20}
        >
          <div className="p-0 overflow-hidden rounded-lg shadow-lg bg-white/95 backdrop-blur-sm border border-gray-100 min-w-[220px]">
            {/* Header with close button */}
            <div className="flex items-center justify-between bg-black text-white p-3">
              <div className="font-medium text-sm">
                {selectedLocation.name || "Location Details"}
              </div>
              <button 
                onClick={() => setShowPopup(false)}
                className="p-1 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-3">
              {selectedLocation.name ? (
                <>
                  <div className="flex items-start gap-2 mb-2">
                    <MapPinned size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-600">{selectedLocation.address}</div>
                      <div className="text-sm text-gray-500">
                        {selectedLocation.city}, {selectedLocation.postcode}
                      </div>
                      <div className="text-sm text-gray-500">{selectedLocation.country}</div>
                    </div>
                  </div>
                  
                  {selectedLocation.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <Phone size={16} className="text-gray-500" />
                      <span>{selectedLocation.phone}</span>
                    </div>
                  )}
                  
                  {selectedLocation.hours && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <Clock size={16} className="text-gray-500" />
                      <span>{selectedLocation.hours}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="font-medium text-gray-900">{selectedLocation.address}</div>
                  {selectedLocation.date && selectedLocation.time && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <Clock size={16} className="text-gray-500" />
                      <span>{format(new Date(`${selectedLocation.date}T${selectedLocation.time}`), 'PPp')}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
}