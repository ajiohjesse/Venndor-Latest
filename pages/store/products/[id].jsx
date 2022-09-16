import styles from "../../../styles/pageStyles/MyOrders.module.css";
import Spinner from "../../../components/ui/Spinner";
import ProductCard from "../../../components/ProductCard";
import Button from "../../../components/ui/Button";

const AllStoreProducts = () => {
  return (
    <div className={styles.listed}>
      <h2 className={styles.storeName}>
        Store Name: <span>Rehx Stores</span>
      </h2>
      <h2 className={styles.pageTitle}>All Products:</h2>

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.column}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
        <Button color="text">Store Profile</Button>
      </div>
    </div>
  );
};

export default AllStoreProducts;
