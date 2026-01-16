import React, { useState } from "react";
import CheckBox from "../CheckBox/CheckBox";
import { GoPlus } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";

type Accessors<T> = {
  id: (x: T) => string;
  label: (x: T) => React.ReactNode;
  count?: (x: T) => number | undefined;
  disabled?: (x: T) => boolean;
};

interface GenericSelectProps<T> {
  label?: string;
  data?: T[];
  selected: string[];
  onChange: (selectedIds: string[]) => void;
  accessors: Accessors<T>;
  limit?: number;
  showCount?: boolean;
}

function GenericSelect<T>({
  label,
  data = [],
  selected,
  onChange,
  accessors,
  limit = 5,
  showCount = true,
}: GenericSelectProps<T>) {
  const [showAll, setShowAll] = useState(false);

  const toggle = (id: string, isDisabled?: boolean) => {
    if (isDisabled) return;
    onChange(selected.includes(id) ? selected.filter(v => v !== id) : [...selected, id]);
  };

  const displayed = showAll ? data : data.slice(0, limit);

  return (
    <div className="w-full flex flex-col p-[16px] border-b border-b-gray-200 dark:border-b-[#2d3748]">
      {label && (
        <h6 className="w-full text-[16px] text-[#212B37] dark:text-white font-semibold font-sans">
          {label}
        </h6>
      )}

      <AnimatePresence>
        {displayed.map((item, i) => {
          const id = accessors?.id(item);
          const name = accessors?.label(item);
          const count = accessors?.count?.(item) ?? 0;
          const disabled = accessors?.disabled?.(item) ?? false;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              className={`w-full flex justify-between items-center mt-2 select-none ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <p
                className="text-[14px] text-[#212B37] dark:text-white font-semibold cursor-pointer"
                onClick={() => toggle(id, disabled)}
              >
                {name}
                {showCount && (
                  <span className="text-[#6e829f] dark:text-[#cbd5f5] text-[0.6875rem] ml-1 font-semibold font-sans">
                    ({count})
                  </span>
                )}
              </p>
              <CheckBox
                checked={selected.includes(id)}
                onChange={() => toggle(id, disabled)}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {data.length > limit && (
        <div
          onClick={() => setShowAll(!showAll)}
          className="w-full flex justify-between items-center py-[10px] px-[9px] rounded-[0.3rem] mt-4 bg-[#EFF1FE] dark:bg-[#1f2937] cursor-pointer"
        >
          <p className="text-[11px] font-sans font-semibold text-[#5C67F7]">
            {showAll ? "LESS" : "MORE"}
          </p>
          <motion.div animate={{ rotate: showAll ? 45 : 0 }} transition={{ duration: 0.25 }}>
            <GoPlus className="inline-block text-[16px] font-sans font-medium text-[#5C67F7]" />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default GenericSelect;
