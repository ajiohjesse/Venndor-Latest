import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Textarea from "../../../components/ui/Textarea";
import styles from "../../../styles/pageStyles/Auth.module.css";
import Select from "../../../components/ui/Select";
import { categories } from "../../../lib/selections";

const CreateProduct = () => {
  const [createProductError, setCreateProductError] = useState("");
  return (
    <div className="section">
      <div className={styles.container}>
        <h1>Add Product</h1>
        {createProductError && (
          <p className={styles.error}>{createProductError}</p>
        )}
        <form>
          <Input
            type="text"
            label="Product name"
            placeholder="Product name"
            required
          />
          <Input type="number" label="Price" min="0" required />

          <Select label="Categories" defaultValue="Others">
            {categories.map((category, i) => (
              <option value={category.title} key={i}>
                {category.title}
              </option>
            ))}
          </Select>

          <Textarea
            label="Description"
            placeholder="Product description. . ."
            required
          />
          <Input
            type="file"
            label="Product Image"
            name="image"
            accept="image/*"
            required
          />

          <Button>Add product</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
