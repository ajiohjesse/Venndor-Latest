import styles from "../styles/ListedProduct.module.css";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import product from "../public/images/shoe.jpg";
import Image from "next/image";
import Spinner from "./ui/Spinner";
import { useState } from "react";
import Router from "next/router";

const CompletedOrder = () => {
  const [productLoading, setProductLoading] = useState(false);

  return (
    <div className={styles.row}>
      <div className={styles.image}>
        <Image
          src={product}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          alt="product"
        />
      </div>
      <div className={styles.orderDetails}>
        <p className={styles.title}>Unisex Vintage shirts</p>
        <div className={styles.storeName}>
          <span>Store: </span>
          <span>Rehx Stores</span>
        </div>

        <div className={styles.date}>
          <p>04/10/2022</p>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.view}
            onClick={() => {
              setProductLoading(true);
              Router.push("/product/id");
            }}
          >
            {productLoading ? (
              <>
                <Spinner size="sm" />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faEye} />
                <span className={styles.buttonTitle}>View</span>
              </>
            )}
          </button>
          <span className={styles.orderStatus} data-name="delivered">
            Delivered
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompletedOrder;

{
  /* <span className={styles.orderStatus} data-name="delivered">
          Declivered
        </span> */
}
