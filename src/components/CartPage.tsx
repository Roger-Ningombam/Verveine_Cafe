import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { CartItem, User } from '../App';
import EmptyCart from './cart/EmptyCart';
import CartItemCard from './cart/CartItemCard';
import DeliveryOptions from './cart/DeliveryOptions';
import PromoCodeSection from './cart/PromoCodeSection';
import RecommendedItems from './cart/RecommendedItems';
import OrderSummary from './cart/OrderSummary';
import { promoCodes, freeDeliveryThreshold } from './cart/cartConstants';
import {
  calculateSubtotal,
  calculatePromoDiscount,
  calculateLoyaltyDiscount,
  calculateTotal,
  calculateTax
} from './cart/cartUtils';
import type { Page } from '../App';

interface CartPageProps {
  cart: CartItem[];
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  onNavigate: (page: Page) => void;
  user: User | null;
}

export default function CartPage({ cart, removeFromCart, updateQuantity, onNavigate, user }: CartPageProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [deliveryTime, setDeliveryTime] = useState('asap');
  const [loyaltyPointsToUse, setLoyaltyPointsToUse] = useState(0);

  const subtotal = useMemo(() => calculateSubtotal(cart), [cart]);
  const promoDiscount = useMemo(() => calculatePromoDiscount(subtotal, appliedPromo), [subtotal, appliedPromo]);
  const loyaltyDiscount = useMemo(() => calculateLoyaltyDiscount(loyaltyPointsToUse), [loyaltyPointsToUse]);
  const deliveryFee = deliveryOption === 'delivery' ? 2.99 : 0;
  const tax = calculateTax(subtotal, promoDiscount, loyaltyDiscount, deliveryFee);
  const total = calculateTotal(subtotal, promoDiscount, loyaltyDiscount, deliveryFee);

  const progressToFreeDelivery = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);

  const applyPromoCode = () => {
    if (promoCodes[promoCode as keyof typeof promoCodes]) {
      setAppliedPromo(promoCode);
      setPromoCode('');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const handleCheckout = () => {
    onNavigate('checkout');
  };

  if (cart.length === 0) {
    return <EmptyCart onNavigate={onNavigate} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-amber-100 text-amber-800">Your Order</Badge>
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Shopping Cart</h1>
          <p className="text-amber-700">Review your items and complete your order</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress to Free Delivery */}
            {deliveryOption === 'delivery' && subtotal < freeDeliveryThreshold && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Truck className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">
                        Add ${(freeDeliveryThreshold - subtotal).toFixed(2)} more for free delivery!
                      </span>
                    </div>
                    <Progress value={progressToFreeDelivery} className="h-2" />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Cart Items List */}
            <AnimatePresence>
              {cart.map((item, index) => (
                <CartItemCard
                  key={`${item.id}-${index}`}
                  item={item}
                  index={index}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </AnimatePresence>

            {/* Recommended Items */}
            <RecommendedItems />
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <DeliveryOptions
              deliveryOption={deliveryOption}
              setDeliveryOption={setDeliveryOption}
              deliveryTime={deliveryTime}
              setDeliveryTime={setDeliveryTime}
            />

            <PromoCodeSection
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              appliedPromo={appliedPromo}
              applyPromoCode={applyPromoCode}
              removePromoCode={removePromoCode}
            />

            <OrderSummary
              subtotal={subtotal}
              promoDiscount={promoDiscount}
              loyaltyDiscount={loyaltyDiscount}
              deliveryFee={deliveryFee}
              tax={tax}
              total={total}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}