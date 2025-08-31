import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "./card";

export interface StatsData {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
  icon?: React.ReactNode;
  description?: string;
  color?: "blue" | "green" | "purple" | "orange" | "red";
}

interface StatsCardProps {
  stats: StatsData;
  index?: number;
  className?: string;
}

export function StatsCard({ stats, index = 0, className }: StatsCardProps) {
  const { title, value, change, icon, description, color = "blue" } = stats;

  const colorClasses = {
    blue: {
      gradient: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-700",
    },
    green: {
      gradient: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      iconBg: "bg-gradient-to-br from-green-500 to-green-600",
      text: "text-green-600 dark:text-green-400",
      border: "border-green-200 dark:border-green-700",
    },
    purple: {
      gradient: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-700",
    },
    orange: {
      gradient: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-700",
    },
    red: {
      gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20",
      iconBg: "bg-gradient-to-br from-red-500 to-red-600",
      text: "text-red-600 dark:text-red-400",
      border: "border-red-200 dark:border-red-700",
    },
  };

  const colors = colorClasses[color];

  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toString();
    }
    return val;
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -4, 
        transition: { type: "spring", stiffness: 300, damping: 20 } 
      }}
    >
      <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl group ${colors.border}`}>
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        <CardContent className="relative p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                {title}
              </h3>
              
              <div className="flex items-baseline space-x-2">
                <motion.span 
                  className={`text-3xl font-bold ${colors.text} group-hover:scale-105 transition-transform duration-300`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.2 }}
                >
                  {formatValue(value)}
                </motion.span>
                
                {change && (
                  <div className={`flex items-center text-sm font-medium ${
                    change.type === "increase" 
                      ? "text-green-600 dark:text-green-400" 
                      : change.type === "decrease" 
                      ? "text-red-600 dark:text-red-400" 
                      : "text-gray-600 dark:text-gray-400"
                  }`}>
                    {change.type === "increase" ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : change.type === "decrease" ? (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    ) : null}
                    {change.value}
                  </div>
                )}
              </div>

              {description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  {description}
                </p>
              )}
            </div>

            {icon && (
              <motion.div
                className={`w-12 h-12 rounded-xl ${colors.iconBg} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {icon}
              </motion.div>
            )}
          </div>

          {/* Animated Progress Bar */}
          {change && change.type === "increase" && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <motion.div
                  className={`h-1 rounded-full ${colors.iconBg}`}
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}