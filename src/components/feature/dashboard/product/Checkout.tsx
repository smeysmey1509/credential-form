import React, { useState } from "react";
import ButtonWithEmoji from "../../../Button/ButtonWithEmoji/ButtonWithEmoji";
import {
  MdOutlineLocalShipping,
  MdPayment,
  MdOutlineCheckCircleOutline,
  MdOutlinePayment,
} from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import ShippingCard from "../../../common/ShippingCard/ShippingCard";
import ShipAddress from "../../../common/ShipAddress/ShipAddress";
import PersonalDetail from "../../../Button/PersonalDetail/PersonalDetail";
import FormInput from "../../../common/FormField/FormField";
import CheckBox from "../../../common/CheckBox/CheckBox";
import CheckBoxRedius from "../../../common/CheckBoxRedius/CheckBoxRedius";
import CreditCard from "../../../common/CreditCard/CreditCard";

const Checkout = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<string>("UPS");
  const [selectedAddress, setSelectedAddress] = useState<string>("home");
  const [selectedPayment, setSelectedPayment] = useState<string>("card");

  const tabs = [
    { label: "Shipping", icon: <MdOutlineLocalShipping /> },
    { label: "Personal Details", icon: <BsPerson /> },
    { label: "Payment", icon: <MdPayment /> },
    { label: "Complete Order", icon: <MdOutlineCheckCircleOutline /> },
  ];

  return (
    <div className="w-full h-fit flex justify-between gap-4">
      <div className="basis-9/12 h-fit flex flex-col bg-white shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] p-[1rem] rounded">
        <ul className="w-full h-fit block sm:flex justify-around border border-[#ecf3fb] border-dashed border-b-0 bg-[#F9F9FA] rounded-t transform scale-x-100">
          {tabs.map((tab, index) => (
            <li
              key={index}
              onClick={() => setActiveTab(index)}
              className={`group relative p-3 cursor-pointer transition-colors duration-300 ${
                activeTab === index
                  ? "border-b-[#5C67F7]"
                  : "hover:border-b-[#5C67F7]"
              }`}
            >
              <ButtonWithEmoji
                emoji={tab.icon}
                label={tab.label}
                btnClass={`!bg-transparent text-[13px] font-sans font-semibold transition-colors duration-300 
                  ${
                    activeTab === index
                      ? "!text-[#5C67F7]"
                      : "!text-[#212b37] group-hover:!text-[#5C67F7]"
                  }`}
              />
              <span
                className={`absolute left-1/2 bottom-0 h-[2px] bg-[#5C67F7] transform -translate-x-1/2 transition-all duration-300 ease-in-out
                ${activeTab === index ? "w-full opacity-300" : "w-0 opacity-0"}
                `}
              />
            </li>
          ))}
        </ul>
        {activeTab === 0 && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-fit flex flex-col items-center border border-[#ecf3fb] border-dashed"
          >
            <div className="w-full p-3">
              <p className="text-[#6e829f] text-[1.25rem] opacity-50 font-semibold font-sans">
                01
              </p>
              <div className="w-full h-fit grid grid-cols-2 gap-4">
                <p className="col-span-2 row-start-1 row-end-2 text-[0.9375rem] font-semibold font-sans">
                  Shipping Methods :
                </p>
                <div className="col-start-1 col-end-2 row-start-2 row-end-3">
                  <ShippingCard
                    shipImg="https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/21.png"
                    shipMethod="UPS"
                    shipDate="Delivered By 11,May 2024"
                    shipPrice={9.99}
                    name="shipping-method"
                    checked={selectedMethod === "UPS"}
                    onChange={() => setSelectedMethod("UPS")}
                  />
                </div>
                <div className="col-start-2 col-end-3 row-start-2 row-end-3">
                  <ShippingCard
                    shipImg="https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/22.png"
                    shipMethod="USPS"
                    shipDate="Delivered By 22,Nov 2022"
                    shipPrice={10.49}
                    name="shipping-method"
                    checked={selectedMethod === "USPS"}
                    onChange={() => setSelectedMethod("USPS")}
                  />
                </div>
              </div>
              <div className="w-full h-fit grid grid-cols-2 gap-4 mt-3">
                <p className="col-span-2 text-[0.9375rem] font-semibold font-sans">
                  Shipping Address :
                </p>
                <div className="col-start-1 col-end-2 row-start-2 row-end-3">
                  <ShipAddress
                    shipLabel="My Home Address"
                    name="shipping-address"
                    checked={selectedAddress === "home"}
                    onChange={() => setSelectedAddress("home")}
                  />
                </div>
                <div className="col-start-2 col-end-3 row-start-2 row-end-3">
                  <ShipAddress
                    shipLabel="Work Place Address"
                    name="shipping-address"
                    checked={selectedAddress === "address"}
                    onChange={() => setSelectedAddress("address")}
                  />
                </div>
              </div>
            </div>
            <div className="w-full p-3 flex justify-end items-end border border-[#ecf3fb] border-dashed">
              <PersonalDetail
                label="Personal Details"
                emoji={<BsPerson />}
                onClick={() => alert(123)}
              />
            </div>
          </motion.div>
        )}
        {activeTab === 1 && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-fit flex flex-col items-center border border-[#ecf3fb] border-dashed"
          >
            <div className="w-full p-3">
              <p className="text-[#6e829f] text-[1.25rem] opacity-50 font-semibold font-sans">
                02
              </p>
              <div className="w-full h-fit grid grid-cols-2 gap-4">
                <p className="col-span-2 row-start-1 row-end-2 text-[0.9375rem] font-semibold font-sans">
                  Personal Details :
                </p>
                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div className="">
                    <FormInput label="First Name" placeholder="First Name" />
                  </div>
                  <div className="">
                    <FormInput label="Last Name" placeholder="Last Name" />
                  </div>
                  <div className="col-span-2">
                    <FormInput
                      label="Email"
                      placeholder="smeyhem01@gmail.com"
                    />
                  </div>
                  <div className="col-span-2">
                    <FormInput label="Phone no" placeholder="061 87 50 89" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-3 flex justify-between items-center border border-[#ecf3fb] border-dashed">
              <PersonalDetail
                label="Back To Shipping"
                emoji={<MdOutlineLocalShipping />}
                onClick={() => alert(123)}
                classname="flex-row-reverse border-none hover:border-black !bg-[#EFF1FE] !text-[#5C67F7] hover:!bg-[#5C67F7] hover:!text-[#fff]"
              />
              <PersonalDetail
                label="Continue To Payment"
                emoji={<MdOutlinePayment />}
                onClick={() => alert(123)}
              />
            </div>
          </motion.div>
        )}
        {activeTab === 2 && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-fit flex flex-col items-center border border-[#ecf3fb] border-dashed"
          >
            <div className="w-full p-3">
              <p className="text-[#6e829f] text-[1.25rem] opacity-50 font-semibold font-sans">
                03
              </p>
              <div className="w-full h-fit flex flex-col gap-4">
                <p className="col-span-2 row-start-1 row-end-2 text-[0.9375rem] font-semibold font-sans">
                  Payment Details :
                </p>
                <div className="w-full flex items-center gap-3">
                  <CheckBoxRedius
                    label="Credit/Debit Card"
                    name="payment-select"
                    checked={selectedPayment === "card"}
                    onChange={() => setSelectedPayment("card")}
                  />
                  <CheckBoxRedius
                    label="C.O.D(Cash On Delivery)"
                    name="payment-select"
                    checked={selectedPayment === "cod"}
                    onChange={() => setSelectedPayment("cod")}
                  />
                  <CheckBoxRedius
                    label="UPI Payment"
                    name="payment-select"
                    checked={selectedPayment === "upi"}
                    onChange={() => setSelectedPayment("upi")}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-3">
                    <FormInput
                      label="Card Number"
                      placeholder="1234 5678 9123"
                    />
                  </div>
                  <div className="col-span-3 row-start-2">
                    <FormInput
                      label="Name On Card"
                      placeholder="HEM PORNLEURAKSMEY"
                    />
                  </div>
                  <div className="row-start-3">
                    <FormInput label="Expiration Date" placeholder="08/24" />
                  </div>
                  <div className="row-start-3">
                    <FormInput label="CVV" placeholder="123" />
                  </div>
                  <div className="row-start-3">
                    <FormInput
                      label="OTP"
                      placeholder="123456"
                      helperText="*Do not share O.T.P with anyone"
                      helperTextClass="text-[#fB4242] font-semibold"
                    />
                  </div>
                  <div className="w-full">
                    <CheckBox
                      label="Save This Card"
                      classname="checked:!bg-[#23CE9E] checked:!border-none"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-fit grid grid-cols-2 gap-4 mt-3">
                <p className="col-span-2 row-start-1 row-end-2 text-[0.9375rem] font-semibold font-sans">
                  Saved Card :
                </p>
                <div className="col-start-1 col-end-2 row-start-2 row-end-3">
                  <CreditCard
                    creditImg="https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/26.png"
                    creditLabel="XXXX-XXXX-XXXX-XXXX"
                    creditChecked={true}
                  />
                </div>
                <div className="col-start-2 col-end-3 row-start-2 row-end-3">
                  <CreditCard
                    creditImg="https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/27.png"
                    creditLabel="XXXX-XXXX-XXXX-XXXX"
                    creditChecked={true}
                  />
                </div>
              </div>
            </div>
            <div className="w-full p-3 flex justify-between items-center border border-[#ecf3fb] border-dashed">
              <PersonalDetail
                label="Back To Personal Info"
                emoji={<MdOutlineLocalShipping />}
                onClick={() => alert(123)}
                classname="flex-row-reverse border-none hover:border-black !bg-[#EFF1FE] !text-[#5C67F7] hover:!bg-[#5C67F7] hover:!text-[#fff]"
              />
              <PersonalDetail
                label="Continue Payment"
                emoji={<MdOutlinePayment />}
                onClick={() => alert(123)}
              />
            </div>
          </motion.div>
        )}
        {activeTab === 3 && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-fit flex flex-col items-center border border-[#ecf3fb] border-dashed"
          >
            <div className="flex flex-col justify-center items-center p-3 my-3">
              <div className="mb-4">
                <h5 className="text-[#21Ce9e] text-[1.25rem] font-semibold font-sans">
                  Payment Successful...
                </h5>
              </div>
              <div className="mb-4">
                <img
                  src="https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/24.png"
                  alt=""
                  className="w-[200px] h-[200px]"
                />
              </div>
              <div className="mb-4">
                <p className="mb-1 text-[#212B37] text-[14px] font-medium font-sans">
                  You can track your order with Order Id <b>SPK#1FR</b> from{" "}
                  <a href="" className="underline text-[#e354D4]">
                    Trank Order
                  </a>
                </p>
                <p className="mb-1 text-center text-[#6E829F] text-[13px] font-normal font-sans">
                  Thanks for supporting us.
                </p>
              </div>
              <div className="mb-4">
                <ButtonWithEmoji
                  label="Continue Shopping"
                  emoji={<IoCartOutline />}
                  btnClass="!text-[13.7px] !font-semibold flex-row-reverse"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <div className="basis-3/12 h-fit flex bg-white shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] p-3 rounded">
        2
      </div>
    </div>
  );
};

export default Checkout;
