import React from 'react';
import { motion } from 'motion/react';
import { Coffee, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import type { Page } from '../../App';


interface EmptyCartProps {
  onNavigate: (page: Page) => void;
}

export default function EmptyCart({ onNavigate }: EmptyCartProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-8xl mb-8"
        >
          ☕
        </motion.div>
        <h1 className="text-3xl font-bold text-amber-900 mb-4">Your cart is empty</h1>
        <p className="text-amber-700 mb-8 text-lg">
          Looks like you haven't added any delicious items to your cart yet.
        </p>
        <div className="space-y-4">
          <Button
            onClick={() => onNavigate('menu')}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg"
          >
            <Coffee className="mr-2 h-5 w-5" />
            Browse Our Menu
          </Button>
          <Button
            onClick={() => onNavigate('home')}
            variant="outline"
            className="w-full border-amber-300 text-amber-700 hover:bg-amber-100 py-3 text-lg"
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}