import React from "react";

const products = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
];

const Product = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Product;
