import { Coffee, Truck } from 'lucide-react';

export const promoCodes = {
  'FIRST10': { discount: 0.1, description: '10% off your first order' },
  'STUDENT20': { discount: 0.2, description: '20% student discount' },
  'LOYALTY15': { discount: 0.15, description: '15% loyalty member discount' },
  'MORNING25': { discount: 0.25, description: '25% off morning orders' }
};

export const deliveryOptions = [
  { 
    value: 'pickup', 
    label: 'Pickup', 
    time: '10-15 min', 
    price: 0, 
    icon: Coffee,
    description: 'Pick up at our café'
  },
  { 
    value: 'delivery', 
    label: 'Delivery', 
    time: '25-35 min', 
    price: 2.99, 
    icon: Truck,
    description: 'Delivered to your door'
  }
];

export const timeSlots = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '30min', label: 'In 30 minutes' },
  { value: '1hour', label: 'In 1 hour' },
  { value: '2hours', label: 'In 2 hours' },
  { value: 'custom', label: 'Schedule for later' }
];

export const recommendedItems = [
  { id: 'pastry-1', name: 'Butter Croissant', price: 4.50, image: '🥐' },
  { id: 'pastry-2', name: 'Chocolate Muffin', price: 3.75, image: '🧁' },
  { id: 'drink-1', name: 'Fresh Orange Juice', price: 4.00, image: '🍊' }
];

export const freeDeliveryThreshold = 25;
export const taxRate = 0.08; // 8% tax
export const loyaltyPointValue = 0.01; // 1 point = $0.01