'use client';

import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';
import { logger } from '@/utils/logger';
import { web3Service } from './web3';

// Use Next.js environment variable syntax
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentOptions {
  offerId: string;
  offerType: 'fixed_offer' | 'empty_leg' | 'visa';
  price: number;
  currency: string;
  title: string;
  userInfo?: any;
}

export const createCheckoutSession = async (options: PaymentOptions) => {
  try {
    // First, save user info to database
    if (options.userInfo) {
      const { error: userInfoError } = await supabase
        .from('booking_user_info')
        .insert([{
          offer_id: options.offerId,
          offer_type: options.offerType,
          name: options.userInfo.name,
          email: options.userInfo.email,
          phone: options.userInfo.phone,
          birthdate: options.userInfo.birthdate || null,
          additional_services: options.userInfo.additionalServices,
          special_requests: options.userInfo.specialRequests || null
        }]);

      if (userInfoError) {
        logger.error('Error saving user info:', userInfoError);
        return { error: 'Failed to save user information' };
      }
    }

    // In Next.js, we'd use an API route for this
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    const { sessionId, error: responseError } = await response.json();
    
    if (responseError) {
      return { error: responseError };
    }
    
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      return { error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    logger.error('Error creating checkout session:', error);
    return { error: 'Failed to create checkout session' };
  }
};

// Process crypto payment using Web3
export const processCryptoPayment = async (
  offerId: string,
  offerType: 'fixed_offer' | 'empty_leg' | 'visa',
  priceInEth: number,
  walletAddress: string,
  userInfo?: any
) => {
  try {
    // First, save user info to database
    if (userInfo) {
      const { error: userInfoError } = await supabase
        .from('booking_user_info')
        .insert([{
          offer_id: offerId,
          offer_type: offerType,
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
          birthdate: userInfo.birthdate || null,
          additional_services: userInfo.additionalServices,
          special_requests: userInfo.specialRequests || null
        }]);

      if (userInfoError) {
        logger.error('Error saving user info:', userInfoError);
        return { error: 'Failed to save user information' };
      }
    }

    // Simulate crypto payment for now
    // In a real implementation, you would use web3Service to send a transaction
    const transactionHash = `0x${Math.random().toString(16).substring(2)}`;
    
    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert([{
        offer_id: offerId,
        offer_type: offerType,
        amount: priceInEth,
        currency: 'ETH',
        payment_method: 'crypto',
        status: 'pending',
        wallet_address: walletAddress,
        transaction_hash: transactionHash
      }])
      .select()
      .single();

    if (paymentError) {
      logger.error('Error creating payment record:', paymentError);
      return { error: 'Failed to process payment' };
    }

    // Return payment details
    return {
      success: true,
      paymentId: payment.id,
      amount: priceInEth,
      currency: 'ETH',
      walletAddress,
      transactionHash
    };
  } catch (error) {
    logger.error('Error processing crypto payment:', error);
    return { error: 'Failed to process crypto payment' };
  }
};

// Send payment request via email
export const sendPaymentRequest = async (
  offerId: string,
  offerType: 'fixed_offer' | 'empty_leg' | 'visa',
  userEmail: string,
  userInfo?: any
) => {
  try {
    // First, save user info to database
    if (userInfo) {
      const { error: userInfoError } = await supabase
        .from('booking_user_info')
        .insert([{
          offer_id: offerId,
          offer_type: offerType,
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
          birthdate: userInfo.birthdate || null,
          additional_services: userInfo.additionalServices,
          special_requests: userInfo.specialRequests || null
        }]);

      if (userInfoError) {
        logger.error('Error saving user info:', userInfoError);
        return { error: 'Failed to save user information' };
      }
    }

    // Create payment request record
    const { error: requestError } = await supabase
      .from('payment_requests')
      .insert([{
        offer_id: offerId,
        offer_type: offerType,
        user_email: userEmail,
        status: 'pending',
        details: userInfo
      }]);

    if (requestError) {
      logger.error('Error creating payment request:', requestError);
      return { error: 'Failed to create payment request' };
    }

    // Send notification to admin
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert([{
        type: 'payment_request',
        title: 'New Payment Request',
        message: `New payment request from ${userInfo?.name} for ${offerType}`,
        read: false
      }]);

    if (notificationError) {
      logger.error('Error creating notification:', notificationError);
      // Non-critical error, continue
    }

    return { success: true };
  } catch (error) {
    logger.error('Error sending payment request:', error);
    return { error: 'Failed to send payment request' };
  }
};