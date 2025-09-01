import { Script, ScriptScene, SceneTimestamp } from "../types/script.types";

// Enhanced Google Sheets service with OAuth2 support
class GoogleSheetsSimpleService {
  private spreadsheetId = process.env.REACT_APP_VLU_SCRIPT_SHEET_ID;
  private accessToken: string | null = null;

  constructor() {
    console.log("🔍 GoogleSheetsSimple - Sheet ID:", this.spreadsheetId);
    this.loadAccessToken();
  }

  private loadAccessToken() {
    try {
      const tokenData = localStorage.getItem("google_access_token");
      if (tokenData) {
        const parsed = JSON.parse(tokenData);
        if (parsed.access_token && parsed.expiry > Date.now()) {
          this.accessToken = parsed.access_token;
          console.log("✅ Loaded valid access token from localStorage");
        } else {
          console.log("❌ Access token expired or invalid");
          localStorage.removeItem("google_access_token");
          this.accessToken = null;
        }
      } else {
        console.log("📋 No access token found in localStorage");
      }
    } catch (error) {
      console.error("❌ Error loading access token:", error);
      this.accessToken = null;
    }
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    if (!this.accessToken) {
      throw new Error(
        "No valid access token. Please authenticate with Google first."
      );
    }

    return {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };
  }

  // Test connection with better error handling
  async testConnection(): Promise<boolean> {
    try {
      if (!this.spreadsheetId) {
        console.error("❌ Missing spreadsheet ID");
        return false;
      }

      console.log("🔄 Testing Google Sheets connection...");
      console.log("📋 Access token available:", !!this.accessToken);

      // If no access token, skip API and go directly to CSV
      if (!this.accessToken) {
        console.log("⚠️ No access token - will use CSV fallback");
        return false;
      }

      const headers = await this.getAuthHeaders();
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}?fields=properties.title`;

      console.log("🌐 Making request to:", url);
      const response = await fetch(url, { headers });

      if (response.ok) {
        const data = await response.json();
        console.log(
          "✅ Connection successful. Spreadsheet:",
          data.properties?.title
        );
        return true;
      } else {
        const errorText = await response.text();
        console.error("❌ Connection failed:", response.status, errorText);

        if (response.status === 403) {
          console.error(
            "🔐 403 Forbidden - Check spreadsheet permissions and authentication"
          );
        } else if (response.status === 401) {
          console.error(
            "🔑 401 Unauthorized - Access token may be invalid or expired"
          );
        }

        return false;
      }
    } catch (error) {
      console.error("❌ Connection test error:", error);
      return false;
    }
  }

  // Get all sheets in spreadsheet
  async getAllSheets(): Promise<Array<{ id: number; title: string }>> {
    try {
      if (!this.spreadsheetId) {
        throw new Error("Missing spreadsheet ID");
      }

      if (!this.accessToken) {
        throw new Error(
          "No access token. Please authenticate with Google first."
        );
      }

      console.log("📋 Getting all sheets...");

      const headers = await this.getAuthHeaders();
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}?fields=sheets.properties`;
      const response = await fetch(url, { headers });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Sheets API Error:", response.status, errorText);

        if (response.status === 403) {
          throw new Error(
            "Access denied. Please check spreadsheet permissions and ensure you're authenticated."
          );
        } else if (response.status === 401) {
          throw new Error(
            "Authentication failed. Please re-authenticate with Google."
          );
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const sheets =
        data.sheets?.map((sheet: any) => ({
          id: sheet.properties.sheetId,
          title: sheet.properties.title,
        })) || [];

      console.log("✅ Found sheets:", sheets);
      return sheets;
    } catch (error) {
      console.error("❌ Error getting sheets:", error);
      throw error;
    }
  }

  // Get data from specific sheet
  async getSheetData(sheetName: string): Promise<any[][]> {
    try {
      if (!this.spreadsheetId) {
        throw new Error("Missing spreadsheet ID");
      }

      if (!this.accessToken) {
        throw new Error(
          "No access token. Please authenticate with Google first."
        );
      }

      console.log("📊 Getting data from sheet:", sheetName);

      const headers = await this.getAuthHeaders();
      const range = `${sheetName}!A:Z`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${
        this.spreadsheetId
      }/values/${encodeURIComponent(range)}`;

      const response = await fetch(url, { headers });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Sheet Data API Error:", response.status, errorText);

        if (response.status === 403) {
          throw new Error(
            "Access denied to sheet data. Please check permissions."
          );
        } else if (response.status === 401) {
          throw new Error(
            "Authentication failed. Please re-authenticate with Google."
          );
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const values = data.values || [];

      console.log("✅ Data retrieved:", values.length, "rows");
      if (values.length > 0) {
        console.log("📋 Headers:", values[0]);
        if (values.length > 1) {
          console.log("📄 Sample row:", values[1]);
        }
      }

      return values;
    } catch (error) {
      console.error("❌ Error getting sheet data:", error);
      throw error;
    }
  }

  // Parse timestamp string to SceneTimestamp object
  private parseTimestamp(timestampStr: string): SceneTimestamp | null {
    try {
      if (!timestampStr || timestampStr.trim() === "") return null;

      const cleanStr = timestampStr.toString().trim();

      // Support multiple timestamp formats
      const patterns = [
        /^(\d{1,2}):(\d{1,2}):(\d{1,2})(?:[,.](\d{1,3}))?$/, // HH:MM:SS.mmm
        /^(\d{1,2}):(\d{1,2})(?:[,.](\d{1,3}))?$/, // MM:SS.mmm
        /^(\d{1,2})(?:[,.](\d{1,3}))?$/, // SS.mmm
      ];

      for (const regex of patterns) {
        const match = cleanStr.match(regex);
        if (match) {
          let hours = 0,
            minutes = 0,
            seconds = 0,
            milliseconds = 0;

          if (match.length === 5) {
            // HH:MM:SS.mmm
            hours = parseInt(match[1], 10);
            minutes = parseInt(match[2], 10);
            seconds = parseInt(match[3], 10);
            milliseconds = parseInt(
              (match[4] || "0").padEnd(3, "0").slice(0, 3),
              10
            );
          } else if (match.length === 4) {
            // MM:SS.mmm
            minutes = parseInt(match[1], 10);
            seconds = parseInt(match[2], 10);
            milliseconds = parseInt(
              (match[3] || "0").padEnd(3, "0").slice(0, 3),
              10
            );
          } else if (match.length === 3) {
            // SS.mmm
            seconds = parseInt(match[1], 10);
            milliseconds = parseInt(
              (match[2] || "0").padEnd(3, "0").slice(0, 3),
              10
            );
          }

          return { hours, minutes, seconds, milliseconds };
        }
      }

      console.warn("❓ Cannot parse timestamp:", timestampStr);
      return null;
    } catch (error) {
      console.error("❌ Error parsing timestamp:", timestampStr, error);
      return null;
    }
  }

  // Group scenes by timestamp
  private groupScenesByTimestamp(rawData: any[][]): Script[] {
    if (rawData.length < 2) return [];

    const headers = rawData[0];
    console.log("📋 Processing headers:", headers);

    // Find timestamp column - look for various timestamp-related headers
    const timestampColumnIndex = headers.findIndex((header: string) => {
      const headerLower = header.toLowerCase();
      return (
        headerLower.includes("giờ") ||
        headerLower.includes("time") ||
        headerLower.includes("timestamp") ||
        headerLower.includes("thời") ||
        headerLower.includes("phút") ||
        headerLower.includes("giây")
      );
    });

    if (timestampColumnIndex === -1) {
      console.error("❌ Không tìm thấy cột timestamp trong headers:", headers);
      return [];
    }

    console.log(
      "⏰ Found timestamp column at index:",
      timestampColumnIndex,
      "- Header:",
      headers[timestampColumnIndex]
    );

    const scenes: ScriptScene[] = [];
    let sceneNumber = 1;

    // Process each row (skip header)
    for (let i = 1; i < rawData.length; i++) {
      const row = rawData[i];
      if (!row || !row[timestampColumnIndex]) continue;

      const timestampString = row[timestampColumnIndex].toString().trim();
      if (!timestampString) continue;

      const timestamp = this.parseTimestamp(timestampString);
      if (!timestamp) continue;

      // Map columns based on typical VLU script structure
      const scene: ScriptScene = {
        id: `scene_${i}`,
        timestamp,
        timestampString,
        content: row[3] || row[4] || "", // Text content
        description: row[2] || "", // Scene description
        speaker: row[1] || "", // Speaker/character
        action: row[6] || row[5] || "", // Action/prompt
        notes: row[7] || row[8] || "", // Notes
        sceneNumber,
      };

      scenes.push(scene);
      sceneNumber++;
    }

    console.log("🎬 Parsed", scenes.length, "scenes with valid timestamps");

    if (scenes.length === 0) {
      console.warn(
        "⚠️ No valid scenes found. Check timestamp format in column:",
        headers[timestampColumnIndex]
      );
      return [];
    }

    // Group scenes by timestamp
    const groupedScenes = new Map<string, ScriptScene[]>();

    scenes.forEach((scene) => {
      const key = scene.timestampString;
      if (!groupedScenes.has(key)) {
        groupedScenes.set(key, []);
      }
      groupedScenes.get(key)!.push(scene);
    });

    // Create scripts from grouped scenes
    const scripts: Script[] = [];
    let scriptIndex = 1;

    groupedScenes.forEach((groupScenes, timestampKey) => {
      const reNumberedScenes = groupScenes.map((scene, index) => ({
        ...scene,
        sceneNumber: index + 1,
      }));

      const script: Script = {
        id: `script_${scriptIndex}`,
        title: `Kịch bản ${timestampKey}`,
        description: `Kịch bản tại thời điểm ${timestampKey}`,
        totalDuration: timestampKey,
        scenes: reNumberedScenes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "draft",
        tags: ["vlu", "auto-generated", timestampKey],
      };

      scripts.push(script);
      scriptIndex++;
    });

    console.log("📚 Created", scripts.length, "scripts from grouped scenes");
    return scripts;
  }

  // Load all scripts from all sheets
  async loadAllScripts(): Promise<Script[]> {
    try {
      console.log("🔄 Loading all scripts from Google Sheets...");

      const sheets = await this.getAllSheets();
      if (sheets.length === 0) {
        console.warn("⚠️ No sheets found, trying CSV fallback...");
        return await this.loadViaCSV();
      }

      const allScripts: Script[] = [];

      for (const sheet of sheets) {
        try {
          console.log(`📄 Processing sheet: ${sheet.title}`);
          const rawData = await this.getSheetData(sheet.title);

          if (rawData.length === 0) {
            console.log(`📄 Sheet ${sheet.title} is empty, skipping`);
            continue;
          }

          const scripts = this.groupScenesByTimestamp(rawData);

          // Add sheet name to script titles
          const labeledScripts = scripts.map((script) => ({
            ...script,
            title: `[${sheet.title}] ${script.title}`,
            tags: [...script.tags, sheet.title],
          }));

          allScripts.push(...labeledScripts);
          console.log(
            `✅ Loaded ${labeledScripts.length} scripts from ${sheet.title}`
          );
        } catch (error) {
          console.warn(`⚠️ Failed to load sheet ${sheet.title}:`, error);
        }
      }

      console.log("🎉 Total scripts loaded:", allScripts.length);
      return allScripts;
    } catch (error) {
      console.error(
        "❌ Error loading all scripts via API, trying CSV fallback:",
        error
      );
      return await this.loadViaCSV();
    }
  }

  // CSV fallback method when API key has restrictions
  async loadViaCSV(): Promise<Script[]> {
    try {
      console.log("🔄 Loading via CSV export (fallback method)...");

      // Try different gid values - first the main sheet (from URL), then others
      const gids = [707725074, 0, 1, 2]; // Start with the gid from user's URL
      let csvText = "";
      let successfulGid = null;
      
      for (const gid of gids) {
        try {
          const csvUrl = `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/export?format=csv&gid=${gid}`;
          console.log("🌐 Trying CSV URL with gid", gid + ":", csvUrl);
          
          const response = await fetch(csvUrl, {
            method: 'GET',
            redirect: 'follow'
          });

          console.log(`📊 CSV Response for gid ${gid} - status:`, response.status);
          
          if (response.ok) {
            const text = await response.text();
            if (!text.includes('<HTML>') && !text.includes('<html>') && !text.includes('Không thể mở') && text.trim().length > 0) {
              csvText = text;
              successfulGid = gid;
              console.log("✅ Successfully loaded CSV with gid", gid);
              console.log("📄 First 200 chars:", text.substring(0, 200));
              break;
            } else {
              console.log(`⚠️ GID ${gid} returned HTML, error page or empty content`);
            }
          }
        } catch (err) {
          console.log(`❌ GID ${gid} failed:`, err);
        }
      }

      if (!csvText) {
        throw new Error("Could not load CSV data with any gid. Sheet may not be publicly accessible or all sheets are empty.");
      }

      // Parse CSV to array
      const rows = csvText
        .split("\n")
        .filter(row => row.trim() !== "") // Remove empty rows
        .map((row) => {
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
      if (rows.length > 0) {
        console.log("📋 CSV Headers:", rows[0]);
        if (rows.length > 1) {
          console.log("📄 Sample row:", rows[1]);
        }
      }

      const scripts = this.groupScenesByTimestamp(rows);
      console.log("🎬 Scripts generated from CSV:", scripts.length);
      return scripts;
    } catch (error) {
      console.error("❌ CSV fallback failed:", error);
      return [];
    }
  }
}

export const googleSheetsService = new GoogleSheetsSimpleService();
