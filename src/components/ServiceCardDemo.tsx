"use client";

import React from "react";
import EnhancedServiceCard from "./EnhancedServiceCard";

const sampleServices = [
  {
    id: "001",
    title: "Tạo kịch bản video giáo dục",
    description: "Tự động tạo kịch bản video giáo dục từ chủ đề và outline",
    content: JSON.stringify({
      details: "Sử dụng AI để phân tích chủ đề, tạo outline chi tiết và viết kịch bản hoàn chỉnh cho video giáo dục với ngôn ngữ phù hợp với đối tượng học sinh."
    }),
    icon: "📚",
    category: "Giáo dục",
    price: 50,
    duration: 3,
    features: [
      "Phân tích chủ đề tự động",
      "Tạo outline chi tiết",
      "Viết kịch bản hoàn chỉnh",
      "Tối ưu hóa ngôn ngữ",
      "Kiểm tra chất lượng"
    ]
  },
  {
    id: "002", 
    title: "Sản xuất video marketing",
    description: "Tạo video marketing chuyên nghiệp với hiệu ứng và âm thanh",
    content: JSON.stringify({
      details: "Dịch vụ sản xuất video marketing từ A-Z, bao gồm kịch bản, quay phim, dựng video, hiệu ứng và âm thanh chuyên nghiệp."
    }),
    icon: "🎯",
    category: "Marketing",
    price: 150,
    duration: 7,
    features: [
      "Viết kịch bản marketing",
      "Quay phim chuyên nghiệp",
      "Dựng video sáng tạo",
      "Hiệu ứng đặc biệt",
      "Âm thanh chất lượng cao"
    ]
  },
  {
    id: "003",
    title: "Phân tích dữ liệu video",
    description: "Phân tích hiệu quả video và đưa ra đề xuất cải thiện",
    content: JSON.stringify({
      details: "Sử dụng công cụ AI để phân tích metrics video, tương tác người dùng và đưa ra báo cáo chi tiết với đề xuất cải thiện."
    }),
    icon: "📊",
    category: "Phân tích",
    price: 75,
    duration: 2,
    features: [
      "Phân tích metrics chi tiết",
      "Báo cáo tương tác",
      "Đề xuất cải thiện",
      "So sánh xu hướng",
      "Dự báo hiệu quả"
    ]
  },
  {
    id: "004",
    title: "Tối ưu SEO video",
    description: "Tối ưu hóa video cho các nền tảng và công cụ tìm kiếm",
    content: JSON.stringify({
      details: "Dịch vụ tối ưu hóa video cho YouTube, TikTok, Facebook và Google Search với title, description, tags và thumbnail hiệu quả."
    }),
    icon: "🚀",
    category: "SEO",
    price: 40,
    duration: 1,
    features: [
      "Tối ưu title và description",
      "Nghiên cứu từ khóa",
      "Tạo thumbnail hấp dẫn",
      "Tags chiến lược",
      "Phân tích đối thủ"
    ]
  }
];

export default function ServiceCardDemo() {
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);

  const handleServiceSelect = (service: any) => {
    const serviceId = service.id;
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎬 Dịch vụ AI Video
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Khám phá các dịch vụ tạo video và kịch bản AI tiên tiến của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {sampleServices.map((service) => (
            <EnhancedServiceCard
              key={service.id}
              svc={service}
              isSelected={selectedServices.includes(service.id)}
              onSelect={handleServiceSelect}
              className="w-full"
            />
          ))}
        </div>

        {selectedServices.length > 0 && (
          <div className="mt-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              🎯 Dịch vụ đã chọn
            </h2>
            <div className="space-y-3">
              {selectedServices.map(serviceId => {
                const service = sampleServices.find(s => s.id === serviceId);
                return service ? (
                  <div key={serviceId} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                    <span className="text-2xl">{service.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ${service.price} • {service.duration} ngày
                      </p>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
            
            <div className="mt-6 text-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                🚀 Bắt đầu tạo kịch bản
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}