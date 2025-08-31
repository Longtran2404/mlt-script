import { motion } from "framer-motion";

interface HeroProps {
  onPageChange?: (page: string) => void;
}

export default function Hero({ onPageChange }: HeroProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-mlt-light via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-mlt-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-mlt-red/10 to-red-100/50 dark:from-mlt-red/20 dark:to-red-900/30 border border-mlt-red/20 dark:border-red-700/50 rounded-full"
            >
              <span className="w-2 h-2 bg-mlt-red rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-mlt-red dark:text-red-400">AI Video Script Generator</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-mlt-ink via-mlt-red to-blue-600 dark:from-white dark:via-red-400 dark:to-blue-400 bg-clip-text text-transparent leading-tight px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              MLT Script AI
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-mlt-ink/70 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Tạo kịch bản video chuyên nghiệp với AI cho các dịch vụ MLT. 
              Quản lý và chỉnh sửa trực tiếp trên Google Sheets.
            </motion.p>

            {/* Features Grid */}
            <motion.div 
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold text-mlt-ink dark:text-gray-200 mb-2">AI Thông Minh</h3>
                <p className="text-sm text-mlt-ink/70 dark:text-gray-400">Tạo kịch bản video tự động với AI, phù hợp với tone và mục tiêu của từng dịch vụ MLT</p>
              </div>
              <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-mlt-ink dark:text-gray-200 mb-2">Google Sheets</h3>
                <p className="text-sm text-mlt-ink/70 dark:text-gray-400">Tự động lưu và quản lý kịch bản trên Google Sheets, dễ dàng chia sẻ và cộng tác</p>
              </div>
              <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold text-mlt-ink dark:text-gray-200 mb-2">Nhanh Chóng</h3>
                <p className="text-sm text-mlt-ink/70 dark:text-gray-400">Tạo kịch bản chỉ trong vài phút thay vì vài giờ, tối ưu cho content marketing</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {onPageChange && (
                <motion.button
                  onClick={() => onPageChange("tao-kich-ban")}
                  className="group relative px-8 py-4 bg-gradient-to-r from-mlt-red to-red-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-3">
                    🚀 Tạo Kịch Bản Ngay
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </span>
                </motion.button>
              )}
              
              {onPageChange && (
                <motion.button
                  onClick={() => onPageChange("quan-ly")}
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-mlt-ink dark:text-gray-200 font-semibold rounded-2xl border-2 border-gray-200 dark:border-gray-600 hover:border-mlt-red dark:hover:border-red-400 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📊 Quản Lý Kịch Bản
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div 
            className="text-center space-y-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-mlt-ink to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              Cách Hoạt Động
            </h2>
            <p className="text-xl text-mlt-ink/70 dark:text-gray-300 max-w-3xl mx-auto">
              Chỉ 3 bước đơn giản để có kịch bản video chuyên nghiệp
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Chọn Dịch Vụ",
                description: "Chọn các dịch vụ MLT bạn muốn tạo content video",
                icon: "🎯"
              },
              {
                step: "02", 
                title: "Cấu Hình AI",
                description: "Thiết lập tone, thời lượng và chi tiết kịch bản",
                icon: "⚙️"
              },
              {
                step: "03",
                title: "Nhận Kết Quả",
                description: "Nhận kịch bản hoàn chỉnh được lưu trên Google Sheets",
                icon: "📄"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <div className="absolute top-6 right-6 text-6xl font-bold text-mlt-red/10 dark:text-red-400/10">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-mlt-ink dark:text-gray-200 mb-4">
                  {item.title}
                </h3>
                <p className="text-mlt-ink/70 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Công cụ Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div 
            className="text-center space-y-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-mlt-ink to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              🛠️ Bộ Công Cụ AI
            </h2>
            <p className="text-xl text-mlt-ink/70 dark:text-gray-300 max-w-3xl mx-auto">
              Khám phá các công cụ AI mạnh mẽ để tạo nội dung chuyên nghiệp
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Tạo Kịch Bản",
                description: "AI tạo kịch bản video chuyên nghiệp",
                icon: "✍️",
                color: "from-blue-500 to-cyan-500",
                page: "tao-kich-ban"
              },
              {
                title: "Tạo Video",
                description: "Chuyển kịch bản thành video hoàn chỉnh",
                icon: "🎬",
                color: "from-purple-500 to-pink-500",
                page: "tao-video"
              },
              {
                title: "Analytics",
                description: "Theo dõi hiệu suất và phân tích dữ liệu",
                icon: "📊",
                color: "from-green-500 to-emerald-500",
                page: "analytics"
              },
              {
                title: "Templates",
                description: "Thư viện template đa dạng cho MLT",
                icon: "📋",
                color: "from-orange-500 to-red-500",
                page: "templates"
              }
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <button
                  onClick={() => onPageChange && onPageChange(tool.page)}
                  className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full w-full text-left"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                  
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{tool.icon}</div>
                    <h3 className="text-lg font-bold text-mlt-ink dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-mlt-ink/70 dark:text-gray-400 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button 
              onClick={() => onPageChange && onPageChange("dashboard")}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🛠️ Xem Tất Cả Công Cụ
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Hỗ trợ Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div 
            className="text-center space-y-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-mlt-ink to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              💬 Trung Tâm Hỗ Trợ
            </h2>
            <p className="text-xl text-mlt-ink/70 dark:text-gray-300 max-w-3xl mx-auto">
              Nhận hỗ trợ 24/7 để tận dụng tối đa MLT Script AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Support ChatBot",
                description: "Trợ lý AI 24/7 giải đáp mọi thắc mắc",
                icon: "🤖",
                color: "from-blue-500 to-cyan-500",
                page: "ai-support",
                features: ["Chat AI 24/7", "Phản hồi tức thời", "Hiểu biết sâu về MLT"]
              },
              {
                title: "Help Center", 
                description: "Thư viện tài liệu và hướng dẫn chi tiết",
                icon: "📚",
                color: "from-green-500 to-emerald-500",
                page: "help",
                features: ["Hướng dẫn từ A-Z", "Video tutorial", "FAQ chi tiết"]
              },
              {
                title: "Google Setup",
                description: "Hướng dẫn tích hợp Google Services",
                icon: "🔗",
                color: "from-orange-500 to-red-500", 
                page: "google-integration",
                features: ["Setup OAuth", "Kết nối Sheets", "Best practices"]
              }
            ].map((support, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <button
                  onClick={() => onPageChange && onPageChange(support.page)}
                  className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full w-full text-left"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${support.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                  
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{support.icon}</div>
                    <h3 className="text-lg font-bold text-mlt-ink dark:text-white mb-2">
                      {support.title}
                    </h3>
                    <p className="text-sm text-mlt-ink/70 dark:text-gray-400 mb-4 leading-relaxed">
                      {support.description}
                    </p>
                    <ul className="space-y-1">
                      {support.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-mlt-ink/60 dark:text-gray-500 flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button 
              onClick={() => onPageChange && onPageChange("help")}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💬 Trung Tâm Hỗ Trợ
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* LocatorJS Demo Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div 
            className="text-center space-y-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-mlt-ink to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              🧪 Test LocatorJS
            </h2>
            <p className="text-xl text-mlt-ink/70 dark:text-gray-300 max-w-3xl mx-auto">
              Thử nghiệm tính năng click vào component để mở code trong Cursor
            </p>
          </motion.div>
          
  
        </div>
      </section>
    </>
  );
}
