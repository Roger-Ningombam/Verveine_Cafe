import React from 'react';
import { motion } from 'motion/react';
import { Coffee, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { CartItem, User } from '../App';
import type { Page } from '../App';

interface ProductPageProps {
  productId: string | null;
  onNavigate: (page: Page) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  user: User | null;
}

export default function ProductPage({ productId, onNavigate, addToCart, user }: ProductPageProps) {
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
            onClick={() => onNavigate('menu')}
            className="mb-4 text-amber-700 hover:bg-amber-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
          <Badge className="mb-4 bg-amber-100 text-amber-800">Product Details</Badge>
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Product Page</h1>
          <p className="text-amber-700">Product ID: {productId || 'None selected'}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card className="p-12 bg-white border-amber-200">
            <CardContent className="space-y-6">
              <Coffee className="h-16 w-16 text-amber-600 mx-auto" />
              <h2 className="text-2xl font-bold text-amber-900">Product Details Coming Soon</h2>
              <p className="text-amber-700">
                Individual product pages with detailed information and customization options are being developed.
              </p>
              <Button
                onClick={() => onNavigate('menu')}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                Browse All Products
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}