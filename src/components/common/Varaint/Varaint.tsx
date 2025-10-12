import React from "react";
import { IoClose } from "react-icons/io5";
import Samsung from "../../../assets/samsung-galaxy-s24-ultra-Titanium Gray.webp";
import Rate from "../Rate/Rate";
import DynamicTable from "../DynamicTable/DynamicTable";

interface VaraintProp {
  onClose?: () => void;
}

const columns = [
  {
    header: "SKU",
    accessor: "sku",
    width: "15%",
    bodyColor: "!text-[#5C67F7] !text-[13px] !font-normal",
  },
  {
    header: "Price",
    accessor: "price",
    width: "15%",
    bodyColor: "!text-[13px] !text-[#212b37] !font-medium",
    currency: true,
  },
  {
    header: "Stock",
    accessor: "stock",
    width: "15%",
    bodyColor: "!text-[13px] !text-[#212b37] !font-medium",
  },
  {
    header: "Color",
    accessor: "color",
    width: "15%",
    bodyColor: "!text-[13px] !text-[#212b37] !font-medium",
    currency: false,
  },
  {
    header: "Storage",
    accessor: "storage",
    width: "15%",
    bodyColor: "!text-[13px] !text-[#212b37] !font-medium",
    currency: false,
  },
  {
    header: "Status",
    accessor: "status",
    width: "15%",
    bodyColor: "!text-[13px] !text-[#212b37] !font-medium",
    currency: false,
  },
];

const data = [
  {
    sku: "S24U-TIT-256BLK",
    price: 1199,
    stock: 42,
    color: "Titanium Black",
    storage: "256GB",
    status: "Active",
  },
  {
    sku: "S24U-TIT-512SLV",
    price: 1299,
    stock: 35,
    color: "Titanium Silver",
    storage: "512GB",
    status: "Active",
  },
  {
    sku: "S24U-TIT-1TBGRY",
    price: 1399,
    stock: 12,
    color: "Titanium Gray",
    storage: "1TB",
    status: "Active",
  },
  {
    sku: "S24U-TIT-128GRN",
    price: 1099,
    stock: 0,
    color: "Emerald Green",
    storage: "128GB",
    status: "Out of Stock",
  },
  {
    sku: "S24U-TIT-256PUR",
    price: 1199,
    stock: 20,
    color: "Lavender Purple",
    storage: "256GB",
    status: "Active",
  },
  {
    sku: "S24U-TIT-512BLU",
    price: 1299,
    stock: 15,
    color: "Cobalt Blue",
    storage: "512GB",
    status: "Low Stock",
  },
];

const Varaint: React.FC<VaraintProp> = ({ onClose }) => {
  return (
    <div className="w-[50%] h-[80%] bg-white rounded">
      <div className="head w-full h-fit flex justify-between items-center p-4 border-b border-b-[#ecf3fb]">
        <h4>Varaint</h4>
        <div
          className="w-fit h-fit text-white bg-amber-500 rounded cursor-pointer"
          onClick={onClose}
        >
          <IoClose className="text-xl" />
        </div>
      </div>
      <div className="body w-full h-fit flex flex-col items-center gap-2">
        <div className="w-full h-fit flex justify-between p-4 gap-4">
          <div className="w-[40%] h-[220px] rounded bg-[#EFF1FE]">
            <img
              src={`https://www.att.com/scmsassets/global/devices/phones/samsung/samsung-galaxy-s24-ultra/carousel/titanium-black-1.png`}
              alt={Samsung}
              className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="w-[60%] flex flex-col justify-start items-start gap-3">
            <h4 className="text-[#212B37] text-2xl font-sans font-semibold">
              Samsung Galaxy S24 Ultra
            </h4>
            <p className="text-[#212B37] text-md font-medium leading-none">
              Samsung Galaxy S24 Ultra featuring Snapdragon 8 Gen 3, quad
              camera, and premium titanium design.
            </p>
            <p className="text-[#212B37] text-3xl font-sans font-medium">
              $1,119.99
              <span className="ml-4 font-normal text-[#7e7d7f] text-xl line-through">
                $1392.99
              </span>
              <span className="ml-3 font-normal text-[#Fb4242] text-lg font-sans">
                -14%
              </span>
            </p>
            <p className="text-[#212B37] text-lg font-sans font-light">
              ID: 685ab59e33f273e409dc3eac
            </p>
            <Rate rating={3.9} ratingCount={2} />
          </div>
        </div>
        <div className="w-full h-fit">
          <DynamicTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Varaint;
