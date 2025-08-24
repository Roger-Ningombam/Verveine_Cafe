import React from 'react';
import { motion } from 'motion/react';
import { CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface OrderSummaryProps {
  subtotal: number;
  promoDiscount: number;
  loyaltyDiscount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  onCheckout: () => void;
}

export default function OrderSummary({
  subtotal,
  promoDiscount,
  loyaltyDiscount,
  deliveryFee,
  tax,
  total,
  onCheckout
}: OrderSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="bg-white border-amber-200 sticky top-24">
        <CardHeader>
          <CardTitle className="text-amber-900">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-amber-700">Subtotal</span>
              <span className="text-amber-900 font-medium">${subtotal.toFixed(2)}</span>
            </div>
            
            {promoDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Promo Discount</span>
                <span>-${promoDiscount.toFixed(2)}</span>
              </div>
            )}
            
            {loyaltyDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Loyalty Points</span>
                <span>-${loyaltyDiscount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-amber-700">Delivery</span>
              <span className="text-amber-900 font-medium">
                {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-amber-700">Tax</span>
              <span className="text-amber-900 font-medium">${tax.toFixed(2)}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between text-lg font-bold">
              <span className="text-amber-900">Total</span>
              <span className="text-amber-900">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <Button
            onClick={onCheckout}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg mt-6"
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Proceed to Checkout
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}