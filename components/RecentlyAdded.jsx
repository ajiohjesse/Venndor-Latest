import styles from "../styles/RecentlyAdded.module.css";
import ProductCard from "../components/ProductCard";

const RecentlyAdded = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.heading}>Recently Added</div>

        <div className={styles.grid}>
          <div className={styles.column}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className={styles.column}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdded;
