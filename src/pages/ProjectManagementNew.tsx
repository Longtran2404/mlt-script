import React, { useState, useCallback } from "react";
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
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
  Video,
  FileText,
  Filter,
  MoreHorizontal,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  Play,
  Zap,
  TrendingUp,
  BarChart3,
  Settings,
  Download,
  Share2,
  Star,
  ArrowUpRight,
  FolderOpen,
  GitBranch,
  Activity,
  X,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  type: "video" | "script" | "both";
  status: "completed" | "in-progress" | "pending" | "review" | "archived";
  progress: number;
  priority: "high" | "medium" | "low";
  createdDate: string;
  updatedDate: string;
  deadline: string;
  team: string[];
  description: string;
  budget?: number;
  tags: string[];
  client?: string;
  estimatedHours?: number;
  actualHours?: number;
}

export default function ProjectManagementNew() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "kanban">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Admissions 2025 Campaign",
      type: "video",
      status: "completed",
      progress: 100,
      priority: "high",
      createdDate: "2024-01-15",
      updatedDate: "2024-01-20",
      deadline: "2024-01-25",
      team: ["John Smith", "Sarah Johnson"],
      description: "Comprehensive video campaign for 2025 admissions season",
      budget: 15000,
      tags: ["admissions", "marketing", "video"],
      client: "Admissions Office",
      estimatedHours: 80,
      actualHours: 75,
    },
    {
      id: 2,
      title: "MLT Overview Introduction",
      type: "video",
      status: "in-progress",
      progress: 75,
      priority: "medium",
      createdDate: "2024-01-10",
      updatedDate: "2024-01-18",
      deadline: "2024-02-15",
      team: ["Mike Chen"],
      description: "Comprehensive overview video introducing MLT organization",
      budget: 8000,
      tags: ["overview", "introduction", "corporate"],
      client: "Marketing Department",
      estimatedHours: 60,
      actualHours: 45,
    },
    {
      id: 3,
      title: "Soft Skills Training Program",
      type: "script",
      status: "pending",
      progress: 0,
      priority: "low",
      createdDate: "2024-01-12",
      updatedDate: "2024-01-12",
      deadline: "2024-03-01",
      team: ["Lisa Wang"],
      description: "Script for comprehensive soft skills training program",
      budget: 3000,
      tags: ["training", "soft-skills", "education"],
      client: "HR Department",
      estimatedHours: 40,
      actualHours: 0,
    },
    {
      id: 4,
      title: "Scientific Research Presentation",
      type: "script",
      status: "completed",
      progress: 100,
      priority: "medium",
      createdDate: "2024-01-08",
      updatedDate: "2024-01-16",
      deadline: "2024-01-20",
      team: ["David Kim", "Emma Davis"],
      description: "Script for scientific research presentation",
      budget: 5000,
      tags: ["research", "science", "presentation"],
      client: "Research Institute",
      estimatedHours: 50,
      actualHours: 48,
    },
    {
      id: 5,
      title: "Product Launch Video",
      type: "both",
      status: "review",
      progress: 90,
      priority: "high",
      createdDate: "2024-01-20",
      updatedDate: "2024-01-22",
      deadline: "2024-02-01",
      team: ["Alex Rodriguez", "Maria Garcia", "Tom Wilson"],
      description: "Complete video and script for new product launch",
      budget: 25000,
      tags: ["product", "launch", "marketing"],
      client: "Product Team",
      estimatedHours: 120,
      actualHours: 108,
    },
    {
      id: 6,
      title: "Annual Report Script",
      type: "script",
      status: "in-progress",
      progress: 60,
      priority: "medium",
      createdDate: "2024-01-18",
      updatedDate: "2024-01-21",
      deadline: "2024-02-28",
      team: ["Rachel Green"],
      description: "Script for annual company report presentation",
      budget: 4000,
      tags: ["annual-report", "corporate", "presentation"],
      client: "Executive Office",
      estimatedHours: 35,
      actualHours: 21,
    },
  ]);

  const getStatusBadge = (status: Project["status"]) => {
    const statusConfig = {
      completed: {
        color: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
        text: "Completed",
        icon: <CheckCircle className="w-3 h-3" />,
      },
      "in-progress": {
        color: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
        text: "In Progress",
        icon: <Activity className="w-3 h-3" />,
      },
      pending: {
        color: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
        text: "Pending",
        icon: <Clock className="w-3 h-3" />,
      },
      review: {
        color: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
        text: "Under Review",
        icon: <Eye className="w-3 h-3" />,
      },
      archived: {
        color: "bg-gradient-to-r from-gray-500 to-slate-500 text-white",
        text: "Archived",
        icon: <FolderOpen className="w-3 h-3" />,
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

  const getPriorityBadge = (priority: Project["priority"]) => {
    const priorityConfig = {
      high: {
        color: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
        text: "High",
      },
      medium: {
        color:
          "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
        text: "Medium",
      },
      low: {
        color:
          "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
        text: "Low",
      },
    };

    const config = priorityConfig[priority];
    return <Badge className={`${config.color} text-xs`}>{config.text}</Badge>;
  };

  const getTypeIcon = (type: Project["type"]) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "script":
        return <FileText className="w-4 h-4" />;
      case "both":
        return <Play className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Project["type"]) => {
    switch (type) {
      case "video":
        return "from-blue-500 to-indigo-600";
      case "script":
        return "from-green-500 to-emerald-600";
      case "both":
        return "from-purple-500 to-pink-600";
      default:
        return "from-gray-500 to-slate-600";
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    const matchesType = filterType === "all" || project.type === filterType;
    const matchesPriority =
      filterPriority === "all" || project.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
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

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      change: "+12%",
      changeType: "increase" as const,
      icon: <FolderOpen className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Active Projects",
      value: projects.filter(
        (p) => p.status === "in-progress" || p.status === "review"
      ).length,
      change: "+8%",
      changeType: "increase" as const,
      icon: <Activity className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Completed",
      value: projects.filter((p) => p.status === "completed").length,
      change: "+15%",
      changeType: "increase" as const,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "On Time",
      value: Math.round(
        (projects.filter((p) => p.status === "completed").length /
          projects.length) *
          100
      ),
      change: "+5%",
      changeType: "increase" as const,
      icon: <Clock className="w-5 h-5" />,
      color: "from-orange-500 to-red-600",
      suffix: "%",
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
                  Project Management
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage and track all your projects efficiently
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

              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                New Project
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
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}
                        >
                          <div className="text-white">{stat.icon}</div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            {stat.change}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {stat.value}
                        {stat.suffix || ""}
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
                        placeholder="Search projects, tags, or team members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-40 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="review">Under Review</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-40 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="script">Script</SelectItem>
                        <SelectItem value="both">Combined</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={filterPriority}
                      onValueChange={setFilterPriority}
                    >
                      <SelectTrigger className="w-40 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                        <SelectValue placeholder="Filter by priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
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

          {/* Projects Display */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Projects ({filteredProjects.length})
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Showing {filteredProjects.length} of {projects.length}{" "}
                  projects
                </span>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group cursor-pointer"
                    onClick={() => {
                      setSelectedProject(project);
                      setShowProjectModal(true);
                    }}
                  >
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`p-2 bg-gradient-to-r ${getTypeColor(
                                project.type
                              )} rounded-lg`}
                            >
                              <div className="text-white">
                                {getTypeIcon(project.type)}
                              </div>
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

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            {getStatusBadge(project.status)}
                            {getPriorityBadge(project.priority)}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Progress
                              </span>
                              <span className="font-medium">
                                {project.progress}%
                              </span>
                            </div>
                            <Progress value={project.progress} className="h-2">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${getProgressColor(
                                  project.progress
                                )}`}
                                style={{ width: `${project.progress}%` }}
                              />
                            </Progress>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{project.deadline}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{project.team.length} members</span>
                          </span>
                        </div>

                        {project.budget && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              Budget
                            </span>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              ${project.budget.toLocaleString()}
                            </span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 3).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tags.length - 3}
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
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.01, x: 5 }}
                    className="group cursor-pointer"
                    onClick={() => {
                      setSelectedProject(project);
                      setShowProjectModal(true);
                    }}
                  >
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`p-3 bg-gradient-to-r ${getTypeColor(
                                project.type
                              )} rounded-lg`}
                            >
                              <div className="text-white">
                                {getTypeIcon(project.type)}
                              </div>
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
                                  <Calendar className="h-4 w-4" />
                                  <span>Due: {project.deadline}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>{project.team.length} members</span>
                                </span>
                                {project.client && (
                                  <span className="flex items-center space-x-1">
                                    <Star className="h-4 w-4" />
                                    <span>{project.client}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-right space-y-2">
                              <div className="flex items-center space-x-2">
                                {getStatusBadge(project.status)}
                                {getPriorityBadge(project.priority)}
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Progress
                                  </span>
                                  <span className="font-medium">
                                    {project.progress}%
                                  </span>
                                </div>
                                <Progress
                                  value={project.progress}
                                  className="h-2 w-32"
                                >
                                  <div
                                    className={`h-full rounded-full transition-all duration-300 ${getProgressColor(
                                      project.progress
                                    )}`}
                                    style={{ width: `${project.progress}%` }}
                                  />
                                </Progress>
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
          </motion.div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {showProjectModal && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowProjectModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-3 bg-gradient-to-r ${getTypeColor(
                      selectedProject.type
                    )} rounded-lg`}
                  >
                    <div className="text-white">
                      {getTypeIcon(selectedProject.type)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedProject.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedProject.type} • {selectedProject.status}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedProject.description}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Progress & Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Progress
                          </span>
                          <span className="font-medium">
                            {selectedProject.progress}%
                          </span>
                        </div>
                        <Progress value={selectedProject.progress} className="h-3">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${getProgressColor(
                              selectedProject.progress
                            )}`}
                            style={{ width: `${selectedProject.progress}%` }}
                          />
                        </Progress>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">
                            Created:
                          </span>
                          <p className="font-medium">
                            {selectedProject.createdDate}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">
                            Updated:
                          </span>
                          <p className="font-medium">
                            {selectedProject.updatedDate}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">
                            Deadline:
                          </span>
                          <p className="font-medium">
                            {selectedProject.deadline}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">
                            Priority:
                          </span>
                          <div className="mt-1">
                            {getPriorityBadge(selectedProject.priority)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Team Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.team.map((member, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {member.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {member}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Status
                        </span>
                        {getStatusBadge(selectedProject.status)}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Type
                        </span>
                        <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          {selectedProject.type}
                        </Badge>
                      </div>

                      {selectedProject.budget && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Budget
                          </span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            ${selectedProject.budget.toLocaleString()}
                          </span>
                        </div>
                      )}

                      {selectedProject.client && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Client
                          </span>
                          <span className="font-medium">
                            {selectedProject.client}
                          </span>
                        </div>
                      )}

                      {selectedProject.estimatedHours && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Est. Hours
                          </span>
                          <span className="font-medium">
                            {selectedProject.estimatedHours}h
                          </span>
                        </div>
                      )}

                      {selectedProject.actualHours && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Actual Hours
                          </span>
                          <span className="font-medium">
                            {selectedProject.actualHours}h
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Project
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
