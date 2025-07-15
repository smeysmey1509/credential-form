import React, { useState } from "react";
import "./userInput.css";

interface UserInputFormProp {
  label?: string;
  placeHolder?: string;
  required?: boolean;
  value?: string;
  onChangeData?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  hasError?: string;
  errorMessage?: string;
}

const UserInputForm: React.FC<UserInputFormProp> = ({
  label,
  placeHolder,
  required,
  value,
  onChangeData,
  type,
  hasError,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type || "text";

  return (
    <div className="scl--user-input-form-container">
      <label className="scl--user-input-form-label">
        {required && <span className="scl--user-input-form-required">*</span>}
        {label}
      </label>

      <div className="scl--user-input-wrapper">
        <input
          type={inputType}
          placeholder={placeHolder}
          value={value}
          onChange={onChangeData}
          required={required}
          className={hasError ? "scl--user-input-error" : ""}
        />

        {isPasswordField && (
          <button
            type="button"
            className="scl--user-password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.47432 5.52461L5.52266 8.47628C5.14349 8.09711 4.91016 7.57794 4.91016 7.00044C4.91016 5.84544 5.84349 4.91211 6.99849 4.91211C7.57599 4.91211 8.09516 5.14544 8.47432 5.52461Z"
                  stroke="#ABADB5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.3959 3.36578C9.37505 2.59578 8.20839 2.17578 7.00089 2.17578C4.94172 2.17578 3.02255 3.38911 1.68672 5.48911C1.16172 6.31161 1.16172 7.69411 1.68672 8.51661C2.14755 9.23995 2.68422 9.86411 3.26755 10.3658"
                  stroke="#ABADB5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.91016 11.3917C5.57516 11.6717 6.28099 11.8233 6.99849 11.8233C9.05766 11.8233 10.9768 10.61 12.3127 8.51C12.8377 7.6875 12.8377 6.305 12.3127 5.4825C12.1202 5.17917 11.9102 4.89333 11.6943 4.625"
                  stroke="#ABADB5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.04734 7.4082C8.89568 8.2307 8.22484 8.90154 7.40234 9.0532"
                  stroke="#ABADB5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.52547 8.47656L1.16797 12.8341"
                  stroke="#ABADB5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.8341 1.16602L8.47656 5.52352"
                  stroke="#ABADB5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.08682 7.00044C9.08682 8.15544 8.15349 9.08878 6.99849 9.08878C5.84349 9.08878 4.91016 8.15544 4.91016 7.00044C4.91016 5.84544 5.84349 4.91211 6.99849 4.91211C8.15349 4.91211 9.08682 5.84544 9.08682 7.00044Z"
                  stroke="#ABADB5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.00089 11.8241C9.06005 11.8241 10.9792 10.6108 12.3151 8.51075C12.8401 7.68825 12.8401 6.30575 12.3151 5.48325C10.9792 3.38325 9.06005 2.16992 7.00089 2.16992C4.94172 2.16992 3.02255 3.38325 1.68672 5.48325C1.16172 6.30575 1.16172 7.68825 1.68672 8.51075C3.02255 10.6108 4.94172 11.8241 7.00089 11.8241Z"
                  stroke="#ABADB5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {hasError && (
        <span className="scl--user-input-form-error">
          <span>*</span> {errorMessage}
        </span>
      )}
    </div>
  );
};

export default UserInputForm;
