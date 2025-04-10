import { NextResponse } from 'next/server';
import { createFlightNFT, listNFTOnOpenSea } from '@/services/flightNFT';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { flightId, walletAddress, price } = await request.json();

    if (!flightId || !walletAddress) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
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

    return NextResponse.json({
      success: true,
      nftData
    });
  } catch (error) {
    console.error('Error creating flight NFT:', error);
    return NextResponse.json(
      { error: 'Failed to create flight NFT' },
      { status: 500 }
    );
  }
}