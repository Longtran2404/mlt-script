"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

interface Service {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: string;
  category: string;
  price: number;
  duration: number;
  features: string[];
}

interface ServiceCardProps {
  svc: Service;
  selected?: boolean;
  onToggle?: (title: string) => void;
  isSelected?: boolean;
  onSelect?: (service: Service) => void;
}

export default function ServiceCard({
  svc,
  selected = false,
  onToggle,
  isSelected = false,
  onSelect,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    if (onToggle) {
      onToggle(svc.title);
    } else if (onSelect) {
      onSelect(svc);
    }
    setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Parse content string to get details
  const parseContent = (content: string) => {
    try {
      return JSON.parse(content);
    } catch {
      return { details: content };
    }
  };

  const contentDetails = parseContent(svc.content);

  return (
    <>
      {/* Main Card */}
      <motion.div
        className={cn(
          "relative w-full h-64 cursor-pointer perspective-1000",
          isExpanded && "z-50"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* 3D Flip Container */}
        <div className="relative w-full h-full preserve-3d">
          {/* Front Side */}
          <motion.div
                         className={cn(
               "absolute w-full h-full backface-hidden",
               "bg-white dark:bg-gray-800 rounded-xl shadow-lg",
               "border border-gray-200 dark:border-gray-700",
               "p-6 flex flex-col justify-between",
               "transition-all duration-300 ease-in-out"
             )}
            style={{
              transform: isHovered ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
            animate={{
              rotateY: isHovered ? 180 : 0,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {svc.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {svc.description}
                </p>
              </div>
              <div className="text-2xl">{svc.icon}</div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Category:
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {svc.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Price:
                  </span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    ${svc.price}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Duration:
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {svc.duration} days
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {svc.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="inline-block w-2 h-2 bg-blue-500 rounded-full"
                  />
                ))}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Hover to flip
              </div>
            </div>

            {/* Selected Check Mark */}
                                    {(isSelected || selected) && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
          </motion.div>

          {/* Back Side */}
          <motion.div
                         className={cn(
               "absolute w-full h-full backface-hidden",
               "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900",
               "rounded-xl shadow-lg border border-blue-200 dark:border-blue-700",
               "p-6 flex flex-col justify-between"
             )}
            style={{
              transform: isHovered ? "rotateY(0deg)" : "rotateY(-180deg)",
            }}
            animate={{
              rotateY: isHovered ? 0 : -180,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Back Header */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Chi tiết dịch vụ
              </h4>
              <div className="text-2xl mb-2">{svc.icon}</div>
            </div>

            {/* Back Content */}
            <div className="flex-1 space-y-3">
              {contentDetails.details && (
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {contentDetails.details}
                </div>
              )}

              <div className="space-y-2">
                <h5 className="font-medium text-gray-900 dark:text-white">
                  Features:
                </h5>
                <ul className="space-y-1">
                  {svc.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Back Footer */}
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Click to select
              </div>
              <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                ${svc.price} • {svc.duration} days
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        {isHovered && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 pointer-events-none" />
        )}
      </motion.div>

      {/* Expanded Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Expanded Card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {svc.title}
                  </h2>
                                     <Button
                     onClick={() => setIsExpanded(false)}
                     variant="ghost"
                     size="icon"
                     className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                   >
                     <svg
                       className="w-6 h-6"
                       fill="none"
                       stroke="currentColor"
                       viewBox="0 0 24 24"
                     >
                       <path
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         strokeWidth={2}
                         d="M6 18L18 6M6 6l12 12"
                       />
                     </svg>
                   </Button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{svc.icon}</div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {svc.description}
                      </p>
                      <div className="flex space-x-4 text-sm">
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          ${svc.price}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {svc.duration} days
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          {svc.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Chi tiết dịch vụ
                    </h3>
                    <div className="text-gray-600 dark:text-gray-400">
                      {contentDetails.details || svc.description}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Tính năng chính
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {svc.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-600 dark:text-gray-400"
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-4 pt-4">
                                         <Button
                       onClick={() => {
                         if (onSelect) onSelect(svc);
                         setIsExpanded(false);
                       }}
                       className="flex-1"
                       size="lg"
                     >
                       Chọn dịch vụ này
                     </Button>
                     <Button
                       onClick={() => setIsExpanded(false)}
                       variant="outline"
                       className="flex-1"
                       size="lg"
                     >
                       Đóng
                     </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
