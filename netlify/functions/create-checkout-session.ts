import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { offerId, offerType, price, currency, title, userInfo } = JSON.parse(event.body || '{}');

    if (!offerId || !price || !currency || !title) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' })
      };
    }

    let successUrl = `${process.env.URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`;
    let cancelUrl = `${process.env.URL}/fixed-offers`;
    let metadata: Record<string, string> = { 
      offerId, 
      offerType,
      ...(userInfo ? {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone
      } : {})
    };

    // Different handling based on offer type
    if (offerType === 'visa') {
      successUrl = `${process.env.URL}/visa-success?session_id={CHECKOUT_SESSION_ID}`;
      cancelUrl = `${process.env.URL}/visa-services`;
      metadata = {
        ...metadata,
        service_type: 'visa',
        package_id: offerId
      };
    } else if (offerType === 'empty_leg') {
      metadata = {
        ...metadata,
        service_type: 'empty_leg',
        offer_id: offerId
      };
    } else {
      metadata = {
        ...metadata,
        service_type: 'fixed_offer',
        offer_id: offerId
      };
    }

    // Add additional services to metadata if present
    if (userInfo?.additionalServices) {
      Object.entries(userInfo.additionalServices).forEach(([key, value]) => {
        if (value) {
          metadata[`service_${key}`] = 'true';
        }
      });
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: title,
              metadata
            },
            unit_amount: price * 100 // Convert to cents
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
      customer_email: userInfo?.email
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id })
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create checkout session' })
    };
  }
};