// API Configuration
const isDevelopment = process.env.NODE_ENV === "development";

// Base URLs
export const API_BASE_URL = isDevelopment
  ? "http://localhost:3001" // Local development proxy
  : "https://n8n-cosari.tino.page";

// API Endpoints
export const API_ENDPOINTS = {
  CREATE_SCRIPT: "/webhook-test/VLU-KICHBAN",
  GOOGLE_SHEETS: "/api/sheets",
  ANALYTICS: "/api/analytics",
};

// Full URLs
export const getApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Webhook URL for script creation
export const SCRIPT_WEBHOOK_URL = isDevelopment
  ? "http://localhost:3001/webhook-test/VLU-KICHBAN" // Use proxy in development
  : "https://n8n-cosari.tino.page/webhook-test/VLU-KICHBAN";

// CORS Headers
export const getCorsHeaders = () => ({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});

// Development proxy setup
export const setupDevelopmentProxy = () => {
  if (isDevelopment) {
    console.log("🔧 Development mode: Using local proxy for API calls");
    console.log("📝 To avoid CORS issues, run: npm run proxy");
  }
};
