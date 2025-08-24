import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Play, Eye, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import type { Page } from '../App';

interface VirtualTourPageProps {
  onNavigate: (page: Page) => void;
}

export default function VirtualTourPage({ onNavigate }: VirtualTourPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-amber-100 text-amber-800">Virtual Tour</Badge>
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Explore Our Café</h1>
          <p className="text-amber-700">Take a virtual journey through our cozy space</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card className="p-12 bg-white border-amber-200">
            <CardContent className="space-y-6">
              <Eye className="h-16 w-16 text-amber-600 mx-auto" />
              <h2 className="text-2xl font-bold text-amber-900">Interactive Tour Coming Soon</h2>
              <p className="text-amber-700">
                We're creating an immersive 360° virtual tour so you can explore our café from anywhere.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => onNavigate('about')}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Coffee className="mr-2 h-4 w-4" />
                  Learn About Us Instead
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('locations')}
                  className="w-full border-amber-300 text-amber-700"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Visit Us in Person
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}