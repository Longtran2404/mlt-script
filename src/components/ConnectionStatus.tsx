import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { 
  checkAllConnections, 
  ConnectionStatus as ConnectionStatusType,
  logConnectionInfo,
  getCurrentApiUrl,
  isLocalhost,
  isProduction 
} from '../utils/urlChecker';

interface ConnectionStatusProps {
  className?: string;
  showDetails?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export default function ConnectionStatus({ 
  className = "",
  showDetails = true,
  autoRefresh = false,
  refreshInterval = 30000 // 30 seconds
}: ConnectionStatusProps) {
  const [connections, setConnections] = useState<{
    development: ConnectionStatusType;
    production: ConnectionStatusType;
    summary: {
      total: number;
      successful: number;
      failed: number;
      averageResponseTime: number;
    };
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkConnections = async () => {
    setLoading(true);
    try {
      const results = await checkAllConnections();
      setConnections(results);
      setLastChecked(new Date());
    } catch (error) {
      console.error('Failed to check connections:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Log connection info on mount
    logConnectionInfo();
    
    // Initial check
    checkConnections();

    // Auto refresh if enabled
    if (autoRefresh) {
      const interval = setInterval(checkConnections, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'timeout':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'error':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'timeout':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return 'Kết nối thành công';
      case 'error':
        return 'Lỗi kết nối';
      case 'timeout':
        return 'Hết thời gian chờ';
      default:
        return 'Không xác định';
    }
  };

  if (!connections) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
          Đang kiểm tra kết nối...
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Wifi className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Trạng Thái Kết Nối
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {loading && (
            <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
          )}
          <button
            onClick={checkConnections}
            disabled={loading}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            Kiểm tra lại
          </button>
        </div>
      </div>

      {/* Current Environment Info */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            Môi trường hiện tại:
          </span>
          <div className="flex items-center gap-2">
            {isLocalhost() && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-xs font-medium">
                Development
              </span>
            )}
            {isProduction() && (
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md text-xs font-medium">
                Production
              </span>
            )}
            <span className="text-gray-900 dark:text-white font-medium">
              {getCurrentApiUrl()}
            </span>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      <div className="p-4 space-y-4">
        {/* Development */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Localhost (Development)
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                http://localhost:3000
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(connections.development.status)}
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(connections.development.status)}`}>
              {getStatusText(connections.development.status)}
            </span>
            {connections.development.responseTime && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {connections.development.responseTime}ms
              </span>
            )}
          </div>
        </div>

        {/* Production */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Production
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                https://mlt-script.vercel.app
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(connections.production.status)}
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(connections.production.status)}`}>
              {getStatusText(connections.production.status)}
            </span>
            {connections.production.responseTime && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {connections.production.responseTime}ms
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {connections.summary.successful}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Thành công
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {connections.summary.failed}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Thất bại
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {Math.round(connections.summary.averageResponseTime)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              ms trung bình
            </div>
          </div>
        </div>

        {/* Details */}
        {showDetails && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Chi tiết kết nối
              </summary>
              <div className="mt-2 space-y-2 text-xs text-gray-600 dark:text-gray-400">
                {connections.development.error && (
                  <div>
                    <strong>Localhost Error:</strong> {connections.development.error}
                  </div>
                )}
                {connections.production.error && (
                  <div>
                    <strong>Production Error:</strong> {connections.production.error}
                  </div>
                )}
                {lastChecked && (
                  <div>
                    <strong>Kiểm tra lần cuối:</strong> {lastChecked.toLocaleString('vi-VN')}
                  </div>
                )}
              </div>
            </details>
          </div>
        )}
      </div>
    </motion.div>
  );
}
