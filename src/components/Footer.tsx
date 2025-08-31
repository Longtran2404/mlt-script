
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/tao-kich-ban", label: "Tạo kịch bản" },
    { href: "/quan-ly", label: "Quản lý" },
  ];

  const features = [
    "AI tạo kịch bản thông minh",
    "Tích hợp Google Sheets",
    "Giao diện thân thiện",
    "Hỗ trợ đa nền tảng",
  ];

  return (
    <footer className="relative z-10 bg-gray-50 dark:bg-gray-900 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo và mô tả */}
          <div className="lg:col-span-2">
            <a
              href="/"
              className="inline-flex items-center space-x-3 mb-4 min-w-0"
            >
              <img
                src="/mlt-logo.svg"
                alt="MLT"
                width={32}
                height={32}
                className="flex-shrink-0"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent whitespace-nowrap">
                MLT Script AI
              </span>
            </a>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Công cụ AI tiên tiến giúp tạo kịch bản video chuyên nghiệp cho
              Trần Minh Long. Tối ưu hóa quy trình sáng tạo nội dung với công
              nghệ hiện đại.
            </p>

            {/* Features list */}
            <div className="space-y-2 mb-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Liên kết nhanh
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={`quick-${index}-${link.href}`}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Hỗ trợ
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span>support@vanlanguni.vn</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>(028) 7300 5588</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🏢</span>
                <span>233A Phan Văn Trị, Q.5, TP.HCM</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⏰</span>
                <span>7:30 - 17:00 (T2-T6)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} MLT Script AI. Bản quyền thuộc về Trần Minh Long.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <a
                href="/privacy"
                className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Chính sách bảo mật
              </a>
              <a
                href="/terms"
                className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
