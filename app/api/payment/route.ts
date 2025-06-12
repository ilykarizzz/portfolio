import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
// Use an environment variable in production
const stripe = new Stripe('sk_test_YourStripeSecretKey', {
  apiVersion: '2023-10-16',
});

// Domain for redirect URLs
const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

// Stripe API implementation with hardcoded product IDs
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service, productId: customProductId } = body;

    // Map service names to their respective Stripe product IDs
    const productIdMap: Record<string, string> = {
      'Mini-Wizytówka': 'prod_SToWufdSucPTdw',
      'Mała strona firmowa': 'prod_STqaqhcrtUmraV',
      'Pełna wersja': 'prod_STqbEHrK6ySwK5',
      'Abonament wsparcia technicznego': 'prod_STqZ0toutOFs01'
    };

    // Use the provided productId if available, otherwise look it up in the map
    const productId = customProductId || productIdMap[service];
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Invalid service selected' },
        { status: 400 }
      );
    }

    try {
      // Create a checkout session
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // For demo purposes, we're using the predefined product ID
            // In production, you would likely use price_XXX instead
            price_data: {
              currency: 'pln',
              product: productId,
              unit_amount: body.amount * 100, // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${domain}/success`,
        cancel_url: `${domain}/cancel`,
      });

      return NextResponse.json({
        success: true,
        paymentUrl: session.url,
      });
    } catch (stripeError) {
      console.error('Stripe error:', stripeError);
      
      // For demo purposes, if Stripe integration fails, use mock data
      return NextResponse.json({
        success: true,
        message: `Demo mode: Payment intent created for ${service}`,
        productId: productId,
        paymentUrl: `${domain}/success?demo=true`,
      });
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}
