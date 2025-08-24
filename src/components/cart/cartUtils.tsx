import { CartItem } from '../../App';
import { promoCodes, taxRate, loyaltyPointValue } from './cartConstants';

export const calculateSubtotal = (cart: CartItem[]): number => {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const calculatePromoDiscount = (subtotal: number, appliedPromo: string | null): number => {
  if (!appliedPromo || !promoCodes[appliedPromo as keyof typeof promoCodes]) return 0;
  return subtotal * promoCodes[appliedPromo as keyof typeof promoCodes].discount;
};

export const calculateLoyaltyDiscount = (loyaltyPointsToUse: number): number => {
  return loyaltyPointsToUse * loyaltyPointValue;
};

export const calculateTotal = (
  subtotal: number,
  promoDiscount: number,
  loyaltyDiscount: number,
  deliveryFee: number
): number => {
  const tax = (subtotal - promoDiscount - loyaltyDiscount + deliveryFee) * taxRate;
  return subtotal - promoDiscount - loyaltyDiscount + deliveryFee + tax;
};

export const calculateTax = (
  subtotal: number,
  promoDiscount: number,
  loyaltyDiscount: number,
  deliveryFee: number
): number => {
  return (subtotal - promoDiscount - loyaltyDiscount + deliveryFee) * taxRate;
};

export const getMaxLoyaltyPoints = (userPoints: number, subtotal: number): number => {
  return Math.min(userPoints, Math.floor(subtotal * 100));
};