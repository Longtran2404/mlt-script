// Google OAuth2 Service
export interface GoogleTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  scope: string;
  id_token?: string;
}

export interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
  given_name?: string;
  family_name?: string;
  locale?: string;
}

export interface GoogleAuthState {
  isAuthenticated: boolean;
  user: GoogleUserInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

class GoogleOAuthService {
  private readonly CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_CLIENT_ID';
  private readonly CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';
  private readonly REDIRECT_URI = `${window.location.origin}/oauth2/callback`;
  private readonly TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
  private readonly USERINFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v2/userinfo';

  // Exchange authorization code for tokens
  async exchangeCodeForTokens(code: string): Promise<GoogleTokenResponse> {
    try {
      const response = await fetch(this.TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code,
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          redirect_uri: this.REDIRECT_URI,
          grant_type: 'authorization_code',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Token exchange failed: ${errorData.error_description || errorData.error}`);
      }

      const tokenData: GoogleTokenResponse = await response.json();
      
      // Store tokens securely
      this.storeTokens(tokenData);
      
      return tokenData;
    } catch (error) {
      console.error('Token exchange error:', error);
      throw error;
    }
  }

  // Refresh access token using refresh token
  async refreshAccessToken(refreshToken: string): Promise<GoogleTokenResponse> {
    try {
      const response = await fetch(this.TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          refresh_token: refreshToken,
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Token refresh failed: ${errorData.error_description || errorData.error}`);
      }

      const tokenData: GoogleTokenResponse = await response.json();
      
      // Update stored tokens
      this.updateTokens(tokenData);
      
      return tokenData;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }

  // Get user information using access token
  async getUserInfo(accessToken: string): Promise<GoogleUserInfo> {
    try {
      const response = await fetch(this.USERINFO_ENDPOINT, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userInfo: GoogleUserInfo = await response.json();
      
      // Store user info
      this.storeUserInfo(userInfo);
      
      return userInfo;
    } catch (error) {
      console.error('Get user info error:', error);
      throw error;
    }
  }

  // Check if token is expired
  isTokenExpired(): boolean {
    const expiresAt = this.getExpiresAt();
    if (!expiresAt) return true;
    
    // Add 5 minute buffer before expiration
    return Date.now() >= (expiresAt - 5 * 60 * 1000);
  }

  // Get current authentication state
  getAuthState(): GoogleAuthState {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    const user = this.getStoredUserInfo(); // Use stored user info instead of async call
    const expiresAt = this.getExpiresAt();

    return {
      isAuthenticated: !!(accessToken && user && !this.isTokenExpired()),
      user,
      accessToken,
      refreshToken,
      expiresAt,
    };
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getAuthState().isAuthenticated;
  }

  // Get valid access token (refresh if needed)
  async getValidAccessToken(): Promise<string | null> {
    const authState = this.getAuthState();
    
    if (!authState.isAuthenticated) {
      return null;
    }

    if (this.isTokenExpired() && authState.refreshToken) {
      try {
        const newTokens = await this.refreshAccessToken(authState.refreshToken);
        return newTokens.access_token;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        this.clearAuth();
        return null;
      }
    }

    return authState.accessToken;
  }

  // Logout user
  logout(): void {
    this.clearAuth();
    
    // Redirect to home page
    window.location.href = '/';
  }

  // Private methods for token storage
  private storeTokens(tokenData: GoogleTokenResponse): void {
    if (tokenData.access_token) {
      localStorage.setItem('google_access_token', tokenData.access_token);
    }
    
    if (tokenData.refresh_token) {
      localStorage.setItem('google_refresh_token', tokenData.refresh_token);
    }
    
    if (tokenData.expires_in) {
      const expiresAt = Date.now() + (tokenData.expires_in * 1000);
      localStorage.setItem('google_expires_at', expiresAt.toString());
    }
  }

  private updateTokens(tokenData: GoogleTokenResponse): void {
    if (tokenData.access_token) {
      localStorage.setItem('google_access_token', tokenData.access_token);
    }
    
    if (tokenData.expires_in) {
      const expiresAt = Date.now() + (tokenData.expires_in * 1000);
      localStorage.setItem('google_expires_at', expiresAt.toString());
    }
  }

  private storeUserInfo(userInfo: GoogleUserInfo): void {
    localStorage.setItem('google_user', JSON.stringify(userInfo));
  }

  private getAccessToken(): string | null {
    return localStorage.getItem('google_access_token');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('google_refresh_token');
  }

  private getStoredUserInfoPrivate(): GoogleUserInfo | null {
    const userStr = localStorage.getItem('google_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Public method to get stored user info (non-async)
  getStoredUserInfo(): GoogleUserInfo | null {
    return this.getStoredUserInfoPrivate();
  }

  private getExpiresAt(): number | null {
    const expiresStr = localStorage.getItem('google_expires_at');
    return expiresStr ? parseInt(expiresStr, 10) : null;
  }

  private clearAuth(): void {
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('google_refresh_token');
    localStorage.removeItem('google_expires_at');
    localStorage.removeItem('google_user');
  }
}

// Export singleton instance
export const googleOAuthService = new GoogleOAuthService();
