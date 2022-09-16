import styles from "../../styles/ui/Input.module.css";

const Select = ({
  label = "",
  error = false,
  msg = "",
  children,
  ...props
}) => {
  return (
    <div className={styles.container}>
      {label ? <label className={styles.label}>{label}</label> : null}
      <select
        className={
          error ? [styles.select, styles.error].join(" ") : styles.select
        }
        {...props}
      >
        {children}
      </select>
      {msg ? <p className={styles.msg}>{msg}</p> : null}
    </div>
  );
};

export default Select;
