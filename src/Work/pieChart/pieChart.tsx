import React, { useState, useRef } from "react";

interface PieChartProps {
  data: { label: string; value: number; color: string; bgColor: string }[];
  size?: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, size = 120 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulative = 0;

  const slices = data.map((item, idx) => {
    const startAngle = (cumulative / total) * 2 * Math.PI;
    cumulative += item.value;
    const endAngle = (cumulative / total) * 2 * Math.PI;

    const x1 = size / 2 + (size / 2) * Math.cos(startAngle);
    const y1 = size / 2 + (size / 2) * Math.sin(startAngle);
    const x2 = size / 2 + (size / 2) * Math.cos(endAngle);
    const y2 = size / 2 + (size / 2) * Math.sin(endAngle);

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    const pathData = [
      `M ${size / 2} ${size / 2}`,
      `L ${x1} ${y1}`,
      `A ${size / 2} ${size / 2} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ");

    // Midpoint (tooltip location)
    const midAngle = (startAngle + endAngle) / 2;
    const centerX = size / 2 + (size * 0.35) * Math.cos(midAngle);
    const centerY = size / 2 + (size * 0.35) * Math.sin(midAngle);

    return (
      <g
        key={idx}
        onMouseEnter={() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const absoluteX = rect.left + centerX;
            const absoluteY = rect.top + centerY;
            setTooltipPos({ x: absoluteX, y: absoluteY });
          }
          setHoveredIdx(idx);
        }}
        onMouseLeave={() => {
          setHoveredIdx(null);
        }}
      >
        <path d={pathData} fill={item.color} />
      </g>
    );
  });

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices}
      </svg>

      {/* Tooltip with animation */}
      <div
        style={{
          position: "fixed",
          top: tooltipPos.y,
          left: tooltipPos.x,
          transform: hoveredIdx !== null ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.9)",
          opacity: hoveredIdx !== null ? 1 : 0,
          transition: "opacity 0.2s ease, transform 0.2s ease",
          background: hoveredIdx !== null ? data[hoveredIdx].bgColor : "transparent",
          padding: "4px 8px",
          borderRadius: "4px",
          border: hoveredIdx !== null ? "1px solid #ccc" : "none",
          fontSize: 12,
          color: "#FFFFFF",
          fontFamily: "sans-serif",
          whiteSpace: "nowrap",
          boxShadow: hoveredIdx !== null ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        {hoveredIdx !== null && (
          <>
            {data[hoveredIdx].label} {data[hoveredIdx].value}
          </>
        )}
      </div>
    </div>
  );
};

export default PieChart;
