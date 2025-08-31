
import React from "react";

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-red-600/30 bg-red-50 px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
      {children}
    </div>
  );
}
