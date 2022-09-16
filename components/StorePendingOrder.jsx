import styles from "../styles/ListedProduct.module.css";
import {
  faClose,
  faEdit,
  faEye,
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import product from "../public/images/shoe.jpg";
import Image from "next/image";
import { useState } from "react";
import Spinner from "./ui/Spinner";
import Router from "next/router";

const StorePendingOrder = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, seteditModal] = useState(false);
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
          <span>Client: </span>
          <span>@rehxofficial</span>
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

          <button className={styles.edit} onClick={() => seteditModal(true)}>
            <FontAwesomeIcon icon={faEdit} />
            <span className={styles.buttonTitle}>Mark as</span>
          </button>
          {editModal && (
            <div className={styles.deleteModal}>
              <p>Mark this order as:</p>
              <div className={styles.confirmEdit}>
                <button>Pending</button>
                <button>Processing</button>
                <button onClick={() => seteditModal(false)}>
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
            </div>
          )}

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

export default StorePendingOrder;
