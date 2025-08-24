import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { deliveryOptions, timeSlots } from './cartConstants';

interface DeliveryOptionsProps {
  deliveryOption: string;
  setDeliveryOption: (option: string) => void;
  deliveryTime: string;
  setDeliveryTime: (time: string) => void;
}

export default function DeliveryOptions({
  deliveryOption,
  setDeliveryOption,
  deliveryTime,
  setDeliveryTime
}: DeliveryOptionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-white border-amber-200">
        <CardHeader>
          <CardTitle className="text-amber-900">Delivery Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {deliveryOptions.map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.02 }}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                deliveryOption === option.value
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-amber-200 hover:border-amber-300'
              }`}
              onClick={() => setDeliveryOption(option.value)}
            >
              <div className="flex items-center gap-3">
                <option.icon className="h-5 w-5 text-amber-600" />
                <div className="flex-1">
                  <div className="font-medium text-amber-900">{option.label}</div>
                  <div className="text-sm text-amber-700">{option.description}</div>
                  <div className="text-xs text-amber-600">{option.time}</div>
                </div>
                <div className="font-bold text-amber-900">
                  {option.price === 0 ? 'Free' : `$${option.price}`}
                </div>
              </div>
            </motion.div>
          ))}

          <div className="space-y-3">
            <Label className="text-amber-900">Preferred Time</Label>
            <Select value={deliveryTime} onValueChange={setDeliveryTime}>
              <SelectTrigger className="border-amber-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot.value} value={slot.value}>
                    {slot.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}