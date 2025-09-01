# 🔐 Hướng dẫn cấu hình Google OAuth cho MLT Script AI Platform

## 📋 Yêu cầu cấu hình

Để sử dụng tính năng "Quản lý Kịch Bản VLU" với Google Sheets, bạn cần cấu hình Google OAuth2. Dưới đây là hướng dẫn chi tiết:

## 🚀 Bước 1: Tạo Google Cloud Project

### 1.1 Truy cập Google Cloud Console

- Vào [Google Cloud Console](https://console.cloud.google.com/)
- Đăng nhập bằng tài khoản Google của bạn

### 1.2 Tạo Project mới

- Click "Select a project" ở góc trên bên trái
- Click "New Project"
- Đặt tên project: `MLT Script AI Platform`
- Click "Create"

### 1.3 Enable APIs

- Vào "APIs & Services" > "Library"
- Tìm và enable các API sau:
  - **Google Sheets API**
  - **Google Drive API**
  - **Google Identity Services API**

## 🔑 Bước 2: Tạo OAuth 2.0 Credentials

### 2.1 Tạo OAuth 2.0 Client ID

- Vào "APIs & Services" > "Credentials"
- Click "Create Credentials" > "OAuth client ID"
- Chọn "Web application"
- Đặt tên: `MLT Script AI Platform Web Client`

### 2.2 Cấu hình Authorized Origins

Thêm các origins sau vào "Authorized JavaScript origins":

```
http://localhost:3000
https://mlt-script.vercel.app
https://your-custom-domain.vercel.app
```

### 2.3 Cấu hình Authorized Redirect URIs

Thêm các redirect URIs sau:

```
http://localhost:3000/oauth2/callback.html
https://mlt-script.vercel.app/oauth2/callback.html
https://your-custom-domain.vercel.app/oauth2/callback.html
```

### 2.4 Lưu thông tin credentials

Sau khi tạo, bạn sẽ nhận được:

- **Client ID**: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-abcdefghijklmnopqrstuvwxyz`

## ⚙️ Bước 3: Cấu hình Environment Variables

### 3.1 Tạo file .env.local

Tạo file `.env.local` trong thư mục gốc của dự án:

```bash
# Google OAuth2 Configuration
REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here
REACT_APP_GOOGLE_CLIENT_SECRET=your_client_secret_here

# Google Sheets Configuration
REACT_APP_VLU_SCRIPT_SHEET_ID=1Q43gGNkseRl5dZDnenhNVvJCf7cappiKykCraqL-B-A

# OAuth2 Redirect URI
REACT_APP_OAUTH2_REDIRECT_URI=http://localhost:3000/oauth2/callback.html

# Development settings
NODE_ENV=development
REACT_APP_ENV=development
```

### 3.2 Cấu hình cho Production (Vercel)

Nếu deploy lên Vercel, thêm environment variables trong Vercel dashboard:

```bash
REACT_APP_GOOGLE_CLIENT_ID=your_production_client_id
REACT_APP_OAUTH2_REDIRECT_URI=https://mlt-script.vercel.app/oauth2/callback.html
```

## 📊 Bước 4: Cấu hình Google Sheets

### 4.1 Tạo Google Sheet

- Tạo Google Sheet mới
- Đặt tên: `VLU-KỊCH BẢN`
- Chia sẻ với tài khoản Google của bạn (Editor quyền)

### 4.2 Cấu trúc Sheet

Tạo các cột sau trong sheet:

- **A**: ID
- **B**: Title
- **C**: Description
- **D**: Duration
- **E**: Scenes (JSON)
- **F**: Created At
- **G**: Updated At
- **H**: Status
- **I**: Tags

### 4.3 Lấy Sheet ID

- Copy URL của sheet
- Sheet ID là phần giữa `/d/` và `/edit`
- Ví dụ: `https://docs.google.com/spreadsheets/d/1Q43gGNkseRl5dZDnenhNVvJCf7cappiKykCraqL-B-A/edit`
- Sheet ID: `1Q43gGNkseRl5dZDnenhNVvJCf7cappiKykCraqL-B-A`

## 🧪 Bước 5: Test cấu hình

### 5.1 Chạy ứng dụng locally

```bash
npm install
npm start
```

### 5.2 Test kết nối Google

- Vào trang "Quản lý Kịch Bản VLU"
- Click "Kết nối Google"
- Đăng nhập bằng tài khoản Google
- Kiểm tra xem có thể load/save dữ liệu không

## 🔧 Troubleshooting

### Lỗi "Không thể kết nối Google Sheets"

**Nguyên nhân:**

- Client ID chưa được cấu hình đúng
- APIs chưa được enable
- Redirect URI không khớp

**Giải pháp:**

1. Kiểm tra file `.env.local`
2. Verify Google Cloud Console settings
3. Check browser console cho error messages

### Lỗi "Popup bị chặn"

**Nguyên nhân:**

- Browser chặn popup
- Ad blocker

**Giải pháp:**

1. Allow popup cho domain
2. Disable ad blocker tạm thời
3. Sử dụng incognito mode

### Lỗi "Access denied"

**Nguyên nhân:**

- Sheet chưa được chia sẻ
- Quyền truy cập không đủ

**Giải pháp:**

1. Share sheet với tài khoản Google
2. Set quyền "Editor"
3. Kiểm tra sheet ID

## 📱 Cấu hình cho Production

### Vercel Deployment

1. Vào Vercel dashboard
2. Chọn project
3. Vào "Settings" > "Environment Variables"
4. Thêm các biến môi trường

### Custom Domain

Nếu sử dụng custom domain, cập nhật:

- Authorized origins trong Google Cloud Console
- Redirect URIs
- Environment variables

## 🔒 Bảo mật

### Best Practices

- Không commit file `.env.local` vào git
- Sử dụng environment variables cho production
- Regularly rotate Client Secret
- Monitor API usage

### Security Checklist

- [ ] Client Secret được bảo vệ
- [ ] Redirect URIs được cấu hình đúng
- [ ] HTTPS được sử dụng cho production
- [ ] API quotas được monitor

## 📞 Hỗ trợ

Nếu gặp vấn đề:

1. Kiểm tra browser console
2. Verify Google Cloud Console settings
3. Test với incognito mode
4. Contact support: support@mlt.edu.vn

---

**Lưu ý:** Đảm bảo tuân thủ [Google OAuth 2.0 Policies](https://developers.google.com/identity/protocols/oauth2) và [Google Sheets API Quotas](https://developers.google.com/sheets/api/limits).
