import { NextResponse } from 'next/server';

// Stripe API implementation with hardcoded product IDs
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service } = body;

    // Map service names to their respective Stripe product IDs
    const productIdMap: Record<string, string> = {
      'Mini-Wizytówka': 'prod_SToWufdSucPTdw',
      'Mała strona firmowa': 'prod_STqaqhcrtUmraV',
      'Pełna wersja': 'prod_STqbEHrK6ySwK5'
    };

    const productId = productIdMap[service];
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Invalid service selected' },
        { status: 400 }
      );
    }

    // In a real implementation with Stripe SDK:
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const session = await stripe.checkout.sessions.create({
    //   line_items: [{price: productId, quantity: 1}],
    //   mode: 'payment',
    //   success_url: `${process.env.DOMAIN}/success`,
    //   cancel_url: `${process.env.DOMAIN}/cancel`,
    // });

    // For now, we'll return a mock success response with the actual product ID
    return NextResponse.json({
      success: true,
      message: `Payment intent created for ${service}`,
      productId: productId,
      paymentUrl: `https://checkout.stripe.com/pay/${productId}`,
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}
