import styles from './Input.module.css'


interface InputProps {
  type: "text" | "number";
  value: string | number;
  onChange: (e: any) => void;
  min?: number;
  max?: number;
}

const Input = ({ type, value, onChange, min, max }: InputProps) => {
  return (
    <input className={styles.input} type={type} value={value} onChange={onChange} min={min} max={max} placeholder='Enter value'/>
  );
};
export default Input;
