import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import styles from "../../styles/pageStyles/Auth.module.css";
import Select from "../../components/ui/Select";
import { states } from "../../lib/selections";

const CreateStore = () => {
  const [createStoreError, setCreateStoreError] = useState("");
  return (
    <div className="section">
      <div className={styles.container}>
        <h1>Create Store</h1>
        {createStoreError && <p className={styles.error}>{createStoreError}</p>}
        <form>
          <Input
            type="text"
            label="Store name"
            placeholder="Store name"
            required
          />
          <Input
            type="text"
            label="Tagline"
            placeholder="Short slogan"
            msg="Optional"
          />
          <Textarea
            label="Description"
            placeholder="Describe your business. . ."
            required
          />
          <Input
            type="text"
            label="Address"
            placeholder="Business Address"
            required
          />
          <Select label="State" defaultValue="Abuja">
            <option value="Abuja">Abuja</option>
            {states.map((state, i) => (
              <option value={state} key={i}>
                {state}
              </option>
            ))}
          </Select>

          <Input
            type="text"
            label="L.G.A"
            placeholder="Local Area"
            msg="Optional"
          />

          <Input
            type="text"
            label="Contact"
            placeholder="070 0000 0000"
            required
          />

          <Input
            type="email"
            label="Email"
            placeholder="Your business email"
            msg="Optional"
          />

          <Button>Create store</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateStore;
