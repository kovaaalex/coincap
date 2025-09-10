import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from './Header.module.css';
import { LOGINPAGE__URL } from "../../const/routes";
const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate(LOGINPAGE__URL);
    }
    return(
        <header className={styles.header}>
            {isAuthenticated() && (
            <>
              <Link to="/coincap" className="nav-link">
                Home
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </header>
    )
}
export default Header;