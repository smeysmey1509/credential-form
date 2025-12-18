import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import ProtectedRoute from "../guards/ProtectedRoute";
import PublicRoute from "../guards/PublicRoute";

const LoginPage = lazy(() => import("../../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../../pages/auth/RegisterPage"));
const Dashboard = lazy(() => import("../../components/feature/dashboard/Layout"));
const CreateProduct = lazy(
  () => import("../../components/feature/dashboard/product/CreateProduct")
);
const ListProduct = lazy(
  () => import("../../components/feature/dashboard/product/ListProduct")
);
const EditProducts = lazy(
  () => import("../../components/feature/dashboard/product/EditProducts")
);
const ProductDetails = lazy(
  () => import("../../components/feature/dashboard/product/ProductDetails")
);
const Cart = lazy(() => import("../../components/feature/dashboard/product/Cart"));
const Wishlist = lazy(
  () => import("../../components/feature/dashboard/product/Wishlist")
);
const Products = lazy(
  () => import("../../components/feature/dashboard/product/Products")
);
const Checkout = lazy(
  () => import("../../components/feature/dashboard/product/Checkout")
);
const OrderDetails = lazy(
  () => import("../../components/feature/dashboard/product/OrderDetails")
);
const Orders = lazy(() => import("../../components/feature/dashboard/product/Order"));
const Work = lazy(() => import("../../Work/Work"));
const NotFound = lazy(() => import("../components/NotFound"));

const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
];

const productRoutes: RouteObject[] = [
  { path: "product", element: <Navigate to="product/listproduct" replace /> },
  { path: "product/create", element: <CreateProduct /> },
  { path: "product/listproduct", element: <ListProduct /> },
  { path: "product/editproducts/:id", element: <EditProducts /> },
  { path: "product/editproducts", element: <EditProducts /> },
  { path: "product/productdetails/:id", element: <ProductDetails /> },
  { path: "product/productdetails", element: <ProductDetails /> },
  { path: "product/cart", element: <Cart /> },
  { path: "product/wishlist", element: <Wishlist /> },
  { path: "product/products", element: <Products /> },
  { path: "product/checkout", element: <Checkout /> },
  { path: "product/orderdetails", element: <OrderDetails /> },
  { path: "product/orders", element: <Orders /> },
];

const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin", "user"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/product/listproduct" replace />,
      },
      ...productRoutes,
    ],
  },
];

export const appRoutes: RouteObject[] = [
  { path: "/", element: <Navigate to="/login" replace /> },
  ...authRoutes,
  ...dashboardRoutes,
  { path: "/work", element: <Work /> },
  { path: "*", element: <NotFound /> },
];
