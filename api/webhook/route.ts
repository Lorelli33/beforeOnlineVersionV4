import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();

  if (!sig || !endpointSecret) {
    return NextResponse.json({ error: 'Webhook signature missing' }, { status: 400 });
  }

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      sig,
      endpointSecret
    );

    // Handle successful payments
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      const { service_type, offerId } = session.metadata || {};

      if (!service_type || !offerId) {
        throw new Error('Missing service details in session metadata');
      }

      switch (service_type) {
        case 'visa':
          // Create visa application record
          await supabase
            .from('visa_applications')
            .insert([{
              package_id: offerId,
              user_id: session.client_reference_id,
              status: 'pending',
              payment_id: session.payment_intent as string,
              amount: session.amount_total ? session.amount_total / 100 : 0,
              currency: session.currency?.toUpperCase()
            }]);
          break;

        case 'empty_leg':
        case 'fixed_offer':
          // Update offer status
          const { error: updateError } = await supabase
            .from('fixed_offers')
            .update({ status: 'booked' })
            .eq('id', offerId);

          if (updateError) throw updateError;

          // Create booking record
          const { error: bookingError } = await supabase
            .from('bookings')
            .insert([{
              offer_id: offerId,
              offer_type: service_type,
              status: 'confirmed',
              payment_id: session.payment_intent as string,
              amount: session.amount_total ? session.amount_total / 100 : 0,
              currency: session.currency?.toUpperCase()
            }]);

          if (bookingError) throw bookingError;
          break;

        default:
          throw new Error(`Unknown service type: ${service_type}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }
}