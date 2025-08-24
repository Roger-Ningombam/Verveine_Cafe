import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { promoCodes } from './cartConstants';

interface PromoCodeSectionProps {
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedPromo: string | null;
  applyPromoCode: () => void;
  removePromoCode: () => void;
}

export default function PromoCodeSection({
  promoCode,
  setPromoCode,
  appliedPromo,
  applyPromoCode,
  removePromoCode
}: PromoCodeSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="bg-white border-amber-200">
        <CardHeader>
          <CardTitle className="text-amber-900">Promo Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {appliedPromo ? (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <div className="flex justify-between items-center">
                  <span>{promoCodes[appliedPromo as keyof typeof promoCodes].description}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removePromoCode}
                    className="text-green-600 hover:text-green-700"
                  >
                    Remove
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="border-amber-300 focus:border-amber-500"
              />
              <Button
                onClick={applyPromoCode}
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
              >
                Apply
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}