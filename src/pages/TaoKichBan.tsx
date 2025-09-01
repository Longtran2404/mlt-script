import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  BookOpen, 
  Sparkles, 
  Send,
  Loader2,
  FileText,
  Video,
  Users,
  Lightbulb,
  TrendingUp,
  Target
} from "lucide-react";

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
  color: string;
  example: string;
}

export default function TaoKichBan() {
  console.log("📝 Rendering TaoKichBan page");
  
  const [formData, setFormData] = useState<ScriptFormData>({
    description: "",
    content: "",
    voice: "",
    duration: 30,
    service: "",
    sessionId: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  // Danh sách dịch vụ học tập MLT
  const mltServices: MLTService[] = [
    {
      id: "marketing-digital",
      title: "Marketing Digital",
      description: "Học cách xây dựng chiến lược marketing online hiệu quả",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-blue-500 to-purple-600",
      example: "Tạo video hướng dẫn về SEO, Facebook Ads, Google Ads với nội dung thực tiễn và dễ hiểu."
    },
    {
      id: "khoi-nghiep",
      title: "Khởi Nghiệp",
      description: "Kiến thức từ ý tưởng đến thực hiện dự án khởi nghiệp",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "from-green-500 to-teal-600",
      example: "Video series về lập kế hoạch kinh doanh, tìm kiếm vốn đầu tư và quản lý startup."
    },
    {
      id: "lap-trinh",
      title: "Lập Trình",
      description: "Từ cơ bản đến nâng cao về các ngôn ngữ lập trình",
      icon: <FileText className="w-6 h-6" />,
      color: "from-orange-500 to-red-600",
      example: "Khóa học JavaScript, React, Node.js với dự án thực tế từ cơ bản đến chuyên nghiệp."
    },
    {
      id: "quan-ly",
      title: "Quản Lý",
      description: "Kỹ năng lãnh đạo và quản lý đội nhóm hiệu quả",
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600",
      example: "Học cách quản lý nhân sự, xây dựng văn hóa công ty và tăng năng suất làm việc."
    },
    {
      id: "suc-khoe",
      title: "Sức Khỏe & Dinh Dưỡng",
      description: "Kiến thức về sức khỏe, dinh dưỡng và lối sống lành mạnh",
      icon: <Target className="w-6 h-6" />,
      color: "from-green-400 to-blue-500",
      example: "Video về chế độ ăn uống, tập luyện và cách duy trì sức khỏe tinh thần tốt."
    },
    {
      id: "tai-chinh",
      title: "Tài Chính Cá Nhân",
      description: "Quản lý tài chính, đầu tư và lập kế hoạch tài chính",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-600",
      example: "Hướng dẫn tiết kiệm, đầu tư chứng khoán, crypto và lập ngân sách cá nhân."
    }
  ];

  const voices = [
    { id: "nam-tre", name: "Nam trẻ - Năng động" },
    { id: "nu-tre", name: "Nữ trẻ - Dịu dàng" },
    { id: "nam-truong-thanh", name: "Nam trưởng thành - Uy tín" },
    { id: "nu-truong-thanh", name: "Nữ trưởng thành - Chuyên nghiệp" },
    { id: "tre-em", name: "Trẻ em - Hoạt bát" }
  ];

  const handleServiceSelect = (service: MLTService) => {
    setFormData(prev => ({ 
      ...prev, 
      service: service.id,
      content: service.example 
    }));
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
      videoEngine: formData.duration <= 45 ? "Veo 2" : "Gemini Veo 3"
    };

    try {
      const response = await fetch("https://n8n-cosari.tino.page/webhook/VLU-KICHBAN", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert(`✅ Đã gửi yêu cầu tạo kịch bản thành công!\nSession ID: ${sessionId}`);
        setFormData({
          description: "",
          content: "",
          voice: "",
          duration: 30,
          service: "",
          sessionId: sessionId
        });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-6">
            🎬 Tạo Kịch Bản AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tạo kịch bản video chuyên nghiệp với sự hỗ trợ của AI. Chọn dịch vụ, 
            nhập mô tả và để AI tạo nội dung hoàn hảo cho bạn.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  Thông tin kịch bản
                </CardTitle>
                <CardDescription>
                  Nhập thông tin để tạo kịch bản AI tùy chỉnh
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mô tả */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    📝 Mô tả nội dung *
                  </label>
                  <Textarea
                    placeholder="Ví dụ: Tạo video hướng dẫn marketing Facebook Ads cho người mới bắt đầu..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </div>

                {/* Kịch bản chi tiết */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    📄 Kịch bản chi tiết (tùy chọn)
                  </label>
                  <Textarea
                    placeholder="Nhập kịch bản chi tiết hoặc để AI tạo tự động..."
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="min-h-[120px]"
                  />
                </div>

                {/* Giọng điệu */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    🎤 Giọng điệu *
                  </label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, voice: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giọng điệu phù hợp" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map((voice) => (
                        <SelectItem key={voice.id} value={voice.id}>
                          {voice.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Thời lượng */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    ⏱️ Thời lượng: {formData.duration}s
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="30"
                      max="60"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>30s (Veo 2)</span>
                      <span>45s</span>
                      <span>60s (Gemini Veo 3)</span>
                    </div>
                  </div>
                  <Badge variant={formData.duration <= 45 ? "default" : "secondary"} className="mt-2">
                    {formData.duration <= 45 ? "🚀 Veo 2 - Tốc độ cao" : "⚡ Gemini Veo 3 - Chất lượng premium"}
                  </Badge>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.description || !formData.voice || !formData.service}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 text-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Đang tạo kịch bản...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Tạo Kịch Bản AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-500" />
                Dịch Vụ Học Tập MLT
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Chọn dịch vụ để tạo mẫu kịch bản phù hợp
              </p>
            </div>

            <div className="grid gap-6">
              {mltServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setFlippedCard(service.id)}
                  onMouseLeave={() => setFlippedCard(null)}
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="relative w-full h-32 rounded-xl overflow-hidden shadow-lg">
                    {/* Front Card */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${service.color} p-6 flex items-center justify-between text-white`}
                      animate={{
                        rotateY: flippedCard === service.id ? 180 : 0,
                        scale: formData.service === service.id ? 1.02 : 1
                      }}
                      transition={{ duration: 0.6 }}
                      style={{
                        backfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      <div className="flex items-center gap-4">
                        {service.icon}
                        <div>
                          <h3 className="text-lg font-bold">{service.title}</h3>
                          <p className="text-sm opacity-90">{service.description}</p>
                        </div>
                      </div>
                      {formData.service === service.id && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary">✓ Đã chọn</Badge>
                        </div>
                      )}
                    </motion.div>

                    {/* Back Card */}
                    <motion.div
                      className="absolute inset-0 bg-white dark:bg-gray-800 p-4 flex items-center"
                      animate={{
                        rotateY: flippedCard === service.id ? 0 : -180,
                      }}
                      transition={{ duration: 0.6 }}
                      style={{
                        backfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d',
                        transform: 'rotateY(-180deg)'
                      }}
                    >
                      <div className="text-center w-full">
                        <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                          Ví dụ kịch bản:
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {service.example}
                        </p>
                        <Button
                          size="sm"
                          className="mt-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        >
                          Tạo mẫu kịch bản
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Video className="w-6 h-6 text-blue-500" />
                Thông tin về Video Engine
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-500 text-white">Veo 2</Badge>
                  <div>
                    <h4 className="font-semibold">30-45 giây</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Tốc độ xử lý nhanh, phù hợp cho nội dung ngắn gọn
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-purple-500 text-white">Gemini Veo 3</Badge>
                  <div>
                    <h4 className="font-semibold">45-60 giây</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Chất lượng cao, chi tiết hơn cho nội dung phức tạp
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}