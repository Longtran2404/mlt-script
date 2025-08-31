# 🚀 MLT Script AI Platform

Nền tảng AI tiên tiến để tạo video và kịch bản chuyên nghiệp, được xây dựng với React, TypeScript, Tailwind CSS và ShadCN UI.

## ✨ Tính năng chính

### 🎬 Tạo Video AI
- Chuyển đổi kịch bản thành video chuyên nghiệp
- Hỗ trợ nhiều phong cách và thời lượng
- Giao diện trực quan và dễ sử dụng

### ✍️ Tạo Kịch Bản AI
- Tạo kịch bản chuyên nghiệp với sự hỗ trợ của AI
- Tối ưu cho mọi loại nội dung
- Hỗ trợ nhiều tone và phong cách

### 📊 Quản lý Dự án
- Dashboard tổng quan với thống kê chi tiết
- Quản lý tiến độ dự án
- Phân công và theo dõi thành viên

### 📈 Analytics & Báo cáo
- Phân tích hiệu suất nội dung
- Thống kê lượt xem, tải xuống, chia sẻ
- Báo cáo chi tiết theo thời gian

### 🔐 Google OAuth2 Integration
- Đăng nhập bằng Google Account
- Tích hợp Google Drive API
- Tích hợp Google Sheets API
- Quản lý file và dữ liệu tự động

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Deployment**: Vercel
- **Authentication**: Google OAuth2

## 🎨 ShadCN UI Components

Dự án đã được tích hợp đầy đủ với ShadCN UI, bao gồm:

- ✅ **Button** - Nút với nhiều variants và sizes
- ✅ **Card** - Card components với header, content, footer
- ✅ **Input** - Input field với styling nhất quán
- ✅ **Textarea** - Textarea với responsive design
- ✅ **Select** - Dropdown select với options
- ✅ **Badge** - Badge với nhiều variants
- ✅ **Utils** - Helper functions (cn, clsx, tailwind-merge)

## 📁 Cấu trúc dự án

```
src/
├── components/          # UI components (ShadCN + custom)
│   ├── ui/             # ShadCN UI components
│   ├── layout/         # Layout components
│   └── ...             # Custom components
├── pages/              # Các trang chính
│   ├── Home.tsx        # Trang chủ
│   ├── Dashboard.tsx   # Dashboard tổng quan
│   ├── TaoVideo.tsx    # Tạo video AI
│   ├── TaoKichBan.tsx  # Tạo kịch bản AI
│   └── ...             # Các trang khác
├── services/           # API services
│   ├── googleOAuth.ts  # Google OAuth2 service
│   └── ...             # Các service khác
├── contexts/           # React Context
├── lib/                # Utilities & hooks
└── types/              # TypeScript definitions
```

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 16+
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
npm start
```

### Build production
```bash
npm run build
```

### Kiểm tra lint
```bash
npm run lint
```

## 🔐 Google OAuth2 Setup

### 1. Tạo Google Cloud Project
- Truy cập [Google Cloud Console](https://console.cloud.google.com/)
- Enable Google Drive API và Google Sheets API
- Tạo OAuth2 credentials

### 2. Cấu hình Environment Variables
Tạo file `.env`:
```bash
REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here
REACT_APP_GOOGLE_CLIENT_SECRET=your_client_secret_here
REACT_APP_OAUTH2_REDIRECT_URI=http://localhost:3000/oauth2/callback
```

### 3. Cấu hình Google Cloud Console
- **Authorized JavaScript origins**: `http://localhost:3000`
- **Authorized redirect URIs**: `http://localhost:3000/oauth2/callback`

## 🌐 Deployment

### Vercel Deployment
Dự án đã được cấu hình sẵn để deploy lên Vercel:

1. **Connect GitHub repository** với Vercel
2. **Import project** từ GitHub
3. **Set environment variables** trong Vercel dashboard
4. **Deploy** tự động

### Environment Variables (Production)
```bash
REACT_APP_GOOGLE_CLIENT_ID=your_production_client_id
REACT_APP_OAUTH2_REDIRECT_URI=https://your-domain.vercel.app/oauth2/callback
```

## 📱 Responsive Design

- **Mobile**: Tối ưu cho màn hình nhỏ
- **Tablet**: Layout thích ứng cho tablet
- **Desktop**: Giao diện đầy đủ cho desktop
- **Navigation**: Mobile menu với hamburger

## 🎯 Các trang đã được tạo

1. **Home** - Landing page với hero section
2. **Dashboard** - Analytics và thống kê
3. **TaoVideo** - Tạo video AI
4. **TaoKichBan** - Tạo kịch bản AI
5. **ProjectManagement** - Quản lý dự án
6. **Analytics** - Phân tích dữ liệu
7. **Settings** - Cài đặt hệ thống
8. **OAuth2Callback** - Google OAuth2 callback

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này được phát hành dưới MIT License.

## 📞 Liên hệ

- **Email**: support@mlt.edu.vn
- **Website**: https://mlt.edu.vn
- **GitHub**: [MLT Script AI Platform](https://github.com/mlt/script-ai-platform)

## 🚀 Live Demo

**Production URL**: [https://mlt-script.vercel.app](https://mlt-script.vercel.app)

---

⭐ **Star dự án này nếu bạn thấy hữu ích!**
# Force rebuild to load env vars
