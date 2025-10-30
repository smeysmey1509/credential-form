import React, { useState, useRef, useEffect } from "react";
import { RiArrowDownSFill } from "react-icons/ri";

export interface OptionType {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  options: Array<string> | Array<OptionType>;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select",
  label,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openUpward, setOpenUpward] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: OptionType[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Smart positioning: detect if dropdown would overflow window
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 240; // approximate max dropdown height
      setOpenUpward(spaceBelow < dropdownHeight);
    }
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: OptionType) => {
    if (onChange) onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  const filteredOptions = normalizedOptions.filter(
    (opt) =>
      opt.label && opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="text-[14px] font-bold text-[#212b37] dark:text-white">
        {label}
      </label>
      <div
        onClick={toggleDropdown}
        className="flex mt-2 justify-between items-center text-[#212b37] dark:bg-[#19191C] font-normal border border-[#dee7f1] dark:border-gray-700  rounded px-[0.75rem] py-[0.375rem] bg-white cursor-pointer transition"
      >
        <span className="text-[#212b37] text-sm">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <RiArrowDownSFill className="text-gray-500" />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute z-10 w-full border border-gray-300 bg-white dark:bg-[#19191C] dark:border-gray-700 shadow-lg transition-all ${
            openUpward ? "bottom-[100%] mb-1" : "top-[100%] mt-1"
          }`}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border-b dark:border-b-gray-700 border-gray-200 dark:bg-[#19191C] text-sm outline-none"
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#5c67f7] cursor-pointer ${
                    selectedOption?.value === option.value
                      ? "bg-gray-100 dark:bg-[#5c67f7]"
                      : ""
                  }`}
                  role="option"
                  aria-selected={selectedOption?.value === option.value}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
