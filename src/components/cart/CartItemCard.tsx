import React from 'react';
import { motion } from 'motion/react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { CartItem } from '../../App';

interface CartItemCardProps {
  item: CartItem;
  index: number;
  updateQuantity: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
}

export default function CartItemCard({ item, index, updateQuantity, removeFromCart }: CartItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card className="bg-white border-amber-200 hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-20 h-20 bg-cover bg-center rounded-lg flex-shrink-0"
              style={{ backgroundImage: `url('${item.image}')` }}
            />
            
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 text-lg">{item.name}</h3>
              <p className="text-amber-600 text-sm">Size: {item.size}</p>
              {item.customizations && item.customizations.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.customizations.map((custom, i) => (
                    <Badge key={i} variant="outline" className="text-xs border-amber-300">
                      {custom}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-amber-50 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateQuantity(index, item.quantity - 1)}
                  className="h-8 w-8 p-0 text-amber-700 hover:bg-amber-100"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium text-amber-900">
                  {item.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateQuantity(index, item.quantity + 1)}
                  className="h-8 w-8 p-0 text-amber-700 hover:bg-amber-100"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-right">
                <div className="font-bold text-amber-900 text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <div className="text-sm text-amber-600">
                  ${item.price.toFixed(2)} each
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}