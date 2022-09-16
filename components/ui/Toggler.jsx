import styles from "../../styles/ui/Toggler.module.css";

const Toggler = ({ active = false, ...props }) => {
  return (
    <div className={active ? [styles.toggler, styles.active].join(" ") : styles.toggler} {...props}>
      <div
        className={
          active ? [styles.knob, styles.active].join(" ") : styles.knob
        }
      />
    </div>
  );
};

export default Toggler;
