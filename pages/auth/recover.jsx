import styles from "../../styles/pageStyles/Auth.module.css";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const Recover = () => {
  const [resetError, setResetError] = useState("");

  return (
    <div className="section">
      <div className={styles.container}>
        <h1>Recover</h1>
        <p className={styles.info}>
          <FontAwesomeIcon icon={faLightbulb} className={styles.infoIcon} />
          Your current password will be sent to your registered email address.
          If you no longer have access to your email,{" "}
          <Link href="/contact">contact</Link> us and we&#39ll help you recover
          your account.
        </p>
        {resetError && <p className={styles.error}>{resetError}</p>}
        <form>
          <Input type="text" label="Username" />
          <Button>Recover password</Button>
        </form>
        <p className={styles.link}>
          Go back to <Link href="/auth/login">Login page.</Link>
        </p>
      </div>
    </div>
  );
};

export default Recover;
