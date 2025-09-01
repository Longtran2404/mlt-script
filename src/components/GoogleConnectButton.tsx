import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initCodeClient: (config: any) => any;
          initTokenClient: (config: any) => any;
        };
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface GoogleConnectButtonProps {
  onConnect?: (connected: boolean) => void;
  className?: string;
}

export default function GoogleConnectButton({
  onConnect,
  className = "",
}: GoogleConnectButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  // Google OAuth2 configuration
  const GOOGLE_CLIENT_ID =
    process.env.REACT_APP_GOOGLE_CLIENT_ID ||
    "499182576403-m7g4fukg2b380o7bm1257ikpbpf2dls3.apps.googleusercontent.com";
  const SCOPES =
    "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.readonly";

  useEffect(() => {
    console.log("🔧 Google OAuth Configuration:", {
      clientId: GOOGLE_CLIENT_ID ? "✅ Set" : "❌ Missing",
      redirectUri: window.location.origin + "/oauth2/callback.html",
      nodeEnv: process.env.NODE_ENV,
      origin: window.location.origin,
    });

    // Load Google Identity Services script
    const loadGoogleScript = () => {
      if (window.google?.accounts) {
        setIsGoogleLoaded(true);
        console.log("✅ Google Identity Services already loaded");
        return;
      }

      console.log("🔄 Loading Google Identity Services...");
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("✅ Google Identity Services loaded successfully");
        setIsGoogleLoaded(true);
        initializeGoogleAuth();
      };
      script.onerror = () => {
        console.error("❌ Failed to load Google Identity Services");
        setError("Không thể tải Google Identity Services");
      };
      document.head.appendChild(script);
    };

    loadGoogleScript();
  }, [GOOGLE_CLIENT_ID]);

  const initializeGoogleAuth = () => {
    if (!window.google?.accounts?.id) {
      console.error("Google Identity Services not available");
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOPES,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      console.log("✅ Google Identity Services initialized");
    } catch (err) {
      console.error("❌ Error initializing Google Identity Services:", err);
      setError("Không thể khởi tạo Google Identity Services");
    }
  };

  const handleCredentialResponse = async (response: any) => {
    console.log("🔐 Google credential response received:", response);

    if (response.error) {
      console.error("❌ Google OAuth error:", response.error);
      setError(`Đăng nhập thất bại: ${response.error}`);
      setIsConnecting(false);
      return;
    }

    try {
      // Extract access token from credential
      const credential = response.credential;
      const decoded = JSON.parse(atob(credential.split(".")[1]));

      console.log("✅ Google OAuth successful:", {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      });

      // Store user info
      const userInfo = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        given_name: decoded.given_name,
        family_name: decoded.family_name,
        locale: decoded.locale,
      };

      localStorage.setItem("google_user", JSON.stringify(userInfo));
      localStorage.setItem("google_access_token", credential);
      localStorage.setItem(
        "google_token_expiry",
        (Date.now() + 3600000).toString()
      ); // 1 hour

      setIsConnected(true);
      setIsConnecting(false);
      setError(null);
      onConnect?.(true);

      // Show success message
      alert(
        "✅ Đã kết nối Google Sheets thành công! Bây giờ bạn có thể chỉnh sửa dữ liệu."
      );
    } catch (err) {
      console.error("❌ Error processing Google credential:", err);
      setError("Có lỗi xảy ra khi xử lý thông tin đăng nhập");
      setIsConnecting(false);
    }
  };

  const handleConnect = async () => {
    if (!GOOGLE_CLIENT_ID) {
      setError("Google Client ID chưa được cấu hình");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      console.log("🔄 Bắt đầu đăng nhập Google...");

      // Luôn sử dụng popup method vì Google Identity Services có thể không hoạt động
      console.log("🌐 Sử dụng popup method");
      await handlePopupAuth();
    } catch (err) {
      console.error("❌ Lỗi kết nối Google:", err);
      setError("Có lỗi xảy ra khi kết nối Google");
      setIsConnecting(false);
    }
  };

  const handlePopupAuth = async () => {
    // Fallback popup method
    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: window.location.origin + "/oauth2/callback.html",
        response_type: "token",
        scope: SCOPES,
        include_granted_scopes: "true",
        state: generateRandomState(),
        prompt: "consent",
      }).toString();

    console.log("🌐 Mở popup đăng nhập Google...");

    const popup = window.open(
      authUrl,
      "google_oauth_popup",
      "width=500,height=600,scrollbars=yes,resizable=yes,top=100,left=" +
        Math.round(window.screen.width / 2 - 250)
    );

    if (!popup) {
      throw new Error("Popup bị chặn bởi trình duyệt. Vui lòng cho phép popup và thử lại.");
    }

    // Listen for messages from popup
    const handleMessage = (event: MessageEvent) => {
      console.log("📨 Received message:", event.data);
      
      if (event.origin !== window.location.origin) {
        console.log("❌ Origin mismatch:", event.origin, "!=", window.location.origin);
        return;
      }

      if (event.data.type === "GOOGLE_OAUTH_SUCCESS") {
        console.log("✅ Đăng nhập Google thành công!");

        // Save token with proper format
        const tokenData = {
          access_token: event.data.access_token,
          expiry: Date.now() + parseInt(event.data.expires_in || "3600") * 1000,
          scope: SCOPES,
        };

        localStorage.setItem("google_access_token", JSON.stringify(tokenData));
        localStorage.setItem(
          "google_user",
          JSON.stringify({
            name: "Google User",
            email: "Connected User",
            connected_at: new Date().toISOString(),
          })
        );

        setIsConnected(true);
        setIsConnecting(false);
        onConnect?.(true);

        // Cleanup
        window.removeEventListener("message", handleMessage);
        popup.close();

        alert("✅ Đã kết nối Google Sheets thành công!");
      } else if (event.data.type === "GOOGLE_OAUTH_ERROR") {
        console.error("❌ Lỗi đăng nhập Google:", event.data.error);
        setError("Đăng nhập thất bại: " + event.data.error);
        setIsConnecting(false);
        window.removeEventListener("message", handleMessage);
        popup.close();
      }
    };

    window.addEventListener("message", handleMessage);

    // Check if popup was closed manually
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        console.log("❌ Popup đóng thủ công");
        setIsConnecting(false);
        window.removeEventListener("message", handleMessage);
      }
    }, 1000);

    // Timeout after 5 minutes
    setTimeout(() => {
      if (!popup.closed) {
        console.log("⏰ Popup timeout - closing");
        popup.close();
        setIsConnecting(false);
        window.removeEventListener("message", handleMessage);
        clearInterval(checkClosed);
      }
    }, 300000); // 5 minutes
  };

  const generateRandomState = (): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setError(null);
    onConnect?.(false);

    // Clear stored tokens
    localStorage.removeItem("google_access_token");
    localStorage.removeItem("google_refresh_token");
    localStorage.removeItem("google_user");
    localStorage.removeItem("google_token_expiry");
    console.log("🚪 Disconnected from Google");
  };

  // Check if already connected on mount
  useEffect(() => {
    const accessToken = localStorage.getItem("google_access_token");
    const user = localStorage.getItem("google_user");
    const expiry = localStorage.getItem("google_token_expiry");

    if (accessToken && user && expiry) {
      const expiryTime = parseInt(expiry);
      if (Date.now() < expiryTime) {
        setIsConnected(true);
        onConnect?.(true);
        console.log("✅ Already connected to Google");
      } else {
        // Token expired, clear storage
        handleDisconnect();
      }
    }
  }, [onConnect]);

  // Listen for Google OAuth connect event from GoogleAuthStatus
  useEffect(() => {
    const handleGoogleOAuthConnect = () => {
      console.log("🔗 Received google-oauth-connect event");
      handleConnect();
    };

    window.addEventListener("google-oauth-connect", handleGoogleOAuthConnect);
    return () => {
      window.removeEventListener("google-oauth-connect", handleGoogleOAuthConnect);
    };
  }, []);

  if (isConnected) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className="flex items-center space-x-2 text-green-600">
          <Check className="h-5 w-5" />
          <span className="text-sm font-medium">Đã kết nối Google</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          className="text-red-600 hover:text-red-700"
        >
          Ngắt kết nối
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Đang kết nối...
          </>
        ) : (
          <>
            <svg
              className="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Kết nối Google
          </>
        )}
      </Button>

      {error && (
        <Alert className="mt-2 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      {!GOOGLE_CLIENT_ID && (
        <Alert className="mt-2 border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700">
            ⚠️ Google Client ID chưa được cấu hình. Vui lòng thêm
            REACT_APP_GOOGLE_CLIENT_ID vào file .env
          </AlertDescription>
        </Alert>
      )}

      {/* Debug info for development */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-2 space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDebug(!showDebug)}
            className="text-xs text-gray-500"
          >
            {showDebug ? "Ẩn" : "Hiện"} Debug Info
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              console.log("🧪 Testing popup...");
              const testPopup = window.open(
                "https://www.google.com",
                "test_popup",
                "width=400,height=300"
              );
              if (testPopup) {
                console.log("✅ Test popup opened successfully");
                setTimeout(() => testPopup.close(), 2000);
              } else {
                console.log("❌ Test popup blocked");
              }
            }}
            className="text-xs text-blue-500"
          >
            🧪 Test Popup
          </Button>

          {showDebug && (
            <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
              <div>Client ID: {GOOGLE_CLIENT_ID ? "✅ Set" : "❌ Missing"}</div>
              <div>Google Loaded: {isGoogleLoaded ? "✅" : "❌"}</div>
              <div>Connected: {isConnected ? "✅" : "❌"}</div>
              <div>Environment: {process.env.NODE_ENV}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
