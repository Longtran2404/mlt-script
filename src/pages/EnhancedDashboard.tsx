import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  Video,
  FileText,
  TrendingUp,
  Calendar,
  Clock,
  Star,
  Target,
  Activity,
  DollarSign,
  PlayCircle,
  Eye,
  Download,
  Share2,
  Plus,
  Filter,
  Search,
  MoreVertical
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { StatsCard, StatsData } from "../components/ui/stats-card";
import { googleSheetsService, UserData, ProjectData, AnalyticsData } from "../services/googleSheets";

export default function EnhancedDashboard() {
  console.log("📊 Rendering EnhancedDashboard page");
  const [users, setUsers] = useState<UserData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Calculate stats from real data
  const calculateStats = (): StatsData[] => {
    const latestAnalytics = analytics[0] || {
      pageViews: 0,
      uniqueVisitors: 0,
      videosCreated: 0,
      scriptsCreated: 0,
      newUsers: 0,
      activeUsers: 0,
      revenue: 0
    };

    const previousAnalytics = analytics[1] || latestAnalytics;

    const calculateChange = (current: number, previous: number): string => {
      if (previous === 0) return "+100%";
      const change = ((current - previous) / previous * 100);
      return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
    };

    return [
      {
        title: "Tổng người dùng",
        value: latestAnalytics.activeUsers.toLocaleString(),
        change: {
          value: calculateChange(latestAnalytics.activeUsers, previousAnalytics.activeUsers),
          type: latestAnalytics.activeUsers >= previousAnalytics.activeUsers ? "increase" : "decrease"
        },
        icon: <Users className="w-6 h-6" />,
        description: `${latestAnalytics.newUsers} người dùng mới hôm nay`,
        color: "blue" as const
      },
      {
        title: "Video được tạo",
        value: latestAnalytics.videosCreated.toLocaleString(),
        change: {
          value: calculateChange(latestAnalytics.videosCreated, previousAnalytics.videosCreated),
          type: latestAnalytics.videosCreated >= previousAnalytics.videosCreated ? "increase" : "decrease"
        },
        icon: <Video className="w-6 h-6" />,
        description: "Video AI chất lượng cao",
        color: "purple" as const
      },
      {
        title: "Kịch bản hoàn thành",
        value: latestAnalytics.scriptsCreated.toLocaleString(),
        change: {
          value: calculateChange(latestAnalytics.scriptsCreated, previousAnalytics.scriptsCreated),
          type: latestAnalytics.scriptsCreated >= previousAnalytics.scriptsCreated ? "increase" : "decrease"
        },
        icon: <FileText className="w-6 h-6" />,
        description: "Kịch bản chuyên nghiệp",
        color: "green" as const
      },
      {
        title: "Doanh thu tháng",
        value: `${(latestAnalytics.revenue / 1000000).toFixed(1)}M`,
        change: {
          value: calculateChange(latestAnalytics.revenue, previousAnalytics.revenue),
          type: latestAnalytics.revenue >= previousAnalytics.revenue ? "increase" : "decrease"
        },
        icon: <DollarSign className="w-6 h-6" />,
        description: "VNĐ",
        color: "orange" as const
      }
    ];
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "archived":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Hoàn thành";
      case "in_progress": return "Đang thực hiện";
      case "draft": return "Bản nháp";
      case "archived": return "Lưu trữ";
      default: return status;
    }
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="w-4 h-4" />;
      case "script": return <FileText className="w-4 h-4" />;
      case "both": return <PlayCircle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-dots text-blue-600">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Tổng quan hoạt động và hiệu suất của nền tảng MLT Script AI
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            {["24h", "7d", "30d", "90d"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  selectedPeriod === period
                    ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Tạo dự án mới
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {calculateStats().map((stat, index) => (
          <StatsCard key={stat.title} stats={stat} index={index} />
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  Biểu đồ doanh thu
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Xuất báo cáo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.slice(0, 5).map((data, index) => (
                  <motion.div
                    key={data.date}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                        {new Date(data.date).getDate()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {new Date(data.date).toLocaleDateString('vi-VN', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {data.pageViews.toLocaleString()} lượt xem
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600 dark:text-green-400">
                        {(data.revenue / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        +{data.newUsers} người dùng
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-600" />
                Thao tác nhanh
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start hover-lift">
                <Video className="w-4 h-4 mr-2" />
                Tạo video AI mới
              </Button>
              <Button variant="outline" className="w-full justify-start hover-lift">
                <FileText className="w-4 h-4 mr-2" />
                Viết kịch bản
              </Button>
              <Button variant="outline" className="w-full justify-start hover-lift">
                <Users className="w-4 h-4 mr-2" />
                Quản lý team
              </Button>
              <Button variant="outline" className="w-full justify-start hover-lift">
                <BarChart3 className="w-4 h-4 mr-2" />
                Xem analytics
              </Button>
            </CardContent>
          </Card>

          {/* Top Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-600" />
                Người dùng hàng đầu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {users.slice(0, 3).map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.videosCreated} video
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={user.plan === "enterprise" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {user.plan}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Projects Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-600" />
                Dự án gần đây
              </CardTitle>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm dự án..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Lọc
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Dự án
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Loại
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Trạng thái
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Tiến độ
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Hạn chót
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project, index) => (
                    <motion.tr
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                            {getProjectTypeIcon(project.type)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {project.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                              {project.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {project.type}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${getStatusColor(project.status)} border-none`}>
                          {getStatusText(project.status)}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-16">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 min-w-12">
                            {project.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4 mr-1" />
                          {project.dueDate ? new Date(project.dueDate).toLocaleDateString('vi-VN') : 'N/A'}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Không tìm thấy dự án nào phù hợp với tìm kiếm của bạn.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}