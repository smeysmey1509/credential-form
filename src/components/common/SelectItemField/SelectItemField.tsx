import React, {useState, useRef, useEffect} from "react";
import {RiArrowDownSFill} from "react-icons/ri";

interface CustomSelectProps {
    label: string;
    options: string[];
    placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({options, placeholder = "Select", label}) => {
    const [selected, setSelected] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (option: string) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="relative w-full">
            <label className="text-[14px] font-medium text-[#212b37] dark:text-white">{label}</label>
            <div
                onClick={toggleDropdown}
                className="flex mt-2 justify-between items-center border border-[#dee7f1] rounded px-[0.75rem] py-[0.375rem] bg-white cursor-pointer transition"
            >
                <span className="text-gray-500 text-sm">
                  {selected || placeholder}
                </span>
                <RiArrowDownSFill className="text-gray-500"/>
            </div>

            {isOpen && (
                <div
                    className="absolute z-10 w-full bg-white border border-gray-300 dark:bg-transparent rounded shadow-lg">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-3 py-2 border-b border-gray-200 dark:bg-green-800 text-sm outline-none"
                    />
                    <ul className="max-h-60 overflow-y-auto">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(option)}
                                className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                                    selected === option ? "bg-gray-100" : ""
                                }`}
                                role="option"
                                aria-selected={selected === option}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
