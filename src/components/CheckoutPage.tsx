import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { CartItem, User } from '../App';
import type { Page } from '../App';

interface CheckoutPageProps {
  cart: CartItem[];
  user: User | null;
  onNavigate: (page: Page) => void;
  onOrderComplete: () => void;
}

export default function CheckoutPage({ cart, user, onNavigate, onOrderComplete }: CheckoutPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => onNavigate('cart')}
            className="mb-4 text-amber-700 hover:bg-amber-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>
          <Badge className="mb-4 bg-amber-100 text-amber-800">Checkout</Badge>
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Complete Your Order</h1>
          <p className="text-amber-700">Secure payment processing</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card className="p-12 bg-white border-amber-200">
            <CardContent className="space-y-6">
              <CreditCard className="h-16 w-16 text-amber-600 mx-auto" />
              <h2 className="text-2xl font-bold text-amber-900">Payment Processing Coming Soon</h2>
              <p className="text-amber-700">
                Secure payment integration with multiple payment options is being implemented.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    onOrderComplete();
                    onNavigate('home');
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Simulate Order Complete
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('cart')}
                  className="w-full border-amber-300 text-amber-700"
                >
                  Back to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}