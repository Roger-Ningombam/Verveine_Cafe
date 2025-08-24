import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Book, Star, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CartItem } from '../App';
import type { Page } from '../App';

interface CoffeeGuidePageProps {
  onNavigate: (page: Page) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

export default function CoffeeGuidePage({ onNavigate, addToCart }: CoffeeGuidePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-amber-100 text-amber-800">Coffee Guide</Badge>
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Master the Art of Coffee</h1>
          <p className="text-amber-700">Coming soon - Your complete guide to coffee brewing and appreciation</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card className="p-12 bg-white border-amber-200">
            <CardContent className="space-y-6">
              <Book className="h-16 w-16 text-amber-600 mx-auto" />
              <h2 className="text-2xl font-bold text-amber-900">Coming Soon</h2>
              <p className="text-amber-700">
                We're brewing up an amazing coffee guide with brewing techniques, bean knowledge, and expert tips.
              </p>
              <Button
                onClick={() => onNavigate('menu')}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Coffee className="mr-2 h-4 w-4" />
                Explore Our Menu Instead
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}