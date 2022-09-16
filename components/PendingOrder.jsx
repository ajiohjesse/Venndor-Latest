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

const PendingOrder = () => {
  const [deleteModal, setDeleteModal] = useState(false);

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
          <button className={styles.view}>
            <FontAwesomeIcon icon={faEye} />
            <span className={styles.buttonTitle}>View</span>
          </button>

          <button
            className={styles.delete}
            onClick={() => setDeleteModal(true)}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className={styles.buttonTitle}>Delete</span>
          </button>
          {deleteModal && (
            <div className={styles.deleteModal}>
              <p>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className={styles.warning}
                />
                This order will be cancelled!
              </p>
              <p>Confirm Delete?</p>
              <div className={styles.confirmDelete}>
                <button>Yes</button>
                <button onClick={() => setDeleteModal(false)}>No</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingOrder;
