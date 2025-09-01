import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Palette,
  Zap,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";

export default function NewScriptCreatorInfo() {
  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Responsive Design",
      description:
        "Tự động thích ứng với mọi kích thước màn hình từ mobile đến desktop",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Modern UI/UX",
      description:
        "Giao diện hiện đại với animations mượt mà và trải nghiệm người dùng tối ưu",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Optimized",
      description: "Tối ưu hiệu suất với lazy loading và code splitting",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Accessibility",
      description:
        "Tuân thủ tiêu chuẩn WCAG với keyboard navigation và screen reader support",
      color: "from-green-500 to-teal-600",
    },
  ];

  const responsiveBreakpoints = [
    {
      icon: <Smartphone className="w-5 h-5" />,
      name: "Mobile",
      size: "320px - 768px",
      features: [
        "Single column layout",
        "Touch-friendly buttons",
        "Optimized spacing",
      ],
    },
    {
      icon: <Tablet className="w-5 h-5" />,
      name: "Tablet",
      size: "768px - 1024px",
      features: [
        "Adaptive grid",
        "Medium-sized components",
        "Balanced spacing",
      ],
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      name: "Desktop",
      size: "1024px+",
      features: [
        "Multi-column layout",
        "Full feature set",
        "Enhanced interactions",
      ],
    },
  ];

  return (
    <div className="py-8 lg:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trang Tạo Kịch Bản Mới
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Thiết kế lại hoàn toàn với giao diện hiện đại, responsive hoàn hảo
            và trải nghiệm người dùng tối ưu
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Responsive Design Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Responsive Design Hoàn Hảo
              </CardTitle>
              <CardDescription className="text-lg">
                Tự động thích ứng với mọi thiết bị và kích thước màn hình
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {responsiveBreakpoints.map((breakpoint, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                      {breakpoint.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      {breakpoint.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {breakpoint.size}
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {breakpoint.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Old Version */}
          <Card className="border-2 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="text-lg">Phiên bản cũ</span>
                <Badge variant="outline">Legacy</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Giao diện cơ bản
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Responsive cơ bản
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Chức năng đầy đủ
              </div>
              <div className="flex items-center gap-2 text-sm text-red-500">
                <span className="w-4 h-4">✗</span>
                Thiếu animations
              </div>
              <div className="flex items-center gap-2 text-sm text-red-500">
                <span className="w-4 h-4">✗</span>
                UX chưa tối ưu
              </div>
            </CardContent>
          </Card>

          {/* New Version */}
          <Card className="border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Phiên bản mới
                </span>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  New
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Giao diện hiện đại
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Responsive hoàn hảo
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Animations mượt mà
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500" />
                UX tối ưu
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Performance cao
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Trải nghiệm ngay phiên bản mới!
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Khám phá giao diện hiện đại và responsive hoàn hảo
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Link to="/tao-kich-ban-new">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Thử phiên bản mới
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Link to="/tao-kich-ban">
                    <span>Giữ phiên bản cũ</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
