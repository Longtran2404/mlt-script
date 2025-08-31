import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@mlt.edu.vn",
      phone: "+84 123 456 789",
      bio: "Giảng viên khoa Công nghệ thông tin tại MLT",
    },
    preferences: {
      language: "vietnamese",
      timezone: "Asia/Ho_Chi_Minh",
      dateFormat: "DD/MM/YYYY",
      theme: "auto",
    },
    notifications: {
      email: true,
      push: false,
      sms: true,
      marketing: false,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
    },
  });

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    // eslint-disable-next-line no-console
    console.log("Settings saved:", settings);
  };

  const tabs = [
    { id: "profile", label: "Hồ sơ", icon: User },
    { id: "preferences", label: "Tùy chọn", icon: Palette },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "security", label: "Bảo mật", icon: Shield },
    { id: "integrations", label: "Tích hợp", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cài đặt
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Quản lý tài khoản và tùy chọn hệ thống
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Thông tin hồ sơ
                  </CardTitle>
                  <CardDescription>
                    Cập nhật thông tin cá nhân của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Họ và tên
                      </label>
                      <Input
                        value={settings.profile.name}
                        onChange={(e) =>
                          handleInputChange("profile", "name", e.target.value)
                        }
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) =>
                          handleInputChange("profile", "email", e.target.value)
                        }
                        placeholder="Nhập email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Số điện thoại
                    </label>
                    <Input
                      value={settings.profile.phone}
                      onChange={(e) =>
                        handleInputChange("profile", "phone", e.target.value)
                      }
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Giới thiệu
                    </label>
                    <Textarea
                      value={settings.profile.bio}
                      onChange={(e) =>
                        handleInputChange("profile", "bio", e.target.value)
                      }
                      placeholder="Viết giới thiệu về bản thân"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Tùy chọn hệ thống
                  </CardTitle>
                  <CardDescription>
                    Tùy chỉnh giao diện và hành vi hệ thống
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Ngôn ngữ
                      </label>
                      <Select
                        value={settings.preferences.language}
                        onValueChange={(value) =>
                          handleInputChange("preferences", "language", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vietnamese">Tiếng Việt</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Múi giờ
                      </label>
                      <Select
                        value={settings.preferences.timezone}
                        onValueChange={(value) =>
                          handleInputChange("preferences", "timezone", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Ho_Chi_Minh">
                            Việt Nam (GMT+7)
                          </SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Định dạng ngày
                      </label>
                      <Select
                        value={settings.preferences.dateFormat}
                        onValueChange={(value) =>
                          handleInputChange("preferences", "dateFormat", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Giao diện
                      </label>
                      <Select
                        value={settings.preferences.theme}
                        onValueChange={(value) =>
                          handleInputChange("preferences", "theme", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Sáng</SelectItem>
                          <SelectItem value="dark">Tối</SelectItem>
                          <SelectItem value="auto">Tự động</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Cài đặt thông báo
                  </CardTitle>
                  <CardDescription>
                    Quản lý cách bạn nhận thông báo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium">Thông báo qua email</p>
                        <p className="text-sm text-gray-500">
                          Nhận thông báo quan trọng qua email
                        </p>
                      </div>
                      <Button
                        variant={
                          settings.notifications.email ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          handleInputChange(
                            "notifications",
                            "email",
                            !settings.notifications.email
                          )
                        }
                      >
                        {settings.notifications.email ? "Bật" : "Tắt"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium">Thông báo đẩy</p>
                        <p className="text-sm text-gray-500">
                          Thông báo trực tiếp trên trình duyệt
                        </p>
                      </div>
                      <Button
                        variant={
                          settings.notifications.push ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          handleInputChange(
                            "notifications",
                            "push",
                            !settings.notifications.push
                          )
                        }
                      >
                        {settings.notifications.push ? "Bật" : "Tắt"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium">Thông báo SMS</p>
                        <p className="text-sm text-gray-500">
                          Nhận thông báo qua tin nhắn
                        </p>
                      </div>
                      <Button
                        variant={
                          settings.notifications.sms ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          handleInputChange(
                            "notifications",
                            "sms",
                            !settings.notifications.sms
                          )
                        }
                      >
                        {settings.notifications.sms ? "Bật" : "Tắt"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Bảo mật tài khoản
                  </CardTitle>
                  <CardDescription>
                    Quản lý bảo mật và quyền truy cập
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Mật khẩu hiện tại
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Mật khẩu mới
                      </label>
                      <Input type="password" placeholder="Nhập mật khẩu mới" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Xác nhận mật khẩu
                      </label>
                      <Input
                        type="password"
                        placeholder="Nhập lại mật khẩu mới"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">Xác thực 2 yếu tố</p>
                      <p className="text-sm text-gray-500">
                        Tăng cường bảo mật tài khoản
                      </p>
                    </div>
                    <Button
                      variant={
                        settings.security.twoFactor ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleInputChange(
                          "security",
                          "twoFactor",
                          !settings.security.twoFactor
                        )
                      }
                    >
                      {settings.security.twoFactor ? "Bật" : "Tắt"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Integrations Tab */}
            {activeTab === "integrations" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Tích hợp bên thứ ba
                  </CardTitle>
                  <CardDescription>
                    Kết nối với các dịch vụ bên ngoài
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold">G</span>
                      </div>
                      <div>
                        <p className="font-medium">Google Drive</p>
                        <p className="text-sm text-gray-500">
                          Đồng bộ và lưu trữ tài liệu
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Kết nối
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 font-bold">S</span>
                      </div>
                      <div>
                        <p className="font-medium">Slack</p>
                        <p className="text-sm text-gray-500">
                          Thông báo và cộng tác
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Kết nối
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Save Button */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button onClick={handleSave} className="w-full" size="lg">
                <Save className="w-4 h-4 mr-2" />
                Lưu thay đổi
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
