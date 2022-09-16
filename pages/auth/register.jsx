import styles from "../../styles/pageStyles/Auth.module.css";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
  const [registerError, setRegisterError] = useState("");

  return (
    <div className="section">
      <div className={styles.container}>
        <h1>Sign Up</h1>
        {registerError && <p className={styles.error}>{registerError}</p>}
        <form>
          <Input type="text" label="First name" placeholder="First name" />
          <Input type="text" label="Last name" placeholder="Last name" />
          <Input
            type="text"
            label="Username"
            placeholder="Username"
            msg="Only alphabets, numbers, dash &#40; &#45; &#41; and underscore &#40; &#95; &#41; allowed."
          />
          <Input type="email" label="Email" placeholder="sample@email.com" />
          <Input type="text" label="Phone" placeholder="070 0000 0000" />
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            msg="At least 6 characters required."
          />
          <Input
            type="password"
            label="Repeat Password"
            placeholder="Retype password"
          />
          <Button>Create account</Button>
        </form>
        <p className={styles.link}>
          Already have an account? <Link href="/auth/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
