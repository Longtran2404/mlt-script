import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Play,
  Save,
  Edit,
  Trash2,
  Plus,
  Clock,
  User,
  Tag,
  Download,
  Upload,
  RefreshCw,
  Globe,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { vluScriptService, googleAuthService } from "../services/googleAuth";
import { Script, ScriptScene } from "../types/script.types";

export default function ScriptManager() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [editingScene, setEditingScene] = useState<ScriptScene | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);

  const loadScripts = useCallback(async () => {
    if (!isConnected) return;

    setLoading(true);
    try {
      const loadedScripts = await vluScriptService.loadVLUScripts();
      setScripts(loadedScripts);
    } catch (error) {
      console.error("Error loading scripts:", error);
    } finally {
      setLoading(false);
    }
  }, [isConnected]);

  const checkGoogleConnection = async () => {
    try {
      await vluScriptService.getAuthService().initialize();
      const signedIn = vluScriptService.getAuthService().isSignedIn();
      setIsConnected(signedIn);

      if (signedIn) {
        const user = vluScriptService.getAuthService().getUserInfo();
        setUserInfo(user);
      }
    } catch (error) {
      console.error("Error checking Google connection:", error);
      setIsConnected(false);
      // Don't throw error to prevent crash
    }
  };

  const connectToGoogle = async () => {
    setLoading(true);
    try {
      // Initialize first
      await vluScriptService.getAuthService().initialize();

      const success = await vluScriptService.getAuthService().signIn();
      if (success) {
        setIsConnected(true);
        const user = vluScriptService.getAuthService().getUserInfo();
        setUserInfo(user);
        await loadScripts();
      } else {
        alert("Không thể đăng nhập Google. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error connecting to Google:", error);
      alert(
        "Lỗi kết nối Google: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  const disconnectFromGoogle = async () => {
    try {
      await vluScriptService.getAuthService().signOut();
      setIsConnected(false);
      setUserInfo(null);
      setScripts([]);
      setSelectedScript(null);
    } catch (error) {
      console.error("Error disconnecting from Google:", error);
    }
  };

  useEffect(() => {
    checkGoogleConnection();
    
    // Cleanup auto-save timer on unmount
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [autoSaveTimer]);

  useEffect(() => {
    if (isConnected) {
      loadScripts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const saveScript = async (script: Script) => {
    setSaving(true);
    setSaveMessage(null);
    
    try {
      const success = await vluScriptService.updateScript(script);
      if (success) {
        // Update local state
        setScripts(scripts.map((s) => (s.id === script.id ? script : s)));
        setSelectedScript(script);
        setHasChanges(false);
        
        // Show success message
        setSaveMessage({ type: 'success', text: '✅ Đã lưu thành công vào Google Sheets!' });
        
        // Clear message after 3 seconds
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage({ type: 'error', text: '❌ Không thể lưu. Vui lòng thử lại!' });
        setTimeout(() => setSaveMessage(null), 5000);
      }
      return success;
    } catch (error) {
      console.error("Error saving script:", error);
      setSaveMessage({ 
        type: 'error', 
        text: '❌ Lỗi khi lưu: ' + (error instanceof Error ? error.message : 'Unknown error') 
      });
      setTimeout(() => setSaveMessage(null), 5000);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateSceneContent = (
    sceneId: string,
    field: keyof ScriptScene,
    value: string
  ) => {
    if (!selectedScript) return;

    const updatedScript = {
      ...selectedScript,
      scenes: selectedScript.scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, [field]: value } : scene
      ),
      updatedAt: new Date().toISOString(),
    };

    setSelectedScript(updatedScript);
    setHasChanges(true);
    
    // Clear existing auto-save timer
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }
    
    // Set new auto-save timer (save after 2 seconds of no changes)
    const newTimer = setTimeout(() => {
      saveScript(updatedScript);
    }, 2000);
    
    setAutoSaveTimer(newTimer);
  };

  const filteredScripts = scripts.filter((script) => {
    const matchesSearch =
      script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.scenes.some((scene) =>
        scene.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      filterStatus === "all" || script.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "published":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "in_progress":
        return "Đang thực hiện";
      case "draft":
        return "Bản nháp";
      case "published":
        return "Đã xuất bản";
      default:
        return status;
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Globe className="w-10 h-10 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Kết nối Google Sheets
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Kết nối với Google Sheets để truy cập và chỉnh sửa kịch bản VLU
              của bạn
            </p>
          </div>

          <Button
            onClick={connectToGoogle}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
          >
            {loading ? (
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <>
                <Globe className="w-5 h-5 mr-2" />
                Kết nối với Google
              </>
            )}
          </Button>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <CheckCircle className="w-4 h-4 inline mr-1" />
            Tự động đồng bộ dữ liệu
            <br />
            <CheckCircle className="w-4 h-4 inline mr-1" />
            Chỉnh sửa trực tiếp trên Google Sheets
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Quản lý Kịch bản VLU
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Tích hợp với Google Sheets "VLU-KỊCH BẢN" - Tự động phân cảnh theo
            timestamp
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {userInfo && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-800 dark:text-green-200">
                {userInfo.name}
              </span>
            </div>
          )}

          <Button
            onClick={loadScripts}
            disabled={loading}
            variant="outline"
            className="flex items-center space-x-2"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            <span>Test Kết Nối</span>
          </Button>

          <Button
            onClick={loadScripts}
            disabled={loading}
            variant="outline"
            className="hover-lift"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Đồng bộ
          </Button>

          <Button
            onClick={disconnectFromGoogle}
            variant="outline"
            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Ngắt kết nối
          </Button>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Tìm kiếm kịch bản, nội dung..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">Tất cả</option>
            <option value="draft">Bản nháp</option>
            <option value="in_progress">Đang thực hiện</option>
            <option value="completed">Hoàn thành</option>
            <option value="published">Đã xuất bản</option>
          </select>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Scripts List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Danh sách kịch bản
                </span>
                <Badge variant="secondary">{filteredScripts.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="text-center py-8">
                  <div className="loading-dots text-blue-600">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ) : filteredScripts.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Chưa có kịch bản nào</p>
                </div>
              ) : (
                filteredScripts.map((script, index) => (
                  <motion.div
                    key={script.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedScript(script);
                      setHasChanges(false);
                      setSaveMessage(null);
                      if (autoSaveTimer) {
                        clearTimeout(autoSaveTimer);
                      }
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover-lift ${
                      selectedScript?.id === script.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {script.title}
                      </h3>
                      <Badge
                        className={`${getStatusColor(
                          script.status
                        )} text-xs border-none`}
                      >
                        {getStatusText(script.status)}
                      </Badge>
                    </div>

                    {script.description && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {script.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {script.totalDuration}
                      </div>
                      <div className="flex items-center">
                        <Play className="w-3 h-3 mr-1" />
                        {script.scenes.length} cảnh
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Script Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          {selectedScript ? (
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Edit className="w-5 h-5 mr-2 text-purple-600" />
                    {selectedScript.title}
                  </CardTitle>

                  <div className="flex items-center space-x-3">
                    {/* Save Status */}
                    {saveMessage && (
                      <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        saveMessage.type === 'success' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {saveMessage.text}
                      </div>
                    )}
                    
                    {/* Changes indicator */}
                    {hasChanges && !saving && !saveMessage && (
                      <div className="px-3 py-1 rounded-lg bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-sm font-medium">
                        💾 Tự động lưu sau 2 giây...
                      </div>
                    )}
                    
                    <Button
                      onClick={() => saveScript(selectedScript)}
                      disabled={saving}
                      className={`${
                        hasChanges 
                          ? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700" 
                          : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      }`}
                    >
                      {saving ? (
                        <div className="loading-dots">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {hasChanges ? "Lưu ngay" : "Đã lưu"}
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedScript.totalDuration}
                  </div>
                  <div className="flex items-center">
                    <Play className="w-4 h-4 mr-1" />
                    {selectedScript.scenes.length} cảnh
                  </div>
                  <Badge className={getStatusColor(selectedScript.status)}>
                    {getStatusText(selectedScript.status)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
                {selectedScript.scenes.map((scene, index) => (
                  <motion.div
                    key={scene.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {scene.timestampString}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Cảnh {scene.sceneNumber}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        Nội dung:
                      </label>
                      <Textarea
                        value={scene.content}
                        onChange={(e) =>
                          updateSceneContent(
                            scene.id,
                            "content",
                            e.target.value
                          )
                        }
                        className="min-h-20 text-sm"
                        placeholder="Nhập nội dung kịch bản..."
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        Mô tả:
                      </label>
                      <Input
                        value={scene.description || ""}
                        onChange={(e) =>
                          updateSceneContent(
                            scene.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Mô tả cảnh..."
                        className="text-sm"
                      />
                    </div>

                    {/* Speaker and Action */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                          Người nói:
                        </label>
                        <Input
                          value={scene.speaker || ""}
                          onChange={(e) =>
                            updateSceneContent(
                              scene.id,
                              "speaker",
                              e.target.value
                            )
                          }
                          placeholder="Tên người nói..."
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                          Hành động:
                        </label>
                        <Input
                          value={scene.action || ""}
                          onChange={(e) =>
                            updateSceneContent(
                              scene.id,
                              "action",
                              e.target.value
                            )
                          }
                          placeholder="Hành động..."
                          className="text-sm"
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        Ghi chú:
                      </label>
                      <Input
                        value={scene.notes || ""}
                        onChange={(e) =>
                          updateSceneContent(scene.id, "notes", e.target.value)
                        }
                        placeholder="Ghi chú thêm..."
                        className="text-sm"
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Chọn kịch bản để chỉnh sửa
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Chọn một kịch bản từ danh sách bên trái để bắt đầu chỉnh sửa
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
