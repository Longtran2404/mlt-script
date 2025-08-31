import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, Shield, Key } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { googleOAuthService, GoogleTokenResponse, GoogleUserInfo } from '../services/googleOAuth';

interface OAuth2CallbackProps {
  onPageChange?: (page: string) => void;
}

export default function OAuth2Callback({ onPageChange }: OAuth2CallbackProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [tokenData, setTokenData] = useState<GoogleTokenResponse | null>(null);
  const [userInfo, setUserInfo] = useState<GoogleUserInfo | null>(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Lấy authorization code từ URL
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const state = searchParams.get('state');

        if (error) {
          setStatus('error');
          setErrorMessage(`OAuth Error: ${error}`);
          return;
        }

        if (!code) {
          setStatus('error');
          setErrorMessage('Authorization code not found');
          return;
        }

        // Log để debug
        console.log('OAuth2 Callback received:', { code, state });

        // Exchange authorization code for tokens
        const tokenData = await googleOAuthService.exchangeCodeForTokens(code);
        setTokenData(tokenData);

        // Get user information
        const userInfo = await googleOAuthService.getUserInfo(tokenData.access_token);
        setUserInfo(userInfo);

        setStatus('success');

        // Redirect sau 3 giây hoặc cho phép user click button
        setTimeout(() => {
          if (onPageChange) {
            onPageChange('dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 3000);

      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, onPageChange]);

  const handleContinue = () => {
    if (onPageChange) {
      onPageChange('dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleRetry = () => {
    setStatus('loading');
    setErrorMessage('');
    // Redirect về trang login hoặc Google OAuth
    if (onPageChange) {
      onPageChange('home');
    } else {
      navigate('/');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-4"
            >
              <Loader2 className="w-12 h-12 text-blue-600" />
            </motion.div>
            <CardTitle className="text-xl">Đang xử lý đăng nhập...</CardTitle>
            <CardDescription>
              Vui lòng chờ trong giây lát
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Xác thực với Google
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Key className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Exchange authorization code
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mx-auto mb-4"
            >
              <XCircle className="w-12 h-12 text-red-600" />
            </motion.div>
            <CardTitle className="text-xl text-red-600">Đăng nhập thất bại</CardTitle>
            <CardDescription className="text-red-500">
              {errorMessage}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                Có thể do:
              </h4>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                <li>• Kết nối mạng không ổn định</li>
                <li>• Quyền truy cập bị từ chối</li>
                <li>• Session đã hết hạn</li>
              </ul>
            </div>
            <div className="flex space-x-3">
              <Button onClick={handleRetry} variant="outline" className="flex-1">
                Thử lại
              </Button>
              <Button onClick={handleContinue} className="flex-1">
                Về trang chủ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mx-auto mb-4"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          <CardTitle className="text-xl text-green-600">Đăng nhập thành công!</CardTitle>
          <CardDescription>
            Chào mừng bạn đến với MLT Script AI Platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userInfo && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src={userInfo.picture}
                  alt={userInfo.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-200">
                    {userInfo.name}
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {userInfo.email}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Access Token:</span>
              <Badge variant="secondary" className="font-mono text-xs">
                {tokenData?.access_token?.substring(0, 8)}...
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Expires in:</span>
              <Badge variant="outline">
                {tokenData?.expires_in}s
              </Badge>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleContinue} className="w-full">
              Tiếp tục đến Dashboard
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Tự động chuyển hướng sau 3 giây...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
