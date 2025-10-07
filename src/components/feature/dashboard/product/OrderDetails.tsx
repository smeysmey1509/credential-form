import React from "react";
import DynamicTable from "../../../common/DynamicTable/DynamicTable";
import { color } from "framer-motion";
import ButtonWithEmoji from "../../../Button/ButtonWithEmoji/ButtonWithEmoji";
import { RiPrinterLine, RiShareForwardLine } from "react-icons/ri";
import Tracking from "../../../common/Tracking/Tracking";
import OrderSummary from "../../../common/OrderSummary/OrderSummary";

const columns = [
  {
    header: "Item",
    accessor: "item",
    width: "40%",
  },
  {
    header: "Tracking ID",
    accessor: "trackingId",
    width: "15%",
    bodyColor: "!text-[#5C67F7] !text-[13px] !font-normal",
  },
  {
    header: "Price",
    accessor: "price",
    width: "15%",
    bodyColor: "!text-[15px] !text-[#212b37] !font-bold",
    currency: true,
  },
  {
    header: "Quantity",
    accessor: "quantity",
    width: "15%",
    bodyColor: "!text-[13px] !text-[#212b37] !font-medium",
  },
  {
    header: "Total Price",
    accessor: "totalPrice",
    width: "15%",
    bodyColor: "!text-[13px] !text-[#212b37] !font-medium",
    currency: true,
  },
];

const data = [
  {
    name: "Wireless Headphones",
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    trackingId: "TRK123456",
    price: 99.99,
    quantity: 2,
    totalPrice: 199.98,
    stock: 15,
  },
  {
    name: "Smartphone",
    image:
      "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    trackingId: "TRK654321",
    price: 599.99,
    quantity: 1,
    totalPrice: 599.99,
    stock: 0,
  },
  {
    name: 'Gaming Laptop 15"',
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    trackingId: "TRK112233",
    price: 1299.99,
    quantity: 1,
    totalPrice: 1299.99,
    stock: 8,
  },
  {
    name: "Mechanical Keyboard",
    image:
      "https://images.pexels.com/photos/3829269/pexels-photo-3829269.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    trackingId: "TRK445566",
    price: 79.99,
    quantity: 3,
    totalPrice: 239.97,
    stock: 50,
  },
];

const OrderDetails = () => {
  return (
    <div className="w-full h-fit flex gap-4">
      <div className="flex-[8] flex flex-col justify-between bg-white shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] rounded-lg">
        <div>
          <div className="flex justify-between p-4">
            <div className="font-medium text-[15.2px] font-sans text-[#212B37]">
              Order No - <span className="text-[#5C67F7]">#SPK-7832</span>
            </div>
            <div className="flex justify-center items-center text-[#5C67F7] bg-[#5C67F71A] text-center font-semibold text-[11px] font-sans px-[0.45rem] rounded-sm">
              Estimated delivery : 30,Nov 2023
            </div>
          </div>
          <DynamicTable columns={columns} data={data} />
        </div>
        <div className="p-4 flex justify-between mt-auto">
          <ButtonWithEmoji
            label="Print"
            emoji={<RiPrinterLine className="text-lg" />}
            btnClass="!bg-[rgba(92,103,247,0.1)] !border !border-transparent !text-[rgba(92,103,247)] !font-semibold !px-[6px] !py-[6px] !rounded-lg hover:!bg-[rgba(92,103,247)] hover:!text-white hover:!border hover:!border-[rgba(92,103,247)] transition-all duration-300"
            onClick={() => alert("Print action")}
          />
          <ButtonWithEmoji
            label="Share Details"
            emoji={<RiShareForwardLine className="text-lg" />}
            onClick={() => alert("Share action")}
          />
        </div>
      </div>
      <div className="flex-[4] flex flex-col gap-4">
        <div className="flex-0 h-fit bg-white shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] rounded-lg">
          <Tracking />
        </div>
        <div className="flex-0 h-fit bg-white shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] rounded-lg">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
