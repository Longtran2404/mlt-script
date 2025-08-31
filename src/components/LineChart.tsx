
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  animate?: boolean;
  className?: string;
}

export default function LineChart({
  data,
  height = 200,
  color = "#3B82F6",
  animate = true,
  className = "",
}: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const areaPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = svgRef.current;
    const path = pathRef.current;
    const areaPath = areaPathRef.current;
    if (!svg || !path || !areaPath) return;

    const width = svg.clientWidth || 400;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Find min and max values
    const values = data.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1; // Tránh chia cho 0

    // Generate line path - vẽ đường nối các điểm
    const linePathData = data
      .map((point, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y =
          padding +
          chartHeight -
          ((point.value - minValue) / valueRange) * chartHeight;
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");

    // Generate area path - vẽ vùng dưới đường
    const areaPathData =
      data
        .map((point, index) => {
          const x = padding + (index / (data.length - 1)) * chartWidth;
          const y =
            padding +
            chartHeight -
            ((point.value - minValue) / valueRange) * chartHeight;
          return `${index === 0 ? "M" : "L"} ${x} ${y}`;
        })
        .join(" ") +
      ` L ${padding + chartWidth} ${padding + chartHeight} L ${padding} ${
        padding + chartHeight
      } Z`;

    path.setAttribute("d", linePathData);
    areaPath.setAttribute("d", areaPathData);

    if (animate) {
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `${pathLength}`;

      // Animate the line path
      path.animate(
        [{ strokeDashoffset: pathLength }, { strokeDashoffset: 0 }],
        {
          duration: 2000,
          easing: "ease-out",
          fill: "forwards",
        }
      );

      // Animate the area fill
      areaPath.style.opacity = "0";
      areaPath.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        delay: 500,
        easing: "ease-out",
        fill: "forwards",
      });
    }
  }, [data, height, animate]);

  if (!data || data.length === 0) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <p className="text-gray-500 dark:text-gray-400">Không có dữ liệu</p>
      </div>
    );
  }

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        className="overflow-visible"
      >
        {/* Definitions for gradients and patterns */}
        <defs>
          {/* Grid pattern */}
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-200 dark:text-gray-700"
              opacity="0.3"
            />
          </pattern>

          {/* Area gradient */}
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>

          {/* Line gradient */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>

        {/* Background grid */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Chart area */}
        <g className="chart-area">
          {/* Area under curve - vẽ vùng dưới đường trước */}
          <path
            ref={areaPathRef}
            fill="url(#areaGradient)"
            className="transition-all duration-300"
          />

          {/* Line path - vẽ đường nối các điểm */}
          <path
            ref={pathRef}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300 drop-shadow-lg"
          />

          {/* Data points - vẽ chấm cuối cùng */}
          {data.map((point, index) => {
            const x =
              20 +
              (index / (data.length - 1)) *
                (svgRef.current?.clientWidth || 400 - 40);
            const y =
              20 +
              (height - 40) -
              ((point.value - Math.min(...data.map((d) => d.value))) /
                (Math.max(...data.map((d) => d.value)) -
                  Math.min(...data.map((d) => d.value)) || 1)) *
                (height - 40);

            return (
              <motion.g
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
              >
                {/* Point circle with glow effect */}
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill="white"
                  stroke={color}
                  strokeWidth="3"
                  className="transition-all duration-300 hover:r-10 drop-shadow-lg"
                  filter="drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))"
                />

                {/* Inner circle */}
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill={color}
                  className="transition-all duration-300"
                />

                {/* Value label above point */}
                <motion.text
                  x={x}
                  y={y - 20}
                  textAnchor="middle"
                  className="text-sm font-bold fill-current text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, y: y - 10 }}
                  animate={{ opacity: 1, y: y - 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
                >
                  {point.value.toLocaleString()}
                </motion.text>

                {/* X-axis label below chart */}
                <motion.text
                  x={x}
                  y={height - 8}
                  textAnchor="middle"
                  className="text-xs font-medium fill-current text-gray-600 dark:text-gray-400"
                  initial={{ opacity: 0, y: height - 5 }}
                  animate={{ opacity: 1, y: height - 8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1.0 }}
                >
                  {point.label}
                </motion.text>
              </motion.g>
            );
          })}
        </g>
      </svg>
    </motion.div>
  );
}
