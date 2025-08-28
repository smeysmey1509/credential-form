import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const Digit: React.FC<{ n: string }> = ({ n }) => (
  <div className="relative inline-block w-[0.6ch] overflow-hidden">
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={n}
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.3 }}
        className=""
      >
        {n}
      </motion.span>
    </AnimatePresence>
  </div>
);

export const RollingNumber: React.FC<{ value: number | string }> = ({ value }) => {
  const chars = String(value).split("");
  return (
    <span className="inline-flex">
      {chars.map((c, i) =>
        /\d/.test(c) ? <Digit key={i} n={c} /> : <span key={i}>{c}</span>
      )}
    </span>
  );
};
