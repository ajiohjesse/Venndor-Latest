import ProductCard from "../../components/ProductCard";
import styles from "../../styles/pageStyles/Category.module.css";

const Category = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          <span>Categories</span> / <span>Male Fashion</span>
        </h1>

        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default Category;
