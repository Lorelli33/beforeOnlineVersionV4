import { Handler } from '@netlify/functions';
import { createFlightNFT, listNFTOnOpenSea } from '../../src/services/flightNFT';
import { supabase } from '../../src/lib/supabase';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { flightId, walletAddress, price } = JSON.parse(event.body || '{}');

    if (!flightId || !walletAddress) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' })
      };
    }

    // Create NFT
    const nftData = await createFlightNFT(flightId, walletAddress);

    // List on OpenSea if price is provided
    if (price) {
      const listing = await listNFTOnOpenSea(nftData.tokenId, price);
      
      // Update database with listing info
      await supabase
        .from('flight_nfts')
        .update({
          opensea_url: listing.listingUrl,
          list_price: price
        })
        .eq('token_id', nftData.tokenId);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        nftData
      })
    };
  } catch (error) {
    console.error('Error creating flight NFT:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to create flight NFT'
      })
    };
  }
};