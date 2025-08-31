import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";

interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
}

interface ServiceSearchProps {
  services: Service[];
  onFilteredServices: (filteredServices: Service[]) => void;
}

export default function ServiceSearch({
  services,
  onFilteredServices,
}: ServiceSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const suggestions = [
    "Tuyển sinh 2025",
    "Học bổng",
    "Chương trình Quốc tế",
    "Ký túc xá",
    "VHUB",
    "Nghề nghiệp",
  ];

  const filteredServices = useMemo(() => {
    if (!searchTerm.trim()) {
      return services;
    }

    const term = searchTerm.toLowerCase().trim();
    return services.filter(
      (service: Service) =>
        service.title.toLowerCase().includes(term) ||
        service.description.toLowerCase().includes(term) ||
        service.category.toLowerCase().includes(term)
    );
  }, [services, searchTerm]);

  useEffect(() => {
    onFilteredServices(filteredServices);
  }, [filteredServices, onFilteredServices]);

  // Function to highlight search terms in text (unused for now)
  // const highlightText = (text: string, searchTerm: string) => {
  //   if (!searchTerm.trim()) return text;
  //
  //   const regex = new RegExp(`(${searchTerm})`, 'gi');
  //   const parts = text.split(regex);
  //
  //   return parts.map((part, index) =>
  //     regex.test(part) ? (
  //       <span key={index} className="bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 font-semibold">
  //         {part}
  //         </span>
  //     ) : part
  //   );
  // };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setIsSearchActive(false);
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Search Input */}
      <div className="relative">
        <motion.div
          className="relative"
          animate={{
            scale: isSearchActive ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <motion.svg
              className="w-5 h-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{
                rotate: isSearchActive ? 90 : 0,
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </motion.svg>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setTimeout(() => setIsSearchActive(false), 200)}
            placeholder="Tìm kiếm dịch vụ MLT..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 dark:focus:border-red-600 transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />

          {/* Clear button */}
          <AnimatePresence>
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg
                  className="w-5 h-5"
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
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Search Suggestions */}
        <AnimatePresence>
          {isSearchActive && !searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-[60]"
            >
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                🔍 Tìm kiếm phổ biến
              </h4>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-red-600/10 dark:hover:bg-red-600/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Results Summary */}
      <AnimatePresence>
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/50 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm text-blue-700 dark:text-blue-300">
                Tìm thấy <strong>{filteredServices.length}</strong> kết quả cho
                "{searchTerm}"
              </span>
            </div>

            {filteredServices.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Có kết quả
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results */}
      <AnimatePresence>
        {searchTerm && filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center py-8 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Không tìm thấy kết quả
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Không có dịch vụ nào phù hợp với từ khóa "
              <strong>{searchTerm}</strong>"
            </p>
            <div className="space-y-2">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Thử tìm kiếm:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.slice(0, 3).map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1 text-xs bg-red-600/10 dark:bg-red-600/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-600/20 dark:hover:bg-red-600/30 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
