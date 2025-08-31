
import React from "react";
import Breadcrumb from "./Breadcrumb";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showBreadcrumb?: boolean;
  breadcrumbItems?: Array<{ label: string; href: string; icon?: string }>;
  headerActions?: React.ReactNode;
  className?: string;
}

export default function PageLayout({
  children,
  title,
  description,
  showBreadcrumb = true,
  breadcrumbItems,
  headerActions,
  className = "",
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen ${className}`}>
      {/* Breadcrumb Navigation */}
      {showBreadcrumb && <Breadcrumb items={breadcrumbItems} />}

      {/* Page Header */}
      {(title || description || headerActions) && (
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {title && (
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                  {description}
                </p>
              )}
            </div>
            {headerActions && (
              <div className="ml-6 flex-shrink-0">{headerActions}</div>
            )}
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="relative">{children}</div>
    </div>
  );
}
