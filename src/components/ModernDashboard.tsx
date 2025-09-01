import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Video,
  Image,
  Music,
  Clock,
  Star,
  Award,
  Zap,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Cloud,
  Shield,
  Sparkles,
  Rocket,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
  trend: "up" | "down";
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface RecentActivity {
  id: string;
  type: "script" | "video" | "image" | "audio";
  title: string;
  status: "completed" | "in_progress" | "pending" | "error";
  timestamp: string;
  user: string;
}

export default function ModernDashboard() {
  const stats: StatCard[] = [
    {
      title: "Total Scripts",
      value: "1,234",
      change: 12.5,
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      trend: "up",
    },
    {
      title: "Videos Created",
      value: "856",
      change: 8.2,
      icon: Video,
      color: "from-purple-500 to-pink-500",
      trend: "up",
    },
    {
      title: "Images Generated",
      value: "2,341",
      change: -3.1,
      icon: Image,
      color: "from-green-500 to-emerald-500",
      trend: "down",
    },
    {
      title: "Audio Files",
      value: "432",
      change: 15.7,
      icon: Music,
      color: "from-orange-500 to-red-500",
      trend: "up",
    },
  ];

  const chartData: ChartData[] = [
    { name: "Scripts", value: 35, color: "bg-blue-500" },
    { name: "Videos", value: 25, color: "bg-purple-500" },
    { name: "Images", value: 30, color: "bg-green-500" },
    { name: "Audio", value: 10, color: "bg-orange-500" },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "script",
      title: "VLU Marketing Campaign Script",
      status: "completed",
      timestamp: "2 minutes ago",
      user: "John Doe",
    },
    {
      id: "2",
      type: "video",
      title: "Product Demo Video",
      status: "in_progress",
      timestamp: "15 minutes ago",
      user: "Jane Smith",
    },
    {
      id: "3",
      type: "image",
      title: "Social Media Banner",
      status: "completed",
      timestamp: "1 hour ago",
      user: "Mike Johnson",
    },
    {
      id: "4",
      type: "audio",
      title: "Podcast Intro",
      status: "pending",
      timestamp: "2 hours ago",
      user: "Sarah Wilson",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in_progress":
        return <Activity className="w-4 h-4 text-blue-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "script":
        return <FileText className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "image":
        return <Image className="w-4 h-4" />;
      case "audio":
        return <Music className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                MLT AI Platform Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Professional content creation and management platform
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {stat.value}
                      </p>
                      <div className="flex items-center mt-2">
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            stat.trend === "up"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {stat.change > 0 ? "+" : ""}
                          {stat.change}%
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          vs last month
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts and Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Content Distribution Chart */}
          <Card className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-blue-600" />
                <span>Content Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chartData.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div
                        className={`w-4 h-4 rounded-full ${item.color}`}
                      ></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-2 rounded-full ${item.color.replace(
                            "bg-",
                            "bg-"
                          )}`}
                        ></motion.div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-8">
                        {item.value}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg">
                <FileText className="w-4 h-4 mr-2" />
                Create New Script
              </Button>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
                <Video className="w-4 h-4 mr-2" />
                Generate Video
              </Button>
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg">
                <Image className="w-4 h-4 mr-2" />
                Create Image
              </Button>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg">
                <Music className="w-4 h-4 mr-2" />
                Generate Audio
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(activity.type)}
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        by {activity.user} • {activity.timestamp}
                      </p>
                    </div>
                    <Badge
                      className={`${
                        activity.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : activity.status === "in_progress"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : activity.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {activity.status.replace("_", " ")}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <span>Performance Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Script Completion Rate
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      94%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "94%" }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Video Generation Speed
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      87%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "87%" }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      User Satisfaction
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      96%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "96%" }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      System Uptime
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      99.9%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "99.9%" }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Platform Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Global Access
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Access your content from anywhere in the world with cloud
                synchronization
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Enterprise Security
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Bank-level security with encryption and secure authentication
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                AI-Powered
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Advanced AI algorithms for intelligent content creation and
                optimization
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
