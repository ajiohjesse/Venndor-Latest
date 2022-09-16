import styles from "../../../styles/pageStyles/Search.module.css";
import ProductCard from "../../../components/ProductCard";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import SkeletonCard from "../../../components/SkeletonCard";
import { categories } from "../../../lib/selections";

const Products = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Search Products</h1>

        <div className={styles.filters}>
          <Input placeholder="Type product name. . ." label="Product Name" />

          <div className={styles.filterCol}>
            <Select label="Category" defaultValue="All">
              <option value="All">All</option>
              {categories.map((category, i) => (
                <option value={category.title} key={i}>
                  {category.title}
                </option>
              ))}
            </Select>
            <Input label="Location" placeholder="Type a location. . ." />
          </div>

          <div className={styles.filterCol}>
            <Input label="Min. price" type="number" min="0" />
            <Input label="Max. Price" type="number" min="0" />
          </div>
        </div>
        <div className={styles.results}>
          <h2 className={styles.resultHeading}>Search Result:</h2>
          <SkeletonCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default Products;
