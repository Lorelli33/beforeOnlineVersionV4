import { createFlightNFT, listNFTOnOpenSea } from '../src/services/flightNFT';
import { supabase } from '../src/lib/supabase';
import { logger } from '../src/utils/logger';

const POLL_INTERVAL = 5 * 60 * 1000; // 5 minutes

async function monitorFlights() {
  try {
    // Get latest flight from database
    const { data: latestFlight } = await supabase
      .from('flights')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!latestFlight) {
      logger.info('No flights found to process');
      return;
    }

    // Check if NFT already exists for this flight
    const { data: existingNFT } = await supabase
      .from('flight_nfts')
      .select('*')
      .eq('flight_id', latestFlight.id)
      .single();

    if (existingNFT) {
      logger.info('NFT already exists for flight:', latestFlight.id);
      return;
    }

    // Create NFT
    const nftData = await createFlightNFT(latestFlight.id);
    logger.info('Created NFT for flight:', { flightId: latestFlight.id, tokenId: nftData.tokenId });

    // List on OpenSea with default price
    const listing = await listNFTOnOpenSea(nftData.tokenId, 0.1); // 0.1 ETH default price
    logger.info('Listed NFT on OpenSea:', listing);

    // Update database with NFT info
    await supabase
      .from('flight_nfts')
      .update({
        opensea_url: listing.listingUrl,
        list_price: 0.1
      })
      .eq('token_id', nftData.tokenId);

  } catch (error) {
    logger.error('Error in flight monitor:', error);
  }
}

// Start monitoring
function startMonitor() {
  logger.info('Starting flight monitor...');
  
  // Run immediately
  monitorFlights();
  
  // Then run on interval
  setInterval(monitorFlights, POLL_INTERVAL);
}

startMonitor();