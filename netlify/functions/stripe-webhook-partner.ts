import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { supabase } from '../../src/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const sig = event.headers['stripe-signature'];

  if (!sig || !endpointSecret) {
    return { statusCode: 400, body: 'Webhook signature missing' };
  }

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body || '',
      sig,
      endpointSecret
    );

    // Handle successful payments and subscriptions
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      const { tier_id, tier_type } = session.metadata || {};

      if (!tier_id || !tier_type) {
        throw new Error('Missing tier details in session metadata');
      }

      // Get customer email
      const customerEmail = session.customer_email || '';
      
      // Determine if this is a partner or yacht listing
      if (tier_type === 'partner') {
        // Handle partner subscription
        const { error: partnerError } = await supabase
          .from('partners')
          .insert([{
            company_name: session.metadata?.companyName || 'Unknown Company',
            contact_name: session.metadata?.name || 'Unknown',
            email: customerEmail,
            phone: session.metadata?.phone || '',
            website: session.metadata?.website || '',
            description: session.metadata?.description || '',
            tier: tier_id,
            status: 'active',
            subscription_id: session.subscription || session.payment_intent,
            expires_at: tier_id === 'partner-lifetime' 
              ? null 
              : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
          }]);

        if (partnerError) throw partnerError;
      } else if (tier_type === 'yacht') {
        // Handle yacht listing
        const { error: yachtError } = await supabase
          .from('yacht_listings')
          .insert([{
            yacht_name: session.metadata?.yachtName || 'Unknown Yacht',
            yacht_size: session.metadata?.yachtSize || '',
            yacht_type: session.metadata?.yachtType || '',
            yacht_year: session.metadata?.yachtYear || '',
            yacht_capacity: session.metadata?.yachtCapacity || '',
            yacht_location: session.metadata?.yachtLocation || '',
            description: session.metadata?.description || '',
            contact_name: session.metadata?.name || 'Unknown',
            email: customerEmail,
            phone: session.metadata?.phone || '',
            tier: tier_id,
            status: 'active',
            subscription_id: session.subscription || session.payment_intent,
            expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
          }]);

        if (yachtError) throw yachtError;
      }
    }

    // Handle subscription renewals
    if (stripeEvent.type === 'invoice.paid') {
      const invoice = stripeEvent.data.object as Stripe.Invoice;
      const subscriptionId = invoice.subscription;
      
      if (subscriptionId) {
        // Update partner expiration date
        const { data: partnerData, error: partnerError } = await supabase
          .from('partners')
          .update({
            status: 'active',
            updated_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
          })
          .eq('subscription_id', subscriptionId)
          .select();

        if (partnerError) throw partnerError;

        // If no partner was updated, check yacht listings
        if (!partnerData || partnerData.length === 0) {
          const { error: yachtError } = await supabase
            .from('yacht_listings')
            .update({
              status: 'active',
              updated_at: new Date().toISOString(),
              expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
            })
            .eq('subscription_id', subscriptionId);

          if (yachtError) throw yachtError;
        }
      }
    }

    // Handle subscription cancellations
    if (stripeEvent.type === 'customer.subscription.deleted') {
      const subscription = stripeEvent.data.object as Stripe.Subscription;
      const subscriptionId = subscription.id;
      
      // Update partner status
      const { data: partnerData, error: partnerError } = await supabase
        .from('partners')
        .update({
          status: 'inactive',
          updated_at: new Date().toISOString()
        })
        .eq('subscription_id', subscriptionId)
        .select();

      if (partnerError) throw partnerError;

      // If no partner was updated, check yacht listings
      if (!partnerData || partnerData.length === 0) {
        const { error: yachtError } = await supabase
          .from('yacht_listings')
          .update({
            status: 'inactive',
            updated_at: new Date().toISOString()
          })
          .eq('subscription_id', subscriptionId);

        if (yachtError) throw yachtError;
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Webhook signature verification failed' })
    };
  }
};