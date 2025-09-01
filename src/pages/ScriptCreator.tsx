import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  BookOpen,
  Sparkles,
  Send,
  Loader2,
  FileText,
  Users,
  Lightbulb,
  TrendingUp,
  Target,
  Clock,
  Mic,
  CheckCircle,
  Settings,
  Wand2,
} from "lucide-react";
import { SCRIPT_WEBHOOK_URL, getCorsHeaders } from "../config/api";

interface ScriptFormData {
  description: string;
  content: string;
  voice: string;
  duration: number;
  service: string;
  sessionId: string;
}

interface MLTService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  example: string;
  features: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export default function ScriptCreator() {
  const [formData, setFormData] = useState<ScriptFormData>({
    description: "",
    content: "",
    voice: "",
    duration: 30,
    service: "",
    sessionId: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const mltServices: MLTService[] = [
    {
      id: "marketing-digital",
      title: "Marketing Digital",
      description: "Học cách xây dựng chiến lược marketing online hiệu quả",
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
      difficulty: "Intermediate",
      example: `[Mở đầu - 5s] Chào mừng bạn đến với khóa học Marketing Digital!`,
      features: ["SEO", "Facebook Ads", "Google Ads", "Content Marketing"],
    },
    {
      id: "khoi-nghiep",
      title: "Khởi Nghiệp",
      description: "Kiến thức từ ý tưởng đến thực hiện dự án khởi nghiệp",
      icon: <Lightbulb className="w-6 h-6" />,
      gradient: "bg-gradient-to-br from-green-500 to-teal-600",
      difficulty: "Beginner",
      example: `[Giới thiệu - 5s] Bạn có ý tưởng kinh doanh?`,
      features: ["Business Plan", "Funding", "Market Analysis", "Strategy"],
    },
    {
      id: "lap-trinh",
      title: "Lập Trình",
      description: "Từ cơ bản đến nâng cao về các ngôn ngữ lập trình",
      icon: <FileText className="w-6 h-6" />,
      gradient: "bg-gradient-to-br from-orange-500 to-red-600",
      difficulty: "Advanced",
      example: `[Mở đầu - 5s] Chào mừng đến với khóa học lập trình web!`,
      features: ["HTML/CSS", "JavaScript", "React", "Node.js"],
    },
    {
      id: "quan-ly",
      title: "Quản Lý",
      description: "Kỹ năng lãnh đạo và quản lý đội nhóm hiệu quả",
      icon: <Users className="w-6 h-6" />,
      gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
      difficulty: "Intermediate",
      example: `[Giới thiệu - 5s] Lãnh đạo không phải là chức danh mà là kỹ năng.`,
      features: ["Leadership", "Team Management", "HR", "Culture"],
    },
    {
      id: "suc-khoe",
      title: "Sức Khỏe & Dinh Dưỡng",
      description: "Kiến thức về sức khỏe, dinh dưỡng và lối sống lành mạnh",
      icon: <Target className="w-6 h-6" />,
      gradient: "bg-gradient-to-br from-green-400 to-blue-500",
      difficulty: "Beginner",
      example: `[Mở đầu - 5s] Sức khỏe là tài sản quý giá nhất!`,
      features: ["Nutrition", "Exercise", "Mental Health", "Wellness"],
    },
    {
      id: "tai-chinh",
      title: "Tài Chính Cá Nhân",
      description: "Quản lý tài chính, đầu tư và lập kế hoạch tài chính",
      icon: <BookOpen className="w-6 h-6" />,
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-600",
      difficulty: "Beginner",
      example: `[Giới thiệu - 5s] Tiền không mua được hạnh phúc nhưng giúp bạn tự do!`,
      features: ["Budgeting", "Investing", "Saving", "Financial Planning"],
    },
  ];

  const voices = [
    { id: "nam-tre", name: "Nam trẻ - Năng động", icon: "🎤" },
    { id: "nu-tre", name: "Nữ trẻ - Dịu dàng", icon: "🎵" },
    { id: "nam-truong-thanh", name: "Nam trưởng thành - Uy tín", icon: "🎯" },
    {
      id: "nu-truong-thanh",
      name: "Nữ trưởng thành - Chuyên nghiệp",
      icon: "💼",
    },
    { id: "tre-em", name: "Trẻ em - Hoạt bát", icon: "🌟" },
  ];

  const handleServiceSelect = (service: MLTService) => {
    setFormData((prev) => ({
      ...prev,
      service: service.id,
      content: service.example,
    }));
    setActiveStep(2);
  };

  const generateSessionId = () => {
    return `vlu_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = async () => {
    if (!formData.description || !formData.voice || !formData.service) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setIsLoading(true);
    const sessionId = generateSessionId();
    const payload = {
      description: formData.description,
      content: formData.content,
      voice: formData.voice,
      duration: formData.duration,
      service: formData.service,
      sessionId: sessionId,
      timestamp: new Date().toISOString(),
      platform: "MLT Script AI",
      videoEngine: "Video AI",
    };

    try {
      const response = await fetch(SCRIPT_WEBHOOK_URL, {
        method: "POST",
        headers: getCorsHeaders(),
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(
          `✅ Đã gửi yêu cầu tạo kịch bản thành công!\nSession ID: ${sessionId}`
        );
        setFormData({
          description: "",
          content: "",
          voice: "",
          duration: 30,
          service: "",
          sessionId: sessionId,
        });
        setActiveStep(1);
      } else {
        throw new Error("Lỗi khi gửi dữ liệu");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Wand2 className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-wide">
              Tạo Kịch Bản AI
            </h1>
          </div>
          <p className="text-base lg:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto px-4 leading-relaxed">
            Tạo kịch bản video chuyên nghiệp với sự hỗ trợ của AI. Chọn dịch vụ,
            nhập mô tả và để AI tạo nội dung hoàn hảo cho bạn.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-3 lg:gap-6">
            {[
              { step: 1, label: "Chọn dịch vụ" },
              { step: 2, label: "Cấu hình" },
              { step: 3, label: "Tạo kịch bản" },
            ].map(({ step, label }) => (
              <div key={step} className="flex flex-col items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-sm lg:text-lg font-bold transition-all duration-300 ${
                      activeStep >= step
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}
                  >
                    {activeStep > step ? (
                      <CheckCircle className="w-5 h-5 lg:w-7 lg:h-7" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-12 lg:w-20 h-1 mx-3 lg:mx-6 rounded-full transition-all duration-300 ${
                        activeStep > step
                          ? "bg-gradient-to-r from-blue-600 to-purple-600"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`mt-3 text-sm lg:text-base font-medium tracking-wide ${
                    activeStep >= step ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1"
          >
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 flex items-center gap-3">
                <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-blue-500" />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dịch Vụ Học Tập MLT
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">
                Chọn dịch vụ để tạo mẫu kịch bản phù hợp với nội dung của bạn
              </p>
            </div>

            <div className="grid gap-4 lg:gap-6">
              {mltServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="relative group cursor-pointer"
                  onClick={() => handleServiceSelect(service)}
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border-2 ${
                      formData.service === service.id
                        ? "border-blue-500 shadow-blue-500/20"
                        : "border-gray-200/50 dark:border-gray-700/50"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/85 dark:from-gray-800/95 dark:to-gray-900/85 backdrop-blur-sm" />

                    {formData.service === service.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
                    )}

                    <div className="relative p-4 lg:p-6">
                      <div className="flex items-start gap-3 lg:gap-4">
                        <motion.div
                          className={`flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 rounded-2xl ${service.gradient} flex items-center justify-center text-white shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          {service.icon}
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 lg:gap-3 mb-2">
                            <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                              {service.title}
                            </h3>
                            <Badge
                              className={`text-xs ${getDifficultyColor(
                                service.difficulty
                              )}`}
                            >
                              {service.difficulty}
                            </Badge>
                            {formData.service === service.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-1"
                              >
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                                  ✓ Đã chọn
                                </Badge>
                              </motion.div>
                            )}
                          </div>

                          <p className="text-gray-600 dark:text-gray-300 mb-3 lg:mb-4 text-sm lg:text-base leading-relaxed">
                            {service.description}
                          </p>

                          <div className="flex flex-wrap gap-1 lg:gap-2 mb-3">
                            {service.features.map((feature, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>

                          <motion.div
                            className="mt-3 lg:mt-4 flex items-center justify-between"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                          >
                            <Button
                              size="sm"
                              className={`transition-all duration-300 font-medium ${
                                formData.service === service.id
                                  ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
                                  : `${service.gradient} hover:shadow-lg text-white`
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleServiceSelect(service);
                              }}
                            >
                              {formData.service === service.id ? (
                                <>
                                  <Target className="w-4 h-4 mr-2" />
                                  Đang sử dụng
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  Chọn mẫu này
                                </>
                              )}
                            </Button>

                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>
                                {service.example.split(" ").length} từ
                              </span>
                              <span>•</span>
                              <span>
                                ~
                                {Math.ceil(
                                  service.example.split(" ").length / 150
                                )}{" "}
                                phút đọc
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2"
          >
            <div className="sticky top-6">
              <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 border-0 shadow-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg lg:text-xl">
                    <Settings className="w-5 h-5 lg:w-6 lg:h-6 text-purple-500" />
                    Cấu hình kịch bản
                  </CardTitle>
                  <CardDescription className="text-sm lg:text-base">
                    {formData.service
                      ? `Đang sử dụng: ${
                          mltServices.find((s) => s.id === formData.service)
                            ?.title
                        }`
                      : "Chọn dịch vụ để bắt đầu"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 lg:space-y-6">
                  <div>
                    <span className="inline-flex text-sm font-medium mb-2 items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Mô tả nội dung *</span>
                    </span>
                    <Textarea
                      placeholder="Ví dụ: Tạo video hướng dẫn marketing Facebook Ads cho người mới bắt đầu..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="min-h-[80px] lg:min-h-[100px] text-sm"
                    />
                  </div>

                  <div>
                    <span className="inline-flex text-sm font-medium mb-2 items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Kịch bản chi tiết (tùy chọn)</span>
                    </span>
                    <Textarea
                      placeholder="Nhập kịch bản chi tiết hoặc để AI tạo tự động..."
                      value={formData.content}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      className="min-h-[120px] lg:min-h-[150px] font-mono text-xs lg:text-sm"
                    />
                    {formData.service && (
                      <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Kịch bản mẫu đã được tải. Bạn có thể chỉnh sửa theo ý
                        muốn!
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="inline-flex text-sm font-medium mb-2 items-center gap-2">
                      <Mic className="w-4 h-4" />
                      <span>Giọng điệu *</span>
                    </span>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, voice: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn giọng điệu phù hợp" />
                      </SelectTrigger>
                      <SelectContent>
                        {voices.map((voice) => (
                          <SelectItem key={voice.id} value={voice.id}>
                            <div className="flex items-center gap-2">
                              <span>{voice.icon}</span>
                              <span>{voice.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <span className="inline-flex text-sm font-medium mb-2 items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Thời lượng: {formData.duration}s</span>
                    </span>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="30"
                        max="60"
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            duration: parseInt(e.target.value),
                          }))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>30s</span>
                        <span>45s</span>
                        <span>60s</span>
                      </div>
                    </div>
                    <Badge variant="default" className="mt-2 text-xs">
                      🎬 Video AI - Chất lượng cao
                    </Badge>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={
                      isLoading ||
                      !formData.description ||
                      !formData.voice ||
                      !formData.service
                    }
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 text-base lg:text-lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 mr-2 animate-spin" />
                        Đang tạo kịch bản...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                        Tạo Kịch Bản AI
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
