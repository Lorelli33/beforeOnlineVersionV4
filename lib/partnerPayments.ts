'use client';

import { loadStripe } from '@stripe/stripe-js';
import { logger } from '@/utils/logger';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface PartnerSubscriptionOptions {
  tierId: string;
  tierType: 'partner' | 'yacht';
  price: number;
  currency: string;
  name: string;
  email: string;
  metadata?: Record<string, string>;
}

export const createPartnerSubscription = async (options: PartnerSubscriptionOptions) => {
  try {
    const response = await fetch('/api/create-partner-subscription', {
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
    logger.error('Error creating partner subscription:', error);
    return { error: 'Failed to create subscription' };
  }
};