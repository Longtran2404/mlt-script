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

// Google Sheets API service with real data integration
class GoogleSheetsService {
  private readonly SHEET_ID = process.env.REACT_APP_VLU_SCRIPT_SHEET_ID || 
    "1Q43gGNkseRl5dZDnenhNVvJCf7cappiKykCraqL-B-A";
  private readonly GID = 707725074; // Correct GID for the sheet

  // Get real data from Google Sheets CSV export
  async getData<T>(sheetId: string = this.SHEET_ID, range: string): Promise<T[]> {
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

  // Update data in Google Sheets (read-only for CSV method)
  async updateData(
    sheetId: string,
    range: string,
    values: any[][]
  ): Promise<boolean> {
    console.warn("⚠️ Update not supported with CSV method. Use Google Sheets directly to edit data.");
    return false;
  }

  // Append data to Google Sheets (read-only for CSV method)
  async appendData(
    sheetId: string,
    range: string,
    values: any[][]
  ): Promise<boolean> {
    console.warn("⚠️ Append not supported with CSV method. Use Google Sheets directly to add data.");
    return false;
  }

  // Add a new script to the sheet (CSV method doesn't support write operations)
  async addScript(newScript: Omit<ScriptData, "id">): Promise<boolean> {
    console.warn("⚠️ Add script not supported with CSV method. Please add data directly in Google Sheets.");
    return false;
  }
}

export const googleSheetsService = new GoogleSheetsService();