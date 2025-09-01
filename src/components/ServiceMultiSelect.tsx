"use client";

import React, { useState } from "react";
import { Sparkles, Target } from "lucide-react";
import clsx from "clsx";

const ALL_SERVICES = [
  {
    id: "nano-chip",
    name: "Nâng ngực Nano chip ergonomix",
    description:
      "Công nghệ Nano chip ergonomix tiên tiến, mang lại vòng 1 tự nhiên và an toàn tuyệt đối với chất liệu cao cấp từ Mỹ",
    features: [
      "Công nghệ Nano chip Ergonomix",
      "Tự nhiên 100%",
      "An toàn tuyệt đối",
      "Bảo hành 10 năm",
    ],
    price: "Từ 120 triệu",
    duration: "2-3 giờ",
    icon: Sparkles,
    color: "from-red-500 to-rose-600",
    category: "premium",
  },
  {
    id: "mentor-vip",
    name: "Nâng ngực Mentor vip extra",
    description:
      "Túi độn Mentor VIP Extra cao cấp từ Mỹ, đẳng cấp quốc tế cho vẻ đẹp hoàn hảo và cảm giác tự nhiên nhất",
    features: [
      "Túi độn Mentor từ Mỹ",
      "Chất lượng VIP Extra",
      "Đẳng cấp quốc tế",
      "Cảm giác tự nhiên",
    ],
    price: "Từ 150 triệu",
    duration: "3-4 giờ",
    icon: Sparkles,
    color: "from-red-600 to-rose-700",
    category: "luxury",
  },
  {
    id: "nang-nguc-treo",
    name: "Nâng ngực + treo sa trễ",
    description:
      "Giải pháp tổng thể nâng ngực và khắc phục sa trễ, mang lại vẻ đẹp trẻ trung và quyến rũ",
    features: [
      "Nâng ngực kết hợp",
      "Khắc phục sa trễ",
      "Trẻ hóa vòng 1",
      "Kỹ thuật 2 trong 1",
    ],
    price: "Từ 180 triệu",
    duration: "3-5 giờ",
    icon: Sparkles,
    color: "from-red-400 to-rose-500",
    category: "exclusive",
  },
  {
    id: "hut-mo-tao-hinh",
    name: "Hút mỡ + tạo hình thành bụng",
    description:
      "Hút mỡ thông minh kết hợp tạo hình, mang lại vóc dáng S-line hoàn hảo như siêu mẫu",
    features: [
      "Hút mỡ thông minh",
      "Tạo hình S-line",
      "Công nghệ Vaser",
      "Phục hồi nhanh",
    ],
    price: "Từ 90 triệu",
    duration: "2-4 giờ",
    icon: Target,
    color: "from-red-500 to-pink-600",
    category: "premium",
  },
  {
    id: "nang-mui-surgiform",
    name: "Nâng mũi cấu trúc surgiform",
    description:
      "Nâng mũi cấu trúc Surgiform, tạo dáng mũi Tây hoàn hảo và tự nhiên vĩnh viễn",
    features: [
      "Cấu trúc Surgiform",
      "Dáng mũi Tây chuẩn",
      "Tự nhiên vĩnh viễn",
      "Không biến chứng",
    ],
    price: "Từ 80 triệu",
    duration: "1-2 giờ",
    icon: Target,
    color: "from-rose-500 to-red-600",
    category: "premium",
  },
  {
    id: "tham-my-co-be",
    name: "Thẩm mỹ cô bé",
    description:
      "Dịch vụ thẩm mỹ vùng kín cao cấp, mang lại sự tự tin và hạnh phúc cho phái đẹp",
    features: [
      "Tái tạo vùng kín",
      "Công nghệ Laser",
      "Riêng tư tuyệt đối",
      "Chuyên gia hàng đầu",
    ],
    price: "Từ 50 triệu",
    duration: "1-2 giờ",
    icon: Sparkles,
    color: "from-pink-500 to-rose-600",
    category: "exclusive",
  },
  {
    id: "cat-mi",
    name: "Cắt mí trên + dưới",
    description:
      "Cắt mí mắt toàn diện, tạo đôi mắt to tròn, long lanh và cuốn hút như búp bê",
    features: [
      "Mí trên + mí dưới",
      "Mắt to tròn tự nhiên",
      "Công nghệ Hàn Quốc",
      "Không để lại scar",
    ],
    price: "Từ 40 triệu",
    duration: "2-3 giờ",
    icon: Target,
    color: "from-red-400 to-pink-500",
    category: "premium",
  },
  {
    id: "combo-premium",
    name: "Combo ngực + bụng + mông",
    description:
      "Gói combo toàn diện, tạo nên body S-line hoàn hảo như siêu mẫu quốc tế",
    features: [
      "Combo 3 vùng",
      "Body S-line chuẩn",
      "Tiết kiệm 30%",
      "Đẳng cấp siêu mẫu",
    ],
    price: "Từ 350 triệu",
    duration: "6-8 giờ",
    icon: Sparkles,
    color: "from-red-600 to-rose-700",
    category: "luxury",
  },
];

export function ServiceMultiSelect({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [custom, setCustom] = useState("");
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [cardTransitions, setCardTransitions] = useState<{
    [key: string]: { x: number; y: number; rect: DOMRect | null };
  }>({});

  const toggle = (name: string) => {
    const exists = value.includes(name);
    onChange(exists ? value.filter((v) => v !== name) : [...value, name]);
  };

  const addCustom = () => {
    const v = custom.trim();
    if (!v) return;
    if (!value.includes(v)) onChange([...value, v]);
    setCustom("");
  };

  const removeService = (service: string) => {
    onChange(value.filter((v) => v !== service));
  };

  const toggleExpanded = (serviceId: string, event: React.MouseEvent) => {
    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();

    if (expandedService === serviceId) {
      // Closing - reset
      setExpandedService(null);
      setCardTransitions({});
    } else {
      // Opening - capture position for animation
      setCardTransitions({
        [serviceId]: {
          x: rect.left,
          y: rect.top,
          rect: rect,
        },
      });
      setExpandedService(serviceId);
    }
  };

  const selectService = (serviceName: string) => {
    toggle(serviceName);
    setExpandedService(null);
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Premium Services Grid with Zoom Animation */}
        <div className="relative">
          {/* Backdrop */}
          {expandedService && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setExpandedService(null)}
            />
          )}

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {ALL_SERVICES.map((service) => {
              const isSelected = value.includes(service.name);
              const isExpanded = expandedService === service.id;

              return (
                <div
                  key={service.id}
                  className={clsx(
                    "relative transition-all duration-700 ease-in-out",
                    isExpanded ? "opacity-0" : "opacity-100"
                  )}
                  style={{ perspective: "1000px" }}
                >
                  {/* Normal Card */}
                  <div
                    className={clsx(
                      "relative w-full h-48 cursor-pointer transition-all duration-500",
                      !isExpanded && "hover:scale-105"
                    )}
                    style={{
                      transformStyle: "preserve-3d",
                      transform:
                        isSelected && !isExpanded
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                    }}
                    onClick={(e) =>
                      !isExpanded && toggleExpanded(service.id, e)
                    }
                  >
                    {/* Front Side */}
                    <div
                      className={clsx(
                        "absolute inset-0 w-full h-full rounded-2xl border-2 overflow-hidden",
                        "bg-gradient-to-br from-white via-red-50 to-white",
                        isSelected
                          ? "border-red-400 shadow-xl shadow-red-400/50"
                          : "border-red-200 hover:border-red-300 shadow-lg hover:shadow-xl"
                      )}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {/* Category Badge */}
                      <div
                        className={clsx(
                          "absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1",
                          "bg-gradient-to-r",
                          service.color
                        )}
                      >
                        <service.icon className="w-3 h-3" />
                        {service.category?.toUpperCase() || "PREMIUM"}
                      </div>

                      {/* Service Content */}
                      <div className="p-4 h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 leading-tight mb-2">
                            {service.name}
                          </h3>
                          <div className="flex items-center text-xs text-red-600 mb-2">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Nhấn để xem chi tiết
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-xs text-gray-600">
                            <span className="font-semibold text-red-700">
                              {service.price}
                            </span>
                          </div>
                          <div className="w-full bg-red-100 rounded-full h-1">
                            <div
                              className={clsx(
                                "h-1 rounded-full bg-gradient-to-r",
                                service.color
                              )}
                              style={{ width: "75%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back Side - Selected State */}
                    <div
                      className={clsx(
                        "absolute inset-0 w-full h-full rounded-2xl border-2 overflow-hidden",
                        "bg-gradient-to-br",
                        service.color,
                        "border-red-400 shadow-2xl shadow-red-400/50"
                      )}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div className="p-4 h-full flex flex-col justify-center items-center text-center text-white">
                        <div className="mb-3">
                          <Sparkles className="w-8 h-8 mx-auto mb-2" />
                          <h3 className="text-sm font-bold mb-1">ĐÃ CHỌN</h3>
                          <p
                            className="text-xs opacity-90"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {service.name}
                          </p>
                        </div>

                        <div className="text-xs opacity-75">
                          ✓ Đã thêm vào chiến dịch
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeService(service.name);
                          }}
                          className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <Sparkles className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expanded Card with Zoom Animation */}
        {expandedService &&
          (() => {
            const service = ALL_SERVICES.find((s) => s.id === expandedService);
            if (!service) return null;

            const isSelected = value.includes(service.name);
            const transition = cardTransitions[expandedService];

            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="w-full max-w-lg transform transition-all duration-700 ease-out"
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    transform: "rotateY(180deg) scale(1)",
                    animation: transition
                      ? `zoomToCenter 0.7s ease-out forwards`
                      : undefined,
                    animationFillMode: "both",
                  }}
                >
                  {/* Expanded Card Content */}
                  <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Close button */}
                    <button
                      onClick={() => setExpandedService(null)}
                      className="absolute top-4 right-4 w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors z-10"
                    >
                      <Sparkles className="w-4 h-4 text-red-600" />
                    </button>

                    {/* Header */}
                    <div
                      className={clsx(
                        "relative p-6 rounded-t-3xl bg-gradient-to-r text-white",
                        service.color
                      )}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <service.icon className="w-5 h-5" />
                        <span className="text-sm font-medium uppercase tracking-wide">
                          {service.category || "PREMIUM"}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold leading-tight">
                        {service.name}
                      </h2>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-red-500" />
                          Ưu điểm vượt trội:
                        </h3>
                        <ul className="space-y-2">
                          {service.features.map(
                            (feature: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-gray-600"
                              >
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                {feature}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Price & Duration */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-red-50 rounded-xl p-3">
                          <div className="text-xs font-medium text-red-600 mb-1">
                            Giá dịch vụ
                          </div>
                          <div className="text-sm font-bold text-red-700">
                            {service.price}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className="text-xs font-medium text-gray-600 mb-1">
                            Thời gian
                          </div>
                          <div className="text-sm font-bold text-gray-700">
                            {service.duration}
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => selectService(service.name)}
                        disabled={isSelected}
                        className={clsx(
                          "w-full py-4 rounded-2xl font-semibold text-white transition-all transform hover:scale-105",
                          isSelected
                            ? "bg-gray-400 cursor-not-allowed"
                            : `bg-gradient-to-r ${service.color} hover:shadow-lg`
                        )}
                      >
                        {isSelected ? "✓ Đã chọn dịch vụ" : "Chọn dịch vụ này"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

        {/* Custom Service Input */}
        <div className="bg-gradient-to-r from-red-50 to-white rounded-2xl p-4 sm:p-6 border-2 border-red-200">
          <label className="inline-flex text-sm font-medium text-gray-900 mb-3 items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-600" />
            Thêm dịch vụ cao cấp tùy chỉnh
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Nhập tên dịch vụ độc quyền..."
              className="flex-1 rounded-xl border-2 border-red-200 bg-white px-3 sm:px-4 py-3 text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              onKeyPress={(e) => e.key === "Enter" && addCustom()}
            />
            <button
              type="button"
              onClick={addCustom}
              disabled={!custom.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 sm:px-5 py-3 text-white font-medium transition-all hover:from-red-500 hover:to-rose-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base transform hover:scale-105"
            >
              <Sparkles size={16} />
              Thêm dịch vụ
            </button>
          </div>
        </div>

        {/* Selected Services Display */}
        {value.length > 0 && (
          <div className="bg-gradient-to-r from-white to-red-50 rounded-2xl p-4 sm:p-6 border-2 border-red-200">
            <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-red-600" />
              Dịch vụ đã chọn ({value.length} dịch vụ cao cấp):
            </h4>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {value.map((serviceName) => {
                const service = ALL_SERVICES.find(
                  (s) => s.name === serviceName
                );
                return (
                  <span
                    key={serviceName}
                    className={clsx(
                      "inline-flex items-center gap-2 rounded-full border-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium max-w-full",
                      service
                        ? `bg-gradient-to-r ${service.color} text-white border-white/30`
                        : "bg-gradient-to-r from-red-500 to-rose-600 text-white border-white/30"
                    )}
                  >
                    <span className="truncate">{serviceName}</span>
                    <button
                      type="button"
                      onClick={() => removeService(serviceName)}
                      className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
                    >
                      <Sparkles size={12} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
