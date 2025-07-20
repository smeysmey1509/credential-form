import React from "react";
import { FaRegTrashAlt, FaRegHeart } from "react-icons/fa";

interface Column {
  header: string;
  accessor: string;
  width?: string; // e.g. '200px' or '20%'
  color?: string; // e.g. 'text-red-500'
  render?: (value: any, row: any) => React.ReactNode; // custom cell render
}

interface DynamicTableProps {
  columns: Column[];
  data: any[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ columns, data = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="py-4 border-b border-b-gray-200">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{ width: col.width }}
                className={`px-4 py-2 font-medium ${col.color || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, ri) => (
              <tr key={ri} className="border-b border-b-gray-200">
                {columns.map((col, ci) => {
                  if (col.accessor === "name") {
                    return (
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2 py-2">
                          <div className="w-[80px] h-[80px] rounded-sm bg-[#F9F9FA] leading-[5rem] p-2">
                            <img
                              src={row?.image}
                              alt={row?.image}
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

                  if (col.accessor === "action") {
                    return (
                      <td
                        key={ci}
                        className={`px-4 py-2 ${col.color || ""}`}
                        style={{ width: col.width }}
                      >
                        {/* Replace below with your real action buttons or handlers */}
                        <button
                          className="mr-2 p-2 bg-[#5C67FC] text-white cursor-pointer rounded"
                          onClick={() => alert(`Edit ${row.name}`)}
                        >
                          <FaRegHeart />
                        </button>
                        <button
                          className="p-2 bg-[#FF5D9F] text-white cursor-pointer font-bold rounded"
                          onClick={() => alert(`Delete ${row.name}`)}
                        >
                          <FaRegTrashAlt />
                        </button>
                      </td>
                    );
                  }

                  // Normal data cell
                  const value = row[col.accessor];

                  return (
                    <td
                      key={ci}
                      className={`px-4 py-2 font-bold text-[#212B37] ${
                        col.color || ""
                      }`}
                      style={{ width: col.width }}
                    >
                      {col.render ? col.render(value, row) : `$${value}`}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
