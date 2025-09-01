import {
  Script,
  ScriptScene,
  SceneTimestamp,
  VLU_SCRIPT_SHEET,
  GOOGLE_OAUTH_CONFIG,
} from "../types/script.types";

// Google Auth Service - REAL IMPLEMENTATION ONLY
class GoogleAuthService {
  private accessToken: string | null = null;
  private userInfo: any = null;
  private readonly SHEET_ID = VLU_SCRIPT_SHEET.sheet_id;
  private readonly GID = 707725074; // Fixed GID for real sheet

  constructor() {
    // Load saved login info from localStorage on startup
    this.loadSavedLoginInfo();
  }

  // Load saved login information from localStorage
  private loadSavedLoginInfo(): void {
    try {
      const tokenData = localStorage.getItem("google_access_token");
      if (tokenData) {
        const parsed = JSON.parse(tokenData);
        if (parsed.access_token && parsed.expiry > Date.now()) {
          this.accessToken = parsed.access_token;
          console.log("✅ Loaded valid Google access token");
        } else {
          console.log("❌ Google access token expired");
          this.clearSavedLoginInfo();
        }
      }

      const savedUserInfo = localStorage.getItem("google_user");
      if (savedUserInfo) {
        this.userInfo = JSON.parse(savedUserInfo);
      }
    } catch (error) {
      console.error("❌ Error loading saved login info:", error);
      this.clearSavedLoginInfo();
    }
  }

  // Clear saved login information from localStorage
  private clearSavedLoginInfo(): void {
    try {
      localStorage.removeItem("google_access_token");
      localStorage.removeItem("google_user");
      this.accessToken = null;
      this.userInfo = null;
    } catch (error) {
      console.error("❌ Error clearing saved login info:", error);
    }
  }

  // Check if user is signed in
  isSignedIn(): boolean {
    return !!this.accessToken;
  }

  // Get current user info
  getCurrentUser(): any {
    return this.userInfo;
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      this.clearSavedLoginInfo();
      console.log("✅ Signed out from Google");
    } catch (error) {
      console.error("❌ Error signing out:", error);
      throw error;
    }
  }

  // Test sheet connection using CSV method (no auth required)
  async testSheetConnection(): Promise<boolean> {
    try {
      console.log("🔄 Testing sheet connection via CSV...");
      
      const csvUrl = `https://docs.google.com/spreadsheets/d/${this.SHEET_ID}/export?format=csv&gid=${this.GID}`;
      const response = await fetch(csvUrl, { redirect: 'follow' });
      
      if (response.ok) {
        const text = await response.text();
        if (!text.includes('<HTML>') && !text.includes('<html>') && text.trim().length > 0) {
          console.log("✅ Sheet connection test successful");
          return true;
        }
      }
      
      console.log("❌ Sheet connection test failed");
      return false;
    } catch (error) {
      console.error("❌ Error testing sheet connection:", error);
      return false;
    }
  }

  // Get sheet data using CSV export (read-only, no auth required)
  async getSheetData(sheetName?: string): Promise<string[][]> {
    try {
      console.log("🔄 Loading sheet data via CSV export...");
      
      const csvUrl = `https://docs.google.com/spreadsheets/d/${this.SHEET_ID}/export?format=csv&gid=${this.GID}`;
      const response = await fetch(csvUrl, { redirect: 'follow' });
      
      if (!response.ok) {
        throw new Error(`CSV fetch failed: ${response.status}`);
      }
      
      const csvText = await response.text();
      
      if (csvText.includes('<HTML>') || csvText.includes('<html>')) {
        throw new Error("Sheet is not publicly accessible");
      }
      
      // Parse CSV to array
      const rows = csvText
        .split('\n')
        .filter(row => row.trim() !== '')
        .map(row => {
          // Better CSV parsing
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

      console.log("✅ Sheet data loaded:", rows.length, "rows");
      return rows;
    } catch (error) {
      console.error("❌ Error loading sheet data:", error);
      return [];
    }
  }

  // Convert CSV data to scripts
  private parseRowsToScripts(rows: string[][]): Script[] {
    if (rows.length <= 1) return [];

    const headers = rows[0];
    const scripts: Script[] = [];
    const scriptMap = new Map<string, ScriptScene[]>();

    // Process each data row
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i];
      if (cells.length < 4) continue;

      // Parse timestamp from column 8 (Giờ:phút:giây.mili)
      const timestampStr = cells[8] || '';
      const timestamp = this.parseTimestamp(timestampStr);
      
      if (!timestamp) continue;

      const scene: ScriptScene = {
        id: i.toString(),
        timestamp: timestamp,
        timestampString: timestampStr,
        content: cells[3] || '', // Lời thoại
        description: cells[2] || '', // Phân cảnh
        speaker: 'VLU',
        action: cells[6] || '', // VEO3 Prompt
        notes: cells[5] || '', // Ghi chú
        sceneNumber: i
      };

      const scriptKey = cells[2] || 'Default Script'; // Group by Phân cảnh
      if (!scriptMap.has(scriptKey)) {
        scriptMap.set(scriptKey, []);
      }
      scriptMap.get(scriptKey)!.push(scene);
    }

    // Create scripts from grouped scenes
    let scriptId = 1;
    scriptMap.forEach((scenes, title) => {
      if (scenes.length > 0) {
        const script: Script = {
          id: scriptId.toString(),
          title: title,
          description: `Script từ Google Sheets - ${title}`,
          totalDuration: this.calculateTotalDuration(scenes),
          scenes: scenes.sort((a, b) => a.sceneNumber - b.sceneNumber),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'completed',
          tags: [title, 'VLU']
        };
        scripts.push(script);
        scriptId++;
      }
    });

    console.log("🎬 Generated", scripts.length, "scripts from sheet data");
    return scripts;
  }

  // Parse timestamp string to SceneTimestamp object
  private parseTimestamp(timestampStr: string): SceneTimestamp | null {
    if (!timestampStr || timestampStr.trim() === '') return null;

    const str = timestampStr.toString().trim();
    
    // Support format: HH:MM:SS.mmm (14:43:23.086)
    const match = str.match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,3})$/);
    if (match) {
      return {
        hours: parseInt(match[1]) || 0,
        minutes: parseInt(match[2]) || 0,
        seconds: parseInt(match[3]) || 0,
        milliseconds: parseInt(match[4]) || 0
      };
    }

    return null;
  }

  // Calculate total duration for a script
  private calculateTotalDuration(scenes: ScriptScene[]): string {
    if (scenes.length === 0) return "0:00";
    
    const lastScene = scenes[scenes.length - 1];
    const timestamp = lastScene.timestamp;
    const totalSeconds = timestamp.hours * 3600 + timestamp.minutes * 60 + timestamp.seconds;
    
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Load all VLU scripts from the sheet
  async loadVLUScripts(): Promise<Script[]> {
    try {
      console.log("🔄 Loading VLU scripts from Google Sheets...");
      
      const rows = await this.getSheetData();
      if (rows.length <= 1) {
        console.warn("⚠️ No script data found in sheet");
        return [];
      }

      const scripts = this.parseRowsToScripts(rows);
      console.log("✅ Loaded", scripts.length, "VLU scripts");
      return scripts;
    } catch (error) {
      console.error("❌ Error loading VLU scripts:", error);
      return [];
    }
  }

  // Get all sheets (simplified - only return main sheet info)
  async getAllSheets(): Promise<Array<{ id: number; title: string }>> {
    // Since we're using CSV method, we can only access one sheet
    // Return the main sheet info
    return [
      { id: this.GID, title: "VLU Kịch Bản" }
    ];
  }

  // Load scripts from all sheets (simplified for CSV method)
  async loadAllScriptsFromAllSheets(): Promise<Script[]> {
    return this.loadVLUScripts();
  }

  // Load scripts from specific sheet (fallback to main sheet for CSV)
  async loadScriptsFromSheet(sheetName: string): Promise<Script[]> {
    console.log("🔄 Loading scripts from sheet:", sheetName);
    return this.loadVLUScripts();
  }

  // Update script (not supported in CSV mode)
  async updateScript(script: Script): Promise<boolean> {
    console.warn("⚠️ Update not supported with CSV method. Please edit Google Sheets directly.");
    return false;
  }

  // Export to CSV (just return current data)
  exportToCSV(): string {
    console.warn("⚠️ Export not implemented - data is already from CSV source");
    return "";
  }
}

// VLU Script Service instance
class VLUScriptService {
  private authService: GoogleAuthService;

  constructor() {
    this.authService = new GoogleAuthService();
  }

  getAuthService(): GoogleAuthService {
    return this.authService;
  }

  async loadVLUScripts(): Promise<Script[]> {
    return this.authService.loadVLUScripts();
  }

  async loadAllScriptsFromAllSheets(): Promise<Script[]> {
    return this.authService.loadAllScriptsFromAllSheets();
  }

  async loadScriptsFromSheet(sheetName: string): Promise<Script[]> {
    return this.authService.loadScriptsFromSheet(sheetName);
  }

  async updateScript(script: Script): Promise<boolean> {
    return this.authService.updateScript(script);
  }

  exportToCSV(): string {
    return this.authService.exportToCSV();
  }
}

export const vluScriptService = new VLUScriptService();
export default GoogleAuthService;