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

// Removed anime.js, using Framer Motion instead

interface VideoSettings {
  duration: "15" | "30" | "60" | "120";
  style: "modern" | "classic" | "minimal" | "creative";
  music: "upbeat" | "calm" | "dramatic" | "corporate";
}

export default function TaoVideo() {
  const [videoScript, setVideoScript] = useState("");
  const [videoSettings, setVideoSettings] = useState<VideoSettings>({
    duration: "30",
    style: "modern",
    music: "upbeat",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState("");

  // Using Framer Motion for animations - no refs needed

  const handleGenerate = async () => {
    if (!videoScript.trim()) {
      setError("Vui lòng nhập kịch bản video trước khi tạo!");
      return;
    }

    setIsGenerating(true);
    setShowPreview(false);
    setError("");

    try {
      // Simulate AI video generation
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate sample video info based on settings
      const sampleVideo = generateSampleVideo(videoScript, videoSettings);
      setGeneratedVideo(sampleVideo);
      setShowPreview(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error generating video:", error);
      setError("Có lỗi xảy ra khi tạo video. Vui lòng thử lại!");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSampleVideo = (script: string, settings: VideoSettings) => {
    const styleMap = {
      modern: "hiện đại và sáng tạo",
      classic: "cổ điển và thanh lịch",
      minimal: "tối giản và tinh tế",
      creative: "sáng tạo và độc đáo",
    };

    const musicMap = {
      upbeat: "năng động và vui tươi",
      calm: "nhẹ nhàng và thư giãn",
      dramatic: "kịch tính và mạnh mẽ",
      corporate: "chuyên nghiệp và trang trọng",
    };

    const durationMap = {
      "15": "15 giây",
      "30": "30 giây",
      "60": "1 phút",
      "120": "2 phút",
    };

    return `[VIDEO AI - ${durationMap[settings.duration].toUpperCase()}]

KỊCH BẢN: ${script}

THÔNG SỐ VIDEO:
- Thời lượng: ${durationMap[settings.duration]}
- Phong cách: ${styleMap[settings.style]}
- Nhạc nền: ${musicMap[settings.music]}

---

PHÂN CẢNH CHI TIẾT:

CẢNH 1: Mở đầu (0-${Math.floor(parseInt(settings.duration) * 0.1)}s)
- Fade in với logo
- Text animation giới thiệu chủ đề
- Nhạc nền ${musicMap[settings.music]}

CẢNH 2: Nội dung chính (${Math.floor(
      parseInt(settings.duration) * 0.1
    )}-${Math.floor(parseInt(settings.duration) * 0.8)}s)
- Chuyển cảnh mượt mà với ${styleMap[settings.style]}
- Text overlay với key points
- Visual effects phù hợp phong cách
- Background music ${musicMap[settings.music]}

CẢNH 3: Kết thúc (${Math.floor(parseInt(settings.duration) * 0.8)}-${
      settings.duration
    }s)
- Call-to-action rõ ràng
- Fade out với thông tin liên hệ
- Nhạc kết thúc ${musicMap[settings.music]}

---

KỸ THUẬT:
- Độ phân giải: 1920x1080 (Full HD)
- Frame rate: 30fps
- Codec: H.264
- Audio: AAC, 128kbps
- Phong cách: ${styleMap[settings.style]}
- Nhạc nền: ${musicMap[settings.music]}

---

LƯU Ý:
- Video ${durationMap[settings.duration]} phù hợp cho ${
      styleMap[settings.style]
    }
- Phong cách ${styleMap[settings.style]} tối ưu cho ${musicMap[settings.music]}
- Đảm bảo text readable và visual appealing`;
  };

  const handleCopyVideo = async () => {
    try {
      await navigator.clipboard.writeText(generatedVideo);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      setError("Không thể copy. Vui lòng thử lại!");
    }
  };

  const handleDownloadVideo = () => {
    const blob = new Blob([generatedVideo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `video-script-${videoSettings.duration}s-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🎬 Tạo Video AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Chuyển đổi kịch bản thành video chuyên nghiệp với công nghệ AI tiên
            tiến
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Script Input */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          >
            <Card className="h-full shadow-xl border-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ✍️ Nhập Kịch Bản
                </CardTitle>
                <CardDescription>
                  Viết kịch bản hoặc mô tả video bạn muốn tạo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Kịch bản video
                  </label>
                  <Textarea
                    placeholder="Nhập kịch bản chi tiết cho video của bạn..."
                    value={videoScript}
                    onChange={(e) => setVideoScript(e.target.value)}
                    className="min-h-32"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Thời lượng
                    </label>
                    <Select
                      value={videoSettings.duration}
                      onValueChange={(value: VideoSettings["duration"]) =>
                        setVideoSettings({ ...videoSettings, duration: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 giây</SelectItem>
                        <SelectItem value="30">30 giây</SelectItem>
                        <SelectItem value="60">1 phút</SelectItem>
                        <SelectItem value="120">2 phút</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Phong cách
                    </label>
                    <Select
                      value={videoSettings.style}
                      onValueChange={(value: VideoSettings["style"]) =>
                        setVideoSettings({ ...videoSettings, style: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Hiện đại</SelectItem>
                        <SelectItem value="classic">Cổ điển</SelectItem>
                        <SelectItem value="minimal">Tối giản</SelectItem>
                        <SelectItem value="creative">Sáng tạo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Nhạc nền
                  </label>
                  <Select
                    value={videoSettings.music}
                    onValueChange={(value: VideoSettings["music"]) =>
                      setVideoSettings({ ...videoSettings, music: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upbeat">Năng động</SelectItem>
                      <SelectItem value="calm">Nhẹ nhàng</SelectItem>
                      <SelectItem value="dramatic">Kịch tính</SelectItem>
                      <SelectItem value="corporate">Chuyên nghiệp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg"
                  >
                    <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    onClick={handleGenerate}
                    disabled={!videoScript.trim() || isGenerating}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    size="lg"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Đang tạo video...
                      </div>
                    ) : (
                      "🎬 Tạo Video AI"
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Video Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          >
            <Card className="h-full shadow-xl border-0 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  🎥 Xem Trước Video
                </CardTitle>
                <CardDescription>
                  Video sẽ được hiển thị ở đây sau khi tạo
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Đang tạo video...
                      </p>
                    </div>
                  </div>
                ) : showPreview && generatedVideo ? (
                  <motion.div 
                    className="space-y-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-200 dark:from-green-800 dark:to-blue-700 rounded-lg flex items-center justify-center shadow-inner">
                      <motion.div 
                        className="text-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <motion.div 
                          className="text-6xl mb-4"
                          animate={{ 
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          🎬
                        </motion.div>
                        <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                          Video đã được tạo thành công!
                        </p>
                      </motion.div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-mono leading-relaxed max-h-32 overflow-y-auto">
                        {generatedVideo}
                      </pre>
                    </div>

                    <div className="flex gap-2">
                      <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={handleCopyVideo}
                          variant="outline"
                          size="sm"
                          className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 shadow-md"
                        >
                          {copySuccess ? "✅ Copied!" : "📋 Copy"}
                        </Button>
                      </motion.div>
                      <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={handleDownloadVideo}
                          variant="outline"
                          size="sm"
                          className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 shadow-md"
                        >
                          💾 Download
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
                    {videoScript ? (
                      <div className="text-center">
                        <div className="text-4xl mb-2">🎬</div>
                        <p className="text-gray-600 dark:text-gray-400">
                          Nhấn "Tạo Video AI" để bắt đầu
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl mb-2">📝</div>
                        <p className="text-gray-600 dark:text-gray-400">
                          Nhập kịch bản để bắt đầu
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {videoScript && !showPreview && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Thời lượng:
                      </span>
                      <Badge variant="secondary">
                        {videoSettings.duration}s
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Phong cách:
                      </span>
                      <Badge variant="outline">{videoSettings.style}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Nhạc nền:
                      </span>
                      <Badge variant="secondary">{videoSettings.music}</Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
