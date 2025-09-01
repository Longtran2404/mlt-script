import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Square,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Download,
  Share2,
  Settings,
  RotateCcw,
  Volume2,
  VolumeX,
  FileVideo,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Sparkles,
} from "lucide-react";

interface VideoSettings {
  resolution: string;
  frameRate: number;
  quality: string;
  audioEnabled: boolean;
  videoEnabled: boolean;
}

interface RecordingSession {
  id: string;
  name: string;
  duration: number;
  status: "recording" | "paused" | "stopped" | "processing";
  createdAt: Date;
  fileSize?: number;
}

const TaoVideoNew: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoSettings, setVideoSettings] = useState<VideoSettings>({
    resolution: "1080p",
    frameRate: 30,
    quality: "high",
    audioEnabled: true,
    videoEnabled: true,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [recordingSessions, setRecordingSessions] = useState<
    RecordingSession[]
  >([]);
  const [currentSession, setCurrentSession] = useState<RecordingSession | null>(
    null
  );
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAIEnhance, setShowAIEnhance] = useState(false);

  // Mock recording sessions data
  useEffect(() => {
    const mockSessions: RecordingSession[] = [
      {
        id: "1",
        name: "Giới thiệu sản phẩm mới",
        duration: 125,
        status: "stopped",
        createdAt: new Date(Date.now() - 86400000),
        fileSize: 45.2,
      },
      {
        id: "2",
        name: "Hướng dẫn sử dụng",
        duration: 320,
        status: "stopped",
        createdAt: new Date(Date.now() - 172800000),
        fileSize: 112.8,
      },
      {
        id: "3",
        name: "Demo tính năng",
        duration: 89,
        status: "processing",
        createdAt: new Date(Date.now() - 3600000),
        fileSize: 28.5,
      },
    ];
    setRecordingSessions(mockSessions);
  }, []);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setIsPaused(false);
    setRecordingTime(0);

    const newSession: RecordingSession = {
      id: Date.now().toString(),
      name: `Ghi hình ${new Date().toLocaleString("vi-VN")}`,
      duration: 0,
      status: "recording",
      createdAt: new Date(),
    };

    setCurrentSession(newSession);
    setRecordingSessions((prev) => [newSession, ...prev]);
  }, []);

  const pauseRecording = useCallback(() => {
    setIsPaused(true);
    if (currentSession) {
      setCurrentSession((prev) =>
        prev ? { ...prev, status: "paused" } : null
      );
    }
  }, [currentSession]);

  const resumeRecording = useCallback(() => {
    setIsPaused(false);
    if (currentSession) {
      setCurrentSession((prev) =>
        prev ? { ...prev, status: "recording" } : null
      );
    }
  }, [currentSession]);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    setIsPaused(false);

    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        status: "processing" as const,
        duration: recordingTime,
      };

      setCurrentSession(updatedSession);
      setRecordingSessions((prev) =>
        prev.map((session) =>
          session.id === currentSession.id ? updatedSession : session
        )
      );

      // Simulate processing completion
      setTimeout(() => {
        setRecordingSessions((prev) =>
          prev.map((session) =>
            session.id === currentSession.id
              ? { ...session, status: "stopped" as const }
              : session
          )
        );
      }, 3000);
    }

    setRecordingTime(0);
  }, [currentSession, recordingTime]);

  const resetRecording = useCallback(() => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    setCurrentSession(null);
  }, []);

  const toggleAudio = useCallback(() => {
    setVideoSettings((prev) => ({ ...prev, audioEnabled: !prev.audioEnabled }));
  }, []);

  const toggleVideo = useCallback(() => {
    setVideoSettings((prev) => ({ ...prev, videoEnabled: !prev.videoEnabled }));
  }, []);

  const getStatusColor = (status: RecordingSession["status"]): string => {
    switch (status) {
      case "recording":
        return "from-red-500 to-pink-500";
      case "paused":
        return "from-yellow-500 to-orange-500";
      case "processing":
        return "from-blue-500 to-indigo-500";
      case "stopped":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  const getStatusText = (status: RecordingSession["status"]): string => {
    switch (status) {
      case "recording":
        return "Đang ghi hình";
      case "paused":
        return "Tạm dừng";
      case "processing":
        return "Đang xử lý";
      case "stopped":
        return "Hoàn thành";
      default:
        return "Không xác định";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.div
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tạo Video
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ghi hình và chỉnh sửa video chuyên nghiệp
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTemplates(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Sparkles className="h-4 w-4" />
                <span>Mẫu</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAIEnhance(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Zap className="h-4 w-4" />
                <span>AI Nâng cấp</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Recording Area */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl">
              {/* Video Preview */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl h-96 mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {!isRecording ? (
                    <div className="text-center">
                      <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Nhấn nút ghi hình để bắt đầu
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="relative">
                        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            LIVE
                          </span>
                        </div>
                      </div>
                      <p className="text-red-500 font-semibold mt-4">
                        Đang ghi hình - {formatTime(recordingTime)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Recording Status Overlay */}
                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {formatTime(recordingTime)}
                  </motion.div>
                )}
              </div>

              {/* Recording Controls */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                {!isRecording ? (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={startRecording}
                    className="p-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full hover:shadow-lg transition-all duration-200"
                  >
                    <Play className="h-8 w-8" />
                  </motion.button>
                ) : (
                  <>
                    {isPaused ? (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={resumeRecording}
                        className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:shadow-lg transition-all duration-200"
                      >
                        <Play className="h-8 w-8" />
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={pauseRecording}
                        className="p-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-full hover:shadow-lg transition-all duration-200"
                      >
                        <Pause className="h-8 w-8" />
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={stopRecording}
                      className="p-4 bg-gradient-to-r from-gray-500 to-slate-600 text-white rounded-full hover:shadow-lg transition-all duration-200"
                    >
                      <Square className="h-8 w-8" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={resetRecording}
                      className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:shadow-lg transition-all duration-200"
                    >
                      <RotateCcw className="h-8 w-8" />
                    </motion.button>
                  </>
                )}
              </div>

              {/* Quick Settings */}
              <div className="flex items-center justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleAudio}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    videoSettings.audioEnabled
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {videoSettings.audioEnabled ? (
                    <Mic className="h-5 w-5" />
                  ) : (
                    <MicOff className="h-5 w-5" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleVideo}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    videoSettings.videoEnabled
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {videoSettings.videoEnabled ? (
                    <Camera className="h-5 w-5" />
                  ) : (
                    <CameraOff className="h-5 w-5" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSettings(true)}
                  className="p-3 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  <Settings className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Current Session Info */}
            {currentSession && (
              <motion.div
                variants={cardVariants}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Phiên ghi hình hiện tại
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Tên:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {currentSession.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Thời gian:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatTime(recordingTime)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Trạng thái:
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getStatusColor(
                        currentSession.status
                      )} text-white`}
                    >
                      {getStatusText(currentSession.status)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Recent Recordings */}
            <motion.div
              variants={cardVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Ghi hình gần đây
              </h3>

              <div className="space-y-3">
                {recordingSessions.slice(0, 3).map((session) => (
                  <motion.div
                    key={session.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {session.name}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getStatusColor(
                          session.status
                        )} text-white`}
                      >
                        {getStatusText(session.status)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTime(session.duration)}</span>
                      </span>

                      {session.fileSize && (
                        <span className="flex items-center space-x-1">
                          <FileVideo className="h-3 w-3" />
                          <span>{session.fileSize} MB</span>
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full mt-4 p-3 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
              >
                Xem tất cả
              </motion.button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              variants={cardVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Thao tác nhanh
              </h3>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-200"
                >
                  <Download className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-700 dark:text-blue-300">
                    Xuất video
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all duration-200"
                >
                  <Share2 className="h-5 w-5 text-green-600" />
                  <span className="text-green-700 dark:text-green-300">
                    Chia sẻ
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-200"
                >
                  <Zap className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-700 dark:text-purple-300">
                    AI Nâng cấp
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Cài đặt ghi hình
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Độ phân giải
                  </label>
                  <select
                    value={videoSettings.resolution}
                    onChange={(e) =>
                      setVideoSettings((prev) => ({
                        ...prev,
                        resolution: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="720p">720p HD</option>
                    <option value="1080p">1080p Full HD</option>
                    <option value="1440p">1440p 2K</option>
                    <option value="2160p">2160p 4K</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tốc độ khung hình (FPS)
                  </label>
                  <select
                    value={videoSettings.frameRate}
                    onChange={(e) =>
                      setVideoSettings((prev) => ({
                        ...prev,
                        frameRate: Number(e.target.value),
                      }))
                    }
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value={24}>24 FPS</option>
                    <option value={30}>30 FPS</option>
                    <option value={60}>60 FPS</option>
                    <option value={120}>120 FPS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Chất lượng
                  </label>
                  <select
                    value={videoSettings.quality}
                    onChange={(e) =>
                      setVideoSettings((prev) => ({
                        ...prev,
                        quality: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="low">Thấp</option>
                    <option value="medium">Trung bình</option>
                    <option value="high">Cao</option>
                    <option value="ultra">Siêu cao</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Hủy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Lưu
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Templates Modal */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTemplates(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Mẫu video
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Giới thiệu sản phẩm",
                  "Hướng dẫn sử dụng",
                  "Demo tính năng",
                  "Testimonial",
                  "Tutorial",
                  "Promo",
                ].map((template) => (
                  <motion.div
                    key={template}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-200"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {template}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Mẫu video {template.toLowerCase()} chuyên nghiệp
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowTemplates(false)}
                className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Đóng
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Enhance Modal */}
      <AnimatePresence>
        {showAIEnhance && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAIEnhance(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                AI Nâng cấp video
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-700 dark:text-purple-300">
                      Tự động cải thiện
                    </span>
                  </div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    AI sẽ tự động cải thiện chất lượng video, âm thanh và hiệu
                    ứng
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-700 dark:text-blue-300">
                      Thêm hiệu ứng
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Tự động thêm hiệu ứng chuyển cảnh và animation phù hợp
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAIEnhance(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Hủy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAIEnhance(false)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                >
                  Bắt đầu nâng cấp
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaoVideoNew;
