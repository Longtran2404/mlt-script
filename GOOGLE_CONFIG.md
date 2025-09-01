# 🔧 Cấu Hình Google Console Platform

## 📋 Thông Tin Đăng Nhập
- **Email**: tranminhlong2404@gmail.com
- **Project ID**: ai-agent-project-454011

## 🔑 OAuth2 Credentials
```
Client ID: [YOUR_GOOGLE_CLIENT_ID]
Client Secret: [YOUR_GOOGLE_CLIENT_SECRET]
```

## 🔗 Cấu Hình Redirect URIs
### Authorized JavaScript origins:
```
http://localhost:3000
https://mlt-script.vercel.app
```

### Authorized redirect URIs:
```
http://localhost:3000/oauth2/callback
https://mlt-script.vercel.app/oauth2/callback
```

## 📄 Service Account
```
Email: minhlong244@ai-agent-project-454011.iam.gserviceaccount.com
Project: ai-agent-project-454011
```

## 🚀 Cách Sử Dụng

### 1. Tạo file .env trong thư mục gốc:
```env
REACT_APP_GOOGLE_CLIENT_ID=[YOUR_GOOGLE_CLIENT_ID]
REACT_APP_GOOGLE_CLIENT_SECRET=[YOUR_GOOGLE_CLIENT_SECRET]
REACT_APP_VLU_SCRIPT_SHEET_ID=[YOUR_SHEET_ID]
REACT_APP_OAUTH2_REDIRECT_URI=http://localhost:3000/oauth2/callback
REACT_APP_BACKEND_URL=http://localhost:3000
NODE_ENV=development
```

### 2. Khởi động ứng dụng:
```bash
npm start
```

### 3. Kiểm tra kết nối:
- Vào trang **Quản Lý > Cài đặt hệ thống**
- Xem **Connection Status** để kiểm tra kết nối
- Thử **Kết nối Google** để test OAuth2

## ✅ Kết Quả Mong Đợi
- ✅ Kết nối thành công với Google OAuth2
- ✅ Có thể truy cập Google Sheets
- ✅ Connection Status hiển thị trạng thái kết nối
- ✅ Auto-refresh mỗi 30 giây
