# 🎬 MLT Script AI Platform

**Nền tảng AI All-in-One để tạo kịch bản và video chuyên nghiệp** - Single Page Application tích hợp đầy đủ chức năng.

🌐 **Live Demo**: [https://mlt-script.vercel.app](https://mlt-script.vercel.app)

## ✨ Tính năng đầy đủ trong 1 trang

### 🎬 Tạo Video AI
- Chuyển đổi kịch bản thành video chuyên nghiệp
- Form nhập kịch bản với editor thông minh
- Chọn phong cách: Modern, Classic, Minimal, Creative
- Chọn nhạc nền: Upbeat, Calm, Dramatic, Corporate
- Preview và export video chất lượng cao

### 📝 Tạo Kịch Bản AI  
- **6 dịch vụ học tập MLT**: Marketing Digital, Khởi Nghiệp, Lập Trình, Quản Lý, Sức Khỏe, Tài Chính
- **Card flip animations** - hover để xem ví dụ kịch bản
- **5 loại giọng điệu**: Nam/nữ trẻ, Nam/nữ trưởng thành, Trẻ em
- **Slider thời lượng**: 30-60s với Veo 2 / Gemini Veo 3 selection
- **Webhook integration**: Gửi dữ liệu tới n8n endpoint
- **Session ID tracking**: Theo dõi từng request

### 📊 Script Manager - Google Sheets Integration
- Kết nối trực tiếp với Google Sheets
- Import/Export kịch bản tự động
- Multi-sheet support cho nhiều project
- Real-time sync và localStorage cache
- Google OAuth2 authentication

### 🎯 Dashboard & Analytics
- Thống kê real-time từ Google Sheets
- Biểu đồ hiệu suất dự án
- Quản lý tiến độ và deadline
- Export báo cáo PDF/Excel

### 🎨 Modern UI/UX tất cả trong 1
- **Responsive design** hoàn hảo trên mọi thiết bị
- **Dark/Light theme** toggle
- **Navigation sidebar** với highlight active
- **Framer Motion animations** mượt mà
- **Loading states** và error handling
- **Success/error notifications** thông minh

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

## 📁 Kiến trúc Single Page App

```
src/
├── components/          # All-in-One UI Components
│   ├── ui/             # ShadCN UI components (Button, Card, Input...)
│   ├── layout/         # MainLayout, Header, Sidebar
│   ├── ServiceCardDemo.tsx    # Demo cards
│   ├── ChatBot.tsx            # AI Chatbot widget
│   └── StarField.tsx          # Background effects
├── pages/              # Main Application Features
│   ├── NewHome.tsx            # Landing page với hero section
│   ├── TaoVideo.tsx           # Video AI creation tool
│   ├── TaoKichBan.tsx         # Script AI generation
│   ├── ScriptManager.tsx      # Google Sheets integration
│   ├── EnhancedDashboard.tsx  # Analytics & stats
│   └── OAuth2Callback.tsx     # Google auth handler
├── services/           # Backend Integration
│   ├── googleAuth.ts          # Google OAuth2 + Sheets API
│   ├── googleSheets.ts        # Sheet operations
│   └── googleOAuth.ts         # Authentication flow  
├── contexts/           # Global State
│   └── ThemeContext.tsx       # Dark/Light theme
├── types/              # TypeScript Definitions
│   ├── script.types.ts        # Script & scene interfaces
│   └── sheets.types.ts        # Google Sheets types
└── lib/                # Utilities
    └── utils.ts               # Helper functions
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

## 🎯 Chức năng All-in-One

**Tất cả trong 1 trang duy nhất** - không cần chuyển trang, mọi thứ được tích hợp mượt mà:

✅ **Landing Page** - Hero section với CTA buttons  
✅ **Video AI Creation** - Form tạo video với preview  
✅ **Script AI Generation** - 6 service cards với flip animations  
✅ **Google Sheets Manager** - Import/export kịch bản real-time  
✅ **Dashboard Analytics** - Charts và statistics  
✅ **Settings Panel** - Theme toggle, user preferences  
✅ **OAuth Integration** - Seamless Google login flow  

**🎨 Single Page Experience:**
- Sidebar navigation với smooth transitions
- Modal dialogs thay vì page redirects  
- Loading states cho mọi action
- Real-time updates không cần refresh

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

**🌟 Production URL**: [https://mlt-script.vercel.app](https://mlt-script.vercel.app)

**🎯 Direct Features:**
- 🏠 **Main App**: https://mlt-script.vercel.app/ 
- 🎬 **Video Creation**: Click "Tạo Video AI" button
- 📝 **Script Generation**: Click "Tạo Kịch Bản AI" button  
- 📊 **Script Manager**: Click "Quản Lý Kịch Bản" in sidebar
- 📈 **Dashboard**: Click "Dashboard" in navigation

> **Note**: Tất cả tính năng trong cùng 1 URL - Single Page Application!

---

⭐ **Star dự án này nếu bạn thấy hữu ích!**
# Force rebuild to load env vars
