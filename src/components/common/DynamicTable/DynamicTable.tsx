import React from "react";
import { FaRegTrashAlt, FaRegHeart } from "react-icons/fa";

interface Column {
  header: string;
  accessor: string;
  width?: string;
  color?: string;
  currency?: boolean;
  headerClass?: string;
  bodyColor?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DynamicTableProps {
  columns: Column[];
  data: any[] | null;
  actions?: {
    wishlist?: (row: any) => void;
    delete?: (row: any) => void;
  };
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  data = [],
  actions = {},
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="py-4 border-b border-b-[#ecf3fb]">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{ width: col.width }}
                className={`px-4 py-2 font-mediu ${col.color || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, ri) => (
              <tr key={ri} className="border-b border-b-[#ecf3fb]">
                {columns.map((col, ci) => {
                  if (col.accessor === "name") {
                    return (
                      <td key={ci} className="px-4 py-2">
                        <div className="flex items-center gap-2 py-2">
                          <div className="w-[80px] h-[80px] rounded-sm bg-[#F9F9FA] leading-[5rem] p-2">
                            <img
                              src={
                                row?.image ||
                                "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                              }
                              alt={row?.image || "No image available"}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <h4 className="text-[14px] text-[#0A0A0A] font-bold">
                                {row?.name}
                              </h4>
                              <span className="bg-[#FF8E6F] text-center text-white text-[9px] px-[7.2px] py-[4px] rounded-sm">
                                20% Off
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-[#6E829F] text-sm font-bold">
                                <span className="text-[#212B37] text-sm font-normal">
                                  Size :
                                </span>{" "}
                                13"
                              </span>
                              <span className="text-[#6E829F] text-sm font-bold">
                                <span className="text-[#212B37] text-sm font-normal">
                                  Color:
                                </span>{" "}
                                Blue
                              </span>
                            </div>
                            {row.stock > 0 ? (
                              <span className="w-fit text-[#2ECe9E] bg-[#EDFAF5] text-[11px] font-bold px-[7.2px] py-[3px] mt-1 rounded-sm">
                                In Stock
                              </span>
                            ) : (
                              <span className="w-fit text-[#FB4242] bg-[#FFEFED] text-[11px] font-bold px-[7.2px] py-[3px] mt-1 rounded-sm">
                                Out Of Stock
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                    );
                  }

                  if (col.accessor === "item") {
                    return (
                      <td key={ci} className="px-4 py-2">
                        <div className="flex items-center gap-2 py-2">
                          <div className="w-[80px] h-[80px] rounded-sm bg-[#F9F9FA] leading-[5rem] p-2">
                            <img
                              src={
                                row?.image ||
                                "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                              }
                              alt={row?.image || "No image available"}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <h4 className="text-[14px] text-[#0A0A0A] font-bold">
                                {row?.name}
                              </h4>
                            </div>
                            <div className="flex flex-col gap-1 mt-1">
                              <span className="text-[#6E829F] text-sm font-semibold">
                                <span className="text-[#212B37] text-sm font-normal">
                                  Size :
                                </span>{" "}
                                13"
                              </span>
                              <span className="text-[#6E829F] text-sm font-semibold">
                                <span className="text-[#212B37] text-sm font-normal">
                                  Color:
                                </span>{" "}
                                Blue
                                <span className="bg-[#FF8E6F] text-center text-white text-[9px] px-[7.2px] py-[4px] ml-4 rounded-sm">
                                  20% Off
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    );
                  }

                  if (col.accessor === "action") {
                    return (
                      <td
                        key={ci}
                        className={`px-4 py-2 ${col.color || ""}`}
                        style={{ width: col.width }}
                      >
                        {actions.wishlist && (
                          <button
                            className="p-2 bg-blue-500 text-white rounded cursor-pointer"
                            onClick={() => actions.wishlist?.(row)}
                          >
                            <FaRegHeart />
                          </button>
                        )}
                        {actions.delete && (
                          <button
                            className="p-2 bg-pink-500 text-white rounded ml-1 cursor-pointer"
                            onClick={() => actions.delete?.(row)}
                          >
                            <FaRegTrashAlt />
                          </button>
                        )}
                      </td>
                    );
                  }

                  const value = row[col.accessor];
                  return (
                    <td
                      key={ci}
                      className={`px-4 py-2 font-bold text-[#212B37] ${
                        col.bodyColor || ""
                      }`}
                      style={{ width: col.width }}
                    >
                      {col.render ? col.render(value, row) : `${col.currency ? "$" : ""}${value}`}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
