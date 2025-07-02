import React, {useState, useRef, useEffect} from "react";
import {RiArrowDownSFill} from "react-icons/ri";
import "./FormSelection.css";

export interface OptionType {
    value: string;
    label: string;
}

interface FormSelectionProps {
    label: string;
    options: Array<string> | Array<OptionType>;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    required?: boolean;
}

const FormSelection: React.FC<FormSelectionProps> = ({
                                                         options,
                                                         placeholder = "Select",
                                                         label,
                                                         value,
                                                         onChange,
                                                         required = false,
                                                     }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const containerRef = useRef<HTMLDivElement>(null);

    const normalizedOptions: OptionType[] = options.map((opt) =>
        typeof opt === "string" ? {label: opt, value: opt} : opt
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (option: OptionType) => {
        if (onChange) onChange(option.value);
        setIsOpen(false);
    };

    const selectedOption = normalizedOptions.find((opt) => opt.value === value);

    const filteredOptions = normalizedOptions.filter(
        (opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div ref={containerRef} className="form-selection">
            <label className="form-selection-label">{required && (<span>*</span>)}{label}</label>
            <div className="form-selection-control" onClick={toggleDropdown}>
                <span className="form-selection-placeholder">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <RiArrowDownSFill className="form-selection-icon"/>
            </div>

            {isOpen && (
                <div className="form-selection-dropdown">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-selection-search"
                    />
                    <ul className="form-selection-list">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(option)}
                                    className={`form-selection-item ${
                                        selectedOption?.value === option.value ? "active" : ""
                                    }`}
                                    role="option"
                                    aria-selected={selectedOption?.value === option.value}
                                >
                                    {option.label}
                                </li>
                            ))
                        ) : (
                            <li className="form-selection-no-result">No results found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FormSelection;
