import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  FolderOpen,
  FileText,
  Users,
  Calendar,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Filter,
  Search,
  Download,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import GoogleConnectButton from "../components/GoogleConnectButton";

interface SheetData {
  id: string;
  name: string;
  sheetUrl: string;
  sheets?: Array<{
    properties: {
      sheetId: number;
      title: string;
      index: number;
    };
  }>;
  data?: any[];
}

interface ScriptData {
  id: string;
  title: string;
  description: string;
  status: "draft" | "in_progress" | "review" | "completed" | "archived";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  deadline: string;
  progress: number;
  tags: string[];
  estimatedDuration: number;
  actualDuration: number;
  scenes: number;
  revisions: number;
}

interface ProjectStats {
  totalScripts: number;
  activeScripts: number;
  completedScripts: number;
  overdueScripts: number;
  totalScenes: number;
  totalDuration: number;
  teamMembers: number;
  completionRate: number;
}

export default function QuanLyNew() {
  const [selectedSheet, setSelectedSheet] = useState<SheetData | null>(null);
  const [sheetTabs, setSheetTabs] = useState<any[]>([]);
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock data for demonstration
  const [scripts] = useState<ScriptData[]>([
    {
      id: "1",
      title: "Admissions 2025 Campaign",
      description: "Comprehensive video campaign for 2025 admissions season",
      status: "completed",
      priority: "high",
      assignedTo: "John Smith",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      deadline: "2024-01-25",
      progress: 100,
      tags: ["admissions", "marketing", "video"],
      estimatedDuration: 120,
      actualDuration: 115,
      scenes: 15,
      revisions: 3,
    },
    {
      id: "2",
      title: "MLT Overview Introduction",
      description: "Comprehensive overview video introducing MLT organization",
      status: "in_progress",
      priority: "medium",
      assignedTo: "Sarah Johnson",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      deadline: "2024-02-15",
      progress: 75,
      tags: ["overview", "introduction", "corporate"],
      estimatedDuration: 90,
      actualDuration: 67,
      scenes: 12,
      revisions: 2,
    },
    {
      id: "3",
      title: "Soft Skills Training Program",
      description: "Script for comprehensive soft skills training program",
      status: "draft",
      priority: "low",
      assignedTo: "Mike Chen",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-12",
      deadline: "2024-03-01",
      progress: 25,
      tags: ["training", "soft-skills", "education"],
      estimatedDuration: 60,
      actualDuration: 15,
      scenes: 8,
      revisions: 1,
    },
    {
      id: "4",
      title: "Scientific Research Presentation",
      description: "Script for scientific research presentation",
      status: "review",
      priority: "medium",
      assignedTo: "Lisa Wang",
      createdAt: "2024-01-08",
      updatedAt: "2024-01-16",
      deadline: "2024-01-20",
      progress: 90,
      tags: ["research", "science", "presentation"],
      estimatedDuration: 45,
      actualDuration: 40,
      scenes: 10,
      revisions: 4,
    },
    {
      id: "5",
      title: "Product Launch Video",
      description: "Complete video and script for new product launch",
      status: "in_progress",
      priority: "urgent",
      assignedTo: "Alex Rodriguez",
      createdAt: "2024-01-20",
      updatedAt: "2024-01-22",
      deadline: "2024-02-01",
      progress: 60,
      tags: ["product", "launch", "marketing"],
      estimatedDuration: 180,
      actualDuration: 108,
      scenes: 20,
      revisions: 2,
    },
  ]);

  const [projectStats] = useState<ProjectStats>({
    totalScripts: 25,
    activeScripts: 8,
    completedScripts: 12,
    overdueScripts: 2,
    totalScenes: 320,
    totalDuration: 1800,
    teamMembers: 6,
    completionRate: 78,
  });

  // Load sheet data from Google Sheets API
  const loadSheetData = useCallback(async () => {
    try {
      console.log("🔄 Loading real Google Sheets data...");
      
      // Import Google Sheets service
      const { googleSheetsService } = await import("../services/googleSheetsSimple");
      
      // Test connection first
      const connectionTest = await googleSheetsService.testConnection();
      if (!connectionTest) {
        console.error("❌ Google Sheets connection failed");
        throw new Error("Không thể kết nối đến Google Sheets. Vui lòng kiểm tra cấu hình.");
      }

      // Get all sheets
      const sheets = await googleSheetsService.getAllSheets();
      console.log("✅ Found sheets:", sheets);

      if (sheets.length === 0) {
        throw new Error("Không tìm thấy sheets nào trong spreadsheet");
      }

      // Create sheet data structure
      const sheetInfo: SheetData = {
        id: process.env.REACT_APP_VLU_SCRIPT_SHEET_ID || "",
        name: "MLT - KỊCH BẢN",
        sheetUrl: `https://docs.google.com/spreadsheets/d/${process.env.REACT_APP_VLU_SCRIPT_SHEET_ID}/edit`,
        sheets: sheets.map(sheet => ({
          properties: {
            sheetId: sheet.id,
            title: sheet.title,
            index: 0
          }
        }))
      };

      setSelectedSheet(sheetInfo);
      setSheetTabs(sheetInfo.sheets || []);

      // Load data from first sheet
      if (sheets.length > 0) {
        console.log("📊 Loading data from first sheet:", sheets[0].title);
        const firstSheetData = await googleSheetsService.getSheetData(sheets[0].title);
        console.log("✅ Sheet data loaded:", firstSheetData.length, "rows");
        setSheetData(firstSheetData);
      }

    } catch (error) {
      console.error("❌ Error loading sheet data:", error);
      // Fallback to CSV method
      try {
        console.log("🔄 Trying CSV fallback...");
        const { googleSheetsService } = await import("../services/googleSheetsSimple");
        const csvScripts = await googleSheetsService.loadViaCSV();
        
        // Convert scripts to sheet data format for display
        if (csvScripts.length > 0) {
          const csvData = [
            ["STT", "Timestamp", "Nội dung", "Mô tả", "Ghi chú", "Action"],
            ...csvScripts.flatMap(script => 
              script.scenes.map((scene, index) => [
                (index + 1).toString(),
                scene.timestampString,
                scene.content,
                scene.description || "",
                scene.notes || "",
                "Edit"
              ])
            )
          ];
          setSheetData(csvData);
        }
      } catch (csvError) {
        console.error("❌ CSV fallback also failed:", csvError);
      }
    }
  }, []);

  useEffect(() => {
    loadSheetData();
  }, [loadSheetData]);

  const getStatusBadge = (status: ScriptData["status"]) => {
    const statusConfig = {
      draft: {
        color: "bg-gradient-to-r from-gray-500 to-slate-500 text-white",
        text: "Draft",
        icon: <FileText className="w-3 h-3" />,
      },
      in_progress: {
        color: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
        text: "In Progress",
        icon: <Activity className="w-3 h-3" />,
      },
      review: {
        color: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
        text: "Under Review",
        icon: <CheckCircle className="w-3 h-3" />,
      },
      completed: {
        color: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
        text: "Completed",
        icon: <CheckCircle className="w-3 h-3" />,
      },
      archived: {
        color: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
        text: "Archived",
        icon: <AlertCircle className="w-3 h-3" />,
      },
    };

    const config = statusConfig[status];
    return (
      <Badge className={`${config.color} flex items-center space-x-1`}>
        {config.icon}
        <span>{config.text}</span>
      </Badge>
    );
  };

  const getPriorityBadge = (priority: ScriptData["priority"]) => {
    const priorityConfig = {
      low: {
        color: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
        text: "Low",
      },
      medium: {
        color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
        text: "Medium",
      },
      high: {
        color: "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400",
        text: "High",
      },
      urgent: {
        color: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
        text: "Urgent",
      },
    };

    const config = priorityConfig[priority];
    return <Badge className={`${config.color} text-xs`}>{config.text}</Badge>;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const filteredScripts = scripts.filter((script) => {
    const matchesSearch =
      script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesStatus = filterStatus === "all" || script.status === filterStatus;
    const matchesPriority = filterPriority === "all" || script.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalPages = Math.ceil(filteredScripts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScripts = filteredScripts.slice(startIndex, endIndex);

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

  const stats = [
    {
      title: "Total Scripts",
      value: projectStats.totalScripts,
      change: "+12%",
      changeType: "increase" as const,
      icon: <FileText className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Active Scripts",
      value: projectStats.activeScripts,
      change: "+8%",
      changeType: "increase" as const,
      icon: <Activity className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Completed",
      value: projectStats.completedScripts,
      change: "+15%",
      changeType: "increase" as const,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Completion Rate",
      value: `${projectStats.completionRate}%`,
      change: "+5%",
      changeType: "increase" as const,
      icon: <Target className="w-5 h-5" />,
      color: "from-orange-500 to-red-600",
    },
  ];

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
                <FolderOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Quản lý Kịch bản VLU
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Quản lý và theo dõi tất cả kịch bản một cách hiệu quả
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <GoogleConnectButton />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </motion.button>

              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                New Script
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Stats Overview */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                          <div className="text-white">{stat.icon}</div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {stat.changeType === "increase" ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            {stat.change}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {stat.value}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search scripts, tags, or team members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="review">Under Review</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterPriority} onValueChange={setFilterPriority}>
                      <SelectTrigger className="w-40 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                        <SelectValue placeholder="Filter by priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          viewMode === "grid"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                        }`}
                      >
                        <div className="grid grid-cols-2 gap-1 w-4 h-4">
                          <div className="bg-current rounded-sm"></div>
                          <div className="bg-current rounded-sm"></div>
                          <div className="bg-current rounded-sm"></div>
                          <div className="bg-current rounded-sm"></div>
                        </div>
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          viewMode === "list"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                        }`}
                      >
                        <div className="space-y-1 w-4 h-4">
                          <div className="bg-current rounded-sm h-1"></div>
                          <div className="bg-current rounded-sm h-1"></div>
                          <div className="bg-current rounded-sm h-1"></div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Scripts Display */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Scripts ({filteredScripts.length})
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredScripts.length)} of{" "}
                  {filteredScripts.length} scripts
                </span>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentScripts.map((script) => (
                  <motion.div
                    key={script.id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group cursor-pointer"
                  >
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                              <FileText className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                {script.title}
                              </CardTitle>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {script.description}
                              </p>
                            </div>
                          </div>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                            <MoreHorizontal className="h-4 w-4 text-gray-400" />
                          </button>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            {getStatusBadge(script.status)}
                            {getPriorityBadge(script.priority)}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Progress
                              </span>
                              <span className="font-medium">{script.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(
                                  script.progress
                                )}`}
                                style={{ width: `${script.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{script.assignedTo}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{script.deadline}</span>
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Scenes
                          </span>
                          <span className="font-medium">{script.scenes}</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {script.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {script.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{script.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {currentScripts.map((script) => (
                  <motion.div
                    key={script.id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.01, x: 5 }}
                    className="group cursor-pointer"
                  >
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                              <FileText className="h-5 w-5 text-white" />
                            </div>

                            <div className="space-y-1">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                {script.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {script.description}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>{script.assignedTo}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>Due: {script.deadline}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{script.scenes} scenes</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-right space-y-2">
                              <div className="flex items-center space-x-2">
                                {getStatusBadge(script.status)}
                                {getPriorityBadge(script.priority)}
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Progress
                                  </span>
                                  <span className="font-medium">{script.progress}%</span>
                                </div>
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(
                                      script.progress
                                    )}`}
                                    style={{ width: `${script.progress}%` }}
                                  />
                                </div>
                              </div>
                            </div>

                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                              <MoreHorizontal className="h-4 w-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="ml-1">First</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10 h-10"
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <span className="mr-1">Last</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>

          {/* Google Sheets Integration */}
          {selectedSheet && (
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle>Google Sheets Integration</CardTitle>
                  <CardDescription>
                    Connected to: {selectedSheet.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Sheet URL:
                      </span>
                      <a
                        href={selectedSheet.sheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                      >
                        <span>Open in Google Sheets</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Available Tabs:
                      </span>
                      <span className="text-sm font-medium">
                        {sheetTabs.length} tabs
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Data Rows:
                      </span>
                      <span className="text-sm font-medium">
                        {sheetData.length} rows
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
