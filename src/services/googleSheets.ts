import {
  GOOGLE_SHEETS_CONFIG,
  SHEET_IDS,
  SHEET_RANGES,
} from "../types/sheets.types";

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

// Google Sheets API service
class GoogleSheetsService {
  private baseUrl = "https://sheets.googleapis.com/v4/spreadsheets";

  // Mock authentication - in production, use proper OAuth2
  private async getAccessToken(): Promise<string> {
    // For demo purposes, return a mock token
    // In production, implement proper JWT signing or OAuth2
    return "mock_access_token";
  }

  // Get data from Google Sheets
  async getData<T>(sheetId: string, range: string): Promise<T[]> {
    try {
      // Mock data for demo - replace with actual API call
      return this.getMockData<T>(range);
    } catch (error) {
      console.error("Error fetching data from Google Sheets:", error);
      return [];
    }
  }

  // Update data in Google Sheets
  async updateData(
    sheetId: string,
    range: string,
    values: any[][]
  ): Promise<boolean> {
    try {
      // Mock update for demo
      console.log("Updating sheet:", sheetId, range, values);
      return true;
    } catch (error) {
      console.error("Error updating Google Sheets:", error);
      return false;
    }
  }

  // Append data to Google Sheets
  async appendData(
    sheetId: string,
    range: string,
    values: any[][]
  ): Promise<boolean> {
    try {
      // Mock append for demo
      console.log("Appending to sheet:", sheetId, range, values);
      return true;
    } catch (error) {
      console.error("Error appending to Google Sheets:", error);
      return false;
    }
  }

  // Mock data generator for demo purposes
  private getMockData<T>(range: string): T[] {
    switch (range) {
      case SHEET_RANGES.USERS:
        return [
          {
            id: "1",
            name: "Nguyễn Văn A",
            email: "nguyenvana@example.com",
            plan: "professional",
            status: "active",
            createdAt: "2024-01-15",
            lastLogin: "2024-01-30",
            videosCreated: 25,
            scriptsCreated: 45,
          },
          {
            id: "2",
            name: "Trần Thị B",
            email: "tranthib@example.com",
            plan: "starter",
            status: "active",
            createdAt: "2024-01-20",
            lastLogin: "2024-01-29",
            videosCreated: 8,
            scriptsCreated: 15,
          },
          {
            id: "3",
            name: "Lê Văn C",
            email: "levanc@example.com",
            plan: "enterprise",
            status: "active",
            createdAt: "2024-01-10",
            lastLogin: "2024-01-30",
            videosCreated: 120,
            scriptsCreated: 200,
          },
        ] as T[];

      case SHEET_RANGES.PROJECTS:
        return [
          {
            id: "1",
            title: "Video Marketing Campaign Q1",
            description: "Tạo series video marketing cho quý 1",
            type: "video",
            status: "in_progress",
            createdBy: "1",
            createdAt: "2024-01-20",
            updatedAt: "2024-01-25",
            progress: 65,
            dueDate: "2024-02-15",
            tags: ["marketing", "campaign", "Q1"],
          },
          {
            id: "2",
            title: "Educational Content Series",
            description: "Bộ kịch bản giáo dục về AI",
            type: "script",
            status: "completed",
            createdBy: "2",
            createdAt: "2024-01-15",
            updatedAt: "2024-01-28",
            progress: 100,
            dueDate: "2024-01-30",
            tags: ["education", "AI", "series"],
          },
          {
            id: "3",
            title: "Product Launch Videos",
            description: "Video giới thiệu sản phẩm mới",
            type: "both",
            status: "draft",
            createdBy: "3",
            createdAt: "2024-01-25",
            updatedAt: "2024-01-25",
            progress: 20,
            dueDate: "2024-03-01",
            tags: ["product", "launch", "promotion"],
          },
        ] as T[];

      case SHEET_RANGES.ANALYTICS:
        return [
          {
            date: "2024-01-30",
            pageViews: 15420,
            uniqueVisitors: 8920,
            videosCreated: 156,
            scriptsCreated: 289,
            newUsers: 45,
            activeUsers: 1247,
            revenue: 25600000,
          },
          {
            date: "2024-01-29",
            pageViews: 14890,
            uniqueVisitors: 8650,
            videosCreated: 142,
            scriptsCreated: 267,
            newUsers: 38,
            activeUsers: 1202,
            revenue: 23800000,
          },
          {
            date: "2024-01-28",
            pageViews: 13560,
            uniqueVisitors: 8100,
            videosCreated: 128,
            scriptsCreated: 245,
            newUsers: 42,
            activeUsers: 1180,
            revenue: 22100000,
          },
        ] as T[];

      default:
        return [];
    }
  }

  // Specific methods for different data types
  async getUsers(): Promise<UserData[]> {
    return this.getData<UserData>(SHEET_IDS.USERS, SHEET_RANGES.USERS);
  }

  async getProjects(): Promise<ProjectData[]> {
    return this.getData<ProjectData>(SHEET_IDS.PROJECTS, SHEET_RANGES.PROJECTS);
  }

  async getAnalytics(): Promise<AnalyticsData[]> {
    return this.getData<AnalyticsData>(
      SHEET_IDS.ANALYTICS,
      SHEET_RANGES.ANALYTICS
    );
  }

  async getScripts(): Promise<ScriptData[]> {
    return this.getData<ScriptData>(SHEET_IDS.SCRIPTS, SHEET_RANGES.SCRIPTS);
  }

  async getVideos(): Promise<VideoData[]> {
    return this.getData<VideoData>(SHEET_IDS.VIDEOS, SHEET_RANGES.VIDEOS);
  }

  // Create new records
  async createProject(project: Partial<ProjectData>): Promise<boolean> {
    const newProject = {
      id: Date.now().toString(),
      title: project.title || "",
      description: project.description || "",
      type: project.type || "video",
      status: "draft",
      createdBy: project.createdBy || "1",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      progress: 0,
      tags: project.tags || [],
    };

    const values = [
      [
        newProject.id,
        newProject.title,
        newProject.description,
        newProject.type,
        newProject.status,
        newProject.createdBy,
        newProject.createdAt,
        newProject.updatedAt,
        newProject.progress.toString(),
        newProject.tags.join(","),
      ],
    ];

    return this.appendData(SHEET_IDS.PROJECTS, SHEET_RANGES.PROJECTS, values);
  }

  async createScript(script: Partial<ScriptData>): Promise<boolean> {
    const newScript = {
      id: Date.now().toString(),
      title: script.title || "",
      content: script.content || "",
      type: script.type || "educational",
      tone: script.tone || "professional",
      language: script.language || "vi",
      duration: script.duration || 0,
      status: "draft",
      createdBy: script.createdBy || "1",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      wordCount: (script.content || "").split(" ").length,
      tags: script.tags || [],
    };

    const values = [
      [
        newScript.id,
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

    return this.appendData(SHEET_IDS.SCRIPTS, SHEET_RANGES.SCRIPTS, values);
  }
}

export const googleSheetsService = new GoogleSheetsService();
