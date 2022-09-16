import styles from "../../styles/pageStyles/Auth.module.css";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [loginError, setLoginError] = useState("");

  return (
    <div className="section">
      <div className={styles.container}>
        <h1>Sign In</h1>
        {loginError && <p className={styles.error}>{loginError}</p>}
        <form>
          <Input type="text" label="Username" />
          <Input type="text" label="Password" />
          <Button>Sign in</Button>
        </form>
        <p className={styles.link}>
          Don't have an account? <Link href="/auth/register">Register</Link>
        </p>
        <p className={styles.link}>
          Forgot your password?{" "}
          <Link href="/auth/recover">Recover Password</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
