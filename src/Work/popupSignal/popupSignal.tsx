import React from "react";
import "./popupSignal.css";
import GrayButton from "../Button/GrayButton/GrayButton";
import NegativeButton from "../Button/negetiveButton/negativeButton";

export const PopupSignal = () => {
  return (
    <div className="scl--popup-signal-container">
      <div className="scl--popup-signal-header">
        <div className="scl--popup-signal-header-message">
            <div className="scl--popup-signal-header-message-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6.60156H21M4.8 6.60156H19.2V15.0016C19.2 17.83 19.2 19.2442 18.3213 20.1229C17.4426 21.0016 16.0284 21.0016 13.2 21.0016H10.8C7.97157 21.0016 6.55736 21.0016 5.67868 20.1229C4.8 19.2442 4.8 17.83 4.8 15.0016V6.60156Z" stroke="#FC5A5A" stroke-width="1.6" stroke-linecap="round"/>
                    <path d="M7.5 6.6V5C7.5 3.89543 8.39543 3 9.5 3H14.5C15.6046 3 16.5 3.89543 16.5 5V6.6M16.5 6.6H3M16.5 6.6H21" stroke="#FC5A5A" stroke-width="1.6" stroke-linecap="round"/>
                    <path d="M10.2002 11.1016L10.2002 16.5016" stroke="#FC5A5A" stroke-width="1.6" stroke-linecap="round"/>
                    <path d="M13.7998 11.1016L13.7998 16.5016" stroke="#FC5A5A" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
            </div>
            <div className="scl--popup-signal-header-message-label">
                <h4>Deletes user Smey@admin?</h4>
                <span>Are you sure you want to delete user?
                    This action cannot be undone.</span>
            </div>
        </div>
        <button className="scl--popup-signal-close">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.1177 0.882812L0.882324 13.1182M0.882324 0.882812L13.1177 13.1182"
              stroke="#6F6C8F"
              stroke-width="1.76471"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="scl--popup-signal-footer">
        <GrayButton label="Cancel" onClick={() => alert('Cancel')}/>
        <NegativeButton label="Delete" onClick={() => alert("Delete")}/>
      </div>
    </div>
  );
};
