import { useState, useEffect, useCallback } from "react";

// Extend Window interface to include gapi
declare global {
  interface Window {
    gapi: any;
  }
}

interface GoogleSheetsConfig {
  spreadsheetId: string;
  clientId: string;
  clientSecret?: string;
  range?: string;
}

interface SheetData {
  values: any[][];
  range: string;
  majorDimension: "ROWS" | "COLUMNS";
}

interface GoogleSheetsHook {
  data: SheetData | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
  readSheet: (range?: string) => Promise<SheetData | null>;
  writeSheet: (range: string, values: any[][]) => Promise<boolean>;
  appendSheet: (range: string, values: any[][]) => Promise<boolean>;
}

export function useGoogleSheets(config: GoogleSheetsConfig): GoogleSheetsHook {
  const [data, setData] = useState<SheetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [gapi, setGapi] = useState<any>(null);

  // Initialize Google API
  useEffect(() => {
    const initGoogleAPI = async () => {
      const initClient = async () => {
        try {
          await window.gapi.client.init({
            clientId: config.clientId,
            discoveryDocs: [
              "https://sheets.googleapis.com/$discovery/rest?version=v4",
            ],
            scope: "https://www.googleapis.com/auth/spreadsheets",
          });

          setGapi(window.gapi);

          // Check if user is already signed in
          const authInstance = window.gapi.auth2.getAuthInstance();
          if (authInstance.isSignedIn.get()) {
            setIsAuthenticated(true);
          }

          // Listen for sign-in state changes
          authInstance.isSignedIn.listen((signedIn: boolean) => {
            setIsAuthenticated(signedIn);
          });
        } catch (err) {
          setError(`Failed to initialize Google API: ${err}`);
        }
      };

      try {
        // Load Google API script
        if (!window.gapi) {
          const script = document.createElement("script");
          script.src = "https://apis.google.com/js/api.js";
          script.onload = () => {
            window.gapi.load("client:auth2", initClient);
          };
          document.head.appendChild(script);
        } else {
          window.gapi.load("client:auth2", initClient);
        }
      } catch (err) {
        setError(`Failed to load Google API: ${err}`);
      }
    };

    initGoogleAPI();
  }, [config.clientId]);

  const signIn = useCallback(async () => {
    if (!gapi) return;

    try {
      setLoading(true);
      setError(null);

      const authInstance = gapi.auth2.getAuthInstance();
      await authInstance.signIn();
      setIsAuthenticated(true);
    } catch (err) {
      setError(`Sign in failed: ${err}`);
    } finally {
      setLoading(false);
    }
  }, [gapi]);

  const signOut = useCallback(() => {
    if (!gapi) return;

    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signOut();
    setIsAuthenticated(false);
    setData(null);
  }, [gapi]);

  const readSheet = useCallback(
    async (range?: string): Promise<SheetData | null> => {
      if (!gapi || !isAuthenticated) {
        setError("Not authenticated");
        return null;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: config.spreadsheetId,
          range: range || config.range || "A:Z",
        });

        const sheetData: SheetData = {
          values: response.result.values || [],
          range: response.result.range || "",
          majorDimension: response.result.majorDimension || "ROWS",
        };

        setData(sheetData);
        return sheetData;
      } catch (err) {
        setError(`Failed to read sheet: ${err}`);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [gapi, isAuthenticated, config.spreadsheetId, config.range]
  );

  const writeSheet = useCallback(
    async (range: string, values: any[][]): Promise<boolean> => {
      if (!gapi || !isAuthenticated) {
        setError("Not authenticated");
        return false;
      }

      try {
        setLoading(true);
        setError(null);

        await gapi.client.sheets.spreadsheets.values.update({
          spreadsheetId: config.spreadsheetId,
          range,
          valueInputOption: "USER_ENTERED",
          values,
        });

        return true;
      } catch (err) {
        setError(`Failed to write to sheet: ${err}`);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [gapi, isAuthenticated, config.spreadsheetId]
  );

  const appendSheet = useCallback(
    async (range: string, values: any[][]): Promise<boolean> => {
      if (!gapi || !isAuthenticated) {
        setError("Not authenticated");
        return false;
      }

      try {
        setLoading(true);
        setError(null);

        await gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: config.spreadsheetId,
          range,
          valueInputOption: "USER_ENTERED",
          insertDataOption: "INSERT_ROWS",
          values,
        });

        return true;
      } catch (err) {
        setError(`Failed to append to sheet: ${err}`);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [gapi, isAuthenticated, config.spreadsheetId]
  );

  return {
    data,
    loading,
    error,
    isAuthenticated,
    signIn,
    signOut,
    readSheet,
    writeSheet,
    appendSheet,
  };
}
