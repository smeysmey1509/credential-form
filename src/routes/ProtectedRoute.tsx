import React from "react";
import {Navigate} from "react-router-dom";
import {isAuthenticated} from "../hooks/useAuth";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace/>;
}

export default ProtectedRoute;