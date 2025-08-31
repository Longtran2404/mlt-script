"use client";

import React, { useState, useEffect } from "react";
import { ServiceMultiSelect } from "../components/ServiceMultiSelect";
import {
  Sparkles,
  Target,
  Clock,
  FileText,
  Loader2,
  CheckCircle,
  XCircle,
  Brain,
  Globe,
  Crown,
  Sword,
  Shield,
  Zap as Lightning,
  Flame,
  Mountain,
  TreePine,
  Gem,
  Trophy,
  Palette,
  Building2,
  AlertCircle,
} from "lucide-react";

type SubmitResult =
  | { ok: true; session_id: string; webhook_response: any }
  | { ok: false; message?: string; errors?: any };

type TabType =
  | "quest"
  | "characters"
  | "world"
  | "combat"
  | "magic"
  | "advanced"
  | "settings";

export default function TaoKichBan() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("quest");
  const [kichBan, setKichBan] = useState("");
  const [moTa, setMoTa] = useState("");
  const [nganh, setNganh] = useState("Giáo dục & Đào tạo");
  const [brand, setBrand] = useState("VLU UNIVERSITY");
  const [tone, setTone] = useState("Chuyên nghiệp – Hiện đại – Đáng tin cậy");
  const [duration, setDuration] = useState(180);
  const [dichVu, setDichVu] = useState<string[]>([]);
  const [questType, setQuestType] = useState("Tuyển sinh");
  const [characterClass, setCharacterClass] = useState("Cử nhân");
  const [worldZone, setWorldZone] = useState("Cơ sở chính");
  const [difficulty, setDifficulty] = useState("Trung bình");
  const [magicType, setMagicType] = useState("Trực tuyến");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kich_ban: kichBan || moTa,
          mo_ta: moTa,
          dich_vu: dichVu,
          nganh_nghe: nganh,
          brand,
          tone,
          duration_sec: Number(duration),
        }),
      });
      const data = (await res.json()) as SubmitResult;
      setResult(data);
    } catch (err: any) {
      setResult({ ok: false, message: err?.message || "Network error" });
    } finally {
      setLoading(false);
    }
  };

  if (isMobile) {
    // Mobile Layout - Red & White Theme
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
        {/* Mobile Header - WOW Theme */}
        <div className="px-4 py-6 text-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 text-white relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

          <div className="flex items-center justify-center gap-2 mb-3 relative z-10">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center animate-pulse">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              VLU UNIVERSITY
            </h1>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
              <Trophy className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-sm text-blue-200 mb-2 font-medium">
            Dịch vụ Tuyển sinh & Đào tạo
          </p>
          <div className="flex justify-center gap-3 text-xs">
            <span className="flex items-center gap-1 bg-blue-800/50 px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              CHẤT LƯỢNG
            </span>
            <span className="flex items-center gap-1 bg-purple-800/50 px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              UY TÍN
            </span>
            <span className="flex items-center gap-1 bg-indigo-800/50 px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              HIỆN ĐẠI
            </span>
          </div>
        </div>

        {/* Mobile Form */}
        <form onSubmit={onSubmit} className="p-4 space-y-6 pb-20">
          {/* Thông tin Tuyển sinh Section */}
          <div className="bg-white rounded-2xl p-4 border-2 border-blue-200 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Thông tin Tuyển sinh & Đào tạo
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  <span className="flex items-center gap-2">
                    <Lightning className="w-4 h-4 text-yellow-500" />
                    Nội dung Chính & Thông điệp *
                  </span>
                </label>
                <textarea
                  required
                  value={kichBan}
                  onChange={(e) => setKichBan(e.target.value)}
                  placeholder="Ví dụ: Thông báo tuyển sinh ngành Công nghệ thông tin, hệ đại học chính quy năm 2024..."
                  className="w-full h-28 rounded-xl border-2 border-blue-200 bg-blue-50 px-3 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-green-500" />
                    Chi tiết & Yêu cầu Đặc biệt
                  </span>
                </label>
                <textarea
                  value={moTa}
                  onChange={(e) => setMoTa(e.target.value)}
                  placeholder="Thiết lập: Địa điểm, đối tượng mục tiêu, hiệu ứng đặc biệt, lời kêu gọi hành động..."
                  className="w-full h-24 rounded-xl border-2 border-blue-200 bg-blue-50 px-3 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Ngành học & Chuyên ngành Section */}
          <div className="bg-white rounded-2xl p-4 border-2 border-purple-200 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Sword className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Ngành học & Chuyên ngành
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Chọn các ngành học và chuyên ngành đào tạo
            </p>
            <ServiceMultiSelect value={dichVu} onChange={setDichVu} />
          </div>

          {/* Thông tin Tuyển sinh & Cơ sở Section */}
          <div className="bg-white rounded-2xl p-4 border-2 border-green-200 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Thông tin Tuyển sinh & Cơ sở
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">
                    <span className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      Loại hình Tuyển sinh
                    </span>
                  </label>
                  <select
                    value={questType}
                    onChange={(e) => setQuestType(e.target.value)}
                    className="w-full rounded-xl border-2 border-green-200 bg-green-50 px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                  >
                    <option value="Tuyển sinh">🎓 Tuyển sinh Đại học</option>
                    <option value="Tuyển sinh Cao đẳng">
                      🎓 Tuyển sinh Cao đẳng
                    </option>
                    <option value="Tuyển sinh Sau đại học">
                      🎓 Tuyển sinh Sau đại học
                    </option>
                    <option value="Tuyển sinh Liên thông">
                      🎓 Tuyển sinh Liên thông
                    </option>
                    <option value="Tuyển sinh Vừa học vừa làm">
                      🎓 Tuyển sinh Vừa học vừa làm
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      Bằng cấp
                    </span>
                  </label>
                  <select
                    value={characterClass}
                    onChange={(e) => setCharacterClass(e.target.value)}
                    className="w-full rounded-xl border-2 border-green-200 bg-green-50 px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                  >
                    <option value="Cử nhân">🎓 Cử nhân</option>
                    <option value="Kỹ sư">🎓 Kỹ sư</option>
                    <option value="Thạc sĩ">🎓 Thạc sĩ</option>
                    <option value="Tiến sĩ">🎓 Tiến sĩ</option>
                    <option value="Chứng chỉ">🎓 Chứng chỉ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  <span className="flex items-center gap-2">
                    <TreePine className="w-4 h-4 text-green-500" />
                    Cơ sở & Địa điểm
                  </span>
                </label>
                <select
                  value={worldZone}
                  onChange={(e) => setWorldZone(e.target.value)}
                  className="w-full rounded-xl border-2 border-green-200 bg-green-50 px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                >
                  <option value="Cơ sở chính">🏢 Cơ sở chính - TP.HCM</option>
                  <option value="Cơ sở 2">🏢 Cơ sở 2 - Bình Dương</option>
                  <option value="Cơ sở 3">🏢 Cơ sở 3 - Đồng Nai</option>
                  <option value="Cơ sở 4">
                    🏢 Cơ sở 4 - Bà Rịa - Vũng Tàu
                  </option>
                  <option value="Cơ sở 5">🏢 Cơ sở 5 - Long An</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cấu hình Nâng cao Section */}
          <div className="bg-white rounded-2xl p-4 border-2 border-indigo-200 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Cấu hình Nâng cao
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-900">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    Thời lượng Video (giây)
                  </span>
                </label>

                <div className="space-y-3">
                  <input
                    type="range"
                    min="30"
                    max="300"
                    step="10"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-center">
                    <span className="text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-lg">
                      {duration} giây
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">
                    <span className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-red-500" />
                      Mức độ Phức tạp
                    </span>
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full rounded-xl border-2 border-indigo-200 bg-indigo-50 px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                    <option value="Đơn giản">🟢 Đơn giản</option>
                    <option value="Trung bình">🟡 Trung bình</option>
                    <option value="Phức tạp">🔴 Phức tạp</option>
                    <option value="Chuyên sâu">🟣 Chuyên sâu</option>
                    <option value="Nghiên cứu">⚫ Nghiên cứu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">
                    <span className="flex items-center gap-2">
                      <Gem className="w-4 h-4 text-purple-500" />
                      Hình thức Đào tạo
                    </span>
                  </label>
                  <select
                    value={magicType}
                    onChange={(e) => setMagicType(e.target.value)}
                    className="w-full rounded-xl border-2 border-indigo-200 bg-indigo-50 px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                    <option value="Trực tuyến">💻 Trực tuyến</option>
                    <option value="Trực tiếp">🏢 Trực tiếp</option>
                    <option value="Kết hợp">🔄 Kết hợp</option>
                    <option value="Từ xa">🌐 Từ xa</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !kichBan.trim()}
            className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg transform hover:scale-105"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Đang tạo Kịch bản...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Tạo Kịch bản Tuyển sinh
              </>
            )}
          </button>

          {/* Result Display */}
          {result && (
            <div className="mt-6">
              {result.ok ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">
                      Thành công!
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    Yêu cầu đã được gửi đi. Session ID: {result.session_id}
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-800">Lỗi!</span>
                  </div>
                  <p className="text-sm text-red-700">
                    {result.message || "Có lỗi xảy ra"}
                  </p>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    );
  }

  // Desktop Layout - WOW Fantasy Theme
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      {/* Hero Header */}
      <header className="text-center space-y-6 sm:space-y-8 py-6 sm:py-12 px-4 sm:px-6 relative z-10">
        <div className="relative">
          {/* Epic Title with Glowing Effect */}
          <div className="inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
              <Sword className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
              VLU UNIVERSITY
            </h1>
            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
              <Shield className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>

          {/* Subtitle with Epic Badges */}
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            <span className="text-sm sm:text-base font-bold text-gray-800 tracking-wider bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              DỊCH VỤ TUYỂN SINH & ĐÀO TẠO
            </span>
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
          </div>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-4xl text-gray-800 font-light px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Xây dựng Chiến lược Tuyển sinh với AI-Powered Content Creation
        </h2>

        <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed text-base sm:text-lg px-4">
          Chinh phục thị trường giáo dục với sự sáng tạo chiến lược! Nền tảng AI
          tiên tiến của chúng tôi biến đổi tầm nhìn tuyển sinh thành những kịch
          bản chuyên nghiệp với phân tích thị trường, thông tin chi tiết và kế
          hoạch thành công.
        </p>

        {/* Epic Features with Animated Icons */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-sm sm:text-base text-gray-600 px-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full border border-blue-200">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="font-semibold text-blue-700">
              🎓 CHẤT LƯỢNG ĐÀO TẠO
            </span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full border border-purple-200">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="font-semibold text-purple-700">
              🎯 CHIẾN LƯỢC TUYỂN SINH
            </span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full border border-green-200">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-semibold text-green-700">
              🏆 UY TÍN & CHẤT LƯỢNG
            </span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-blue-100 px-4 py-2 rounded-full border border-indigo-200">
            <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
            <span className="font-semibold text-indigo-700">
              🌟 CÔNG NGHỆ HIỆN ĐẠI
            </span>
          </div>
        </div>
      </header>

      {/* VLU Tuyển sinh Tab System */}
      <div className="bg-white rounded-2xl border-2 border-blue-200 overflow-hidden shadow-xl mx-4 sm:mx-0">
        {/* Tab Headers */}
        <div className="flex border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-white overflow-x-auto scrollbar-hide">
          {[
            {
              id: "quest",
              label: "Thông tin",
              icon: FileText,
              description: "Nội dung & Thông điệp",
            },
            {
              id: "characters",
              label: "Ngành học",
              icon: Sword,
              description: "Chuyên ngành & Bằng cấp",
            },
            {
              id: "world",
              label: "Tuyển sinh",
              icon: Mountain,
              description: "Loại hình & Cơ sở",
            },
            {
              id: "combat",
              label: "Cấu hình",
              icon: Shield,
              description: "Thiết lập & Yêu cầu",
            },
            {
              id: "magic",
              label: "Hình thức",
              icon: Gem,
              description: "Đào tạo & Phương pháp",
            },
            {
              id: "advanced",
              label: "Nâng cao",
              icon: Brain,
              description: "Cấu hình AI",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-left transition-all duration-300 relative group min-w-[120px] ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-100 to-blue-200 border-b-2 border-blue-500"
                  : "hover:bg-blue-50"
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-blue-100 text-blue-600 group-hover:text-blue-700"
                  }`}
                >
                  <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <div
                    className={`font-medium transition-colors text-xs sm:text-sm truncate ${
                      activeTab === tab.id
                        ? "text-gray-900"
                        : "text-gray-700 group-hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-600 hidden sm:block">
                    {tab.description}
                  </div>
                </div>
              </div>

              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <form
          onSubmit={onSubmit}
          className="p-4 sm:p-8 bg-gradient-to-b from-white to-blue-50"
        >
          {activeTab === "quest" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                  <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Thông tin Tuyển sinh & Đào tạo
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Tạo nội dung tuyển sinh chuyên nghiệp với kế hoạch chi tiết
                    và điều kiện thành công
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                    <span className="flex items-center gap-2">
                      <Lightning className="w-4 h-4 text-yellow-500" />
                      Nội dung Chính & Thông điệp *
                    </span>
                  </label>
                  <textarea
                    required
                    value={kichBan}
                    onChange={(e) => setKichBan(e.target.value)}
                    placeholder="Ví dụ: Thông báo tuyển sinh ngành Công nghệ thông tin, hệ đại học chính quy năm 2024. Tập trung vào chất lượng đào tạo và cơ hội việc làm..."
                    className="w-full min-h-[120px] sm:min-h-[140px] rounded-xl border-2 border-blue-200 bg-blue-50/50 px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-green-500" />
                      Chi tiết & Yêu cầu Đặc biệt
                    </span>
                  </label>
                  <textarea
                    value={moTa}
                    onChange={(e) => setMoTa(e.target.value)}
                    placeholder="Thiết lập: Địa điểm, đối tượng mục tiêu, hiệu ứng đặc biệt, lời kêu gọi hành động, ràng buộc sáng tạo..."
                    className="w-full min-h-[100px] sm:min-h-[120px] rounded-xl border-2 border-blue-200 bg-blue-50/50 px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "characters" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
                  <Sword className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Ngành học & Chuyên ngành
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Chọn các ngành học và chuyên ngành đào tạo
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      Bằng cấp Chính
                    </span>
                  </label>
                  <select
                    value={characterClass}
                    onChange={(e) => setCharacterClass(e.target.value)}
                    className="w-full rounded-xl border-2 border-purple-200 bg-purple-50/50 px-3 sm:px-4 py-3 sm:py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="Cử nhân">🎓 Cử nhân - Đại học</option>
                    <option value="Kỹ sư">🎓 Kỹ sư - Kỹ thuật</option>
                    <option value="Thạc sĩ">🎓 Thạc sĩ - Sau đại học</option>
                    <option value="Tiến sĩ">🎓 Tiến sĩ - Nghiên cứu</option>
                    <option value="Chứng chỉ">🎓 Chứng chỉ - Ngắn hạn</option>
                    <option value="Liên thông">🎓 Liên thông - Nâng cao</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                    <span className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-red-500" />
                      Ngành học & Chuyên ngành
                    </span>
                  </label>
                  <ServiceMultiSelect value={dichVu} onChange={setDichVu} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "world" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                  <Mountain className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Thông tin Tuyển sinh & Cơ sở
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Cấu hình thông tin tuyển sinh, loại hình và cơ sở đào tạo
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                      <span className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        Loại hình Tuyển sinh
                      </span>
                    </label>
                    <select
                      value={questType}
                      onChange={(e) => setQuestType(e.target.value)}
                      className="w-full rounded-xl border-2 border-green-200 bg-green-50/50 px-3 sm:px-4 py-3 sm:py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="Tuyển sinh">🎓 Tuyển sinh Đại học</option>
                      <option value="Tuyển sinh Cao đẳng">
                        🎓 Tuyển sinh Cao đẳng
                      </option>
                      <option value="Tuyển sinh Sau đại học">
                        🎓 Tuyển sinh Sau đại học
                      </option>
                      <option value="Tuyển sinh Liên thông">
                        🎓 Tuyển sinh Liên thông
                      </option>
                      <option value="Tuyển sinh Vừa học vừa làm">
                        🎓 Tuyển sinh Vừa học vừa làm
                      </option>
                      <option value="Tuyển sinh Quốc tế">
                        🎓 Tuyển sinh Quốc tế
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                      <span className="flex items-center gap-2">
                        <TreePine className="w-4 h-4 text-green-500" />
                        Cơ sở & Địa điểm
                      </span>
                    </label>
                    <select
                      value={worldZone}
                      onChange={(e) => setWorldZone(e.target.value)}
                      className="w-full rounded-xl border-2 border-green-200 bg-green-50/50 px-3 sm:px-4 py-3 sm:py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="Cơ sở chính">
                        🏢 Cơ sở chính - TP.HCM
                      </option>
                      <option value="Cơ sở 2">🏢 Cơ sở 2 - Bình Dương</option>
                      <option value="Cơ sở 3">🏢 Cơ sở 3 - Đồng Nai</option>
                      <option value="Cơ sở 4">
                        🏢 Cơ sở 4 - Bà Rịa - Vũng Tàu
                      </option>
                      <option value="Cơ sở 5">🏢 Cơ sở 5 - Long An</option>
                      <option value="Cơ sở 6">🏢 Cơ sở 6 - Tiền Giang</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      Bầu không khí & Thông tin Bổ sung
                    </span>
                  </label>
                  <textarea
                    value={moTa}
                    onChange={(e) => setMoTa(e.target.value)}
                    placeholder="Mô tả thông tin hiện tại, ưu tiên đối tượng, cơ chế đặc biệt và cân nhắc chiến lược..."
                    className="w-full min-h-[100px] sm:min-h-[120px] rounded-xl border-2 border-green-200 bg-green-50/50 px-3 sm:px-4 py-3 sm:py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "combat" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600">
                  <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Cấu hình & Yêu cầu
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Cấu hình thiết lập, ưu tiên mục tiêu và động lực chiến lược
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                      <span className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-red-500" />
                        Rank Tier
                      </span>
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full rounded-xl border-2 border-red-200 bg-red-50/50 px-3 sm:px-4 py-3 sm:py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="Iron">🟢 Iron - Beginner</option>
                      <option value="Bronze">🟡 Bronze - Learning</option>
                      <option value="Silver">🔴 Silver - Developing</option>
                      <option value="Gold">🟣 Gold - Intermediate</option>
                      <option value="Platinum">⚫ Platinum - Advanced</option>
                      <option value="Diamond">💎 Diamond - Expert</option>
                      <option value="Master">👑 Master - Elite</option>
                      <option value="Grandmaster">
                        🌟 Grandmaster - Top Tier
                      </option>
                      <option value="Challenger">
                        🏆 Challenger - Best of the Best
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        Game Duration
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={15}
                        max={60}
                        value={Math.floor(duration / 60)}
                        onChange={(e) =>
                          setDuration(Number(e.target.value) * 60)
                        }
                        className="w-full rounded-xl border-2 border-red-200 bg-red-50/50 px-3 sm:px-4 py-3 sm:py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-16"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                        minutes
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                    <span className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-orange-500" />
                      Teamfight Strategy & Objectives
                    </span>
                  </label>
                  <textarea
                    placeholder="Describe the teamfight approach, objective priorities, engage/disengage patterns, and strategic considerations..."
                    className="w-full min-h-[100px] sm:min-h-[120px] rounded-xl border-2 border-red-200 bg-red-50/50 px-3 sm:px-4 py-3 sm:py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "magic" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
                  <Gem className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Builds & Itemization
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Configure champion builds, item paths, and rune setups
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                      <span className="flex items-center gap-2">
                        <Gem className="w-4 h-4 text-purple-500" />
                        Hình thức Đào tạo
                      </span>
                    </label>
                    <select
                      value={magicType}
                      onChange={(e) => setMagicType(e.target.value)}
                      className="w-full rounded-xl border-2 border-purple-200 bg-purple-50/50 px-3 sm:px-4 py-3 sm:py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="Trực tuyến">💻 Trực tuyến - Online</option>
                      <option value="Trực tiếp">🏢 Trực tiếp - Offline</option>
                      <option value="Kết hợp">🔄 Kết hợp - Hybrid</option>
                      <option value="Từ xa">🌐 Từ xa - Remote</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        Cường độ Đào tạo
                      </span>
                    </label>
                    <select className="w-full rounded-xl border-2 border-purple-200 bg-purple-50/50 px-3 sm:px-4 py-3 sm:py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                      <option value="Nhẹ nhàng">🟢 Nhẹ nhàng - Cơ bản</option>
                      <option value="Trung bình">
                        🟡 Trung bình - Cân bằng
                      </option>
                      <option value="Mạnh mẽ">🔴 Mạnh mẽ - Nâng cao</option>
                      <option value="Chuyên sâu">
                        🟣 Chuyên sâu - Chuyên ngành
                      </option>
                      <option value="Nghiên cứu">
                        ⚫ Nghiên cứu - Học thuật
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                    <span className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-indigo-500" />
                      Yêu cầu Đào tạo & Thông tin
                    </span>
                  </label>
                  <textarea
                    placeholder="Mô tả kiến thức đào tạo cần thiết, thành phần khóa học, tài liệu học tập và yêu cầu thông tin..."
                    className="w-full min-h-[100px] sm:min-h-[120px] rounded-xl border-2 border-purple-200 bg-purple-50/50 px-3 sm:px-4 py-3 sm:py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Nhận diện thương hiệu & Phong cách thị giác
                  </h3>
                  <p className="text-gray-600">
                    Cấu hình các yếu tố thương hiệu và sở thích thẩm mỹ
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    <Building2 className="inline w-4 h-4 mr-2" />
                    Lĩnh vực ngành nghề
                  </label>
                  <select
                    value={nganh}
                    onChange={(e) => setNganh(e.target.value)}
                    className="w-full rounded-xl border-2 border-red-200 bg-red-50/50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="Giáo dục & Đào tạo">
                      Giáo dục & Đào tạo
                    </option>
                    <option value="Đại học & Cao đẳng">
                      Đại học & Cao đẳng
                    </option>
                    <option value="Tuyển sinh & Tư vấn">
                      Tuyển sinh & Tư vấn
                    </option>
                    <option value="Đào tạo nghề">Đào tạo nghề & Kỹ năng</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    <Crown className="inline w-4 h-4 mr-2" />
                    Tên thương hiệu
                  </label>
                  <input
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Nhập tên trường đại học hoặc tổ chức giáo dục"
                    className="w-full rounded-xl border-2 border-red-200 bg-red-50/50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    <Sparkles className="inline w-4 h-4 mr-2" />
                    Tông điệu thương hiệu & Phong cách thị giác
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full rounded-xl border-2 border-red-200 bg-red-50/50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="luxury – sophisticated – premium">
                      Sang trọng • Tinh tế • Cao cấp
                    </option>
                    <option value="modern – minimalist – elegant">
                      Hiện đại • Tối giản • Thanh lịch
                    </option>
                    <option value="warm – approachable – professional">
                      Ấm áp • Thân thiện • Chuyên nghiệp
                    </option>
                    <option value="bold – confident – innovative">
                      Táo bạo • Tự tin • Sáng tạo
                    </option>
                    <option value="serene – healing – trustworthy">
                      Thanh thản • Chữa lành • Đáng tin cậy
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Advanced AI Configuration
                  </h3>
                  <p className="text-gray-600">
                    Fine-tune AI parameters for optimal quest generation results
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    <Clock className="inline w-4 h-4 mr-2 text-yellow-500" />
                    Quest Duration Target (seconds)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={30}
                      max={600}
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full rounded-xl border-2 border-indigo-200 bg-indigo-50/50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-16"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                      {Math.floor(duration / 60)}:
                      {(duration % 60).toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Recommended: 60-180 seconds for optimal engagement
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    <Target className="inline w-4 h-4 mr-2 text-blue-500" />
                    AI Creativity Level
                  </label>
                  <select className="w-full rounded-xl border-2 border-indigo-200 bg-indigo-50/50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="conservative">
                      🟢 Conservative - Safe & Traditional
                    </option>
                    <option value="balanced">
                      🟡 Balanced - Mix of Safe & Creative
                    </option>
                    <option value="creative">
                      🔴 Creative - Innovative & Unique
                    </option>
                    <option value="experimental">
                      🟣 Experimental - Bold & Unconventional
                    </option>
                    <option value="revolutionary">
                      ⚫ Revolutionary - Groundbreaking Ideas
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    <Globe className="inline w-4 h-4 mr-2 text-green-500" />
                    World Lore Depth
                  </label>
                  <select className="w-full rounded-xl border-2 border-indigo-200 bg-indigo-50/50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="basic">
                      🟢 Basic - Essential Information
                    </option>
                    <option value="detailed">🟡 Detailed - Rich Context</option>
                    <option value="comprehensive">
                      🔴 Comprehensive - Deep Lore
                    </option>
                    <option value="extensive">
                      🟣 Extensive - Complete World Building
                    </option>
                    <option value="encyclopedic">
                      ⚫ Encyclopedic - Master Level Detail
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    <Sparkles className="inline w-4 h-4 mr-2 text-purple-500" />
                    Quest Complexity
                  </label>
                  <select className="w-full rounded-xl border-2 border-indigo-200 bg-indigo-50/50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="simple">
                      🟢 Simple - Straightforward Quest
                    </option>
                    <option value="moderate">
                      🟡 Moderate - Some Complexity
                    </option>
                    <option value="complex">
                      🔴 Complex - Multi-layered Story
                    </option>
                    <option value="intricate">
                      🟣 Intricate - Deep Plot Threads
                    </option>
                    <option value="masterpiece">
                      ⚫ Masterpiece - Epic Complexity
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  <Brain className="inline w-4 h-4 mr-2 text-indigo-500" />
                  Special AI Instructions
                </label>
                <textarea
                  placeholder="Add any special instructions for the AI, specific requirements, or creative directions..."
                  className="w-full min-h-[100px] rounded-xl border-2 border-indigo-200 bg-indigo-50/50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Submit Section */}
          <div className="flex items-center justify-between pt-8 border-t-2 border-blue-100 mt-8">
            <div className="text-sm text-gray-600">
              <span className="inline-flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-500" />
                All fields marked with * are required for processing
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || !kichBan.trim()}
              className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg px-8 py-4 text-white font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang tạo Kịch bản...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  Tạo Kịch bản Tuyển sinh
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <section className="bg-white rounded-2xl border-2 border-red-200 p-8 shadow-xl bg-gradient-to-b from-white to-red-50 mx-4 sm:mx-0 mt-6">
          <div className="flex items-center gap-3 mb-6">
            {result.ok ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
            <h2 className="text-xl font-semibold text-gray-900">
              Kết quả xử lý
            </h2>
          </div>

          {result.ok ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Gửi thành công đến hệ thống n8n
              </div>

              {"session_id" in result && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Mã phiên làm việc:</span>{" "}
                  <code className="bg-red-100 px-2 py-1 rounded text-red-700">
                    {result.session_id}
                  </code>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-red-600 font-medium">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Gửi thất bại
              </div>

              {result.message && (
                <div className="text-gray-700">{result.message}</div>
              )}

              {result.errors && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-red-700 mb-2">
                    Chi tiết lỗi:
                  </h4>
                  <pre className="text-sm text-red-600 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(result.errors, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Footer */}
      <footer className="text-center py-8 space-y-4">
        <div className="flex justify-center items-center gap-3 text-gray-600">
          <Gem className="w-5 h-5 text-yellow-500 animate-pulse" />
          <span className="text-sm font-medium">
            Được tạo bởi{" "}
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent font-semibold">
              VLU UNIVERSITY
            </span>
          </span>
          <Gem className="w-5 h-5 text-yellow-500 animate-pulse" />
        </div>
        <div className="flex justify-center items-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FileText className="w-3 h-3 text-blue-500" />
            Tạo Kịch bản Tuyển sinh
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Trophy className="w-3 h-3 text-purple-500" />
            Kế hoạch Giáo dục
          </span>
          <span>•</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex justify-center items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Trophy className="w-3 h-3 text-yellow-500" />
            Vì Tương lai!
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Crown className="w-3 h-3 text-blue-500" />
            Vì Tri thức!
          </span>
        </div>
      </footer>
    </main>
  );
}
