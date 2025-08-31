import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Video,
  FileText,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
  Play,
  Zap,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Video className="w-8 h-8 text-blue-600" />,
      title: "Tạo Video AI",
      description:
        "Chuyển đổi kịch bản thành video chuyên nghiệp với công nghệ AI tiên tiến",
      color: "from-blue-50 to-blue-100",
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Tạo Kịch Bản",
      description:
        "Tạo kịch bản chuyên nghiệp với sự hỗ trợ của AI, tối ưu cho mọi loại nội dung",
      color: "from-green-50 to-green-100",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Quản Lý Dự Án",
      description:
        "Quản lý và theo dõi tiến độ các dự án video và kịch bản một cách hiệu quả",
      color: "from-purple-50 to-purple-100",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Analytics & Báo Cáo",
      description: "Phân tích chi tiết về hiệu suất và tương tác của nội dung",
      color: "from-orange-50 to-orange-100",
    },
  ];

  const stats = [
    { label: "Dự án đã hoàn thành", value: "156", change: "+12%" },
    { label: "Video được tạo", value: "89", change: "+8%" },
    { label: "Người dùng tích cực", value: "1,247", change: "+15%" },
    { label: "Tỷ lệ hài lòng", value: "98%", change: "+2%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              🚀 Nền tảng AI tiên tiến nhất
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Tạo Video & Kịch Bản
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Với AI
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Chuyển đổi ý tưởng thành nội dung chuyên nghiệp với công nghệ AI
              tiên tiến. Tạo video và kịch bản chất lượng cao trong thời gian
              ngắn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Bắt đầu ngay
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <ArrowRight className="w-5 h-5 mr-2" />
                Xem demo
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-green-600 font-medium">
                  {stat.change}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Khám phá những công cụ mạnh mẽ giúp bạn tạo ra nội dung chất lượng
              cao
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Sẵn sàng bắt đầu?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Tham gia hàng nghìn người dùng đang tạo ra nội dung chất lượng cao
              với AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4"
              >
                <Zap className="w-5 h-5 mr-2" />
                Dùng thử miễn phí
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Liên hệ tư vấn
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Khách hàng nói gì
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Những phản hồi từ người dùng đã trải nghiệm
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Nguyễn Văn A",
                role: "Giảng viên MLT",
                content:
                  "Nền tảng này giúp tôi tạo video giảng dạy chất lượng cao trong thời gian ngắn. Rất hài lòng!",
                rating: 5,
              },
              {
                name: "Trần Thị B",
                role: "Marketing Manager",
                content:
                  "AI tạo kịch bản rất thông minh, giúp team tôi tiết kiệm thời gian đáng kể.",
                rating: 5,
              },
              {
                name: "Lê Văn C",
                role: "Content Creator",
                content:
                  "Giao diện dễ sử dụng, tính năng mạnh mẽ. Đây là công cụ không thể thiếu cho công việc của tôi.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

