# 🚀 VLU Script Management System - Modern Edition

A comprehensive, modern web application for managing video scripts, projects, and content creation workflows at VLU (Van Lang University). Built with cutting-edge technologies and designed for international standards.

## ✨ Features

### 🎯 Core Functionality
- **Script Management**: Create, edit, and manage video scripts with AI assistance
- **Video Creation**: Professional video recording and editing tools
- **Project Management**: Comprehensive project tracking and team collaboration
- **Analytics Dashboard**: Real-time insights and performance metrics
- **Google Integration**: Seamless Google Sheets and Drive integration

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful glass-like effects and modern aesthetics
- **Responsive Layout**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Automatic theme switching with system preferences
- **Smooth Animations**: Framer Motion powered interactions
- **International Design**: Modern, professional appearance meeting global standards

### 🔧 Technical Features
- **TypeScript**: Full type safety and modern JavaScript features
- **React 18**: Latest React features with hooks and modern patterns
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **ShadCN UI**: High-quality, accessible component library
- **Framer Motion**: Smooth animations and micro-interactions

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - Professional component library
- **Framer Motion** - Animation library for React
- **Lucide React** - Beautiful, customizable icons

### Backend & Services
- **Google Sheets API** - Data storage and management
- **Google Drive API** - File storage and sharing
- **Google OAuth 2.0** - Secure authentication
- **Vercel** - Modern deployment platform

### Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **React Router DOM** - Client-side routing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Cloud Platform account
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vercel-n8n-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local`:
   ```env
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   REACT_APP_VLU_SCRIPT_SHEET_ID=your_sheet_id
   REACT_APP_GOOGLE_API_KEY=your_api_key
   ```

4. **Start development server**
   ```bash
   npm start
   ```

## 📱 Available Pages

### 🏠 Home & Landing
- **`/`** - Modern landing page with features showcase
- **`/home`** - Alternative home route

### 📊 Dashboard & Analytics
- **`/dashboard`** - Enhanced dashboard with project overview
- **`/analytics`** - Comprehensive analytics and insights
- **`/modern-dashboard`** - Experimental modern dashboard

### ✍️ Content Creation
- **`/script-creator`** - AI-powered script creation tool
- **`/tao-video`** - Professional video recording interface

### 📋 Management & Organization
- **`/script-manager`** - Script management and editing
- **`/quan-ly`** - General management interface
- **`/quan-ly-du-an`** - Project management system

### ⚙️ System & Support
- **`/settings`** - Application settings and preferences
- **`/help`** - Help and documentation
- **`/oauth2callback`** - Google OAuth callback handler

## 🔐 Google Integration Setup

### 1. Google Cloud Platform
- Create a new project
- Enable Google Sheets API and Google Drive API
- Create OAuth 2.0 credentials
- Configure authorized redirect URIs

### 2. Google Sheets
- Create a new spreadsheet
- Share with your service account
- Note the spreadsheet ID for environment variables

### 3. Environment Variables
```env
REACT_APP_GOOGLE_CLIENT_ID=your_client_id
REACT_APP_VLU_SCRIPT_SHEET_ID=your_spreadsheet_id
REACT_APP_GOOGLE_API_KEY=your_api_key
```

## 🚀 Deployment

### Vercel Deployment
1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Ensure Google OAuth redirect URIs are updated

### Manual Deployment
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy build folder**
   - Upload to your hosting provider
   - Configure environment variables
   - Update Google OAuth redirect URIs

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradients (#3B82F6 to #8B5CF6)
- **Secondary**: Green gradients (#10B981 to #059669)
- **Accent**: Purple gradients (#8B5CF6 to #EC4899)
- **Neutral**: Gray scale (#F8FAFC to #1E293B)

### Typography
- **Headings**: Inter font family
- **Body**: System font stack
- **Monospace**: JetBrains Mono for code

### Components
- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Modern input styles with focus states
- **Navigation**: Sticky headers with smooth transitions

## 🔧 Development

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run tests
npm run eject      # Eject from Create React App
```

### Code Style
- **ESLint**: Enforces code quality rules
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking enabled
- **Component Structure**: Functional components with hooks

### File Organization
```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API and external services
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
└── styles/        # Global styles and CSS
```

## 🌟 Key Improvements in Modern Edition

### 1. **Enhanced User Experience**
- Smooth animations and micro-interactions
- Responsive design for all devices
- Modern glassmorphism aesthetics
- Improved navigation and layout

### 2. **Performance Optimization**
- Lazy loading for better performance
- Optimized bundle size
- Efficient state management
- Modern React patterns

### 3. **International Standards**
- Professional design language
- Accessibility improvements
- Modern web standards compliance
- Cross-browser compatibility

### 4. **Developer Experience**
- TypeScript for better development
- Modern component architecture
- Comprehensive error handling
- Better code organization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in `/help` page

---

**Built with ❤️ for VLU by the Development Team**
