import axios from 'axios';
import { supabase } from '../lib/supabase';
import { logger } from '../utils/logger';

const FLIGHTRADAR_API_KEY = import.meta.env.VITE_FLIGHTRADAR_API_KEY;
const ADMIN_WALLET = import.meta.env.VITE_ADMIN_WALLET;

interface FlightData {
  flightId: string;
  callsign: string;
  origin: string;
  destination: string;
  aircraft: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
}

export const fetchFlightData = async (flightId: string): Promise<FlightData> => {
  try {
    const response = await axios.get(`https://api.flightradar24.com/common/v1/flight.json?flight=${flightId}`, {
      headers: {
        'fr24-api-key': FLIGHTRADAR_API_KEY
      }
    });

    const flight = response.data.result.response.data[0];
    
    return {
      flightId: flight.identification.id,
      callsign: flight.identification.callsign,
      origin: flight.airport.origin.code.iata,
      destination: flight.airport.destination.code.iata,
      aircraft: flight.aircraft.model.text,
      departureTime: flight.time.scheduled.departure,
      arrivalTime: flight.time.scheduled.arrival,
      duration: flight.time.scheduled.duration
    };
  } catch (error) {
    logger.error('Error fetching flight data:', error);
    throw new Error('Failed to fetch flight data');
  }
};

export const createFlightNFT = async (flightId: string) => {
  try {
    // Fetch flight data
    const flightData = await fetchFlightData(flightId);

    // Mock NFT creation for development
    const tokenId = `NFT_${Date.now()}`;
    const metadataUri = `ipfs://mock/${tokenId}`;
    const openseaUrl = `https://opensea.io/assets/ethereum/${tokenId}`;

    // Save NFT details to database
    const { error: dbError } = await supabase
      .from('flight_nfts')
      .insert([{
        token_id: tokenId,
        flight_id: flightId,
        metadata_uri: metadataUri,
        owner_address: ADMIN_WALLET,
        flight_data: flightData,
        opensea_url: openseaUrl
      }]);

    if (dbError) throw dbError;

    return {
      tokenId,
      metadataUri,
      flightData,
      openseaUrl
    };
  } catch (error) {
    logger.error('Error creating flight NFT:', error);
    throw new Error('Failed to create flight NFT');
  }
};

export const listNFTOnOpenSea = async (tokenId: string): Promise<string> => {
  try {
    // Mock OpenSea listing for development
    const openseaUrl = `https://opensea.io/assets/ethereum/${tokenId}`;
    logger.info('NFT will be visible at:', openseaUrl);
    return openseaUrl;
  } catch (error) {
    logger.error('Error listing NFT on OpenSea:', error);
    throw new Error('Failed to list NFT on OpenSea');
  }
};