import React, { useMemo, useState } from "react";

type Range = [number, number];

interface PriceRangeProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number; // default 0.01 for cents
  defaultValue?: Range; // initial [min, max] if uncontrolled
  value?: Range; // make it controlled if you pass this
  onChange?: (range: Range) => void;
  className?: string;
}

const PriceRange: React.FC<PriceRangeProps> = ({
  label = "Price Range",
  min = 0,
  max = 50000,
  step = 0.01,
  defaultValue,
  value,
  onChange,
  className = "",
}) => {
  const [internal, setInternal] = useState<Range>([
    defaultValue?.[0] ?? min,
    defaultValue?.[1] ?? max,
  ]);

  const [minVal, maxVal] = value ?? internal;

  const percent = (val: number) => ((val - min) * 100) / (max - min);

  const update = (next: Range) => {
    if (onChange) onChange(next);
    else setInternal(next);
  };

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    []
  );

  return (
    <div className={`w-full flex flex-col gap-4 p-[16px] border-b border-b-gray-200 ${className}`}>
      {label && (
        <h6 className="w-full text-[16px] text-[#212B37] font-semibold font-sans">
          {label}
        </h6>
      )}

      {/* Slider */}
      <div className="relative w-full h-1 rounded-full bg-[#E8ECF4] cursor-pointer">
        {/* active (selected) range */}
        <div
          className="absolute h-1 rounded-full"
          style={{
            left: `${percent(minVal)}%`,
            right: `${100 - percent(maxVal)}%`,
            background: "#4F5DFF",
          }}
        />

        {/* Two overlapped range inputs */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(e) => {
            const v = Math.min(Number(e.target.value), maxVal - step);
            update([v, maxVal]);
          }}
          className="absolute inset-0 w-full bg-transparent pointer-events-none appearance-none"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => {
            const v = Math.max(Number(e.target.value), minVal + step);
            update([minVal, v]);
          }}
          className="absolute inset-0 w-full bg-transparent pointer-events-none appearance-none"
        />

        {/* Thumb styles — uses Bars2 outline SVG as the grip */}
        <style>{`
          /* Chrome / Edge / Safari */
          input[type="range"]::-webkit-slider-thumb {
            pointer-events: auto;
            -webkit-appearance: none;
            appearance: none;
            height: 18px;
            width: 18px;
            border-radius: 6px;
            background-color: #ffffff;
            border: 1px solid rgba(33, 43, 55, 0.12);
            box-shadow: 0 1px 2px rgba(0,0,0,0.15);
            cursor: pointer;
            margin-top: -8.5px; /* center on 1px track */
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23212B37' stroke-opacity='0.5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M3.75 9h16.5M3.75 15h16.5'/></svg>");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 14px 14px;
          }
          input[type="range"]::-webkit-slider-runnable-track {
            height: 2px;
            background: transparent; /* track drawn by divs */
          }

          /* Firefox */
          input[type="range"]::-moz-range-thumb {
            pointer-events: auto;
            height: 18px;
            width: 18px;
            border-radius: 6px;
            background-color: #ffffff;
            border: 1px solid rgba(33, 43, 55, 0.12);
            box-shadow: 0 1px 2px rgba(0,0,0,0.15);
            cursor: pointer;
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23212B37' stroke-opacity='0.5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M3.75 9h16.5M3.75 15h16.5'/></svg>");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 14px 14px;
          }
          input[type="range"]::-moz-range-track {
            height: 2px;
            background: transparent;
          }
        `}</style>
      </div>

      {/* Values */}
      <p className="text-[16px] font-bold text-[#212B37]">
        {formatter.format(minVal)}&nbsp;&nbsp;--&nbsp;&nbsp;
        {formatter.format(maxVal)}
      </p>
    </div>
  );
};

export default PriceRange;
