import styles from "../../styles/ui/Button.module.css";

const Button = ({ children, color = "primary", ...others }) => {
  return (
    <button className={[styles.btn, styles[color]].join(" ")} {...others}>
      {children}
    </button>
  );
};

export default Button;
