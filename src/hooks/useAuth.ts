import { useState } from "react";
import type { LoginForm } from "../types/login.types";

const useAuth = () => {
    const [user, setUser] = useState<LoginForm | null>(null);
    const login = (data: LoginForm) => {
        if (data.login === 'admin' && data.password === 'admin') {
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            return true;
        }
        return false;
    }
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }
    const isAuthenticated = () => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return false;
        const parsedUser = JSON.parse(storedUser);
        return parsedUser.login === 'admin' && parsedUser.password === 'admin';
    };
    return { user, login, logout, isAuthenticated };
}
export default useAuth;