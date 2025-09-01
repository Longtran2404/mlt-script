"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Clock, DollarSign, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "../lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
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

interface EnhancedServiceCardProps {
  svc: Service;
  isSelected?: boolean;
  onSelect?: (service: Service) => void;
  className?: string;
}

export default function EnhancedServiceCard({
  svc,
  isSelected = false,
  onSelect,
  className,
}: EnhancedServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    
    // Auto flip back after 3 seconds
    setTimeout(() => {
      setIsFlipped(false);
    }, 3000);
    
    if (onSelect) {
      onSelect(svc);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
      {/* 3D Flip Card Container */}
      <div
        className={cn(
          "relative w-full h-80 cursor-pointer perspective-1000",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {/* 3D Flip Card */}
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{
            rotateY: isFlipped ? 180 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{ 
            transformStyle: "preserve-3d",
            transform: `rotateY(${isFlipped ? 180 : 0}deg)`
          }}
        >
          {/* Front Side */}
          <div
            className={cn(
              "absolute w-full h-full backface-hidden",
              "bg-gradient-to-br from-white via-gray-50 to-white",
              "dark:from-gray-800 dark:via-gray-900 dark:to-gray-800",
              "rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50",
              "p-6 overflow-hidden",
              "transition-all duration-300 ease-in-out"
            )}
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Animated Background Pattern */}
            <motion.div 
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Sparkle Effects */}
            <motion.div
              className="absolute top-4 right-4"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </motion.div>

            {/* Header */}
            <div className="relative z-10 mb-6">
              <motion.div 
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                  #{svc.id.padStart(3, '0')}
                </div>
                <motion.div
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <div className="text-center">
                <motion.div 
                  className="text-5xl mb-3"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -10, 10, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {svc.icon}
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {svc.title}
                </motion.h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {svc.description}
                </p>
              </div>
            </div>

            {/* Quick Info */}
            <motion.div 
              className="space-y-3 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between bg-gray-100/80 dark:bg-gray-800/80 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Giá
                  </span>
                </div>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  ${svc.price}
                </span>
              </div>
              
              <div className="flex items-center justify-between bg-gray-100/80 dark:bg-gray-800/80 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Thời gian
                  </span>
                </div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {svc.duration} ngày
                </span>
              </div>
            </motion.div>

            {/* Category Badge */}
            <motion.div 
              className="absolute bottom-4 left-4 right-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 dark:border-purple-700/50 rounded-full px-4 py-2">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {svc.category}
                </span>
              </div>
            </motion.div>

            {/* Flip Instruction */}
            <motion.div
              className="absolute bottom-2 right-2 text-xs text-gray-400 dark:text-gray-500"
              animate={{ opacity: isHovered ? 1 : 0.6 }}
              transition={{ duration: 0.2 }}
            >
              Click để lật card
            </motion.div>

            {/* Selection Indicator */}
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute -top-3 -right-3 z-20"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg border-3 border-white dark:border-gray-800">
                    <motion.svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hover Glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none"
              animate={{
                opacity: isHovered ? 0.8 : 0,
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Back Side */}
          <div
            className={cn(
              "absolute w-full h-full backface-hidden",
              "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600",
              "rounded-2xl shadow-xl border border-blue-500/50",
              "p-6 overflow-hidden",
              "text-white"
            )}
            style={{ 
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            {/* Back Background Pattern */}
            <motion.div 
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Back Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
              <motion.div 
                className="text-6xl mb-4"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {svc.icon}
              </motion.div>
              
              <motion.h3 
                className="text-xl font-bold mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Chi tiết dịch vụ
              </motion.h3>
              
              <motion.p 
                className="text-sm opacity-90 mb-6 line-clamp-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {contentDetails.details || svc.description}
              </motion.p>

              {/* Features Preview */}
              <motion.div 
                className="space-y-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {svc.features.slice(0, 3).map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 text-sm opacity-90"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <CheckCircle className="w-4 h-4 text-green-300" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Button */}
              <motion.button
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-sm font-medium">Xem chi tiết</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Flip Back Instruction */}
              <motion.div
                className="absolute bottom-2 right-2 text-xs opacity-70"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Click để lật lại
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Modal Dialog */}
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    "radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.4) 0%, transparent 50%)",
                    "radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)",
                    "radial-gradient(circle at 25% 75%, rgba(34, 197, 94, 0.4) 0%, transparent 50%)",
                    "radial-gradient(circle at 75% 25%, rgba(249, 115, 22, 0.4) 0%, transparent 50%)",
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="relative z-10 p-8">
              <DialogHeader className="mb-6">
                <div className="flex items-center justify-between">
                  <motion.div 
                    className="flex items-center gap-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div 
                      className="text-6xl"
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: [0, -10, 10, -5, 0],
                        transition: { duration: 0.6 }
                      }}
                    >
                      {svc.icon}
                    </motion.div>
                    <div>
                      <DialogTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {svc.title}
                      </DialogTitle>
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                        {svc.description}
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsExpanded(false)}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <motion.div 
                  className="space-y-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Thông tin dịch vụ
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-green-500" />
                          <span className="font-medium">Giá dịch vụ</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ${svc.price}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-blue-500" />
                          <span className="font-medium">Thời gian hoàn thành</span>
                        </div>
                        <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                          {svc.duration} ngày
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-purple-500" />
                          <span className="font-medium">Danh mục</span>
                        </div>
                        <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                          {svc.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Chi tiết dịch vụ
                    </h3>
                    <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {contentDetails.details || svc.description}
                    </div>
                  </div>
                </motion.div>

                {/* Right Column */}
                <motion.div 
                  className="space-y-6"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Tính năng chính
                    </h3>
                    
                    <div className="grid gap-3">
                      {svc.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg"
                        >
                          <motion.div
                            className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: index * 0.2
                            }}
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div 
                    className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-purple-700/50"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                      🎯 Mục đích sử dụng
                    </h3>
                    <p className="text-center text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      Tạo kịch bản từ các dịch vụ và thời gian, sau đó tạo video phù hợp và gửi đến webhook. 
                      Lấy kịch bản từ Google Sheet để tạo video tự động.
                    </p>
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={() => {
                          if (onSelect) onSelect(svc);
                          setIsExpanded(false);
                        }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        🚀 Chọn dịch vụ này
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsExpanded(false)}
                        className="px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        Đóng
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}