import React from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showBackButton?: boolean;
  className?: string;
}

export default function Breadcrumb({
  items,
  showBackButton = true,
  className = "",
}: BreadcrumbProps) {
  // Thay thế usePathname bằng window.location.pathname
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";

  // Auto-generate breadcrumb if not provided
  const generateBreadcrumb = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split("/").filter(Boolean);

    const breadcrumbItems: BreadcrumbItem[] = [
      { label: "Trang chủ", href: "/", icon: "🏠" },
    ];

    // Define page groups and their icons
    const pageGroups: {
      [key: string]: { label: string; icon: string; group?: string };
    } = {
      "tao-kich-ban": { label: "Tạo kịch bản", icon: "✍️", group: "Công cụ" },

      "tao-video": { label: "Tạo video", icon: "🎬", group: "Công cụ" },
      templates: { label: "Templates", icon: "📄", group: "Công cụ" },
      dashboard: { label: "Dashboard", icon: "📈", group: "Quản lý" },
      "quan-ly": { label: "Quản lý dự án", icon: "📊", group: "Quản lý" },
      analytics: { label: "Analytics", icon: "📊", group: "Quản lý" },
      report: { label: "Báo cáo", icon: "📋", group: "Quản lý" },
      "ai-support": { label: "AI Support", icon: "💬", group: "Hỗ trợ" },
      help: { label: "Help Center", icon: "📚", group: "Hỗ trợ" },
      "google-integration": {
        label: "Google Setup",
        icon: "🔗",
        group: "Hỗ trợ",
      },
      profile: { label: "Profile", icon: "👤", group: "Tài khoản" },
    };

    pathSegments.forEach((segment, index) => {
      const pageInfo = pageGroups[segment];
      if (pageInfo) {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");

        // Add group breadcrumb if it's the first in group
        if (pageInfo.group && index === 0) {
          const groupIcon =
            pageInfo.group === "Công cụ"
              ? "🛠️"
              : pageInfo.group === "Quản lý"
              ? "📊"
              : pageInfo.group === "Hỗ trợ"
              ? "🆘"
              : "📁";
          breadcrumbItems.push({
            label: pageInfo.group,
            href: href,
            icon: groupIcon,
          });
        }

        breadcrumbItems.push({
          label: pageInfo.label,
          href: href,
          icon: pageInfo.icon,
        });
      }
    });

    return breadcrumbItems;
  };

  const breadcrumbItems = items || generateBreadcrumb();

  const handleBackClick = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className={`flex items-center space-x-4 mb-6 ${className}`}>
      {/* Back Button */}
      {showBackButton && (
        <button
          onClick={handleBackClick}
          className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Quay lại</span>
        </button>
      )}

      {/* Breadcrumb */}
      <nav className="text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <li key={`${index}-${item.href}`} className="flex items-center">
                <a
                  href={item.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-600 transition-colors"
                >
                  {item.icon} {item.label}
                </a>
                {!isLast && (
                  <ChevronRight className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-600" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
