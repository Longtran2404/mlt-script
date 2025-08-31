export interface GoogleSheetsConfig {
  apiKey: string;
  clientId: string;
  discoveryDocs: string[];
  scope: string;
}

export const SHEET_IDS = {
  VLU_SCRIPTS: process.env.REACT_APP_VLU_SCRIPT_SHEET_ID || "",
  USER_DATA: process.env.REACT_APP_USER_DATA_SHEET_ID || "",
  PROJECTS: process.env.REACT_APP_PROJECTS_SHEET_ID || "",
  ANALYTICS: process.env.REACT_APP_ANALYTICS_SHEET_ID || "",
};

export const SHEET_RANGES = {
  VLU_SCRIPTS: "A:Z",
  USER_DATA: "A:J",
  PROJECTS: "A:L",
  ANALYTICS: "A:H",
};

export const GOOGLE_SHEETS_CONFIG: GoogleSheetsConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || "",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  scope: "https://www.googleapis.com/auth/spreadsheets",
};

