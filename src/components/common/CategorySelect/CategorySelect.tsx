import React, { useState } from "react";
import CheckBox from "../CheckBox/CheckBox";
import { GoPlus } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";

interface CategorySelectProps {
  label?: string;
  data: { id: string; name: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  label,
  data,
  selected,
  onChange,
}) => {
  const [showAll, setShowAll] = useState(false);

  const toggleCategory = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const displayedData = showAll ? data : data.slice(0, 5);

  return (
    <div className="w-full flex flex-col">
      {label && (
        <h6 className="w-full text-[16px] text-[#212B37] font-semibold font-sans">
          {label}
        </h6>
      )}

      {/* Animate list items */}
      <AnimatePresence>
        {displayedData.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full flex justify-between items-center mt-2 select-none"
          >
            <p
              className="text-[14px] text-[#212B37] font-semibold cursor-pointer"
              onClick={() => toggleCategory(item.id)}
            >
              {item.name}
              <span className="text-[#6e829f] text-[0.6875rem] ml-1 font-normal">
                (2,712)
              </span>
            </p>
            <CheckBox
              checked={selected.includes(item.id)}
              onChange={() => toggleCategory(item.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Expand / Collapse Button */}
      {data.length > 5 && (
        <div
          onClick={() => setShowAll(!showAll)}
          className="w-full flex justify-between items-center py-[10px] px-[9px] rounded-[0.3rem] mt-4 bg-[#EFF1FE] cursor-pointer"
        >
          <p className="text-[11px] font-sans font-semibold text-[#5C67F7]">
            {showAll ? "LESS" : "MORE"}
          </p>
          <motion.div
            animate={{ rotate: showAll ? 45 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <GoPlus className="inline-block text-[16px] font-sans font-medium text-[#5C67F7]" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
