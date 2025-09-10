import React, { useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (nextPage: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  className?: string;
};

const btnBase =
  "relative z-10 text-[13px] font-sans px-[12px] py-[6px] rounded shadow transition-colors duration-200";
const btnDefault = `${btnBase} text-[#212B37] bg-white border border-[#ecf3fb] cursor-pointer hover:bg-transparent hover:text-[#5C67F7]`;
const btnDisabled = `${btnBase} text-[#9aa8bd] bg-[#F3F5F8] cursor-not-allowed opacity-60`;
const activePillClass = "absolute inset-0 rounded bg-[#5C67F7] shadow";

function range(start: number, end: number) {
  return Array.from(
    { length: Math.max(end - start + 1, 0) },
    (_, i) => start + i
  );
}

function getItems(
  page: number,
  total: number,
  siblingCount: number,
  boundaryCount: number
) {
  if (total <= 0) return [];
  const totalNumbers = boundaryCount * 2 + 1;
  if (total <= totalNumbers) return range(1, total);

  const leftBoundary = range(1, boundaryCount);
  const rightBoundary = range(Math.max(total - boundaryCount + 1, 1), total);

  const startThreshold = boundaryCount + 1 + siblingCount;
  const endThreshold = total - boundaryCount - siblingCount;

  if (page <= startThreshold) {
    const leftBlockEnd = Math.min(
      boundaryCount + siblingCount + 1,
      total - boundaryCount - 1
    );
    const leftBlock = range(1, leftBlockEnd);
    return [...leftBlock, "ellipsis-right", ...rightBoundary];
  }
  if (page >= endThreshold) {
    const rightBlockStart = Math.max(
      total - (boundaryCount + siblingCount),
      boundaryCount + 2
    );
    const rightBlock = range(rightBlockStart, total);
    return [...leftBoundary, "ellipsis-left", ...rightBlock];
  }

  const middleStart = Math.max(page - siblingCount, boundaryCount + 2);
  const middleEnd = Math.min(page + siblingCount, total - boundaryCount - 1);
  const middle = range(middleStart, middleEnd);

  return [
    ...leftBoundary,
    "ellipsis-left",
    ...middle,
    "ellipsis-right",
    ...rightBoundary,
  ];
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onChange,
  siblingCount = 1,
  boundaryCount = 1,
  className = "",
}) => {
  const items = useMemo(
    () => getItems(page, totalPages, siblingCount, boundaryCount),
    [page, totalPages, siblingCount, boundaryCount]
  );

  const go = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    onChange(p);
  };

  return (
    <nav
      className={`flex justify-center items-center gap-1 ${className}`}
      role="navigation"
      aria-label="Pagination"
    >
      <motion.button
        type="button"
        className={page <= 1 ? btnDisabled : btnDefault}
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        whileHover={{ scale: page <= 1 ? 1 : 1.03 }}
        whileTap={{ scale: page <= 1 ? 1 : 0.97 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        Prev
      </motion.button>

      <LayoutGroup id="pagination">
        <ul className="flex space-x-1">
          {items.map((it) => {
            if (typeof it === "string") {
              return (
                <AnimatePresence initial={false} key={it}>
                  <motion.li
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="relative text-[13px] text-[#9aa8bd] px-[12px] py-[6px] rounded select-none"
                    aria-hidden="true"
                  >
                    …
                  </motion.li>
                </AnimatePresence>
              );
            }

            const isActive = it === page;
            return (
              <motion.li
                key={it}
                layout="position" // animate position only (reduces flicker)
                initial={false} // don't re-animate on list changes
                className="relative"
                transition={{ type: "spring", stiffness: 600, damping: 40 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className={activePillClass}
                    initial={false}
                    transition={{ type: "spring", stiffness: 600, damping: 34 }}
                  />
                )}
                <motion.button
                  type="button"
                  className={
                    isActive
                      ? `${btnBase} text-white border border-transparent bg-transparent`
                      : btnDefault
                  }
                  onClick={() => go(it)}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Page ${it}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {it}
                </motion.button>
              </motion.li>
            );
          })}
        </ul>
      </LayoutGroup>

      <motion.button
        type="button"
        className={page >= totalPages ? btnDisabled : btnDefault}
        onClick={() => go(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        whileHover={{ scale: page >= totalPages ? 1 : 1.03 }}
        whileTap={{ scale: page >= totalPages ? 1 : 0.97 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        Next
      </motion.button>
    </nav>
  );
};

export default Pagination;
