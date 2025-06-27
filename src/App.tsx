import "./App.css";
import {Routes, Route, Navigate} from "react-router-dom";
import {lazy, Suspense} from "react";
import ProductTable from "./pages/dashboard/ProductTable";

const Ecommerce = lazy(() => import("./pages/dashboard/Ecommerce"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const HomePage = lazy(() => import("./pages/dashboard/HomePage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const Dashboard = lazy(() => import("./components/feature/dashboard/Layout"));
const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));
const PublicRoute = lazy(() => import("./routes/PublicRoute"));
const Product = lazy(() => import("./pages/dashboard/Product"));
const Authentication = lazy(
    () => import("./pages/dashboard/Authentication")
);
const Permission = lazy(() => import("./pages/dashboard/Permission"));
const ActivityLog = lazy(() => import("./pages/dashboard/ActivityLog"));

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
                <Route index path="/" element={<HomePage/>}/>
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage/>
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <RegisterPage/>
                        </PublicRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="product" replace/>}/>
                    <Route index path="product" element={<Product/>}/>
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
