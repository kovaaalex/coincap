import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated() ? <>{children}</> : <Navigate to="/coincap/login" replace />
}
export default ProtectedRoute;