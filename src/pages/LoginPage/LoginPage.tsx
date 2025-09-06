import { useForm } from "react-hook-form";
import type { LoginForm } from "../../types/login.types";
import styles from './LoginPage.module.css';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const LoginPage = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<LoginForm>();
    const { login } = useAuth();
    const navigate = useNavigate();
    const onSubmit = (data : LoginForm) => {
        const success = login(data);
        if(success) navigate('/coincap');
    }
    return(
        <div className={styles.login__page}>
            <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.input__container}>
                    <input {...register("login", {
                        required: "Login is required",
                        minLength: {
                            value: 4,
                            message: 'Must be at least 4 characters'
                        },
                        maxLength: {
                            value: 10,
                            message: 'Must be at max 10 characters'
                        },
                    })}
                        type="text" 
                        placeholder="Login"
                        className={errors.login ? styles.error__input : styles.input}
                    />
                    {errors.login && <span className={styles.error}>{errors.login.message}</span>}
                </div>
                <div className={styles.input__container}>
                    <input {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 4,
                            message: 'Must be at least 4 characters'
                        },
                        maxLength: {
                            value: 10,
                            message: 'Must be at max 10 characters'
                        },
                    })} 
                        type="password" 
                        placeholder="Password"
                        className={errors.password ? styles.error__input : styles.input}
                    />
                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                </div>
                <input type="submit" />
            </form>
        </div>
    )
}
export default LoginPage;