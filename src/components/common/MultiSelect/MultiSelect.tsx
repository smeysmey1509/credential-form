import React, {useState, useRef, useEffect} from "react";

interface MultiSelectProps {
    label: string;
    options: string[];
    placeholder?: string;
    value?: string[];
    onChange?: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
                                                     options,
                                                     placeholder = "Select options",
                                                     label,
                                                     value,
                                                     onChange,
                                                 }) => {
    const [selected, setSelected] = useState<string[]>(value || []);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearch("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const updateSelected = (newSelected: string[]) => {
        setSelected(newSelected);
        onChange?.(newSelected);
    };

    const handleSelect = (option: string) => {
        if (selected.includes(option)) {
            updateSelected(selected.filter((item) => item !== option));
        } else {
            updateSelected([...selected, option]);
        }
        setSearch("");
    };

    const handleRemove = (option: string) => {
        updateSelected(selected.filter((item) => item !== option));
    };

    const handleAddCustom = () => {
        if (search.trim() && !selected.includes(search.trim())) {
            updateSelected([...selected, search.trim()]);
        }
        setSearch("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddCustom();
        }
    };

    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div ref={containerRef} className="relative">
            <label className="block text-sm font-medium text-[#212b37] dark:text-white">
                {label}
            </label>
            <div
                onClick={toggleDropdown}
                className="flex flex-wrap items-center text-center gap-2 mt-2 border border-[#dee7f1] dark:border-gray-700 rounded font-normal text-[13px] px-[0.75rem] py-[0.375rem] bg-white dark:bg-[#19191C] cursor-pointer focus-within:border-gray-500 transition"
            >
                {selected.length === 0 ? (
                    <span className="text-gray-400 text-sm">{placeholder}</span>
                ) : (
                    selected.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-[#5c67f7] rounded px-2 py-1 text-sm font-medium text-white"
                        >
                            {item}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(item);
                                }}
                                className="ml-2 text-white opacity-75 hover:opacity-100 cursor-pointer"
                            >
                                ×
                            </button>
                        </div>
                    ))
                )}
            </div>
            {isOpen && (
                <div
                    className="absolute z-10 w-full border bg-white border-gray-300 dark:bg-[#19191C] dark:border-gray-700 rounded shadow-lg">
                    <input
                        type="text"
                        placeholder="Type or search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full px-[0.75rem] py-[0.375rem] border-b dark:border-b-gray-700 border-gray-200 dark:bg-[#19191C] text-sm outline-none"
                    />
                    <ul className="max-h-60 overflow-y-auto">
                        {filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(option)}
                                className={`px-[0.75rem] py-[0.375rem] text-sm hover:bg-gray-100 dark:hover:bg-[#5c67f7] cursor-pointer ${
                                    selected.includes(option) ? "bg-gray-100 dark:bg-[#5c67f7]" : ""
                                }`}
                                role="option"
                                aria-selected={selected.includes(option)}
                            >
                                {option}
                            </li>
                        ))}
                        {filteredOptions.length === 0 && search.trim() && (
                            <li
                                onClick={handleAddCustom}
                                className="px-[0.75rem] py-[0.375rem] text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-[#5c67f7] cursor-pointer"
                            >
                                Add "{search.trim()}"
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
