# 🚀 Hướng dẫn nhanh cấu hình Google Cloud Console

## ⚠️ Vấn đề hiện tại:

- Google Identity Services đã load thành công ✅
- Button click đang hoạt động ✅
- Nhưng Google OAuth prompt không hiện ra ❌

## 🔧 Các bước cần kiểm tra:

### 1. **OAuth Consent Screen**

- Vào [Google Cloud Console](https://console.cloud.google.com/)
- Chọn project của bạn
- Vào "APIs & Services" > "OAuth consent screen"
- Đảm bảo đã cấu hình:
  - App name: `MLT Script AI Platform`
  - User support email: Email của bạn
  - Developer contact information: Email của bạn
  - **Quan trọng**: Thêm email của bạn vào "Test users" nếu app chưa publish

### 2. **OAuth 2.0 Credentials**

- Vào "APIs & Services" > "Credentials"
- Kiểm tra OAuth 2.0 Client ID:
  - **Authorized JavaScript origins**:
    ```
    http://localhost:3000
    https://mlt-script.vercel.app
    ```
  - **Authorized redirect URIs**:
    ```
    http://localhost:3000/oauth2/callback.html
    https://mlt-script.vercel.app/oauth2/callback.html
    ```

### 3. **APIs Enabled**

- Vào "APIs & Services" > "Library"
- Enable các API:
  - Google Sheets API
  - Google Drive API
  - Google Identity Services API

### 4. **Test ngay bây giờ:**

1. Mở browser console
2. Click "🧪 Test Connection" button
3. Xem có lỗi gì trong console không
4. Click "🌐 Test Popup" button để test popup method

## 🔍 Debug Steps:

1. **Kiểm tra console logs** - Xem có lỗi gì không
2. **Test Google Identity Services** - Click "🧪 Test Connection"
3. **Test Popup method** - Click "🌐 Test Popup"
4. **Kiểm tra Google Cloud Console** - Đảm bảo cấu hình đúng

## 📞 Nếu vẫn không hoạt động:

1. Kiểm tra popup blocker
2. Thử incognito mode
3. Kiểm tra network tab trong DevTools
4. Contact support: support@mlt.edu.vn
