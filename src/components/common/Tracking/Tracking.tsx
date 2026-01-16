import React from "react";
import FormFieldTracking from "../FormField/FormFieldTracking";
import OrderAccordion from "../OrderAccordion/OrderAccordion";

const Tracking = () => {
  return (
    <div className="w-full h-fit">
      <div className="flex justify-between p-4">
        <div className="font-medium text-[15.2px] font-sans text-[#212B37] dark:text-white">
          Order tracking
        </div>
        <div className="text-[13px] font-sans font-semibold text-[#212B37] dark:text-white">
          ID : <span className="text-[#5C67F7]">#245879</span>
        </div>
      </div>
      <div className="w-full h-fit p-3">
        <div className="mb-3">
          <FormFieldTracking />
        </div>
        <p className="mb-4">
          <span className="font-medium me-2 text-[14px] font-sans text-[#212b37] dark:text-white">
            Status:
          </span>
          <span className="inline-block bg-[#EDFAF5] text-[#21CE9E] font-sans text-[11px] font-medium px-2 py-[2px] rounded">
            Shipping
          </span>
        </p>
        <div className="mb-4">
          <OrderAccordion />
        </div>
      </div>
    </div>
  );
};

export default Tracking;
