import React from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  period: string;
  features: string[];
  highlighted?: boolean;
  popular?: boolean;
  icon?: React.ReactNode;
  buttonText?: string;
  buttonVariant?: "default" | "secondary" | "outline";
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelect?: (plan: PricingPlan) => void;
  className?: string;
}

export function PricingCard({ plan, onSelect, className }: PricingCardProps) {
  const {
    name,
    description,
    price,
    originalPrice,
    period,
    features,
    highlighted = false,
    popular = false,
    icon,
    buttonText = "Chọn gói",
    buttonVariant = "default",
  } = plan;

  const discount = originalPrice && originalPrice > price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className={className}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        className={`relative h-full transition-all duration-300 ${
          highlighted
            ? "border-2 border-gradient-to-r from-blue-500 to-purple-500 shadow-2xl bg-gradient-to-b from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20"
            : "border border-gray-200 dark:border-gray-700 hover:shadow-xl"
        }`}
      >
        {/* Popular Badge */}
        {popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-full shadow-lg">
              <Star className="w-3 h-3 mr-1" />
              Phổ biến nhất
            </Badge>
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute -top-2 -right-2 z-10">
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              -{discount}%
            </div>
          </div>
        )}

        <CardHeader className="text-center pb-4 pt-8">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              highlighted
                ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            }`}>
              {icon || <Zap className="w-8 h-8" />}
            </div>
          </div>

          <CardTitle className={`text-2xl font-bold ${
            highlighted ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" : ""
          }`}>
            {name}
          </CardTitle>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            {description}
          </p>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <span className={`text-4xl font-bold ${
                highlighted ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" : "text-gray-900 dark:text-white"
              }`}>
                {price === 0 ? "Miễn phí" : `${price.toLocaleString()}đ`}
              </span>
              {price > 0 && (
                <span className="text-gray-500 dark:text-gray-400 text-lg">/{period}</span>
              )}
            </div>
            
            {originalPrice && originalPrice > price && (
              <div className="flex items-center justify-center space-x-2">
                <span className="text-gray-400 line-through text-lg">
                  {originalPrice.toLocaleString()}đ
                </span>
                <Badge variant="destructive" className="text-xs">
                  Tiết kiệm {discount}%
                </Badge>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="space-y-3 text-left">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                  highlighted
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-green-100 dark:bg-green-900/20"
                }`}>
                  <Check className={`w-3 h-3 ${
                    highlighted ? "text-white" : "text-green-600 dark:text-green-400"
                  }`} />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Button
              onClick={() => onSelect?.(plan)}
              variant={highlighted ? "default" : buttonVariant}
              className={`w-full py-3 font-medium transition-all duration-300 ${
                highlighted
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                  : ""
              }`}
              size="lg"
            >
              {buttonText}
              {highlighted && <Crown className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}