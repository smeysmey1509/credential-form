import React, { useEffect, useRef, useState } from "react";
import { LuArrowDownWideNarrow } from "react-icons/lu";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const options = [
  { id: "1", label: "Date Published" },
  { id: "2", label: "Most Relevant" },
  { id: "3", label: "Price Low to High" },
  { id: "4", label: "Price High to Low" },
  { id: "5", label: "Sort By" },
];

interface SelectionFilterProps {
  onSortChange?: (sortBy: string) => void;
  classname?: string;
}

const SelectionFilter: React.FC<SelectionFilterProps> = ({
  onSortChange,
  classname,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    options[options.length - 1].label
  );

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleOptionClick = (option: { id: string; label: string }) => {
    setSelectedOption?.(option.label);
    setOpen(false);
    onSortChange?.(option.label);
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative w-fit h-fit flex justify-center items-center ${classname}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-fit h-fit flex items-center justify-center gap-2 text-[#212B37] dark:text-[#e5e7eb] border border-[#ecf3fb] dark:border-[#2d3748] rounded px-[0.75rem] py-[0.45rem] text-[14px] font-semibold cursor-pointer hover:bg-[#F9F9FA] dark:hover:bg-[#1f2937] select-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <LuArrowDownWideNarrow />
        <span className="font-semibold text-center whitespace-nowrap">
          {selectedOption}
        </span>
        <MdOutlineKeyboardArrowDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            key="dropdown"
            role="listbox"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-1 w-[180px] text-[#212B37] dark:text-[#e5e7eb] border border-[#ecf3fb] dark:border-[#2d3748] font-normal text-[0.85rem] bg-white dark:bg-[#111827] shadow-lg rounded z-10 overflow-hidden"
          >
            {options.map((option, i) => (
              <motion.li
                key={option.id}
                role="option"
                aria-selected={selectedOption === option.label}
                onClick={() => handleOptionClick(option)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15, delay: i * 0.05 }}
                className={`py-[0.5rem] px-[0.9375rem] font-sans cursor-pointer hover:text-[#0d6efd] hover:bg-[#F9F9FA] dark:hover:bg-[#1f2937] ${
                  selectedOption === option.label
                    ? "bg-[#F5F7FF] text-[#0d6efd] dark:bg-[#1f2937]"
                    : ""
                }`}
              >
                {option.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectionFilter;
