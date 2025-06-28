import React, {useState, useRef, useEffect} from "react";
import {RiArrowDownSFill} from "react-icons/ri";

interface MultiSelectProps {
    label: string;
    options: string[];
    placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({options, placeholder = "Select options", label}) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

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
        if (selected.includes(option)) {
            setSelected(selected.filter((item) => item !== option));
        } else {
            setSelected([...selected, option]);
        }
    };

    const handleRemove = (option: string) => {
        setSelected(selected.filter((item) => item !== option));
    };

    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div ref={containerRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">{label}</label>
            <div
                onClick={toggleDropdown}
                className="flex flex-wrap items-center text-center gap-2 mt-2 border border-[#dee7f1] rounded font-normal text-[13px] px-[0.75rem] py-[0.375rem] bg-white cursor-pointer focus-within:border-gray-500 transition"
            >
                {selected.length === 0 ? (
                    <span className="text-gray-400 text-sm">{placeholder}</span>
                ) : (
                    selected.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center text-center bg-[#5c67f7] rounded px-3 text-sm font-medium text-white"
                        >
                            {item}
                            <span className="mx-1">|</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(item);
                                }}
                                className="ml-1 text-white opacity-75 hover:opacity-100 cursor-pointer"
                            >
                                ×
                            </button>
                        </div>
                    ))
                )}
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg">
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-[0.75rem] py-[0.375rem] border-b border-gray-200 text-sm outline-none"
                    />
                    <ul className="overflow-y-auto">
                        {filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(option)}
                                className={`px-[0.75rem] py-[0.375rem] text-sm hover:bg-gray-100 cursor-pointer ${
                                    selected.includes(option) ? "bg-gray-100" : ""
                                }`}
                                role="option"
                                aria-selected={selected.includes(option)}
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

export default MultiSelect;
