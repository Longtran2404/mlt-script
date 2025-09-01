import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Check, Loader2 } from "lucide-react";

declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initCodeClient: (config: any) => any;
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

  // Google OAuth2 configuration - Real credentials  
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '499182576403-m7g4fukg2b380o7bm1257ikpbpf2dls3.apps.googleusercontent.com';
  
  // Sử dụng popup thay vì redirect cho dễ dàng hơn
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.readonly';

  useEffect(() => {
    // Debug: Log configuration
    console.log('🔧 Google OAuth Configuration:', {
      clientId: GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing',
      redirectUri: REDIRECT_URI,
      nodeEnv: process.env.NODE_ENV,
      origin: window.location.origin
    });

    // Load Google Identity Services script
    const loadGoogleScript = () => {
      if (window.google?.accounts) {
        setIsGoogleLoaded(true);
        console.log('✅ Google Identity Services already loaded');
        return;
      }

      console.log('🔄 Loading Google Identity Services...');
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsGoogleLoaded(true);
        console.log('✅ Google Identity Services loaded successfully');
      };
      script.onerror = () => {
        console.error('❌ Failed to load Google Identity Services');
        setError("Không thể tải Google Identity Services");
      };
      document.head.appendChild(script);
    };

    loadGoogleScript();
  }, [GOOGLE_CLIENT_ID, REDIRECT_URI]);

  const handleConnect = async () => {
    if (!GOOGLE_CLIENT_ID) {
      setError("Google Client ID chưa được cấu hình");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      console.log('🔄 Bắt đầu đăng nhập Google với popup...');
      
      // Create popup-based OAuth flow
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: window.location.origin + '/oauth2/callback.html',
        response_type: 'token',
        scope: SCOPES,
        include_granted_scopes: 'true',
        state: generateRandomState(),
        prompt: 'consent' // Always show consent to get refresh permissions
      }).toString();

      console.log('🌐 Mở popup đăng nhập Google...');
      
      // Open popup window
      const popup = window.open(
        authUrl,
        'google_oauth_popup',
        'width=500,height=600,scrollbars=yes,resizable=yes,top=100,left=' + 
        Math.round(window.screen.width / 2 - 250)
      );

      if (!popup) {
        throw new Error('Popup bị chặn bởi trình duyệt. Vui lòng cho phép popup và thử lại.');
      }

      // Listen for messages from popup
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        console.log('📨 Received message from popup:', event.data);
        
        if (event.data.type === 'GOOGLE_OAUTH_SUCCESS') {
          console.log('✅ Đăng nhập Google thành công!');
          
          // Save token with proper format
          const tokenData = {
            access_token: event.data.access_token,
            expiry: Date.now() + (parseInt(event.data.expires_in || '3600') * 1000),
            scope: SCOPES
          };
          
          localStorage.setItem('google_access_token', JSON.stringify(tokenData));
          localStorage.setItem('google_user', JSON.stringify({
            name: 'Google User',
            email: 'Connected User',
            connected_at: new Date().toISOString()
          }));

          setIsConnected(true);
          setIsConnecting(false);
          onConnect?.(true);
          
          // Cleanup
          window.removeEventListener('message', handleMessage);
          popup.close();
          
          alert('✅ Đã kết nối Google Sheets thành công! Bây giờ bạn có thể chỉnh sửa dữ liệu.');
          
        } else if (event.data.type === 'GOOGLE_OAUTH_ERROR') {
          console.error('❌ Lỗi đăng nhập Google:', event.data.error);
          setError('Đăng nhập thất bại: ' + event.data.error);
          setIsConnecting(false);
          window.removeEventListener('message', handleMessage);
          popup.close();
        }
      };

      window.addEventListener('message', handleMessage);

      // Check if popup was closed manually
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          console.log('❌ Popup đóng thủ công');
          setIsConnecting(false);
          window.removeEventListener('message', handleMessage);
        }
      }, 1000);
      
    } catch (err) {
      console.error("❌ Lỗi kết nối Google:", err);
      setError(
        err instanceof Error ? err.message : "Có lỗi xảy ra khi kết nối Google"
      );
      setIsConnecting(false);
    }
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
    console.log('🚪 Disconnected from Google');
  };

  // Check if already connected on mount
  useEffect(() => {
    const accessToken = localStorage.getItem("google_access_token");
    const user = localStorage.getItem("google_user");

    if (accessToken && user) {
      setIsConnected(true);
      onConnect?.(true);
      console.log('✅ Already connected to Google');
    }
  }, [onConnect]);

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
        disabled={isConnecting || !isGoogleLoaded}
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
        <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
      
      {!GOOGLE_CLIENT_ID && (
        <div className="mt-2 text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
          ⚠️ Google Client ID chưa được cấu hình. Vui lòng thêm REACT_APP_GOOGLE_CLIENT_ID vào file .env
        </div>
      )}
    </div>
  );
}
