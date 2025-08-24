import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { recommendedItems } from './cartConstants';

interface RecommendedItemsProps {
  onAddItem?: (item: any) => void;
}

export default function RecommendedItems({ onAddItem }: RecommendedItemsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-amber-900 flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-600" />
            You might also like
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {recommendedItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className="text-center p-3 bg-white rounded-lg border border-amber-200 cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2">{item.image}</div>
                <div className="text-sm font-medium text-amber-900 mb-1">{item.name}</div>
                <div className="text-amber-600 font-bold">${item.price}</div>
                <Button 
                  size="sm" 
                  className="mt-2 bg-amber-600 hover:bg-amber-700 text-white text-xs"
                  onClick={() => onAddItem?.(item)}
                >
                  Add
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}