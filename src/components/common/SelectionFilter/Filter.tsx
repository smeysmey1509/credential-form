import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const options = [
  { id: "1", label: "New" },
  { id: "2", label: "This Week" },
  { id: "3", label: "This Month" },
];

interface FilterProps {
  onSortChange?: (sortBy: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onSortChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    options[options.length - 1].label // default: "This Month"
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleOptionClick = (option: { id: string; label: string }) => {
    setSelectedOption(option.label);
    setOpen(false);
    onSortChange?.(option.label);
    // return focus to button for good a11y
    btnRef.current?.focus();
  };

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="w-full h-full relative">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="w-full h-full flex items-center justify-center gap-2 bg-[#5C67F7] dark:bg-[#4f46e5] rounded cursor-pointer py-[4.16px] px-[8px]"
      >
        <span className="text-white text-[12px] font-semibold font-sans">
          Sort By
        </span>
        <IoIosArrowDown
          className={`text-white text-[12px] font-sans transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            key="dropdown"
            role="listbox"
            aria-label="Sort By"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-1 w-[180px] text-[#212B37] dark:text-[#e5e7eb] border border-[#ecf3fb] dark:border-[#2d3748] font-normal text-[0.85rem] bg-white dark:bg-[#111827] shadow-lg rounded z-10 overflow-hidden"
          >
            {options.map((option, i) => {
              const active = selectedOption === option.label;
              return (
                <motion.li
                  key={option.id}
                  role="option"
                  aria-selected={active}
                  tabIndex={0}
                  onClick={() => handleOptionClick(option)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOptionClick(option);
                    }
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15, delay: i * 0.05 }}
                  className={`py-[0.5rem] px-[0.9375rem] font-sans cursor-pointer hover:text-[#0d6efd] hover:bg-[#F9F9FA] dark:hover:bg-[#1f2937] ${
                    active
                      ? "bg-[#F5F7FF] text-[#0d6efd] dark:bg-[#1f2937]"
                      : ""
                  }`}
                >
                  {option.label}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filter;
