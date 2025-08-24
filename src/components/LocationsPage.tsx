import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { Page } from '../App';

interface LocationsPageProps {
  onNavigate: (page: Page) => void;
}

export default function LocationsPage({ onNavigate }: LocationsPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-amber-100 text-amber-800">Locations</Badge>
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Find Us</h1>
          <p className="text-amber-700">Visit our café in the heart of downtown</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white border-amber-200">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-amber-900 mb-6">Main Location</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-amber-900">123 Coffee Street</p>
                        <p className="text-amber-700">Downtown, City 12345</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-amber-900">Mon-Fri: 6AM - 9PM</p>
                        <p className="text-amber-700">Sat-Sun: 7AM - 10PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-amber-600" />
                      <p className="text-amber-900">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                      <Navigation className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-amber-300 text-amber-700"
                      onClick={() => onNavigate('contact')}
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-8 text-center">
                  <MapPin className="h-16 w-16 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-amber-900 mb-2">Interactive Map</h3>
                  <p className="text-amber-700">
                    Map integration coming soon to help you find us easily
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}