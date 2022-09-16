import styles from "../../styles/ui/Spinner.module.css";

const Spinner = ({ size = "" }) => (
  <span className={size === "sm" ? styles["spinner-sm"] : styles.spinner} />
);

export default Spinner;
