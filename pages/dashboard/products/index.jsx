import styles from "../../../styles/pageStyles/MyOrders.module.css";
import ListedProduct from "../../../components/ListedProduct";
import Router from "next/router";
import { useState } from "react";
import Spinner from "../../../components/ui/Spinner";

const Products = () => {
  const [createLoading, setCreateLoading] = useState(false);

  return (
    <div className={styles.listed}>
      <div className={styles.listProductWrapper}>
        <div className={styles.listProduct}>
          <button
            disabled={createLoading}
            onClick={() => {
              setCreateLoading(true);
              Router.push("/dashboard/products/create");
            }}
          >
            {createLoading ? (
              <>
                <Spinner size="sm" /> Loading
              </>
            ) : (
              "Add new listing"
            )}
          </button>
        </div>
      </div>

      <h2 className={styles.pageTitle}>Products you listed:</h2>

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.column}>
            <ListedProduct />
            <ListedProduct />
            <ListedProduct />
            <ListedProduct />
            <ListedProduct />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
