import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import Cart from "./features/dashboard/product/Cart";
import Wishlist from "./features/dashboard/product/Wishlist";
import Products from "./features/dashboard/product/Products";
import Checkout from "./features/dashboard/product/Checkout";
import ProductDetails from "./features/dashboard/product/ProductDetails";
import Orders from "./features/dashboard/product/Order";
import EditProducts from "./features/dashboard/product/EditProducts";
import OrderDetails from "./features/dashboard/product/OrderDetails";

const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
// const HomePage = lazy(() => import("./pages/auth/HomePage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const Dashboard = lazy(() => import("./features/dashboard/Layout"));
const PublicRoute = lazy(() => import("./routes/PublicRoute"));
const Product = lazy(
  () => import("./features/dashboard/product/ListProduct")
);
const CreateProduct = lazy(
  () => import("./features/dashboard/product/CreateProduct")
);
const ListProduct = lazy(
  () => import("./features/dashboard/product/ListProduct")
);

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route
          index
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to="/dashboard/product/listproduct" replace />}
          />

          <Route path="product" element={<Product />} />
          <Route path="product/create" element={<CreateProduct />} />
          <Route path="product/listproduct" element={<ListProduct />} />
          <Route path="product/editproducts/:id" element={<EditProducts />} />
          <Route path="product/editproducts" element={<EditProducts />} />
          <Route
            path="product/productdetails/:id"
            element={<ProductDetails />}
          />
          <Route path="product/productdetails" element={<ProductDetails />} />
          <Route path="product/cart" element={<Cart />} />
          <Route path="product/wishlist" element={<Wishlist />} />
          <Route path="product/products" element={<Products />} />
          <Route path="product/checkout" element={<Checkout />} />
          <Route path="product/orderdetails" element={<OrderDetails />} />
          <Route path="product/orders" element={<Orders />} />
        </Route>
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-4xl font-bold">404 Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
