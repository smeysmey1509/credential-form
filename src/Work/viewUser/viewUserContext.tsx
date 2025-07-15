import React, { useState, useRef, useEffect } from "react";
import UserInputForm from "../userInput/userInput";
import FormSelection from "../FormSelection/FormSelection";
import "./viewUserContext.css";

interface ViewUserContextProp {
  onClose: () => void;
  show: boolean;
}

const ViewUserContext: React.FC<ViewUserContextProp> = ({ onClose, show }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [selectRole, setSelectRole] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, show]);

  return (
    <>
      <div className={`scl--view-user-container ${show ? "show" : ""}`}></div>
      <div
        ref={ref}
        className={`scl--view-user-profile-container ${show ? "show" : ""}`}
      >
        <div className="scl--view-user-form-profile">
          <h4 className="scl--view-user-form-title">View User</h4>
          <div className="scl--view-user-profile-image">
            <img
              src="https://www.allkpop.com/upload/2025/01/content/290112/1738131147-img-8892.jpeg"
              alt="profile"
            />
            <div className="scl--view-user-profile-image-base">
              <div className="scl--view-user-profile-image-base-child">
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.15979 10.6723L2.4953 12.0102L-0.00878906 12.0078V9.17475L6.60168 2.56428L9.43472 5.3973L4.15979 10.6723ZM7.54603 1.61992L8.96254 0.203392C9.22337 -0.0573807 9.64613 -0.0573807 9.90689 0.203392L11.7956 2.0921C12.0564 2.35287 12.0564 2.77568 11.7956 3.03645L10.3791 4.45298L7.54603 1.61992Z"
                    fill="#F9F9FB"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="scl--view-user-form-field">
          <UserInputForm
            label="Username"
            placeHolder="Enter username"
            value={username}
            onChangeData={(e) => setUsername(e.target.value)}
            required
          />
          <UserInputForm
            label="Email"
            placeHolder="Enter email"
            value={email}
            onChangeData={(e) => setEmail(e.target.value)}
          />
          <UserInputForm
            type="number"
            label="Phone number"
            placeHolder="Enter phone number"
            value={phoneNumber}
            onChangeData={(e) => setPhoneNumber(e.target.value)}
          />
          <UserInputForm
            label="Password"
            placeHolder="Enter password"
            value={password}
            onChangeData={(e) => setPassword(e.target.value)}
            required
          />
          <UserInputForm
            label="Enter confirm password"
            placeHolder="Enter confirm password"
            value={confirmPassword}
            onChangeData={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <FormSelection
            label="Role"
            placeholder="Select Role"
            required
            value={selectRole}
            options={["1", "2", "3"]}
            onChange={(e) => setSelectRole(e)}
          />
        </div>
      </div>
    </>
  );
};

export default ViewUserContext;
