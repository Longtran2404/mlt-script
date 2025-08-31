
import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface DurationSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function DurationSlider({
  value,
  onChange,
  min = 30,
  max = 600,
}: DurationSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimeLabel = (seconds: number) => {
    if (seconds <= 60) return "Quick";
    if (seconds <= 180) return "Vừa phải";
    if (seconds <= 300) return "Long";
    return "Extended";
  };

  const getTimeDescription = (seconds: number) => {
    if (seconds <= 60) return "Ngắn gọn";
    if (seconds <= 180) return "Cân bằng";
    if (seconds <= 300) return "Chi tiết";
    return "Toàn diện";
  };

  // Cập nhật presets căn đều từ 30s đến 10 phút
  const presets = [30, 90, 150, 240, 360, 480, 600]; // 30s, 1.5m, 2.5m, 4m, 6m, 8m, 10m

  // Handle click on track
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const trackWidth = rect.width;
    const clickPercentage = (clickX / trackWidth) * 100;

    const newValue = Math.round((clickPercentage / 100) * (max - min) + min);
    const snappedValue = presets.reduce((prev, curr) =>
      Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev
    );

    onChange(snappedValue);
  };

  return (
    <div className="space-y-6">
      {/* Header với thông tin chi tiết */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <label className="text-lg font-bold text-gray-900 dark:text-white tracking-wide">
            🎬 Thời lượng video mục tiêu
          </label>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Chọn thời lượng phù hợp với nội dung và đối tượng mục tiêu
          </p>
        </div>

        {/* Display panel */}
        <div className="flex items-center gap-3">
          <motion.div
            key={`label-${value}`}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-4 py-2 bg-gradient-to-r from-red-600/10 to-red-100 text-red-600 rounded-xl font-semibold tracking-wide border border-red-600/20 shadow-sm"
          >
            {getTimeLabel(value)}
          </motion.div>

          <motion.div
            key={`time-${value}`}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-5 py-3 bg-gradient-to-r from-red-600 to-red-600 text-white rounded-xl font-mono font-bold text-xl shadow-lg border border-red-600/30"
          >
            {formatTime(value)}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Slider Track */}
      <div className="relative px-6" ref={sliderRef}>
        {/* Main Track */}
        <div
          className="h-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full relative overflow-visible shadow-inner border border-gray-200/50 cursor-pointer"
          onClick={handleTrackClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Progress Fill với gradient đẹp */}
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-full relative overflow-hidden"
            style={{ width: `${percentage}%` }}
            animate={{
              boxShadow: isDragging
                ? "0 0 30px rgba(196, 22, 28, 0.7), 0 0 20px rgba(196, 22, 28, 0.4)"
                : isHovered
                ? "0 0 20px rgba(196, 22, 28, 0.4), 0 0 10px rgba(196, 22, 28, 0.2)"
                : "0 4px 15px rgba(196, 22, 28, 0.3)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Enhanced Thumb */}
          <motion.div
            className="absolute w-12 h-12 bg-white border-4 border-red-600 rounded-full shadow-2xl cursor-grab active:cursor-grabbing z-30 flex items-center justify-center"
            style={{
              left: `clamp(6px, calc(${percentage}% - 24px), calc(100% - 30px))`,
              top: "calc(50% - 24px)",
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: isDragging ? 1.5 : 1,
              boxShadow: isDragging
                ? "0 20px 40px rgba(196, 22, 28, 0.5), 0 0 0 8px rgba(196, 22, 28, 0.15)"
                : isHovered
                ? "0 15px 35px rgba(196, 22, 28, 0.4), 0 0 0 4px rgba(196, 22, 28, 0.1)"
                : "0 10px 30px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(196, 22, 28, 0.08)",
              borderWidth: isDragging ? "5px" : "4px",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <motion.div
              className="w-5 h-5 bg-gradient-to-br from-red-600 to-red-600 rounded-full"
              animate={{
                rotate: isDragging ? 360 : 0,
                scale: isDragging ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>

        {/* Hidden input cho accessibility */}
        <input
          type="range"
          min={min}
          max={max}
          step={10}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-20 h-20 -top-8"
          aria-label="Chọn thời lượng video"
          title="Kéo để chọn thời lượng video"
        />

        {/* Enhanced Tick marks */}
        <div className="mt-4 relative">
          {presets.map((preset) => (
            <motion.div
              key={`tick-${preset}`}
              className="absolute top-0 flex flex-col items-center"
              style={{
                left: `clamp(0%, ${
                  ((preset - min) / (max - min)) * 100
                }%, calc(100% - 40px))`,
                transform: "translateX(-50%)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: preset / 1000 }}
            >
              <div className="w-1 h-4 bg-red-600/50 rounded-full" />
              <span className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium whitespace-nowrap">
                {formatTime(preset)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Quick Presets */}
      <div className="space-y-3">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            🚀 Chọn nhanh thời lượng
          </h3>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-2">
          {presets.map((preset, index) => (
            <motion.button
              key={`preset-${preset}`}
              type="button"
              onClick={() => onChange(preset)}
              className={`relative px-3 py-4 text-sm font-semibold rounded-xl transition-all duration-300 overflow-hidden border-2 ${
                value === preset
                  ? "bg-gradient-to-br from-red-600 to-red-600 text-white shadow-xl border-red-600 scale-105"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-600/50 hover:bg-red-600/5 hover:shadow-lg hover:scale-102"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="relative z-10 space-y-1">
                <div className="font-mono font-bold text-base">
                  {formatTime(preset)}
                </div>
                <div className="text-xs opacity-90">
                  {getTimeDescription(preset)}
                </div>
              </div>

              {/* Active indicator */}
              {value === preset && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-red-600"
                  layoutId="activePreset"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-red-400/20 rounded-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time recommendation */}
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start gap-3">
          <div className="text-blue-600 dark:text-blue-400 text-lg">💡</div>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Gợi ý thời lượng
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {value <= 90
                ? "Thời lượng ngắn phù hợp cho quảng cáo, teaser hoặc thông báo nhanh"
                : value <= 180
                ? "Thời lượng vừa phải lý tưởng cho giới thiệu sản phẩm hoặc dịch vụ"
                : value <= 300
                ? "Thời lượng dài phù hợp cho hướng dẫn chi tiết hoặc storytelling"
                : "Thời lượng mở rộng cho nội dung giáo dục hoặc đào tạo chuyên sâu"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
