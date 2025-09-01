import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Play,
  Save,
  Edit,
  Clock,
  RefreshCw,
  Globe,
  CheckCircle,
  Search,
  Filter,
  Plus,
  Settings,
  Download,
  Upload,
  Share2,
  Eye,
  EyeOff,
  MoreHorizontal,
  Calendar,
  Users,
  TrendingUp,
  Zap,
  Star,
  Bookmark,
  Archive,
  Trash2,
  Copy,
  ExternalLink,
  Lock,
  Unlock,
  Globe2,
  Database,
  Cloud,
  Shield,
  Activity,
  BarChart3,
  PieChart,
  Target,
  Award,
  Rocket,
  Sparkles,
  Grid,
  List,
  LogOut,
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
import { vluScriptService } from "../services/googleAuth";
import { Script, ScriptScene } from "../types/script.types";
import GoogleAuthStatus from "../components/GoogleAuthStatus";

// Enhanced status colors with gradients
const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-gradient-to-r from-emerald-500 to-green-500 text-white";
    case "in_progress":
      return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
    case "draft":
      return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
    case "published":
      return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
    default:
      return "bg-gradient-to-r from-gray-500 to-slate-500 text-white";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "completed":
      return "Completed";
    case "in_progress":
      return "In Progress";
    case "draft":
      return "Draft";
    case "published":
      return "Published";
    default:
      return status;
  }
};

// Animation variants
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
    transition: {
      duration: 0.5,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function ScriptManager() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showStats, setShowStats] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      console.log("🔄 Checking Google Sheets connection...");

      const { googleSheetsService } = await import(
        "../services/googleSheetsSimple"
      );

      const hasToken = localStorage.getItem("google_access_token");

      if (!hasToken) {
        console.log("📋 No access token found - trying CSV fallback directly");
        try {
          const csvScripts = await googleSheetsService.loadViaCSV();
          if (csvScripts.length > 0) {
            setScripts(csvScripts);
            setIsConnected(true);
            setUserInfo({
              name: "Google Sheets (CSV)",
              email: "sheets@google.com",
              imageUrl: "https://via.placeholder.com/40",
            });
            console.log(
              "✅ CSV direct fallback successful with",
              csvScripts.length,
              "scripts"
            );
            return;
          }
        } catch (csvError) {
          console.error("❌ CSV direct fallback failed:", csvError);
        }

        setIsConnected(false);
        return;
      }

      const connected = await googleSheetsService.testConnection();

      if (connected) {
        setIsConnected(true);
        setUserInfo({
          name: "Google Sheets API",
          email: "sheets@google.com",
          imageUrl: "https://via.placeholder.com/40",
        });
        console.log("✅ Google Sheets connected successfully");
      } else {
        console.log("❌ Connection test failed - trying CSV fallback");
        try {
          const csvScripts = await googleSheetsService.loadViaCSV();
          if (csvScripts.length > 0) {
            setScripts(csvScripts);
            setIsConnected(true);
            setUserInfo({
              name: "Google Sheets (CSV)",
              email: "sheets@google.com",
              imageUrl: "https://via.placeholder.com/40",
            });
            console.log(
              "✅ CSV fallback successful with",
              csvScripts.length,
              "scripts"
            );
          }
        } catch (csvError) {
          console.error("❌ CSV fallback failed:", csvError);
          setIsConnected(false);
        }
      }
    } catch (error) {
      console.error("❌ Error checking Google connection:", error);
      setIsConnected(false);
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
  }, []);

  useEffect(() => {
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
  }, [isConnected, loadScripts]);

  const saveScript = async (script: Script) => {
    setSaving(true);
    setSaveMessage(null);

    try {
      const success = await vluScriptService.updateScript(script);
      if (success) {
        setScripts(scripts.map((s) => (s.id === script.id ? script : s)));
        setSelectedScript(script);
        setHasChanges(false);

        setSaveMessage({
          type: "success",
          text: "✅ Script saved successfully!",
        });

        setTimeout(() => setSaveMessage(null), 3000);
        return true;
      } else {
        setSaveMessage({
          type: "error",
          text: "❌ Unable to save. Please try again!",
        });
        setTimeout(() => setSaveMessage(null), 5000);
        return false;
      }
    } catch (error) {
      console.error("Error saving script:", error);
      setSaveMessage({
        type: "error",
        text:
          "❌ Save error: " +
          (error instanceof Error ? error.message : "Unknown error"),
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

    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }

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

  // Calculate statistics
  const stats = {
    total: scripts.length,
    completed: scripts.filter((s) => s.status === "completed").length,
    inProgress: scripts.filter((s) => s.status === "in_progress").length,
    draft: scripts.filter((s) => s.status === "draft").length,
    published: scripts.filter((s) => s.status === "published").length,
    totalScenes: scripts.reduce((sum, script) => sum + script.scenes.length, 0),
    totalDuration: scripts.reduce((sum, script) => {
      const duration = parseInt(script.totalDuration.replace(/\D/g, "")) || 0;
      return sum + duration;
    }, 0),
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="min-h-screen flex items-center justify-center p-6"
        >
          <div className="text-center space-y-8 max-w-2xl">
            {/* Hero Section */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Globe2 className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MLT Script AI Platform
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
                  Connect to Google Sheets to access and edit your VLU scripts
                  with advanced AI-powered features
                </p>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            >
              <div className="p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-sm border border-white/20 shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Smart Sync
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Automatic data synchronization with Google Sheets
                </p>
              </div>

              <div className="p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-sm border border-white/20 shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <Edit className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Real-time Editing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Edit scripts directly on Google Sheets with live updates
                </p>
              </div>

              <div className="p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-sm border border-white/20 shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Secure Access
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Enterprise-grade security with OAuth2 authentication
                </p>
              </div>
            </motion.div>

            {/* Connect Button */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12"
            >
              <GoogleAuthStatus />
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-sm text-gray-500 dark:text-gray-400 space-y-2"
            >
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Auto-sync enabled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Cloud className="w-4 h-4 text-blue-500" />
                  <span>Cloud backup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-purple-500" />
                  <span>Real-time updates</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Enhanced Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Main Header */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Script Manager
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Professional script management and editing platform
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {userInfo && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white shadow-lg"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{userInfo.name}</span>
                </motion.div>
              )}

              <div className="flex items-center space-x-2">
                <Button
                  onClick={loadScripts}
                  disabled={loading}
                  variant="outline"
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 hover:bg-white dark:hover:bg-gray-800"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  <span className="ml-2">Sync</span>
                </Button>

                <Button
                  onClick={disconnectFromGoogle}
                  variant="outline"
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Statistics Cards */}
          {showStats && (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats.total}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Total Scripts
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats.completed}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Completed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats.totalScenes}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Total Scenes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats.totalDuration}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Total Minutes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <Edit className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats.draft}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Drafts
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats.published}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Published
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Enhanced Search and Filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search scripts, content, scenes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid" ? "bg-blue-500 text-white" : ""
                  }
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list" ? "bg-blue-500 text-white" : ""
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowStats(!showStats)}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20"
              >
                {showStats ? (
                  <BarChart3 className="w-4 h-4" />
                ) : (
                  <BarChart3 className="w-4 h-4" />
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Scripts List */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Script Library</span>
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {filteredScripts.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[700px] overflow-y-auto">
                <AnimatePresence>
                  {loading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <div className="loading-dots text-blue-600">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-4">
                        Loading scripts...
                      </p>
                    </motion.div>
                  ) : filteredScripts.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-500 dark:text-gray-400">
                        No scripts found
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Create your first script to get started
                      </p>
                    </motion.div>
                  ) : (
                    filteredScripts.map((script, index) => (
                      <motion.div
                        key={script.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          setSelectedScript(script);
                          setHasChanges(false);
                          setSaveMessage(null);
                          if (autoSaveTimer) {
                            clearTimeout(autoSaveTimer);
                          }
                        }}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                          selectedScript?.id === script.id
                            ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-lg"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white/50 dark:bg-gray-800/50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                            {script.title}
                          </h3>
                          <Badge
                            className={`${getStatusColor(
                              script.status
                            )} text-xs border-none shadow-sm`}
                          >
                            {getStatusText(script.status)}
                          </Badge>
                        </div>

                        {script.description && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {script.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {script.totalDuration}
                            </div>
                            <div className="flex items-center">
                              <Play className="w-3 h-3 mr-1" />
                              {script.scenes.length} scenes
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(script.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Script Editor */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {selectedScript ? (
                <motion.div
                  key={selectedScript.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Edit className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">
                              {selectedScript.title}
                            </CardTitle>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {selectedScript.totalDuration}
                              </div>
                              <div className="flex items-center">
                                <Play className="w-4 h-4 mr-1" />
                                {selectedScript.scenes.length} scenes
                              </div>
                              <Badge
                                className={getStatusColor(
                                  selectedScript.status
                                )}
                              >
                                {getStatusText(selectedScript.status)}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {/* Save Status */}
                          <AnimatePresence>
                            {saveMessage && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                  saveMessage.type === "success"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                {saveMessage.text}
                              </motion.div>
                            )}

                            {/* Changes indicator */}
                            {hasChanges && !saving && !saveMessage && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="px-4 py-2 rounded-lg bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-sm font-medium"
                              >
                                💾 Auto-saving in 2 seconds...
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20"
                            >
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Export
                            </Button>
                            <Button
                              onClick={() => saveScript(selectedScript)}
                              disabled={saving}
                              className={`${
                                hasChanges
                                  ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                  : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                              } text-white shadow-lg`}
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
                                  {hasChanges ? "Save Now" : "Saved"}
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6 max-h-[700px] overflow-y-auto">
                      <AnimatePresence>
                        {selectedScript.scenes.map((scene, index) => (
                          <motion.div
                            key={scene.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 border border-gray-200 dark:border-gray-700 rounded-2xl space-y-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Badge
                                  variant="outline"
                                  className="font-mono text-xs bg-blue-50 dark:bg-blue-900/20"
                                >
                                  {scene.timestampString}
                                </Badge>
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-purple-50 dark:bg-purple-900/20"
                                >
                                  Scene {scene.sceneNumber}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Copy className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                  Content
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
                                  className="min-h-24 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="Enter script content..."
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                    Description
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
                                    placeholder="Scene description..."
                                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                    Speaker
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
                                    placeholder="Speaker name..."
                                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                    Action
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
                                    placeholder="Action description..."
                                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                    Notes
                                  </label>
                                  <Input
                                    value={scene.notes || ""}
                                    onChange={(e) =>
                                      updateSceneContent(
                                        scene.id,
                                        "notes",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Additional notes..."
                                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
                    <CardContent className="text-center py-16">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mb-6">
                        <FileText className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                        Select a Script
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        Choose a script from the library to start editing. You
                        can search, filter, and manage all your scripts from
                        here.
                      </p>
                      <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Sparkles className="w-4 h-4 mr-2" />
                          <span>AI-powered editing</span>
                        </div>
                        <div className="flex items-center">
                          <Cloud className="w-4 h-4 mr-2" />
                          <span>Cloud sync</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
