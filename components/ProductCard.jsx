import styles from "../styles/ListedProduct.module.css";
import {
  faEdit,
  faEye,
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import product from "../public/images/shoe.jpg";
import Image from "next/image";
import { useState } from "react";

const ProductCard = () => {
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
          <span>Price: </span>
          <span className={styles.price}>&#8358; {(5000).toLocaleString("en-Us")}</span>
        </div>

        <div className={styles.storeName}>
          <span>Categroy: </span>
          <span className={styles.category}>Male Fashion</span>
        </div>

        <div className={styles.storeName}>
          <span>Location: </span>
          <span className={styles.category}>Benue / Makurdi</span>
        </div>

        <div className={styles.buttons}>
          <button className={styles.view}>
            <FontAwesomeIcon icon={faEye} />
            <span className={styles.buttonTitle}>View</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
