import React, { useEffect, useRef } from 'react';
import "./checkbox.css";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
  disabled?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange, indeterminate = false, disabled = false }) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label className={`scl--custom-checkbox-label ${disabled ? 'disabled' : ''}`}>
      <input
        type="checkbox"
        ref={checkboxRef}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
        className="scl--hidden-checkbox-input"
      />
      <span className="scl--custom-checkbox-box"></span>
    </label>
  );
};

export default CustomCheckbox;
