export interface Script {
  id: string;
  title: string;
  description?: string;
  totalDuration: string;
  scenes: ScriptScene[];
  createdAt: string;
  updatedAt: string;
  status: string;
  tags: string[];
}

export interface ScriptScene {
  id: string;
  timestamp: SceneTimestamp;
  timestampString: string;
  content: string;
  description?: string;
  speaker?: string;
  action?: string;
  notes?: string;
  sceneNumber: number;
}

export interface SceneTimestamp {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface GoogleOAuthConfig {
  client_id: string;
  scope: string;
}

// Google OAuth Configuration - for demo only
export const GOOGLE_OAUTH_CONFIG: GoogleOAuthConfig = {
  client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || "demo-client-id",
  scope:
    "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.readonly",
};

export const VLU_SCRIPT_SHEET = {
  sheet_id:
    process.env.REACT_APP_VLU_SCRIPT_SHEET_ID ||
    "1Q43gGNkseRl5dZDnenhNVvJCf7cappiKykCraqL-B-A",
  name: "VLU-KỊCH BẢN",
  range: "A:Z",
};

// Debug: Log configuration at startup - Đã sửa từ localhost:3002 thành localhost:3000
console.log(
  "🔍 DEBUG - Backend URL:",
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3000"
);
console.log("🔍 DEBUG - Environment:", process.env.NODE_ENV);
console.log("🔍 DEBUG - Sheet ID:", VLU_SCRIPT_SHEET.sheet_id);
console.log("✅ Using Backend API for Google Sheets integration");
