"use client";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your publishable key
const stripePromise = loadStripe('pk_test_51NHUD0AVauGXA9b0tCEeuLoeY18v0gx5mDsmwYd8f3Fz9kRZ8jQjW5ZXeQZW7Be79elSl3fNtGBPo8zZzQK9RDMJ00Vf7waKdv');

export function StripeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}