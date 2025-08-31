import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Tone {
  id: string;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  icon: string;
  example: string;
}

interface ToneSelectorProps {
  selectedTones: string[];
  onChange: (tones: string[]) => void;
}

const tones: Tone[] = [
  {
    id: "professional",
    name: "Chuyên nghiệp",
    description: "Trang trọng, uy tín",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200",
    icon: "🎯",
    example: "Với cam kết chất lượng hàng đầu...",
  },
  {
    id: "friendly",
    name: "Thân thiện",
    description: "Gần gũi, ấm áp",
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200",
    icon: "😊",
    example: "Chúng mình rất vui được đồng hành...",
  },
  {
    id: "energetic",
    name: "Năng động",
    description: "Sôi nổi, hưng phấn",
    color: "text-orange-700",
    bgColor: "bg-orange-50 border-orange-200",
    icon: "⚡",
    example: "Cùng khám phá những điều tuyệt vời...",
  },
  {
    id: "inspiring",
    name: "Truyền cảm hứng",
    description: "Động lực, khuyến khích",
    color: "text-purple-700",
    bgColor: "bg-purple-50 border-purple-200",
    icon: "✨",
    example: "Hành trình thành công bắt đầu từ...",
  },
  {
    id: "confident",
    name: "Tự tin",
    description: "Quyết đoán, mạnh mẽ",
    color: "text-red-700",
    bgColor: "bg-red-50 border-red-200",
    icon: "💪",
    example: "Chúng tôi tự hào mang đến...",
  },
  {
    id: "caring",
    name: "Quan tâm",
    description: "Chu đáo, tận tình",
    color: "text-pink-700",
    bgColor: "bg-pink-50 border-pink-200",
    icon: "💝",
    example: "Chúng tôi hiểu những khó khăn...",
  },
  {
    id: "innovative",
    name: "Sáng tạo",
    description: "Đột phá, hiện đại",
    color: "text-cyan-700",
    bgColor: "bg-cyan-50 border-cyan-200",
    icon: "🚀",
    example: "Công nghệ tiên tiến mở ra...",
  },
  {
    id: "scholarly",
    name: "Học thuật",
    description: "Nghiêm túc, tri thức",
    color: "text-indigo-700",
    bgColor: "bg-indigo-50 border-indigo-200",
    icon: "📚",
    example: "Dựa trên nghiên cứu khoa học...",
  },
  {
    id: "youthful",
    name: "Trẻ trung",
    description: "Năng động, hiện đại",
    color: "text-lime-700",
    bgColor: "bg-lime-50 border-lime-200",
    icon: "🌟",
    example: "Gen Z đang thay đổi thế giới...",
  },
  {
    id: "global",
    name: "Quốc tế",
    description: "Toàn cầu, đa văn hóa",
    color: "text-teal-700",
    bgColor: "bg-teal-50 border-teal-200",
    icon: "🌍",
    example: "Kết nối với cộng đồng toàn cầu...",
  },
];

export default function ToneSelector({
  selectedTones,
  onChange,
}: ToneSelectorProps) {
  const [hoveredTone, setHoveredTone] = useState<string | null>(null);

  const toggleTone = (toneId: string) => {
    if (selectedTones.includes(toneId)) {
      onChange(selectedTones.filter((id) => id !== toneId));
    } else {
      onChange([...selectedTones, toneId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-semibold text-gray-900 dark:text-gray-100/90 tracking-wide">
            Tone & Phong cách
          </label>
          <p className="text-xs text-gray-900 dark:text-gray-100/60 mt-1">
            Chọn nhiều tone để tạo nên phong cách truyền thông đa dạng
          </p>
        </div>
        <motion.div
          className="flex items-center gap-2"
          animate={{ scale: selectedTones.length > 0 ? 1 : 0.9 }}
        >
          <span className="text-xs font-semibold text-red-600 bg-red-600/10 px-3 py-1.5 rounded-full border border-red-600/20">
            {selectedTones.length} đã chọn
          </span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {tones.map((tone, index) => {
          const isSelected = selectedTones.includes(tone.id);
          const isHovered = hoveredTone === tone.id;

          return (
            <motion.button
              key={tone.id}
              onClick={() => toggleTone(tone.id)}
              onMouseEnter={() => setHoveredTone(tone.id)}
              onMouseLeave={() => setHoveredTone(null)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left overflow-hidden ${
                isSelected
                  ? `${tone.bgColor} ${tone.color} border-current shadow-lg`
                  : isHovered
                  ? "bg-gray-50 border-gray-300 text-gray-800 shadow-md"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md"
              }`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-current transform translate-x-8 -translate-y-8" />
                <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-current transform -translate-x-6 translate-y-6" />
              </div>

              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{tone.icon}</span>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        className="w-5 h-5 bg-current rounded-full flex items-center justify-center"
                      >
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <h3 className="font-semibold text-sm">{tone.name}</h3>
                  <p className="text-xs opacity-80 leading-relaxed">
                    {tone.description}
                  </p>
                </div>
              </div>

              {/* Selection border animation */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 border-2 border-current rounded-xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Preview area */}
      <AnimatePresence>
        {hoveredTone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-gray-50 rounded-xl border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">
                {tones.find((t) => t.id === hoveredTone)?.icon}
              </span>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Ví dụ: {tones.find((t) => t.id === hoveredTone)?.name}
                </h4>
                <p className="text-sm text-gray-900 dark:text-gray-100/70 italic">
                  "{tones.find((t) => t.id === hoveredTone)?.example}"
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected tones summary */}
      {selectedTones.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-600/5 rounded-xl border border-red-600/20"
        >
          <h4 className="text-sm font-semibold text-red-600 mb-2">
            Tổng hợp tone đã chọn:
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedTones.map((toneId) => {
              const tone = tones.find((t) => t.id === toneId);
              return tone ? (
                <span
                  key={toneId}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-red-600/30 rounded-full text-xs font-medium text-red-600"
                >
                  <span>{tone.icon}</span>
                  {tone.name}
                </span>
              ) : null;
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
