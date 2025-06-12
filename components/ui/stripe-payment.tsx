"use client";

import { useState } from 'react';
import { Button } from './button';
import { CreditCard } from 'lucide-react';

interface StripePaymentProps {
  service: string;
  amount: number;
  productId?: string; // Optional direct product ID
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function StripePayment({ service, amount, productId, onSuccess, onError }: StripePaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service,
          amount,
          productId,
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        // Redirect to Stripe checkout
        window.open(data.url, '_blank');
        onSuccess?.();
      } else {
        throw new Error(data.error || 'Payment processing failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      onError?.(error instanceof Error ? error.message : 'Wystąpił błąd podczas płatności');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#6772e5] hover:bg-[#5469d4] rounded-lg transition-colors duration-300 w-full"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Przetwarzanie...
        </>
      ) : (
        <>
          Zapłać teraz <CreditCard className="w-4 h-4 ml-2" />
        </>
      )}
    </Button>
  );
}
