import { Navigate } from "react-router";
import type { ProtectedRouteProps } from "../../types/protectedRoute.types";
import { LOGINPAGE__URL } from "../../const/routes";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  
  if (!isAuthenticated) {
    return <Navigate to={LOGINPAGE__URL} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;