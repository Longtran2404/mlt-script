/**
 * URL Connection Checker Utility
 * Kiểm tra kết nối với cả localhost và production URLs
 */

export interface ConnectionStatus {
  url: string;
  status: "success" | "error" | "timeout";
  responseTime?: number;
  error?: string;
  timestamp: Date;
}

export interface EnvironmentConfig {
  development: {
    apiUrl: string;
    redirectUri: string;
  };
  production: {
    apiUrl: string;
    redirectUri: string;
  };
}

// Cấu hình URLs cho các môi trường - Đã sửa từ localhost:3002 thành localhost:3000
export const ENV_CONFIG: EnvironmentConfig = {
  development: {
    apiUrl: "http://localhost:3000",
    redirectUri: "http://localhost:3000/oauth2/callback",
  },
  production: {
    apiUrl: "https://mlt-script.vercel.app",
    redirectUri: "https://mlt-script.vercel.app/oauth2/callback",
  },
};

/**
 * Kiểm tra kết nối với một URL cụ thể
 */
export async function checkUrlConnection(
  url: string,
  timeout: number = 5000
): Promise<ConnectionStatus> {
  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      method: "HEAD", // Chỉ kiểm tra headers, không tải content
      signal: controller.signal,
      mode: "cors",
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    if (response.ok) {
      return {
        url,
        status: "success",
        responseTime,
        timestamp: new Date(),
      };
    } else {
      return {
        url,
        status: "error",
        responseTime,
        error: `HTTP ${response.status}: ${response.statusText}`,
        timestamp: new Date(),
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return {
          url,
          status: "timeout",
          responseTime,
          error: `Request timeout after ${timeout}ms`,
          timestamp: new Date(),
        };
      }

      return {
        url,
        status: "error",
        responseTime,
        error: error.message,
        timestamp: new Date(),
      };
    }

    return {
      url,
      status: "error",
      responseTime,
      error: "Unknown error occurred",
      timestamp: new Date(),
    };
  }
}

/**
 * Kiểm tra kết nối với tất cả URLs được cấu hình
 */
export async function checkAllConnections(): Promise<{
  development: ConnectionStatus;
  production: ConnectionStatus;
  summary: {
    total: number;
    successful: number;
    failed: number;
    averageResponseTime: number;
  };
}> {
  const [devStatus, prodStatus] = await Promise.all([
    checkUrlConnection(ENV_CONFIG.development.apiUrl),
    checkUrlConnection(ENV_CONFIG.production.apiUrl),
  ]);

  const successful = [devStatus, prodStatus].filter(
    (s) => s.status === "success"
  ).length;
  const responseTimes = [devStatus, prodStatus]
    .filter((s) => s.responseTime !== undefined)
    .map((s) => s.responseTime!);

  return {
    development: devStatus,
    production: prodStatus,
    summary: {
      total: 2,
      successful,
      failed: 2 - successful,
      averageResponseTime:
        responseTimes.length > 0
          ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
          : 0,
    },
  };
}

/**
 * Lấy URL hiện tại dựa trên environment
 */
export function getCurrentApiUrl(): string {
  const isDevelopment =
    process.env.NODE_ENV === "development" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  return isDevelopment
    ? ENV_CONFIG.development.apiUrl
    : ENV_CONFIG.production.apiUrl;
}

/**
 * Lấy redirect URI hiện tại dựa trên environment
 */
export function getCurrentRedirectUri(): string {
  const isDevelopment =
    process.env.NODE_ENV === "development" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  return isDevelopment
    ? ENV_CONFIG.development.redirectUri
    : ENV_CONFIG.production.redirectUri;
}

/**
 * Kiểm tra xem có đang chạy trên localhost không
 */
export function isLocalhost(): boolean {
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    process.env.NODE_ENV === "development"
  );
}

/**
 * Kiểm tra xem có đang chạy trên production không
 */
export function isProduction(): boolean {
  return (
    window.location.hostname === "mlt-script.vercel.app" ||
    process.env.NODE_ENV === "production"
  );
}

/**
 * Log thông tin kết nối
 */
export function logConnectionInfo(): void {
  const currentUrl = getCurrentApiUrl();
  const currentRedirectUri = getCurrentRedirectUri();
  const isLocal = isLocalhost();
  const isProd = isProduction();

  console.log("🔗 URL Connection Info:", {
    currentApiUrl: currentUrl,
    currentRedirectUri,
    isLocalhost: isLocal,
    isProduction: isProd,
    nodeEnv: process.env.NODE_ENV,
    hostname: window.location.hostname,
    origin: window.location.origin,
  });
}

/**
 * Test function để kiểm tra kết nối
 */
export async function testConnections(): Promise<void> {
  console.log("🧪 Testing URL connections...");

  try {
    const results = await checkAllConnections();

    console.log("📊 Connection Test Results:", {
      development: {
        url: results.development.url,
        status: results.development.status,
        responseTime: results.development.responseTime,
        error: results.development.error,
      },
      production: {
        url: results.production.url,
        status: results.production.status,
        responseTime: results.production.responseTime,
        error: results.production.error,
      },
      summary: results.summary,
    });

    // Log kết quả chi tiết
    if (results.development.status === "success") {
      console.log("✅ Localhost connection successful");
    } else {
      console.log("❌ Localhost connection failed:", results.development.error);
    }

    if (results.production.status === "success") {
      console.log("✅ Production connection successful");
    } else {
      console.log("❌ Production connection failed:", results.production.error);
    }
  } catch (error) {
    console.error("❌ Connection test failed:", error);
  }
}
