import { useMemo, useState } from "react";
import ServiceCard from "./ServiceCard";
import SearchBar from "./SearchBar";

// Định nghĩa MLT_SERVICES với nội dung thực tế từ MLT
const MLT_SERVICES = [
  {
    id: "1",
    title: "Tuyển sinh 2025",
    description: "Kịch bản video tuyển sinh đại học MLT năm 2025",
    category: "Tuyển sinh",
    price: 500000,
    duration: 3,
    icon: "🎓",
    features: [
      "Giới thiệu chương trình đào tạo",
      "Thông tin tuyển sinh",
      "Ưu đai học phí",
    ],
    content:
      "Nhân vật: Phụ huynh & Cố vấn tuyển sinh MLT\nBối cảnh: Văn phòng tư vấn tuyển sinh\nTone: Thân thiện - Chuyên nghiệp\nNội dung: Giới thiệu các chương trình đào tạo chất lượng cao, cơ hội việc làm và các ưu đãi đặc biệt cho năm học 2025.",
    tone: "Thân thiện - Chuyên nghiệp",
  },
  {
    id: "2",
    title: "Đào tạo kỹ năng",
    description: "Chương trình đào tạo kỹ năng nghề nghiệp tại MLT",
    category: "Đào tạo",
    price: 800000,
    duration: 4,
    icon: "⚡",
    features: ["Kỹ năng thực hành", "Chứng chỉ nghề nghiệp", "Cơ hội việc làm"],
    content:
      "Nhân vật: Giảng viên & Học viên\nBối cảnh: Phòng thực hành & Lớp học\nTone: Năng động - Truyền cảm hứng\nNội dung: Giới thiệu chương trình đào tạo kỹ năng nghề nghiệp, phương pháp học tập hiện đại và cơ hội phát triển sự nghiệp.",
    tone: "Năng động - Truyền cảm hứng",
  },
  {
    id: "3",
    title: "Nghiên cứu khoa học",
    description: "Hoạt động nghiên cứu khoa học và ứng dụng công nghệ",
    category: "Nghiên cứu",
    price: 1200000,
    duration: 6,
    icon: "🔬",
    features: ["Dự án nghiên cứu", "Công bố khoa học", "Ứng dụng thực tế"],
    content:
      "Nhân vật: Nhà nghiên cứu & Chuyên gia\nBối cảnh: Phòng thí nghiệm & Hội thảo khoa học\nTone: Chuyên nghiệp - Học thuật\nNội dung: Trình bày các thành tựu nghiên cứu, dự án khoa học và ứng dụng công nghệ tiên tiến trong giáo dục.",
    tone: "Chuyên nghiệp - Học thuật",
  },
  {
    id: "4",
    title: "Hội thảo chuyên đề",
    description: "Tổ chức hội thảo và sự kiện chuyên đề",
    category: "Sự kiện",
    price: 600000,
    duration: 2,
    icon: "🎤",
    features: ["Chuyên gia hàng đầu", "Nội dung cập nhật", "Networking"],
    content:
      "Nhân vật: Chuyên gia & Người tham dự\nBối cảnh: Hội trường & Không gian networking\nTone: Chuyên nghiệp - Gắn kết\nNội dung: Giới thiệu chương trình hội thảo với các chuyên gia hàng đầu, nội dung cập nhật xu hướng và cơ hội giao lưu.",
    tone: "Chuyên nghiệp - Gắn kết",
  },
  {
    id: "5",
    title: "Tư vấn chuyên môn",
    description: "Dịch vụ tư vấn chuyên môn và định hướng nghề nghiệp",
    category: "Tư vấn",
    price: 300000,
    duration: 1,
    icon: "💬",
    features: [
      "Tư vấn cá nhân",
      "Định hướng nghề nghiệp",
      "Kế hoạch phát triển",
    ],
    content:
      "Nhân vật: Cố vấn & Học sinh/Sinh viên\nBối cảnh: Phòng tư vấn cá nhân\nTone: Thân thiện - Hỗ trợ\nNội dung: Cung cấp dịch vụ tư vấn chuyên môn, định hướng nghề nghiệp và xây dựng kế hoạch phát triển cá nhân.",
    tone: "Thân thiện - Hỗ trợ",
  },
  {
    id: "6",
    title: "Khóa học online",
    description: "Nền tảng học trực tuyến với công nghệ hiện đại",
    category: "E-learning",
    price: 400000,
    duration: 3,
    icon: "💻",
    features: ["Học linh hoạt", "Công nghệ AI", "Chứng chỉ điện tử"],
    content:
      "Nhân vật: Giảng viên online & Học viên\nBối cảnh: Môi trường học tập số\nTone: Hiện đại - Tiện lợi\nNội dung: Giới thiệu nền tảng học trực tuyến với công nghệ AI, phương pháp học tập linh hoạt và chứng chỉ điện tử.",
    tone: "Hiện đại - Tiện lợi",
  },
];

export default function ServiceGrid({
  value,
  onChange,
  onServiceDataChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  onServiceDataChange?: (serviceData: any[]) => void;
}) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return MLT_SERVICES;
    return MLT_SERVICES.filter(
      (s) =>
        s.title.toLowerCase().includes(kw) ||
        s.description.toLowerCase().includes(kw)
    );
  }, [q]);

  const toggle = (t: string) => {
    const next = value.includes(t)
      ? value.filter((x) => x !== t)
      : [...value, t];
    onChange(next);

    // Truyền dữ liệu chi tiết của các dịch vụ đã chọn
    if (onServiceDataChange) {
      const selectedServices = MLT_SERVICES.filter((service) =>
        next.includes(service.title)
      );
      onServiceDataChange(selectedServices);
    }
  };

  return (
    <div id="services" className="space-y-4">
      <SearchBar onChange={setQ} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((s) => (
          <ServiceCard
            key={s.id}
            svc={s}
            selected={value.includes(s.title)}
            onToggle={toggle}
          />
        ))}
      </div>
      <div className="text-sm text-gray-500 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        Đã chọn:{" "}
        <b className="text-gray-900 dark:text-gray-100">{value.length}</b> dịch
        vụ
      </div>
    </div>
  );
}
