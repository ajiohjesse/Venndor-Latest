import styles from "../../styles/ui/Input.module.css";

const Textarea = ({ label = "", msg = "", error = false, ...props }) => {
  return (
    <div className={styles.container}>
      {label ? <label className={styles.label}>{label}</label> : null}
      <textarea
        className={
          error ? [styles.textarea, styles.error].join(" ") : styles.textarea
        }
        {...props}
      ></textarea>
      {msg ? <p className={styles.msg}>{msg}</p> : null}
    </div>
  );
};

export default Textarea;
