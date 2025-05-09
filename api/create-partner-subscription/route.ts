import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

export async function POST(request: Request) {
  try {
    const { tierId, tierType, price, currency, name, email, metadata } = await request.json();

    if (!tierId || !price || !currency || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Create a customer
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        tier_id: tierId,
        tier_type: tierType
      }
    });

    // Determine if this is a one-time payment or subscription
    const isOneTime = tierId === 'partner-lifetime';

    if (isOneTime) {
      // Create a one-time checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: `Lifetime Partnership`,
                description: 'One-time payment for lifetime partnership',
                metadata: {
                  tier_id: tierId,
                  tier_type: tierType,
                  ...metadata
                }
              },
              unit_amount: price * 100 // Convert to cents
            },
            quantity: 1
          }
        ],
        mode: 'payment',
        customer: customer.id,
        success_url: `${process.env.NEXT_PUBLIC_URL}/partner-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/partners`,
        metadata: {
          tier_id: tierId,
          tier_type: tierType,
          ...metadata
        }
      });

      return NextResponse.json({ sessionId: session.id });
    } else {
      // Create a subscription checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: tierType === 'partner' ? `${name} Partnership` : `Yacht Listing (${name})`,
                description: tierType === 'partner' ? 'Annual partnership subscription' : 'Annual yacht listing subscription',
                metadata: {
                  tier_id: tierId,
                  tier_type: tierType,
                  ...metadata
                }
              },
              unit_amount: price * 100, // Convert to cents
              recurring: {
                interval: 'year'
              }
            },
            quantity: 1
          }
        ],
        mode: 'subscription',
        customer: customer.id,
        success_url: `${process.env.NEXT_PUBLIC_URL}/partner-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/partners`,
        metadata: {
          tier_id: tierId,
          tier_type: tierType,
          ...metadata
        }
      });

      return NextResponse.json({ sessionId: session.id });
    }
  } catch (error) {
    console.error('Error creating partner subscription:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}