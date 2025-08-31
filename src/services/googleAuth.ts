import {
  Script,
  ScriptScene,
  SceneTimestamp,
  VLU_SCRIPT_SHEET,
  GOOGLE_OAUTH_CONFIG,
} from "../types/script.types";

// Google Auth Service
class GoogleAuthService {
  private gapi: any;
  private isInitialized = false;
  private isInitializing = false;
  public accessToken: string | null = null;
  private sheets: any;

  // Initialize Google API
  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    if (this.isInitializing) {
      // Wait for existing initialization
      return new Promise((resolve, reject) => {
        const checkInit = () => {
          if (this.isInitialized) resolve();
          else if (!this.isInitializing)
            reject(new Error("Initialization failed"));
          else setTimeout(checkInit, 100);
        };
        checkInit();
      });
    }

    this.isInitializing = true;

    try {
      await new Promise((resolve, reject) => {
        // Check if script already loaded
        if (window.gapi) {
          this.initializeGapi().then(resolve).catch(reject);
          return;
        }

        // Avoid duplicate script tags
        const existingScript = document.querySelector(
          'script[src="https://apis.google.com/js/api.js"]'
        );
        if (existingScript) {
          existingScript.addEventListener("load", () => {
            this.initializeGapi().then(resolve).catch(reject);
          });
          return;
        }

        // Load Google API script
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.async = true;
        script.defer = true;

        script.onload = () => {
          this.initializeGapi().then(resolve).catch(reject);
        };

        script.onerror = (error) => {
          console.error("Error loading Google API script:", error);
          reject(new Error("Failed to load Google API script"));
        };

        document.head.appendChild(script);
      });
    } finally {
      this.isInitializing = false;
    }
  }

  private async initializeGapi(): Promise<void> {
    try {
      console.log("Google API script loaded, initializing...");

      // Check if gapi is available
      if (!window.gapi) {
        throw new Error("Google API not loaded");
      }

      // Load only client library first (skip auth2 to avoid iframe issues)
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Timeout loading gapi modules after 10 seconds"));
        }, 10000);

        try {
          window.gapi.load("client", {
            callback: () => {
              clearTimeout(timeout);
              resolve();
            },
            onerror: () => {
              clearTimeout(timeout);
              reject(new Error("Failed to load gapi client module"));
            },
          });
        } catch (loadError: any) {
          clearTimeout(timeout);
          reject(
            new Error(
              "Error calling gapi.load: " +
                (loadError instanceof Error
                  ? loadError.message
                  : "Unknown error")
            )
          );
        }
      });

      // Initialize client only (no OAuth2 for now to avoid iframe issues)
      try {
        await window.gapi.client.init({
          discoveryDocs: [
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
          ],
        });
        console.log("Google Sheets API client initialized (no OAuth yet)");
      } catch (initError: any) {
        throw new Error(
          "Failed to initialize Google Sheets API client: " +
            (initError.error || initError.message || "Unknown error")
        );
      }

      this.gapi = window.gapi;
      this.isInitialized = true;
      console.log("Google API initialized successfully");
    } catch (error: any) {
      console.error("Error initializing Google API:", error);
      this.isInitializing = false;
      throw new Error(
        "Google API initialization failed: " +
          (error.message || "Unknown error")
      );
    }
  }

  // Sign in with Google using alternative method
  async signIn(): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      console.log("Starting Google OAuth flow...");

      // Use direct OAuth2 URL approach to bypass iframe issues
      const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
      const params = new URLSearchParams({
        client_id: GOOGLE_OAUTH_CONFIG.client_id,
        redirect_uri: window.location.origin,
        response_type: "token",
        scope: GOOGLE_OAUTH_CONFIG.scope,
        include_granted_scopes: "true",
        state: "google_oauth_" + Date.now(),
      });

      const authUrl = `${oauth2Endpoint}?${params}`;

      // Open popup for authentication
      const popup = window.open(
        authUrl,
        "google_oauth",
        "width=500,height=600"
      );

      if (!popup) {
        throw new Error("Popup blocked. Please allow popups and try again.");
      }

      // Wait for OAuth callback
      return new Promise((resolve) => {
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            resolve(false);
          }

          try {
            // Check if we got redirected back with token
            if (
              popup.location.hash &&
              popup.location.hash.includes("access_token")
            ) {
              const hash = popup.location.hash.substring(1);
              const params = new URLSearchParams(hash);
              const accessToken = params.get("access_token");

              if (accessToken) {
                this.accessToken = accessToken;
                console.log("Google OAuth successful, access token acquired");
                popup.close();
                clearInterval(checkClosed);
                resolve(true);
              }
            }
          } catch (e) {
            // Cross-origin error is expected, ignore
          }
        }, 1000);

        // Timeout after 5 minutes
        setTimeout(() => {
          if (!popup.closed) {
            popup.close();
          }
          clearInterval(checkClosed);
          resolve(false);
        }, 300000);
      });
    } catch (error) {
      console.error("Google Sign In Error:", error);
      return false;
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      this.accessToken = null;
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Google Sign Out Error:", error);
    }
  }

  // Check if user is signed in
  isSignedIn(): boolean {
    return !!this.accessToken;
  }

  // Get user info (simplified for now)
  getUserInfo(): any {
    if (!this.isSignedIn()) return null;

    return {
      id: "google_user",
      name: "Google User",
      email: "user@google.com",
      imageUrl: "https://via.placeholder.com/40",
    };
  }
}

// Google Sheets Service for VLU Scripts
class VLUScriptService {
  private authService = new GoogleAuthService();

  // Find VLU Script Sheet by name or use configured ID
  async findVLUScriptSheet(): Promise<string | null> {
    try {
      if (!this.authService.isSignedIn()) {
        const signedIn = await this.authService.signIn();
        if (!signedIn) {
          throw new Error("Không thể đăng nhập Google");
        }
      }

      // Use configured Sheet ID if available
      if (VLU_SCRIPT_SHEET.sheet_id) {
        console.log("Using configured Sheet ID:", VLU_SCRIPT_SHEET.sheet_id);
        return VLU_SCRIPT_SHEET.sheet_id;
      }

      // Fallback: Use configured sheet ID directly if search is not available
      console.log("Using configured sheet ID as fallback");
      return VLU_SCRIPT_SHEET.sheet_id;
    } catch (error) {
      console.error("Error finding VLU Script Sheet:", error);
      return null;
    }
  }

  // Get sheet data using gapi.client
  async getSheetData(sheetId: string, range: string = "A:Z"): Promise<any[][]> {
    try {
      if (!this.authService.isSignedIn()) {
        const signedIn = await this.authService.signIn();
        if (!signedIn) {
          throw new Error("Không thể đăng nhập Google");
        }
      }

      console.log(
        "Getting sheet data from sheet ID:",
        sheetId,
        "range:",
        range
      );

      // Use gapi.client to make the request
      const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: range,
      });

      console.log("Sheet API response:", response);
      const data = response.result;
      console.log("Sheet data received:", data.values?.length || 0, "rows");
      return data.values || [];
    } catch (error) {
      console.error("Error getting sheet data:", error);
      throw error;
    }
  }

  // Update sheet data using gapi.client
  async updateSheetData(
    sheetId: string,
    range: string,
    values: any[][]
  ): Promise<boolean> {
    try {
      if (!this.authService.isSignedIn()) {
        const signedIn = await this.authService.signIn();
        if (!signedIn) {
          throw new Error("Không thể đăng nhập Google");
        }
      }

      console.log("Updating sheet data:", sheetId, range);

      const response =
        await window.gapi.client.sheets.spreadsheets.values.update({
          spreadsheetId: sheetId,
          range: range,
          valueInputOption: "USER_ENTERED",
          values: values,
        });

      console.log("Update response:", response);
      return response.status === 200;
    } catch (error) {
      console.error("Error updating sheet data:", error);
      return false;
    }
  }

  // Append data to sheet using gapi.client
  async appendSheetData(
    sheetId: string,
    range: string,
    values: any[][]
  ): Promise<boolean> {
    try {
      if (!this.authService.isSignedIn()) {
        const signedIn = await this.authService.signIn();
        if (!signedIn) {
          throw new Error("Không thể đăng nhập Google");
        }
      }

      console.log("Appending sheet data:", sheetId, range);

      const response =
        await window.gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: range,
          valueInputOption: "USER_ENTERED",
          values: values,
        });

      console.log("Append response:", response);
      return response.status === 200;
    } catch (error) {
      console.error("Error appending sheet data:", error);
      return false;
    }
  }

  // Parse timestamp string to SceneTimestamp object
  private parseTimestamp(timestampStr: string): SceneTimestamp | null {
    try {
      // Format: HH:MM:SS.mmm or HH:MM:SS or MM:SS.mmm or MM:SS
      const regex = /^(?:(\d{1,2}):)?(\d{1,2}):(\d{1,2})(?:\.(\d{1,3}))?$/;
      const match = timestampStr.match(regex);

      if (!match) return null;

      const hours = parseInt(match[1] || "0", 10);
      const minutes = parseInt(match[2], 10);
      const seconds = parseInt(match[3], 10);
      const milliseconds = parseInt(
        (match[4] || "0").padEnd(3, "0").slice(0, 3),
        10
      );

      return { hours, minutes, seconds, milliseconds };
    } catch (error) {
      console.error("Error parsing timestamp:", timestampStr, error);
      return null;
    }
  }

  // Group scenes by timestamp
  private groupScenesByTimestamp(rawData: any[][]): Script[] {
    if (rawData.length < 2) return []; // Need at least header + 1 row

    const headers = rawData[0];
    const timestampColumnIndex = headers.findIndex(
      (header: string) =>
        header.toLowerCase().includes("giờ") ||
        header.toLowerCase().includes("time") ||
        header.toLowerCase().includes("timestamp")
    );

    if (timestampColumnIndex === -1) {
      console.error("Không tìm thấy cột timestamp");
      return [];
    }

    const scenes: ScriptScene[] = [];
    let sceneNumber = 1;

    // Process each row (skip header)
    for (let i = 1; i < rawData.length; i++) {
      const row = rawData[i];
      if (!row || !row[timestampColumnIndex]) continue;

      const timestampString = row[timestampColumnIndex].toString().trim();
      const timestamp = this.parseTimestamp(timestampString);

      if (!timestamp) continue;

      const scene: ScriptScene = {
        id: `scene_${i}`,
        timestamp,
        timestampString,
        content:
          row[
            headers.findIndex(
              (h: string) =>
                h.toLowerCase().includes("content") ||
                h.toLowerCase().includes("nội dung")
            )
          ] ||
          row[1] ||
          "",
        description:
          row[
            headers.findIndex(
              (h: string) =>
                h.toLowerCase().includes("description") ||
                h.toLowerCase().includes("mô tả")
            )
          ] || "",
        speaker:
          row[
            headers.findIndex(
              (h: string) =>
                h.toLowerCase().includes("speaker") ||
                h.toLowerCase().includes("người nói")
            )
          ] || "",
        action:
          row[
            headers.findIndex(
              (h: string) =>
                h.toLowerCase().includes("action") ||
                h.toLowerCase().includes("hành động")
            )
          ] || "",
        notes:
          row[
            headers.findIndex(
              (h: string) =>
                h.toLowerCase().includes("note") ||
                h.toLowerCase().includes("ghi chú")
            )
          ] || "",
        sceneNumber,
      };

      scenes.push(scene);
      sceneNumber++;
    }

    // Group scenes by identical timestamps
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
      const script: Script = {
        id: `script_${scriptIndex}`,
        title: `Kịch bản ${timestampKey}`,
        description: `Kịch bản được tạo từ các cảnh có timestamp ${timestampKey}`,
        totalDuration: timestampKey,
        scenes: groupScenes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "draft",
        tags: ["vlu", "auto-generated", timestampKey],
      };

      scripts.push(script);
      scriptIndex++;
    });

    return scripts;
  }

  // Load VLU Scripts from Google Sheets
  async loadVLUScripts(): Promise<Script[]> {
    try {
      console.log("Starting to load VLU Scripts...");

      // Ensure user is signed in
      if (!this.authService.isSignedIn()) {
        console.log("User not signed in, attempting sign in...");
        const signedIn = await this.authService.signIn();
        if (!signedIn) {
          throw new Error("Không thể đăng nhập Google");
        }
      }

      // Find VLU Script Sheet
      console.log("Finding VLU Script Sheet...");
      const sheetId = await this.findVLUScriptSheet();
      if (!sheetId) {
        throw new Error('Không tìm thấy Google Sheet "VLU-KỊCH BẢN"');
      }

      console.log("Found sheet ID:", sheetId);

      // Get sheet data
      console.log("Getting sheet data...");
      const rawData = await this.getSheetData(sheetId);
      if (rawData.length === 0) {
        console.log("No data found in sheet");
        return [];
      }

      console.log("Raw data loaded:", rawData.length, "rows");

      // Group and parse scripts
      const scripts = this.groupScenesByTimestamp(rawData);
      console.log("Scripts parsed:", scripts.length, "scripts");
      return scripts;
    } catch (error) {
      console.error("Error loading VLU Scripts:", error);
      throw error; // Re-throw to let the UI handle the error
    }
  }

  // Save script back to Google Sheets
  async saveScript(script: Script, sheetId?: string | null): Promise<boolean> {
    try {
      if (!sheetId) {
        const foundSheetId = await this.findVLUScriptSheet();
        if (!foundSheetId) {
          throw new Error("Không tìm thấy Google Sheet");
        }
        sheetId = foundSheetId;
      }

      // Prepare data for sheet
      const values = script.scenes.map((scene) => [
        scene.timestampString,
        scene.content,
        scene.description,
        scene.speaker,
        scene.action,
        scene.notes,
        scene.sceneNumber,
        script.id,
        script.title,
        script.status,
      ]);

      // Append to sheet
      return await this.appendSheetData(sheetId, "A:Z", values);
    } catch (error) {
      console.error("Error saving script:", error);
      return false;
    }
  }

  // Update existing script
  async updateScript(
    script: Script,
    sheetId?: string | null
  ): Promise<boolean> {
    try {
      if (!sheetId) {
        const foundSheetId = await this.findVLUScriptSheet();
        if (!foundSheetId) return false;
        sheetId = foundSheetId;
      }

      // Find rows with matching script ID and update them
      const allData = await this.getSheetData(sheetId!);
      const updatedData = allData.map((row) => {
        if (row.length > 7 && row[7] === script.id) {
          // Update this row with new script data
          const sceneForThisRow = script.scenes.find(
            (s) => s.timestampString === row[0]
          );
          if (sceneForThisRow) {
            return [
              sceneForThisRow.timestampString,
              sceneForThisRow.content,
              sceneForThisRow.description,
              sceneForThisRow.speaker,
              sceneForThisRow.action,
              sceneForThisRow.notes,
              sceneForThisRow.sceneNumber,
              script.id,
              script.title,
              script.status,
            ];
          }
        }
        return row;
      });

      return await this.updateSheetData(sheetId!, "A:Z", updatedData);
    } catch (error) {
      console.error("Error updating script:", error);
      return false;
    }
  }

  // Get auth service for other components
  getAuthService() {
    return this.authService;
  }
}

export const vluScriptService = new VLUScriptService();
export const googleAuthService = new GoogleAuthService();
