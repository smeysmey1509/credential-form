import React, { createContext, useContext, useState, ReactNode } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface PopupContextType {
  showPopup: (content: ReactNode) => void;
  hidePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup must be used inside PopupProvider");
  return context;
};

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [popupContent, setPopupContent] = useState<ReactNode | null>(null);

  const showPopup = (content: ReactNode) => setPopupContent(content);
  const hidePopup = () => setPopupContent(null);

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}

      {ReactDOM.createPortal(
        <AnimatePresence>
          {popupContent && (
            <motion.div
              key="popup-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]"
            >
              {popupContent}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </PopupContext.Provider>
  );
};
