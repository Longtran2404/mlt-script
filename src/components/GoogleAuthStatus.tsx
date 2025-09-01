import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertCircle,
  Database,
  Shield,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";
import { vluScriptService } from "../services/googleAuth";

interface GoogleAuthStatusProps {
  className?: string;
  showDetails?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface AuthStatus {
  isAuthenticated: boolean;
  user: any;
  accessToken: string | null;
  sheetConnection: boolean;
  lastChecked: Date | null;
  error: string | null;
}

export default function GoogleAuthStatus({
  className = "",
  showDetails = true,
  autoRefresh = false,
  refreshInterval = 30000, // 30 seconds
}: GoogleAuthStatusProps) {
  const [status, setStatus] = useState<AuthStatus>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    sheetConnection: false,
    lastChecked: null,
    error: null,
  });
  const [loading, setLoading] = useState(false);

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      console.log("🔍 Checking Google Auth status...");

      // Check authentication
      const authService = vluScriptService.getAuthService();
      const isAuthenticated = authService.isSignedIn();
      const user = authService.getCurrentUser();
      const accessToken = localStorage.getItem("google_access_token");

      let sheetConnection = false;
      let error = null;

      if (isAuthenticated && accessToken) {
        try {
          // Test sheet connection
          sheetConnection = await authService.testSheetConnection();
          console.log("✅ Sheet connection test:", sheetConnection);
        } catch (err) {
          console.error("❌ Sheet connection test failed:", err);
          error = err instanceof Error ? err.message : "Unknown error";
          sheetConnection = false;
        }
      }

      setStatus({
        isAuthenticated,
        user,
        accessToken,
        sheetConnection,
        lastChecked: new Date(),
        error,
      });
    } catch (err) {
      console.error("❌ Error checking auth status:", err);
      setStatus((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Unknown error",
        lastChecked: new Date(),
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial check
    checkAuthStatus();

    // Auto refresh if enabled
    if (autoRefresh) {
      const interval = setInterval(checkAuthStatus, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const getStatusIcon = (condition: boolean) => {
    return condition ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  const getStatusText = (
    condition: boolean,
    trueText: string,
    falseText: string
  ) => {
    return condition ? trueText : falseText;
  };

  const formatToken = (token: string | null) => {
    if (!token) return "Không có";
    if (token.length > 20) {
      return `${token.substring(0, 8)}...${token.substring(token.length - 8)}`;
    }
    return token;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Google OAuth Status
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {loading && (
            <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
          )}
          <Button
            onClick={checkAuthStatus}
            disabled={loading}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            Kiểm tra lại
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="p-4 space-y-4">
        {/* Authentication Status */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-blue-500" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Google Authentication
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {status.user ? status.user.email : "Chưa đăng nhập"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(status.isAuthenticated)}
            <Badge
              variant={status.isAuthenticated ? "default" : "destructive"}
              className="text-xs"
            >
              {getStatusText(
                status.isAuthenticated,
                "Đã đăng nhập",
                "Chưa đăng nhập"
              )}
            </Badge>
          </div>
        </div>

        {/* Sheet Connection Status */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-green-500" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Google Sheets Connection
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                VLU-KỊCH BẢN Sheet
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(status.sheetConnection)}
            <Badge
              variant={status.sheetConnection ? "default" : "destructive"}
              className="text-xs"
            >
              {getStatusText(
                status.sheetConnection,
                "Kết nối thành công",
                "Kết nối thất bại"
              )}
            </Badge>
          </div>
        </div>

        {/* Error Display */}
        {status.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{status.error}</AlertDescription>
          </Alert>
        )}

        {/* Details */}
        {showDetails && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Chi tiết kỹ thuật
              </summary>
              <div className="mt-2 space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <strong>Access Token:</strong>{" "}
                    {formatToken(status.accessToken)}
                  </div>
                  <div>
                    <strong>User ID:</strong> {status.user?.id || "N/A"}
                  </div>
                  <div>
                    <strong>User Name:</strong> {status.user?.name || "N/A"}
                  </div>
                  <div>
                    <strong>User Email:</strong> {status.user?.email || "N/A"}
                  </div>
                </div>
                {status.lastChecked && (
                  <div>
                    <strong>Kiểm tra lần cuối:</strong>{" "}
                    {status.lastChecked.toLocaleString("vi-VN")}
                  </div>
                )}
              </div>
            </details>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          {!status.isAuthenticated ? (
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                // Trigger Google OAuth flow
                const event = new CustomEvent("google-oauth-connect");
                window.dispatchEvent(event);
              }}
            >
              Kết nối Google
            </Button>
          ) : (
            <Button
              variant="outline"
              className="flex-1 text-red-600 hover:text-red-700"
              onClick={() => {
                vluScriptService.getAuthService().signOut();
                checkAuthStatus();
              }}
            >
              Ngắt kết nối
            </Button>
          )}

          {status.isAuthenticated && !status.sheetConnection && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                // Test sheet connection
                checkAuthStatus();
              }}
            >
              Test Connection
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
