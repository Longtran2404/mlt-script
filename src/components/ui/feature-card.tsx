import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
  badge?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

interface FeatureCardProps {
  feature: Feature;
  index?: number;
  onClick?: (feature: Feature) => void;
  className?: string;
}

export function FeatureCard({ 
  feature, 
  index = 0, 
  onClick, 
  className 
}: FeatureCardProps) {
  const { title, description, icon, color = "blue", badge, stats } = feature;

  const colorClasses = {
    blue: {
      gradient: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      iconHover: "hover:from-blue-600 hover:to-blue-700",
      text: "text-blue-600 dark:text-blue-400",
      border: "hover:border-blue-200 dark:hover:border-blue-700",
    },
    purple: {
      gradient: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
      iconHover: "hover:from-purple-600 hover:to-purple-700",
      text: "text-purple-600 dark:text-purple-400",
      border: "hover:border-purple-200 dark:hover:border-purple-700",
    },
    green: {
      gradient: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      iconBg: "bg-gradient-to-br from-green-500 to-green-600",
      iconHover: "hover:from-green-600 hover:to-green-700",
      text: "text-green-600 dark:text-green-400",
      border: "hover:border-green-200 dark:hover:border-green-700",
    },
    orange: {
      gradient: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      iconHover: "hover:from-orange-600 hover:to-orange-700",
      text: "text-orange-600 dark:text-orange-400",
      border: "hover:border-orange-200 dark:hover:border-orange-700",
    },
  };

  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -8, 
        transition: { type: "spring", stiffness: 300, damping: 20 } 
      }}
      onClick={() => onClick?.(feature)}
    >
      <Card className={`h-full cursor-pointer transition-all duration-300 hover:shadow-2xl ${colors.border} group overflow-hidden`}>
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        <CardHeader className="relative pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-4 flex-1">
              {/* Icon */}
              <motion.div
                className={`w-14 h-14 rounded-2xl ${colors.iconBg} ${colors.iconHover} text-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110`}
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {icon}
              </motion.div>

              {/* Title and Description */}
              <div className="space-y-2">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {title}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                  {description}
                </p>
              </div>
            </div>

            {/* Badge */}
            {badge && (
              <Badge 
                variant="secondary" 
                className={`${colors.text} bg-opacity-10 font-medium`}
              >
                {badge}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="relative">
          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {stats.map((stat, statIndex) => (
                <motion.div
                  key={statIndex}
                  className="text-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: (index * 0.1) + (statIndex * 0.05) }}
                >
                  <div className={`text-2xl font-bold ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Hover Effect Indicator */}
          <motion.div
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.2 }}
          >
            <div className={`w-8 h-8 rounded-full ${colors.iconBg} flex items-center justify-center`}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}