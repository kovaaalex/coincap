import { useForm } from "react-hook-form";
import type { LoginForm } from "../../types/login.types";
import styles from './LoginPage.module.css';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";
import InputField from "../../components/InputField/InputField";

const LoginPage = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<LoginForm>();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [authError, setAuthError] = useState<string>('');
    const onSubmit = (data : LoginForm) => {
        try {
            const success = login(data);
            if (success) {
                navigate('/coincap');
            } else {
                setAuthError('Invalid login or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            setAuthError('An error occurred during login');
        }
    }
    return(
        <div className={styles.login__page}>
            <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    type="text"
                    placeholder="Login"
                    error={errors.login}
                    register={register}
                    name="login"
                    validation={{
                        required: "Login is required",
                        minLength: {
                            value: 4,
                            message: 'Must be at least 4 characters'
                        },
                        maxLength: {
                            value: 10,
                            message: 'Must be at max 10 characters'
                        },
                    }}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    error={errors.password}
                    register={register}
                    name="password"
                    validation={{
                        required: "Password is required",
                        minLength: {
                            value: 4,
                            message: 'Must be at least 4 characters'
                        },
                        maxLength: {
                            value: 10,
                            message: 'Must be at max 10 characters'
                        },
                    }}
                />
                {authError && <div className={styles.auth__error}>{authError}</div>}
                <button type="submit" className={styles.submit__button}>
                    Login
                </button>
            </form>
        </div>
    )
}
export default LoginPage;