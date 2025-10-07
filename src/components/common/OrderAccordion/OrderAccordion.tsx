import React, { useState, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItemProps {
  title: string;
  date: string;
  content?: string;
  time?: string;
  expectedDate?: string;
  person?: string;
  img: string;
  deliveredDate?: boolean;
  defaultOpen?: boolean;
}

const AccordionItem: FC<AccordionItemProps> = ({
  title,
  date,
  content,
  img,
  time,
  expectedDate,
  person,
  deliveredDate = false,
  defaultOpen = true,
}) => {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  return (
    <div className="border-0 bg-transparent mb-3 rounded-md">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left px-0 pt-0 cursor-pointer focus:outline-none"
      >
        <div className="w-full flex items-center mb-0 relative z-[1]">
          <div className="me-2">
            <span className="w-8 h-8 flex items-center justify-center rounded-full border border-blue-500/10 bg-blue-500/10 backdrop-blur">
              <img src={img} alt="icon" className="w-6 h-6 object-contain" />
            </span>
          </div>
          <div className="flex flex-1 items-center justify-between">
            {title && (
              <div className="text-[14px] font-sans font-medium text-[#212B37]">
                {title}
              </div>
            )}
            {expectedDate ? (
              // Case 1: expected date/time
              <div className="text-[12px] font-sans font-normal text-[#6E829F]">
                {date}
                {time && `, ${time}`} <span className="italic">(expected)</span>
              </div>
            ) : date && time ? (
              // Case 2: has date + time
              <div
                className={`text-[12px] font-sans font-normal ${
                  deliveredDate ? "text-[#6E829F]" : "text-[#0A0A0A]"
                }`}
              >
                {date}, {time}
              </div>
            ) : (
              // Case 3: only date
              <div className="text-[12px] font-sans font-medium text-[#9E5CF7]">
                {date}
              </div>
            )}
          </div>
        </div>
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="ps-11 pb-0 text-[13px] font-sans font-normal text-[#6E829F]">
              {!content ? (
                content
              ) : (
                <p className="mb-0 ml-2">
                  {content}{" "}
                  {person && (
                    <span className="font-semibold text-[13px] font-sans text-[#5C67F7]">
                      {person}
                    </span>
                  )}
                  {expectedDate && (
                    <div className="flex-1 text-[12px] font-sans font-medium text-[#6E829F]">
                      {date}, {time}
                    </div>
                  )}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const OrderAccordion: FC = () => {
  const orders = [
    {
      title: "Order Placed",
      date: "May 15",
      person: "Smey",
      img: "https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/18.png",
      content: "Order successfully placed by",
      defaultOpen: true
    },
    {
      title: "Picked",
      date: "May 17",
      time: "10:30 AM",
      img: "https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/8.png",
      content: "Your order has been collected by",
      person: "Kleang",
      defaultOpen: true,
    },
    {
      title: "Shipping",
      date: "May 17",
      time: "10:30 AM",
      img: "https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/19.png",
      content: "Order picked and en route to location.",
    },
    {
      title: "Out For Delivery",
      date: "May 17",
      time: "10:30 AM",
      img: "https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/25.png",
      content: "Your order is out for delivery.",
      expectedDate: "May 20",
      defaultOpen: true,
    },
    {
      title: "Delivered",
      date: "May 20",
      time: "10:30 AM",
      deliveredDate: true,
      defaultOpen: false,
      img: "https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/20.png",
    },
  ];

  return (
    <div
      className="relative w-full before:absolute before:left-[1rem] before:top-0 before:h-full before:border-l before:border-dashed before:border-[#E4E9F2] before:content-['']"
      id="basicAccordion"
    >
      {orders.map((order, index) => (
        <AccordionItem
          key={index}
          title={order.title}
          date={order.date}
          img={order.img}
          person={order.person}
          time={order.time}
          deliveredDate={order.deliveredDate}
          content={order.content}
          expectedDate={order.expectedDate}
          defaultOpen={order.defaultOpen}
        />
      ))}
    </div>
  );
};

export default OrderAccordion;
