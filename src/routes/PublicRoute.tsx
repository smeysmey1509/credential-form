import { Navigate } from "react-router-dom";
import  { isAuthenticated } from "../utils/auth";

interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute = ({children}: PublicRouteProps ) => {
    return !isAuthenticated() ? children : <Navigate to="/dashboard" replace/>;
}

export default PublicRoute;