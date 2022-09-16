import styles from "../../../styles/pageStyles/Search.module.css";
import ProductCard from "../../../components/ProductCard";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import SkeletonCard from "../../../components/SkeletonCard";
import { categories } from "../../../lib/selections";
import StoreCard from "../../../components/StoreCard";

const Stores = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Search Stores</h1>

        <div className={styles.filters}>
          <div className={styles.filterCol}>
            <Input label="Store Name"  placeholder="Type store name"/>
            <Input label="Location"  placeholder="Type location"/>
          </div>
        </div>
        <div className={styles.results}>
          <h2 className={styles.resultHeading}>Search Result:</h2>
          <SkeletonCard />
          <StoreCard/>
        </div>
      </div>
    </div>
  );
};

export default Stores;
