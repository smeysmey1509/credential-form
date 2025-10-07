import React from "react";

const OrderSummary = () => {
  return (
    <div className="w-full h-fit bg-white shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] rounded-lg">
      <div className="flex justify-between p-4">
        <div className="font-medium text-[15.2px] font-sans text-[#212B37]">
          Order Summary
        </div>
        <div className="text-[13px] font-sans font-semibold text-[#212B37]">
          ID : <span className="text-[#5C67F7]">#245879</span>
        </div>
      </div>
      <div className="p-0 overflow-x-auto">
        <table className="min-w-full">
          <tbody>
            <tr className="border-b border-b-[#ecf3fb]">
              <td className="py-2 px-4">
                <div className="font-semibold font-sans text-[14px] text-[#212B37]">
                  Total Items :
                </div>
              </td>
              <td className="py-2 px-4 font-medium font-sans text-[13px] text-[#212B37]">
                06
              </td>
            </tr>

            <tr className="border-b border-b-[#ecf3fb]">
              <td className="py-2 px-4">
                <div className="font-semibold font-sans text-[14px] text-[#212B37]">
                  Applied Coupon :
                </div>
              </td>
              <td className="py-2 px-4">
                <span className="bg-[#EDFAF5] text-[11px] font-sans text-[#21Ce9E] font-medium px-2 py-[2px] rounded">
                  SP0578A
                </span>
              </td>
            </tr>

            <tr className="border-b border-b-[#ecf3fb]">
              <td className="py-2 px-4">
                <div className="font-semibold font-sans text-[14px] text-[#212B37]">
                  Delivery Fees :
                </div>
              </td>
              <td className="py-2 px-4">
                <span className="text-[#FB4242] text-[13px] font-sans font-medium">
                  +$29
                </span>
              </td>
            </tr>

            <tr className="border-b border-b-[#ecf3fb]">
              <td className="py-2 px-4">
                <div className="font-semibold font-sans text-[14px] text-[#212B37]">
                  Sub Total :
                </div>
              </td>
              <td className="py-2 px-4">
                <span className="text-[14px] font-medium">$3,799</span>
              </td>
            </tr>

            <tr>
              <td className="py-2 px-4">
                <div className="font-semibold font-sans text-[14px] text-[#212B37]">
                  Total Price :
                </div>
              </td>
              <td className="py-2 px-4">
                <span className="text-[20px] font-sans font-bold">$3,129</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderSummary;
