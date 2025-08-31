import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  TrendingUp,
  Users,
  Video,
  FileText,
  Eye,
  Download,
  Share2,
  Calendar,
  Filter,
} from "lucide-react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30");
  const [selectedMetric, setSelectedMetric] = useState("views");

  const [metrics] = useState({
    totalViews: 124750,
    totalDownloads: 45620,
    totalShares: 23450,
    avgEngagement: 87.5,
  });

  const [trends] = useState([
    { period: "Tuần 1", views: 12000, downloads: 4500, shares: 2300 },
    { period: "Tuần 2", views: 13500, downloads: 5200, shares: 2800 },
    { period: "Tuần 3", views: 11800, downloads: 4800, shares: 2400 },
    { period: "Tuần 4", views: 14200, downloads: 5800, shares: 3100 },
  ]);

  const [topContent] = useState([
    { title: "Tuyển sinh 2025", views: 15600, engagement: 92, type: "video" },
    { title: "Giới thiệu MLT", views: 12800, engagement: 88, type: "video" },
    { title: "Đào tạo kỹ năng", views: 11200, engagement: 85, type: "script" },
    {
      title: "Nghiên cứu khoa học",
      views: 9800,
      engagement: 79,
      type: "script",
    },
  ]);


  const getContentTypeIcon = (type: string) => {
    return type === "video" ? (
      <Video className="w-4 h-4" />
    ) : (
      <FileText className="w-4 h-4" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Phân tích chi tiết về hiệu suất và tương tác của nội dung
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Thời gian:</span>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 ngày</SelectItem>
                    <SelectItem value="30">30 ngày</SelectItem>
                    <SelectItem value="90">90 ngày</SelectItem>
                    <SelectItem value="365">1 năm</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Chỉ số:</span>
                </div>
                <Select
                  value={selectedMetric}
                  onValueChange={setSelectedMetric}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="views">Lượt xem</SelectItem>
                    <SelectItem value="downloads">Tải xuống</SelectItem>
                    <SelectItem value="shares">Chia sẻ</SelectItem>
                    <SelectItem value="engagement">Tương tác</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm">
                  Xuất báo cáo
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng lượt xem
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.totalViews.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  +12% so với tháng trước
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tải xuống</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.totalDownloads.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  +8% so với tháng trước
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chia sẻ</CardTitle>
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.totalShares.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  +15% so với tháng trước
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tương tác TB
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.avgEngagement}%
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  +5% so với tháng trước
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts and Data */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Trends Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Xu hướng theo thời gian</CardTitle>
                <CardDescription>
                  Biểu đồ thể hiện sự thay đổi của các chỉ số
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trends.map((trend, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <span className="font-medium">{trend.period}</span>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm font-medium">
                            {trend.views.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">Lượt xem</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">
                            {trend.downloads.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">Tải xuống</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">
                            {trend.shares.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">Chia sẻ</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Nội dung phổ biến nhất</CardTitle>
                <CardDescription>
                  Top 4 nội dung có hiệu suất cao nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContent.map((content, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        {getContentTypeIcon(content.type)}
                        <div>
                          <p className="font-medium text-sm">{content.title}</p>
                          <p className="text-xs text-gray-500">
                            {content.views.toLocaleString()} lượt xem
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{content.engagement}%</Badge>
                        <p className="text-xs text-gray-500 mt-1">Tương tác</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Xem tất cả nội dung
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Insights */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Phân tích và đề xuất</CardTitle>
              <CardDescription>
                Những hiểu biết từ dữ liệu và gợi ý cải thiện
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    🎯 Điểm mạnh
                  </h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Tỷ lệ tương tác cao (87.5%)</li>
                    <li>• Tăng trưởng lượt xem ổn định</li>
                    <li>• Nội dung video được ưa chuộng</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    💡 Đề xuất cải thiện
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Tăng cường nội dung kịch bản</li>
                    <li>• Tối ưu hóa SEO cho video</li>
                    <li>• Phát triển chiến lược chia sẻ</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
