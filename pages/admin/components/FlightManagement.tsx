import React, { useState, useEffect } from 'react';
import { Plane, MapPin, Calendar, ArrowRight, Plus, Edit, Trash, Check, X, ExternalLink } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { createFlightNFT } from '../../../services/flightNFT';

interface Flight {
  id: string;
  callsign: string;
  aircraft_type: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  status: 'scheduled' | 'in-flight' | 'landed' | 'delayed';
  operator: string;
  nft?: {
    token_id: string;
    opensea_url: string;
  };
}

export default function FlightManagement() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [minting, setMinting] = useState<string | null>(null);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const { data: flightData, error: flightError } = await supabase
        .from('flights')
        .select(`
          *,
          nft:flight_nfts(token_id, opensea_url)
        `)
        .order('departure_time', { ascending: false });

      if (flightError) throw flightError;

      // Auto-mint NFTs for new flights
      const flightsWithoutNFTs = (flightData || []).filter(flight => !flight.nft);
      
      for (const flight of flightsWithoutNFTs) {
        try {
          setMinting(flight.id);
          const nftData = await createFlightNFT(flight.id);
          
          // Update flight with NFT data
          flight.nft = {
            token_id: nftData.tokenId,
            opensea_url: nftData.openseaUrl
          };
        } catch (error) {
          console.error(`Failed to mint NFT for flight ${flight.id}:`, error);
        }
      }

      setFlights(flightData || []);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setError('Failed to load flights');
    } finally {
      setLoading(false);
      setMinting(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-flight':
        return 'bg-green-100 text-green-800';
      case 'landed':
        return 'bg-gray-100 text-gray-800';
      case 'delayed':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Flight Management</h2>
        <p className="text-gray-600">Manage and track all private flights</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flight
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NFT
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {flights.map((flight) => (
                  <tr key={flight.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Plane size={20} className="text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{flight.callsign}</div>
                          <div className="text-sm text-gray-500">{flight.aircraft_type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin size={16} className="text-gray-400 mr-1" />
                        <span>{flight.origin}</span>
                        <ArrowRight size={14} className="mx-2 text-gray-400" />
                        <span>{flight.destination}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDateTime(flight.departure_time)}</div>
                      <div className="text-sm text-gray-500">{formatDateTime(flight.arrival_time)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(flight.status)}`}>
                        {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {minting === flight.id ? (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-4 h-4 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
                          <span>Minting...</span>
                        </div>
                      ) : flight.nft ? (
                        <a
                          href={flight.nft.opensea_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          View on OpenSea
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="text-sm text-gray-500">Not minted</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}