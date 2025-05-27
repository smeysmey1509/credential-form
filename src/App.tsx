import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Ecommerce = lazy(() => import("./components/Ecommerce/Ecommerce"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));
const PublicRoute = lazy(() => import("./routes/PublicRoute"));
const Product = lazy(() => import("./components/Product/Product"));
const Authentication = lazy(
  () => import("./components/Authentication/Authentication")
);
const Permission = lazy(() => import("./components/Permission/Permission"));

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
        <Route index path="/" element={<HomePage />} />
        <Route
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
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="product" element={<Product />} />
          <Route path="authentication" element={<Authentication />} />
          <Route path="permission" element={<Permission />} />
          <Route path="ecommerce" element={<Ecommerce />} />
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
