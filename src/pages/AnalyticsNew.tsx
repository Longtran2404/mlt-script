import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Progress } from "../components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  Clock,
  DollarSign,
  FileVideo,
  FileText,
  Play,
  Zap,
  Calendar,
  Filter,
  Search,
  Download,
  Share2,
  Settings,
  ArrowUpRight,
  Activity,
  Target,
  CheckCircle,
  AlertCircle,
  Star,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  PieChart,
  LineChart,
  AreaChart,
  Scatter,
  PieChart3,
  BarChart,
  ActivitySquare,
  Gauge,
  TargetIcon,
  Lightbulb,
  Brain,
  Sparkles,
} from "lucide-react";

interface AnalyticsData {
  id: string;
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionRate: number;
  revenue: number;
  videosCreated: number;
  scriptsCreated: number;
  newUsers: number;
  activeUsers: number;
  deviceType: "desktop" | "mobile" | "tablet";
  source: "direct" | "organic" | "social" | "referral" | "paid";
  country: string;
  browser: string;
}

interface UserSegment {
  id: string;
  name: string;
  count: number;
  growth: number;
  engagement: number;
  revenue: number;
  color: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  target: number;
  status: "excellent" | "good" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  change: number;
}

export default function AnalyticsNew() {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"charts" | "tables" | "insights">("charts");

  const [analyticsData] = useState<AnalyticsData[]>([
    {
      id: "1",
      date: "2024-01-22",
      pageViews: 15420,
      uniqueVisitors: 8234,
      bounceRate: 32.5,
      avgSessionDuration: 245,
      conversionRate: 4.2,
      revenue: 12500,
      videosCreated: 45,
      scriptsCreated: 23,
      newUsers: 156,
      activeUsers: 2340,
      deviceType: "desktop",
      source: "organic",
      country: "Vietnam",
      browser: "Chrome",
    },
    {
      id: "2",
      date: "2024-01-21",
      pageViews: 14230,
      uniqueVisitors: 7654,
      bounceRate: 35.1,
      avgSessionDuration: 218,
      conversionRate: 3.8,
      revenue: 11800,
      videosCreated: 38,
      scriptsCreated: 19,
      newUsers: 142,
      activeUsers: 2180,
      deviceType: "mobile",
      source: "social",
      country: "Vietnam",
      browser: "Safari",
    },
    {
      id: "3",
      date: "2024-01-20",
      pageViews: 13890,
      uniqueVisitors: 7432,
      bounceRate: 33.8,
      avgSessionDuration: 231,
      conversionRate: 4.1,
      revenue: 12100,
      videosCreated: 42,
      scriptsCreated: 21,
      newUsers: 148,
      activeUsers: 2250,
      deviceType: "desktop",
      source: "direct",
      country: "Vietnam",
      browser: "Chrome",
    },
  ]);

  const [userSegments] = useState<UserSegment[]>([
    {
      id: "1",
      name: "Power Users",
      count: 1250,
      growth: 15.2,
      engagement: 89.5,
      revenue: 45000,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "2",
      name: "Regular Users",
      count: 3450,
      growth: 8.7,
      engagement: 67.3,
      revenue: 28000,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "3",
      name: "New Users",
      count: 2100,
      growth: 23.1,
      engagement: 45.2,
      revenue: 12000,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "4",
      name: "Inactive Users",
      count: 890,
      growth: -5.4,
      engagement: 12.8,
      revenue: 2000,
      color: "from-gray-500 to-slate-600",
    },
  ]);

  const [performanceMetrics] = useState<PerformanceMetric[]>([
    {
      name: "User Engagement",
      value: 78.5,
      target: 80.0,
      status: "good",
      trend: "up",
      change: 2.3,
    },
    {
      name: "Conversion Rate",
      value: 4.2,
      target: 5.0,
      status: "warning",
      trend: "up",
      change: 0.8,
    },
    {
      name: "Session Duration",
      value: 245,
      target: 300,
      status: "warning",
      trend: "stable",
      change: 0.0,
    },
    {
      name: "Bounce Rate",
      value: 32.5,
      target: 25.0,
      status: "critical",
      trend: "down",
      change: -2.1,
    },
  ]);

  const getStatusColor = (status: PerformanceMetric["status"]) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
      case "good":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400";
      case "warning":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "critical":
        return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getTrendIcon = (trend: PerformanceMetric["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "stable":
        return <Activity className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getDeviceIcon = (device: AnalyticsData["deviceType"]) => {
    switch (device) {
      case "desktop":
        return <Monitor className="h-4 w-4" />;
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getSourceColor = (source: AnalyticsData["source"]) => {
    switch (source) {
      case "direct":
        return "from-blue-500 to-indigo-600";
      case "organic":
        return "from-green-500 to-emerald-600";
      case "social":
        return "from-purple-500 to-pink-600";
      case "referral":
        return "from-orange-500 to-red-600";
      case "paid":
        return "from-yellow-500 to-orange-600";
      default:
        return "from-gray-500 to-slate-600";
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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

  const timeRanges = [
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
    { value: "1y", label: "1 Year" },
  ];

  const metrics = [
    { value: "overview", label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
    { value: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
    { value: "engagement", label: "Engagement", icon: <Activity className="w-4 h-4" /> },
    { value: "conversion", label: "Conversion", icon: <Target className="w-4 h-4" /> },
    { value: "revenue", label: "Revenue", icon: <DollarSign className="w-4 h-4" /> },
  ];

  const latestData = analyticsData[0];
  const previousData = analyticsData[1];

  const calculateChange = (current: number, previous: number): number => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  const overviewStats = [
    {
      title: "Total Page Views",
      value: formatNumber(latestData.pageViews),
      change: calculateChange(latestData.pageViews, previousData.pageViews),
      icon: <Eye className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Unique Visitors",
      value: formatNumber(latestData.uniqueVisitors),
      change: calculateChange(latestData.uniqueVisitors, previousData.uniqueVisitors),
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Conversion Rate",
      value: `${latestData.conversionRate}%`,
      change: calculateChange(latestData.conversionRate, previousData.conversionRate),
      icon: <Target className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Revenue",
      value: `$${formatNumber(latestData.revenue)}`,
      change: calculateChange(latestData.revenue, previousData.revenue),
      icon: <DollarSign className="w-6 h-6" />,
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
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Comprehensive insights and performance metrics
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
          {/* Time Range and Metric Selector */}
          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex items-center space-x-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setTimeRange(range.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      timeRange === range.value
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                {metrics.map((metric) => (
                  <button
                    key={metric.value}
                    onClick={() => setSelectedMetric(metric.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      selectedMetric === metric.value
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {metric.icon}
                    <span>{metric.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search analytics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                />
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("charts")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "charts"
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  }`}
                >
                  <BarChart className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("tables")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "tables"
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  }`}
                >
                  <PieChart className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("insights")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "insights"
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  }`}
                >
                  <Lightbulb className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Overview Stats */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, index) => (
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
                          {stat.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              stat.change >= 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {stat.change >= 0 ? "+" : ""}
                            {stat.change.toFixed(1)}%
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

          {/* Performance Metrics */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Key performance indicators and targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {performanceMetrics.map((metric) => (
                    <div key={metric.name} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {metric.name}
                        </h4>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(metric.trend)}
                          <span
                            className={`text-sm font-medium ${
                              metric.change >= 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {metric.change >= 0 ? "+" : ""}
                            {metric.change.toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Current
                          </span>
                          <span className="font-medium">{metric.value}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Target
                          </span>
                          <span className="font-medium">{metric.target}</span>
                        </div>
                        <Progress
                          value={(metric.value / metric.target) * 100}
                          className="h-2"
                        />
                      </div>

                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Segments */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle>User Segments</CardTitle>
                <CardDescription>
                  User behavior analysis and segmentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {userSegments.map((segment) => (
                    <motion.div
                      key={segment.id}
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                      className="group cursor-pointer"
                    >
                      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-gray-200/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 bg-gradient-to-r ${segment.color} rounded-lg`}>
                              <Users className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1">
                                {segment.growth >= 0 ? (
                                  <TrendingUp className="h-4 w-4 text-green-500" />
                                ) : (
                                  <TrendingDown className="h-4 w-4 text-red-500" />
                                )}
                                <span
                                  className={`text-sm font-medium ${
                                    segment.growth >= 0
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-red-600 dark:text-red-400"
                                  }`}
                                >
                                  {segment.growth >= 0 ? "+" : ""}
                                  {segment.growth.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          </div>

                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {segment.name}
                          </h4>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Users
                              </span>
                              <span className="font-medium">
                                {formatNumber(segment.count)}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Engagement
                              </span>
                              <span className="font-medium">{segment.engagement}%</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Revenue
                              </span>
                              <span className="font-medium text-green-600 dark:text-green-400">
                                ${formatNumber(segment.revenue)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Traffic Sources and Device Analytics */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Traffic Sources */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { source: "direct" as const, percentage: 35, count: 2882 },
                      { source: "organic" as const, percentage: 28, count: 2306 },
                      { source: "social" as const, percentage: 22, count: 1811 },
                      { source: "referral" as const, percentage: 10, count: 823 },
                      { source: "paid" as const, percentage: 5, count: 412 },
                    ].map((item) => (
                      <div key={item.source} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 bg-gradient-to-r ${getSourceColor(
                              item.source
                            )} rounded-full`}
                          />
                          <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {item.source}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.count.toLocaleString()}
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Device Analytics */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle>Device Analytics</CardTitle>
                  <CardDescription>How users access your platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { device: "desktop" as const, percentage: 58, count: 4776 },
                      { device: "mobile" as const, percentage: 35, count: 2882 },
                      { device: "tablet" as const, percentage: 7, count: 576 },
                    ].map((item) => (
                      <div key={item.device} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            {getDeviceIcon(item.device)}
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {item.device}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.count.toLocaleString()}
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200/50 dark:border-purple-700/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-purple-900 dark:text-purple-100">
                      AI-Powered Insights
                    </CardTitle>
                    <CardDescription className="text-purple-700 dark:text-purple-300">
                      Intelligent recommendations and trends
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                    <div className="flex items-center space-x-3 mb-3">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Growth Opportunity
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Mobile traffic increased 15% this month. Consider optimizing mobile experience.
                    </p>
                  </div>

                  <div className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                    <div className="flex items-center space-x-3 mb-3">
                      <Target className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Conversion Tip
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Users from social media have 2.3x higher conversion rate. Focus on social campaigns.
                    </p>
                  </div>

                  <div className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                    <div className="flex items-center space-x-3 mb-3">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Performance Alert
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Bounce rate increased 5%. Review page load times and content quality.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
