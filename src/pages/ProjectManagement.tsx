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
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
  Video,
  FileText,
} from "lucide-react";

export default function ProjectManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [projects] = useState([
    {
      id: 1,
      title: "Tuyển sinh 2025",
      type: "video",
      status: "completed",
      progress: 100,
      createdDate: "2024-01-15",
      updatedDate: "2024-01-20",
      team: ["Nguyễn Văn A", "Trần Thị B"],
      description: "Video giới thiệu tuyển sinh năm 2025",
    },
    {
      id: 2,
      title: "Giới thiệu MLT",
      type: "video",
      status: "in-progress",
      progress: 75,
      createdDate: "2024-01-10",
      updatedDate: "2024-01-18",
      team: ["Lê Văn C"],
      description: "Video giới thiệu tổng quan về MLT",
    },
    {
      id: 3,
      title: "Đào tạo kỹ năng",
      type: "script",
      status: "pending",
      progress: 0,
      createdDate: "2024-01-12",
      updatedDate: "2024-01-12",
      team: ["Phạm Thị D"],
      description: "Kịch bản đào tạo kỹ năng mềm",
    },
    {
      id: 4,
      title: "Nghiên cứu khoa học",
      type: "script",
      status: "completed",
      progress: 100,
      createdDate: "2024-01-08",
      updatedDate: "2024-01-16",
      team: ["Hoàng Văn E", "Vũ Thị F"],
      description: "Kịch bản nghiên cứu khoa học",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Hoàn thành
          </Badge>
        );
      case "in-progress":
        return <Badge variant="secondary">Đang thực hiện</Badge>;
      case "pending":
        return <Badge variant="outline">Chờ xử lý</Badge>;
      default:
        return <Badge variant="outline">Không xác định</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "video" ? (
      <Video className="w-4 h-4" />
    ) : (
      <FileText className="w-4 h-4" />
    );
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    return "bg-yellow-500";
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    const matchesType = filterType === "all" || project.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

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
            Quản lý dự án
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Quản lý và theo dõi tiến độ các dự án video và kịch bản
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng dự án
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projects.length}</div>
                <p className="text-xs text-muted-foreground">
                  +2 dự án mới tháng này
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Đã hoàn thành
                </CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {projects.filter((p) => p.status === "completed").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round(
                    (projects.filter((p) => p.status === "completed").length /
                      projects.length) *
                      100
                  )}
                  % tổng số
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
                <CardTitle className="text-sm font-medium">
                  Đang thực hiện
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {projects.filter((p) => p.status === "in-progress").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Cần theo dõi sát sao
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
                <CardTitle className="text-sm font-medium">Chờ xử lý</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {projects.filter((p) => p.status === "pending").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Cần phân công ngay
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Tìm kiếm dự án..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                    <SelectItem value="in-progress">Đang thực hiện</SelectItem>
                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="script">Kịch bản</SelectItem>
                  </SelectContent>
                </Select>

                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Dự án mới
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Projects List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Danh sách dự án</CardTitle>
              <CardDescription>
                {filteredProjects.length} dự án được tìm thấy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(project.type)}
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>Tạo: {project.createdDate}</span>
                            <span>Cập nhật: {project.updatedDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {project.progress}%
                        </div>
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProgressColor(
                              project.progress
                            )} transition-all duration-300`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {project.team.length}
                        </div>
                        <div className="text-xs text-gray-500">Thành viên</div>
                      </div>

                      {getStatusBadge(project.status)}

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
