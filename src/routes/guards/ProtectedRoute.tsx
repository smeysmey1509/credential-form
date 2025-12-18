import { Navigate } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../../hooks/useAuth";
import { deleteCookie } from "../../utils/cookie";

type ProtectedRouteProps = {
  children?: React.ReactNode;
  redirectTo?: string;
  allowedRoles?: string[];
};

const ProtectedRoute = ({
  children,
  redirectTo = "/login",
  allowedRoles,
}: ProtectedRouteProps) => {
  const authed = isAuthenticated();

  if (!authed) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles) {
    const role = getUserRole();
    if (!role || !allowedRoles.includes(role)) {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");

      alert("You do not have permission to access dashboard.");

      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;