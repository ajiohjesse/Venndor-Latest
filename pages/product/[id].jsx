import styles from "../../styles/pageStyles/Product.module.css";
import shoe from "../../public/images/shoe.jpg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/Button";
import LoadingImage from "../../components/ui/LoadingImage";

const SingleProduct = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.image}>
            <Image
              src={shoe}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              alt="Product"
            />
            <LoadingImage />
          </div>

          <div className={styles.details}>
            <h2>Product name</h2>
            <span className={styles.price}>
              &#8358; {(8000).toLocaleString("en-Us")}
            </span>

            <span className={styles.textGroup}>
              <span>Location:</span> <span>Benue / Makurdi</span>
            </span>

            <span className={styles.textGroup}>
              <span>Category:</span>{" "}
              <span className={styles.textLink}>Male Fashion</span>
            </span>

            <span className={styles.textGroup}>
              <span>Store:</span>{" "}
              <span className={styles.textLink}>Rehx Stores</span>
            </span>

            <span className={styles.textGroup}>
              <span>Contact:</span> <span>07017890895</span>
            </span>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.description}>
            <h3>Description</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              earum id aperiam quia corrupti ea quisquam dolore perferendis.
              Rerum nostrum qui natus debitis recusandae molestiae facilis,
              perspiciatis ut sapiente voluptatem.
            </p>
          </div>
          <div className={styles.request}>
            <h3>Request for this product</h3>
            <Button color="text">
              <FontAwesomeIcon icon={faShoppingCart} /> Send Order Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
