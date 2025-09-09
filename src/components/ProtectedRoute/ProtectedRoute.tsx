import { Navigate } from "react-router";
import type { ProtectedRouteProps } from "../../types/protectedRoute.types";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/coincap/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;