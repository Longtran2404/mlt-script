import { SHEET_IDS, SHEET_RANGES } from "../types/sheets.types";

// Type definitions
export interface UserData {
  id: string;
  name: string;
  email: string;
  plan: "starter" | "professional" | "enterprise";
  status: "active" | "inactive";
  createdAt: string;
  lastLogin?: string;
  videosCreated: number;
  scriptsCreated: number;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  type: "video" | "script" | "both";
  status: "draft" | "in_progress" | "completed" | "archived";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  progress: number;
  dueDate?: string;
  tags: string[];
}

export interface AnalyticsData {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  videosCreated: number;
  scriptsCreated: number;
  newUsers: number;
  activeUsers: number;
  revenue: number;
}

export interface ScriptData {
  id: string;
  title: string;
  content: string;
  type: "educational" | "marketing" | "entertainment" | "corporate";
  tone: "professional" | "casual" | "humorous" | "dramatic";
  language: string;
  duration: number;
  status: "draft" | "completed" | "published";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  wordCount: number;
  tags: string[];
}

export interface VideoData {
  id: string;
  title: string;
  scriptId: string;
  duration: number;
  resolution: "720p" | "1080p" | "4K";
  format: "mp4" | "avi" | "mov";
  status: "processing" | "completed" | "failed";
  createdBy: string;
  createdAt: string;
  fileSize: number;
  views: number;
}

// Google Sheets API service with real API integration
class GoogleSheetsService {
  private readonly SHEET_ID = process.env.REACT_APP_VLU_SCRIPT_SHEET_ID || 
    "1Q43gGNkseRl5dZDnenhNVvJCf7cappiKykCraqL-B-A";
  private readonly GID = 707725074; // Correct GID for the sheet
  private readonly API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  private accessToken: string | null = null;

  // Get access token from localStorage
  private loadAccessToken(): void {
    try {
      const tokenData = localStorage.getItem("google_access_token");
      if (tokenData) {
        const parsed = JSON.parse(tokenData);
        if (parsed.access_token && parsed.expiry > Date.now()) {
          this.accessToken = parsed.access_token;
          console.log("✅ Google API access token loaded");
        } else {
          console.log("❌ Access token expired");
          localStorage.removeItem("google_access_token");
          this.accessToken = null;
        }
      }
    } catch (error) {
      console.error("❌ Error loading access token:", error);
      this.accessToken = null;
    }
  }

  // Get data using Google Sheets API v4
  async getDataViaAPI<T>(sheetId: string, range: string = "A:Z"): Promise<T[]> {
    try {
      this.loadAccessToken();
      
      if (!this.accessToken) {
        console.log("⚠️ No access token - falling back to CSV");
        return this.getDataViaCSV<T>(sheetId, range);
      }

      console.log("🔄 Getting data via Google Sheets API:", sheetId, range);
      
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.log("❌ API request failed:", response.status, "- falling back to CSV");
        return this.getDataViaCSV<T>(sheetId, range);
      }

      const data = await response.json();
      const values = data.values || [];
      
      if (values.length <= 1) {
        console.warn("⚠️ No data rows found in API response");
        return [];
      }

      const headers = values[0];
      const parsedData: T[] = [];
      
      // Convert rows to objects
      for (let i = 1; i < values.length; i++) {
        const cells = values[i] || [];
        const item = this.convertRowToObject<T>(headers, cells, range, i);
        if (item) {
          parsedData.push(item);
        }
      }
      
      console.log("✅ API data loaded:", parsedData.length, "items from", range);
      return parsedData;
      
    } catch (error) {
      console.error("❌ Error fetching data via API:", error);
      console.log("🔄 Falling back to CSV method");
      return this.getDataViaCSV<T>(sheetId, range);
    }
  }

  // Fallback: Get data from Google Sheets CSV export
  async getDataViaCSV<T>(sheetId: string = this.SHEET_ID, range: string): Promise<T[]> {
    try {
      console.log("🔄 Getting real data from Google Sheets:", sheetId, range);
      
      // Use CSV export method - more reliable than API
      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${this.GID}`;
      console.log("🌐 CSV URL:", csvUrl);
      
      const response = await fetch(csvUrl, {
        method: 'GET',
        redirect: 'follow'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.status} - ${response.statusText}`);
      }
      
      const csvText = await response.text();
      
      if (csvText.includes('<HTML>') || csvText.includes('<html>') || csvText.includes('Không thể mở')) {
        throw new Error("Sheet is not publicly accessible");
      }
      
      // Parse CSV to array
      const rows = csvText
        .split('\n')
        .filter(row => row.trim() !== '')
        .map(row => {
          // Better CSV parsing - handle quotes and commas inside fields
          const result = [];
          let current = '';
          let inQuotes = false;
          
          for (let i = 0; i < row.length; i++) {
            const char = row[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              result.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          result.push(current.trim());
          
          return result;
        });

      console.log("📊 CSV rows parsed:", rows.length);
      
      if (rows.length <= 1) {
        console.warn("⚠️ No data rows found in CSV");
        return [];
      }

      const headers = rows[0];
      const parsedData: T[] = [];
      
      // Convert rows to objects based on range type
      for (let i = 1; i < rows.length; i++) {
        const cells = rows[i];
        const item = this.convertRowToObject<T>(headers, cells, range, i);
        if (item) {
          parsedData.push(item);
        }
      }
      
      console.log("✅ Real data loaded:", parsedData.length, "items from", range);
      return parsedData;
    } catch (error) {
      console.error("❌ Error fetching real data from Google Sheets:", error);
      return [];
    }
  }

  // Convert CSV row to typed object based on range
  private convertRowToObject<T>(headers: string[], cells: string[], range: string, index: number): T | null {
    try {
      // For script data from VLU sheet
      if (range === SHEET_RANGES.SCRIPTS || range === 'scripts') {
        const scriptData = {
          id: index.toString(),
          title: cells[2] || `Script ${index}`, // Phân cảnh
          content: cells[3] || '', // Lời thoại
          type: "educational" as const,
          tone: "professional" as const,
          language: "vi",
          duration: this.parseDuration(cells[1] || ''), // Thời lượng ước tính
          status: "completed" as const,
          createdBy: "system",
          createdAt: cells[7] || new Date().toISOString().split('T')[0], // Ngày
          updatedAt: new Date().toISOString(),
          wordCount: (cells[3] || '').length,
          tags: cells[2] ? [cells[2]] : [] // Use Phân cảnh as tag
        } as ScriptData;
        
        return scriptData as T;
      }

      // For other data types, create generic object
      const genericData = {
        id: index.toString(),
        data: cells,
        headers: headers
      };
      
      return genericData as T;
    } catch (error) {
      console.error("❌ Error converting row to object:", error);
      return null;
    }
  }

  // Parse duration from various formats (5s, 2:30, etc.)
  private parseDuration(durationStr: string): number {
    if (!durationStr) return 0;
    
    const str = durationStr.toString().toLowerCase().trim();
    
    // Handle seconds format (5s, 30s)
    if (str.endsWith('s')) {
      const seconds = parseInt(str.replace('s', ''));
      return isNaN(seconds) ? 0 : seconds;
    }
    
    // Handle MM:SS format
    if (str.includes(':')) {
      const parts = str.split(':');
      if (parts.length === 2) {
        const minutes = parseInt(parts[0]) || 0;
        const seconds = parseInt(parts[1]) || 0;
        return (minutes * 60) + seconds;
      }
    }
    
    // Try to parse as plain number
    const num = parseInt(str);
    return isNaN(num) ? 0 : num;
  }

  // Update data in Google Sheets (tries API first)
  async updateData(
    sheetId: string,
    range: string,
    values: any[][]
  ): Promise<boolean> {
    this.loadAccessToken();
    
    if (this.accessToken) {
      return this.updateDataViaAPI(sheetId, range, values);
    } else {
      console.warn("⚠️ Update requires Google OAuth. Please connect your Google account first.");
      return false;
    }
  }

  // Append data to Google Sheets (tries API first)
  async appendData(
    sheetId: string,
    range: string,
    values: any[][]
  ): Promise<boolean> {
    try {
      this.loadAccessToken();
      
      if (!this.accessToken) {
        console.warn("⚠️ Append requires Google OAuth. Please connect your Google account first.");
        return false;
      }

      console.log("🔄 Appending via API:", sheetId, range);
      
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: values
        })
      });

      if (response.ok) {
        console.log("✅ Data appended via API");
        return true;
      } else {
        console.error("❌ API append failed:", response.status);
        return false;
      }
    } catch (error) {
      console.error("❌ Error appending via API:", error);
      return false;
    }
  }

  // Add a new script to the sheet (uses API if available)
  async addScript(newScript: Omit<ScriptData, "id">): Promise<boolean> {
    this.loadAccessToken();
    
    if (this.accessToken) {
      const values = [
        [
          Date.now().toString(), // Generate ID
          newScript.title,
          newScript.content,
          newScript.type,
          newScript.tone,
          newScript.language,
          newScript.duration.toString(),
          newScript.status,
          newScript.createdBy,
          newScript.createdAt,
          newScript.updatedAt,
          newScript.wordCount.toString(),
          newScript.tags.join(","),
        ],
      ];
      
      return this.appendData(this.SHEET_ID, "A:M", values);
    } else {
      console.warn("⚠️ Add script requires Google OAuth. Please connect your Google account first.");
      return false;
    }
  }

  // Main getData method - tries API first, falls back to CSV
  async getData<T>(sheetId: string = this.SHEET_ID, range: string): Promise<T[]> {
    console.log("🔄 getData called with:", sheetId, range);
    
    // Try API first (if we have access token)
    this.loadAccessToken();
    if (this.accessToken) {
      console.log("🔑 Access token available - trying API");
      return this.getDataViaAPI<T>(sheetId, range);
    } else {
      console.log("📄 No access token - using CSV method");
      return this.getDataViaCSV<T>(sheetId, range);
    }
  }

  // API method to update data (requires OAuth token)
  async updateDataViaAPI(sheetId: string, range: string, values: any[][]): Promise<boolean> {
    try {
      this.loadAccessToken();
      
      if (!this.accessToken) {
        console.warn("⚠️ No access token for update operation");
        return false;
      }

      console.log("🔄 Updating via API:", sheetId, range);
      
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?valueInputOption=RAW`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: values
        })
      });

      if (response.ok) {
        console.log("✅ Data updated via API");
        return true;
      } else {
        console.error("❌ API update failed:", response.status);
        return false;
      }
    } catch (error) {
      console.error("❌ Error updating via API:", error);
      return false;
    }
  }

  // Convenience methods for different data types
  async getUsers(): Promise<UserData[]> {
    return this.getData<UserData>(this.SHEET_ID, 'users');
  }

  async getProjects(): Promise<ProjectData[]> {
    return this.getData<ProjectData>(this.SHEET_ID, 'projects');
  }

  async getAnalytics(): Promise<AnalyticsData[]> {
    return this.getData<AnalyticsData>(this.SHEET_ID, 'analytics');
  }

  async getScripts(): Promise<ScriptData[]> {
    return this.getData<ScriptData>(this.SHEET_ID, 'scripts');
  }

  async getVideos(): Promise<VideoData[]> {
    return this.getData<VideoData>(this.SHEET_ID, 'videos');
  }
}

export const googleSheetsService = new GoogleSheetsService();