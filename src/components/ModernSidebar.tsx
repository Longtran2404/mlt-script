import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  FileText,
  Video,
  Image,
  Music,
  Database,
  BarChart3,
  Settings,
  User,
  Bell,
  Bookmark,
  Archive,
  Trash2,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Star,
  TrendingUp,
  Zap,
  Target,
  Award,
  Globe,
  Cloud,
  Shield,
  Activity,
  PieChart,
  Sparkles,
  Rocket,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface SidebarItem {
  name: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: number;
  active?: boolean;
  children?: SidebarItem[];
}

interface ModernSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
}

export default function ModernSidebar({
  isCollapsed = false,
  onToggle,
  user,
}: ModernSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const sidebarItems: SidebarItem[] = [
    {
      name: "Dashboard",
      icon: Home,
      href: "/",
      active: true,
    },
    {
      name: "Content Creation",
      icon: Plus,
      href: "/create",
      children: [
        { name: "Scripts", icon: FileText, href: "/scripts", badge: 12 },
        { name: "Videos", icon: Video, href: "/videos", badge: 8 },
        { name: "Images", icon: Image, href: "/images", badge: 24 },
        { name: "Audio", icon: Music, href: "/audio", badge: 6 },
      ],
    },
    {
      name: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      children: [
        { name: "Overview", icon: PieChart, href: "/analytics/overview" },
        {
          name: "Performance",
          icon: TrendingUp,
          href: "/analytics/performance",
        },
        { name: "Reports", icon: Database, href: "/analytics/reports" },
      ],
    },
    {
      name: "Management",
      icon: Settings,
      href: "/management",
      children: [
        { name: "Projects", icon: Folder, href: "/management/projects" },
        { name: "Team", icon: Users, href: "/management/team" },
        { name: "Settings", icon: Settings, href: "/management/settings" },
      ],
    },
  ];

  const quickActions = [
    { name: "New Script", icon: FileText, href: "/scripts/new" },
    { name: "Upload Video", icon: Video, href: "/videos/upload" },
    { name: "Generate Image", icon: Image, href: "/images/generate" },
  ];

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.name);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.name}>
        <motion.a
          href={item.href}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
            item.active
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
              : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-gray-800/50"
          } ${level > 0 ? "ml-4" : ""}`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-5 h-5 flex items-center justify-center ${
                item.active
                  ? "text-white"
                  : "text-gray-500 group-hover:text-blue-500"
              }`}
            >
              <item.icon className="w-4 h-4" />
            </div>
            {!isCollapsed && <span className="truncate">{item.name}</span>}
          </div>
          <div className="flex items-center space-x-2">
            {item.badge && !isCollapsed && (
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs">
                {item.badge}
              </Badge>
            )}
            {hasChildren && !isCollapsed && (
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            )}
          </div>
        </motion.a>

        {/* Children */}
        {hasChildren && !isCollapsed && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-1 space-y-1"
              >
                {item.children!.map((child) =>
                  renderSidebarItem(child, level + 1)
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed left-0 top-0 h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-white/20 dark:border-gray-800/20 shadow-xl z-40 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20 dark:border-gray-800/20">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MLT AI
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Platform
                </p>
              </div>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-8 h-8 p-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* User Profile */}
        {user && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border-b border-white/20 dark:border-gray-800/20"
          >
            <div className="flex items-center space-x-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-white/20 dark:border-gray-700/20"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.role}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 border-b border-white/20 dark:border-gray-800/20"
          >
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <motion.a
                  key={action.name}
                  href={action.href}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                >
                  <action.icon className="w-4 h-4" />
                  <span>{action.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <AnimatePresence>
            {sidebarItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {renderSidebarItem(item)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 border-t border-white/20 dark:border-gray-800/20"
          >
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Activity className="w-3 h-3 text-green-500" />
                <span>Online</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>Secure</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}

// Missing icon component
const Folder = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
  </svg>
);
