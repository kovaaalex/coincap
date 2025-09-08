import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from './Header.module.css';
const Header = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate('/coincap/login');
    }
    return(
        <header className={styles.header}>
            <button onClick={handleLogout}>Logout</button>
        </header>
    )
}
export default Header;