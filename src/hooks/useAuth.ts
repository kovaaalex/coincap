import { useEffect, useState } from "react";
import type { LoginForm } from "../types/login.types";

const useAuth = () => {
    const [user, setUser] = useState<LoginForm | null>(null);
    useEffect(() => {
        const user = localStorage.getItem('user');
        if(user) 
            setUser(JSON.parse(user));
    }, []);
    const login = (data: LoginForm) => {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
    }
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }
    const isAuthenticated = user?.login === 'admin' && user.password === 'admin';
    return { user, login, logout, isAuthenticated}
}
export default useAuth;