import styles from "../../styles/ui/Loading.module.css";

const LoadingText = ({ sm }) => {
  return (
    <div
      className={
        sm ? [styles.textLoading, styles.sm].join(" ") : styles.textLoading
      }
    />
  );
};

export default LoadingText;
