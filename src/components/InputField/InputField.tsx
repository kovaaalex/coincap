import type { InputFieldProps } from '../../types/inputField.types';
import styles from './InputField.module.css';

const InputField = ({ 
  type, 
  placeholder, 
  error, 
  register, 
  name, 
  validation 
}: InputFieldProps) => {
    return <div className={styles.input__container}>
        <input
            {...register(name, validation)}
            type={type}
            placeholder={placeholder}
            className={error ? styles.error__input : styles.input}
            />
        {error && <span className={styles.error}>{error.message}</span>}
    </div>
}
export default InputField;