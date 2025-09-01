import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Video,
  FileText,
  BarChart3,
  Users,
  Zap,
  Star,
  Play,
  ArrowRight,
  CheckCircle,
  Award,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { PricingCard, PricingPlan } from "../components/ui/pricing-card";
import { FeatureCard, Feature } from "../components/ui/feature-card";

export default function NewHome() {
  console.log("🏠 Rendering NewHome page");
  const navigate = useNavigate();
  
  // Hero Stats
  const heroStats = [
    { label: "Dự án hoàn thành", value: "10,000+", change: "+25%" },
    { label: "Người dùng", value: "50,000+", change: "+40%" },
    { label: "Video tạo/tháng", value: "100,000+", change: "+60%" },
    { label: "Độ hài lòng", value: "99.8%", change: "+5%" },
  ];

  // Features
  const features: Feature[] = [
    {
      id: "ai-video",
      title: "AI Video Generator",
      description: "Tạo video chuyên nghiệp từ kịch bản với công nghệ AI tiên tiến. Hỗ trợ nhiều ngôn ngữ và phong cách.",
      icon: <Video className="w-7 h-7" />,
      color: "blue",
      badge: "Hot",
      stats: [
        { label: "Thời gian", value: "<5 phút" },
        { label: "Chất lượng", value: "4K" },
      ],
    },
    {
      id: "script-ai",
      title: "Script AI Assistant",
      description: "Trợ lý AI thông minh giúp tạo kịch bản sáng tạo, phù hợp với mọi mục đích và đối tượng.",
      icon: <FileText className="w-7 h-7" />,
      color: "purple",
      badge: "New",
      stats: [
        { label: "Languages", value: "20+" },
        { label: "Templates", value: "100+" },
      ],
    },
    {
      id: "analytics",
      title: "Advanced Analytics",
      description: "Phân tích chi tiết hiệu suất nội dung với dashboard trực quan và báo cáo tự động.",
      icon: <BarChart3 className="w-7 h-7" />,
      color: "green",
      stats: [
        { label: "Metrics", value: "50+" },
        { label: "Real-time", value: "100%" },
      ],
    },
    {
      id: "collaboration",
      title: "Team Collaboration",
      description: "Làm việc nhóm hiệu quả với hệ thống quản lý dự án và phân quyền chi tiết.",
      icon: <Users className="w-7 h-7" />,
      color: "orange",
      stats: [
        { label: "Users/Team", value: "50+" },
        { label: "Projects", value: "∞" },
      ],
    },
  ];

  // Pricing Plans
  const pricingPlans: PricingPlan[] = [
    {
      id: "starter",
      name: "Starter",
      description: "Hoàn hảo cho cá nhân và freelancer",
      price: 0,
      period: "tháng",
      features: [
        "5 video AI/tháng",
        "10 kịch bản/tháng",
        "Templates cơ bản",
        "Export 720p",
        "Hỗ trợ email",
      ],
      buttonText: "Bắt đầu miễn phí",
      buttonVariant: "outline",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Tối ưu cho doanh nghiệp nhỏ",
      price: 299000,
      originalPrice: 399000,
      period: "tháng",
      features: [
        "50 video AI/tháng",
        "Unlimited kịch bản",
        "Premium templates",
        "Export 4K",
        "Advanced analytics",
        "Priority support",
        "Team collaboration (5 users)",
      ],
      highlighted: true,
      popular: true,
      icon: <Zap className="w-8 h-8" />,
      buttonText: "Nâng cấp ngay",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Giải pháp toàn diện cho doanh nghiệp",
      price: 999000,
      originalPrice: 1299000,
      period: "tháng",
      features: [
        "Unlimited video AI",
        "Unlimited kịch bản",
        "Custom templates",
        "White-label solution",
        "Advanced integrations",
        "Dedicated support",
        "Unlimited team members",
        "Custom analytics",
        "SLA guarantee",
      ],
      buttonText: "Liên hệ tư vấn",
      buttonVariant: "outline",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Nguyễn Minh Tuấn",
      role: "CEO, TechStart Vietnam",
      avatar: "👨‍💼",
      content: "MLT Script AI đã thay đổi hoàn toàn cách chúng tôi tạo nội dung marketing. Tiết kiệm 80% thời gian và chi phí!",
      rating: 5,
      company: "TechStart",
    },
    {
      name: "Trần Thị Mai",
      role: "Content Manager",
      avatar: "👩‍💻",
      content: "Công nghệ AI tuyệt vời, giao diện thân thiện. Team tôi đã tạo được hơn 200 video chỉ trong tháng đầu.",
      rating: 5,
      company: "Digital Agency",
    },
    {
      name: "Lê Văn Đức",
      role: "Marketing Director",
      avatar: "👨‍🎨",
      content: "ROI tăng 300% sau khi sử dụng MLT Script AI. Đầu tư xứng đáng nhất năm!",
      rating: 5,
      company: "E-commerce Plus",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:text-blue-200">
                🚀 Platform AI #1 Việt Nam - Trusted by 50,000+ users
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                Tạo Video & Kịch Bản
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Chuyên Nghiệp với AI
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
                Chuyển đổi ý tưởng thành nội dung viral với công nghệ AI tiên tiến nhất. 
                Tiết kiệm <span className="font-bold text-blue-600">90% thời gian</span>, 
                tăng <span className="font-bold text-green-600">300% hiệu quả</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link to="/tao-video">
                  <Button 
                    size="lg" 
                    className="text-lg px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Play className="w-6 h-6 mr-3" />
                    Tạo Video AI Miễn Phí
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-lg px-10 py-4 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
                  >
                    <ArrowRight className="w-6 h-6 mr-3" />
                    Xem Demo Live
                  </Button>
                </Link>
              </div>

              {/* Hero Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
              >
                {heroStats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300"
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {stat.label}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-200/30 dark:bg-pink-800/20 rounded-full blur-3xl animate-pulse" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              ✨ Tính năng nổi bật
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Công nghệ AI tiên tiến nhất
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Khám phá bộ công cụ mạnh mẽ giúp bạn tạo ra nội dung chất lượng cao, 
              thu hút triệu lượt xem và tối đa hóa doanh thu
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index}
                onClick={(feat) => {
                  if (feat.id === "ai-video") navigate("/tao-video");
                  else if (feat.id === "script-ai") navigate("/quan-ly-kich-ban");
                  else if (feat.id === "analytics") navigate("/analytics");
                  else navigate("/quan-ly-du-an");
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              💰 Giá cả minh bạch
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Chọn gói phù hợp với bạn
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Bắt đầu miễn phí, nâng cấp khi cần. Không ràng buộc, hủy bất cứ lúc nào.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-green-600 dark:text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>Dùng thử 14 ngày miễn phí</span>
              <CheckCircle className="w-4 h-4 ml-4" />
              <span>Hủy bất cứ lúc nào</span>
              <CheckCircle className="w-4 h-4 ml-4" />
              <span>Hỗ trợ 24/7</span>
            </div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                onSelect={(selectedPlan) => {
                  // Handle plan selection
                  if (selectedPlan.id === "starter") {
                    navigate("/tao-video");
                  } else {
                    navigate("/dashboard");
                  }
                }}
                className={index === 1 ? "lg:scale-105 lg:-translate-y-4" : ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 px-4 py-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              ⭐ Phản hồi khách hàng
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              50,000+ khách hàng tin tưởng
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Những câu chuyện thành công thực tế từ các doanh nghiệp và cá nhân đã sử dụng MLT Script AI
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group hover:border-blue-200 dark:hover:border-blue-700"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <Award className="w-12 h-12 text-yellow-300 mr-4" />
              <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
                🏆 Startup of the Year 2024
              </Badge>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
              Sẵn sàng thay đổi cuộc chơi?
            </h2>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-10 leading-relaxed">
              Tham gia cộng đồng hơn 50,000 người sáng tạo đang kiếm tiền từ 
              nội dung AI chất lượng cao mỗi ngày
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/tao-video">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-10 py-4 bg-white text-gray-900 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                >
                  <Zap className="w-6 h-6 mr-3" />
                  Bắt đầu miễn phí ngay
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-4 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  <Shield className="w-6 h-6 mr-3" />
                  Enterprise Demo
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Không cần thẻ tín dụng</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Setup trong 30 giây</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}