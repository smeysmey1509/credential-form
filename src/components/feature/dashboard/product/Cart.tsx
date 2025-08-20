import React, { useEffect, useState } from "react";
import DynamicTable from "../../../common/DynamicTable/DynamicTable";
import QuantityInput from "../../../common/QuantityInput/QuantityInput";
import CartService from "../../../../services/common/CartService/CartService";
import PrimaryButton from "../../../Button/PrimaryButton/PrimaryButton";
import FormField from "../../../common/FormField/FormField";
import { BsFillExclamationCircleFill } from "react-icons/bs";

const Cart = () => {
  const [cart, setCart] = useState<any[] | null>(null);
  const [promoCode, setPromoCode] = useState<string>("");
  const [deliveryMethod, setDeliveryMethod] = useState<string>("Free Shipping");
  const [calSubTotal, setCalSubTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [serviceTax, setServiceTax] = useState<number>(0);
  const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    handleFetchCart();
  }, []);

  useEffect(() => {
    if (cart) {
      const updatedSubTotal = cart.reduce((acc, curr) => acc + curr.total, 0);
      setCalSubTotal(updatedSubTotal);
    }
  }, [calSubTotal]);

  const columns = [
    {
      header: "Product Name",
      accessor: "name",
      width: "40%",
    },
    {
      header: "Price",
      accessor: "price",
      width: "15%",
    },
    {
      header: "Quantity",
      accessor: "quantity",
      width: "15%",
      render: (value: any, row: number) => (
        <QuantityInput
          value={value}
          min={1}
          max={9999999}
          onChange={(val) => handleQuantityChange(row, val)}
        />
      ),
    },
    {
      header: "Total",
      accessor: "total",
      width: "15%",
    },
    {
      header: "Action",
      accessor: "action",
      width: "25%",
    },
  ];

  const handleQuantityChange = async (row: any, newQty: number) => {
    setCart((prevCart: any) =>
      prevCart.map((item: any) =>
        item.productId === row.productId
          ? { ...item, quantity: newQty, total: newQty * item.price }
          : item
      )
    );

    try {
      await CartService.updateQuantity(row.productId, newQty);
    } catch (err) {
      console.error("Failed to update quantity:", err);

      handleFetchCart();
    }
  };

  const handleFetchCart = async () => {
    try {
      const response = await CartService.getCart();

      const cartItems =
        response?.data?.items?.map((item) => {
          const pricePerUnit = item?.product?.price || 0;
          const quantityAdded = item?.quantity || 0;
          return {
            productId: item?.product?._id,
            name: item?.product?.name,
            image: `http://localhost:5002${item?.product?.image?.[0]}`,
            price: pricePerUnit,
            quantity: quantityAdded,
            total: pricePerUnit * quantityAdded,
          };
        }) || [];

      setCart(cartItems);
      setCalSubTotal(response?.data?.subTotal || 0);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const handleSwitchDeliveryMethod = (method: string) => {
    setDeliveryMethod(method);
  };

  return (
    <div className="w-full h-full flex justify-between gap-6">
      <div className="w-3/4 h-full flex flex-col bg-white dark:bg-[#19191C] shadow rounded-lg gap-2">
        <h2 className="py-2 px-4">Cart Items</h2>
        <DynamicTable columns={columns} data={cart} />
      </div>
      <div className="flex-none basis-auto w-1/4 h-full flex-col bg-white dark:bg-[#19191C] shadow rounded-lg p-4 gap-8">
        <h4 className="font-medium text-[0.95rem] text-black">Order Summary</h4>
        <div className="flex flex-col mt-4">
          <label className="font-sans text-[13px]">Have a Promo Code?</label>
          <span className="text-[#6e829f] text-[0.6875rem]">
            Apply Your Promo Code for an Instant Discount!
          </span>
        </div>
        <div className="w-full h-auto flex py-5 border-b border-b-gray-200 border-dashed">
          <FormField
            className="!w-full !h-full !mt-0 !rounded-l-sm !rounded-r-none"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <PrimaryButton
            onClick={() => alert(`Promo code applied: ${promoCode}`)}
            label="Apply"
            className="!bg-[#5C67FC] !rounded-r-sm !rounded-l-none !p-2 !text-[0.85rem]"
          />
        </div>
        <div className="flex flex-col mt-4">
          <h4 className="font-semibold font-sans text-[13px]">Delivery:</h4>
          <div className="w-full flex items-center justify-between gap-2 mt-2">
            <PrimaryButton
              label="Free Shipping"
              className="!w-full !bg-[#F7F7FE] !text-[#5F6AF7] !rounded !border-b-2 !border-b-[#5F6AF7] !text-[0.85rem] !px-4 !py-2"
              onClick={() => handleSwitchDeliveryMethod("Free Shipping")}
            />
            <PrimaryButton
              label="Express Shipping"
              className="!w-full !bg-[#F7F7FE] !text-[#000] font-semibold !rounded !text-[0.85rem] !px-4 !py-2 hover:bg-[#5C67FC] hover:!text-[#5F6AF7] transition-colors duration-300 ease-in-out"
              onClick={() => handleSwitchDeliveryMethod("Express Shipping")}
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex items-center gap-1 font-medium text-[#6e829f] font-sans text-[0.75rem]">
            <BsFillExclamationCircleFill />
            <span>Delivered Within 7 Days</span>
          </div>
          <div className="w-full h-auto flex items-center justify-between mt-4">
            <span className="font-medium text-[#6e829f] font-sans text-[0.75rem]">
              Sub Total
            </span>
            <span className="font-medium text-[#000] font-sans text-[0.875rem]">
              ${calSubTotal}
            </span>
          </div>
          <div className="w-full h-auto flex items-center justify-between mt-4">
            <span className="font-medium text-[#6e829f] font-sans text-[0.75rem]">
              Discount
            </span>
            <span className="font-medium text-[#000] font-sans text-[0.875rem]">
              $2,030
            </span>
          </div>
          <div className="w-full h-auto flex items-center justify-between mt-4">
            <span className="font-medium text-[#6e829f] font-sans text-[0.75rem]">
              Discount Charge
            </span>
            <span className="font-medium text-[#000] font-sans text-[0.875rem]">
              $2,030
            </span>
          </div>
          <div className="w-full h-auto flex items-center justify-between mt-4">
            <span className="font-medium text-[#6e829f] font-sans text-[0.75rem]">
              Service Tax (18%)
            </span>
            <span className="font-medium text-[#000] font-sans text-[0.875rem]">
              $2,030
            </span>
          </div>
          <div className="w-full h-auto flex items-center justify-between mt-4">
            <span className="font-medium text-[#212B37] font-sans text-[1rem]">
              Total :
            </span>
            <span className=" text-[#000] font-semibold font-sans text-[16px]">
              $2,030
            </span>
          </div>
          <div className="flex flex-col">
            <PrimaryButton
              label="Process To Checkout"
              className="!w-full !bg-[#5C67FC] !text-white !rounded !text-[0.85rem] !font-semibold !px-4 !py-2 mt-4"
              onClick={() => alert("Proceeding to checkout...")}
            />
            <PrimaryButton
              label="Continue Shopping"
              className="!w-full !bg-[rgb(227, 84, 212)] !text-white !rounded !text-[0.85rem] !font-semibold !px-4 !py-2 mt-4"
              onClick={() => alert("Continue shopping...")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
