import React, { useEffect, useState } from "react";
import DynamicTable from "../../../common/DynamicTable/DynamicTable";
import QuantityInput from "../../../common/QuantityInput/QuantityInput";
import { ICart } from "../../../../types/CartType";
import CartService from "../../../../services/common/CartService/CartService";
import { MdRowing } from "react-icons/md";

const sampleData = [
  {
    name: "Compact Laptop",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/uploads-store/uploads/all/4H538WBfFml14bgt4jFgo6vwh8ITU6hJrJoXG85k.png",
    price: "$554",
    quantity: 1,
    total: "$554",
  },
  {
    name: "Bespoke Hand Bag",
    price: "$187",
    quantity: 2,
    total: "$374",
  },
];

const Cart = () => {
  const [cart, setCart] = useState<ICart | null>(null);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    handleFetchCart();
  }, []);

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
      render: (value, row) => (
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

  const handleQuantityChange = async (row, newQty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === row.productId
          ? { ...item, quantity: newQty, total: newQty * item.price }
          : item
      )
    );

    try {
      // Call API without awaiting before UI update
      await CartService.updateQuantity(row.productId, newQty);
    } catch (err) {
      console.error("Failed to update quantity:", err);

      // Optionally revert if API fails:
      handleFetchCart(); // refetch to sync
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
            image:
              item?.product?.images?.[0] ||
              "https://s3.ap-southeast-1.amazonaws.com/uploads-store/uploads/all/4H538WBfFml14bgt4jFgo6vwh8ITU6hJrJoXG85k.png",
            price: pricePerUnit,
            quantity: quantityAdded,
            total: pricePerUnit * quantityAdded,
          };
        }) || [];

      setCart(cartItems);

      // ✅ Calculate total cart price (sum of all items * their quantity)
      const totalCartPrice = cartItems.reduce(
        (acc, curr) => acc + curr.total,
        0
      );

      console.log("Cart Items:", cartItems);
      console.log("Total Cart Price:", totalCartPrice);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  console.log("cart", cart);

  return (
    <div className="w-full h-full flex justify-between gap-6">
      <div className="w-3/4 h-full flex flex-col bg-white dark:bg-[#19191C] shadow rounded-lg gap-2">
        <h2 className="py-2 px-4">Cart Items</h2>
        <DynamicTable columns={columns} data={cart} />
      </div>
      <div className="flex-none basis-auto w-1/4 h-full flex-col bg-white dark:bg-[#19191C] shadow rounded-lg p-4 gap-2">
        <h4>Order Summary</h4>
      </div>
    </div>
  );
};

export default Cart;
