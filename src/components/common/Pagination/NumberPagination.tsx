import React, { useState } from "react";
import Pagination from "./Pagination";
import { BsArrowRight } from "react-icons/bs";

interface NumberPaginationProps {
  classname?: string;
}

const NumberPagination = ({ classname }: NumberPaginationProps) => {
  const [page, setPage] = useState<number>(1);

  return (
    <div className={`w-full h-fit flex justify-between items-center text-[#212B37] shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] rounded bg-white p-[16px] ${classname}`}>
      <div className="flex justify-center items-center text-center gap-1 text-[13px] font-sans">
        Showing <span className="font-bold text-[#212B37]">1</span> to{" "}
        <span className="font-bold text-[#212B37]">6</span> entries
        <BsArrowRight className="ml-4 font-semibold font-sans" />
      </div>
      <Pagination
        page={1}
        totalPages={6}
        boundaryCount={0}
        siblingCount={0}
        onChange={setPage}
      />
    </div>
  );
};

export default NumberPagination;
