import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Users,
  Activity,
  DollarSign,
  Calendar,
  Target,
  Star,
  Play,
  TrendingUp,
  TrendingDown,
  Eye,
  FileVideo,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Sparkles,
  Globe,
  ArrowUpRight,
  Filter,
  Search,
  Download,
  Share2,
  Settings,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { StatsCard, StatsData } from "../components/ui/stats-card";
import {
  googleSheetsService,
  UserData,
  ProjectData,
  AnalyticsData,
} from "../services/googleSheets";

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  videosCreated: number;
  scriptsCreated: number;
  totalRevenue: number;
  monthlyGrowth: number;
  userEngagement: number;
  completionRate: number;
}

export default function EnhancedDashboardNew() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = "7d";
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [usersData, projectsData, analyticsData] = await Promise.all([
          googleSheetsService.getUsers(),
          googleSheetsService.getProjects(),
          googleSheetsService.getAnalytics(),
        ]);

        setUsers(usersData);
        setProjects(projectsData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate enhanced stats
  const calculateStats = (): StatsData[] => {
    const latestAnalytics = analytics[0] || {
      pageViews: 0,
      uniqueVisitors: 0,
      videosCreated: 0,
      scriptsCreated: 0,
      newUsers: 0,
      activeUsers: 0,
      revenue: 0,
    };

    const previousAnalytics = analytics[1] || latestAnalytics;

    const calculateChange = (current: number, previous: number): string => {
      if (previous === 0) return "+100%";
      const change = ((current - previous) / previous) * 100;
      return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
    };

    return [
      {
        title: "Total Users",
        value: latestAnalytics.activeUsers.toLocaleString(),
        change: {
          value: calculateChange(
            latestAnalytics.activeUsers,
            previousAnalytics.activeUsers
          ),
          type:
            latestAnalytics.activeUsers >= previousAnalytics.activeUsers
              ? "increase"
              : "decrease",
        },
        icon: <Users className="w-6 h-6" />,
        description: `${latestAnalytics.newUsers} new users today`,
        color: "blue" as const,
      },
      {
        title: "Videos Created",
        value: latestAnalytics.videosCreated.toLocaleString(),
        change: {
          value: calculateChange(
            latestAnalytics.videosCreated,
            previousAnalytics.videosCreated
          ),
          type:
            latestAnalytics.videosCreated >= previousAnalytics.videosCreated
              ? "increase"
              : "decrease",
        },
        icon: <FileVideo className="w-6 h-6" />,
        description: "AI-powered high-quality videos",
        color: "purple" as const,
      },
      {
        title: "Scripts Completed",
        value: latestAnalytics.scriptsCreated.toLocaleString(),
        change: {
          value: calculateChange(
            latestAnalytics.scriptsCreated,
            previousAnalytics.scriptsCreated
          ),
          type:
            latestAnalytics.scriptsCreated >= previousAnalytics.scriptsCreated
              ? "increase"
              : "decrease",
        },
        icon: <FileText className="w-6 h-6" />,
        description: "Professional scripts",
        color: "green" as const,
      },
      {
        title: "Monthly Revenue",
        value: `${(latestAnalytics.revenue / 1000000).toFixed(1)}M`,
        change: {
          value: calculateChange(
            latestAnalytics.revenue,
            previousAnalytics.revenue
          ),
          type:
            latestAnalytics.revenue >= previousAnalytics.revenue
              ? "increase"
              : "decrease",
        },
        icon: <DollarSign className="w-6 h-6" />,
        description: "USD",
        color: "orange" as const,
      },
    ];
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      case "in_progress":
        return "bg-gradient-to-r from-blue-500 to-indigo-500 text-white";
      case "draft":
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white";
      case "archived":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white";
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
      case "archived":
        return "Archived";
      default:
        return status;
    }
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <FileVideo className="w-4 h-4" />;
      case "script":
        return <FileText className="w-4 h-4" />;
      case "both":
        return <Play className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "low":
        return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400";
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

  const periods = [
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
  ];

  const categories = [
    {
      value: "all",
      label: "All Projects",
      icon: <Target className="w-4 h-4" />,
    },
    { value: "video", label: "Video", icon: <FileVideo className="w-4 h-4" /> },
    {
      value: "script",
      label: "Script",
      icon: <FileText className="w-4 h-4" />,
    },
    { value: "both", label: "Combined", icon: <Play className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

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
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Analytics & Performance Overview
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
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
          {/* Period Selector */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200 dark:border-gray-700">
              {periods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedPeriod === period.value
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {calculateStats().map((stat, index) => (
                <motion.div
                  key={stat.title}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}
                        >
                          <div
                            className={`text-${stat.color}-600 dark:text-${stat.color}-400`}
                          >
                            {stat.icon}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {stat.change.type === "increase" ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              stat.change.type === "increase"
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {stat.change.value}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {stat.value}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {stat.description}
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
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {categories.map((category) => (
                        <button
                          key={category.value}
                          onClick={() => setSelectedCategory(category.value)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            selectedCategory === category.value
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                        >
                          {category.icon}
                          <span>{category.label}</span>
                        </button>
                      ))}
                    </div>

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

          {/* Projects Grid/List */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Projects
              </h2>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.slice(0, 6).map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group"
                  >
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                              {getProjectTypeIcon(project.type)}
                            </div>
                            <div>
                              <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                {project.title}
                              </CardTitle>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {project.type}
                              </p>
                            </div>
                          </div>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                            <MoreHorizontal className="h-4 w-4 text-gray-400" />
                          </button>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(project.status)}>
                            {getStatusText(project.status)}
                          </Badge>

                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4" />
                            <span>{project.deadline}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {project.assignedTo?.charAt(0) || "U"}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {project.assignedTo || "Unassigned"}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {project.priority}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.slice(0, 6).map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.01, x: 5 }}
                    className="group"
                  >
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                              {getProjectTypeIcon(project.type)}
                            </div>

                            <div className="space-y-1">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                {project.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {project.description}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{project.deadline}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>
                                    {project.assignedTo || "Unassigned"}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <Badge className={getStatusColor(project.status)}>
                              {getStatusText(project.status)}
                            </Badge>

                            <Badge
                              className={getPriorityColor(project.priority)}
                            >
                              {project.priority}
                            </Badge>

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
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200/50 dark:border-blue-700/50">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Quick Actions
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300">
                    Get started with your next project
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-blue-200/50 dark:border-blue-700/50 hover:shadow-lg transition-all duration-200 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                        <FileVideo className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Create Video
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Start recording or editing
                        </p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-blue-200/50 dark:border-blue-700/50 hover:shadow-lg transition-all duration-200 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Write Script
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          AI-powered script creation
                        </p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-blue-200/50 dark:border-blue-700/50 hover:shadow-lg transition-all duration-200 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          AI Enhance
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Improve existing content
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
