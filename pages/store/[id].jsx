import styles from "../../styles/pageStyles/Profile.module.css";
import Image from "next/image";
import storeAvatar from "../../public/images/storeAvatar.jpg";
import userAvatar from "../../public/images/userAvatar.jpg";
import LoadingImage from "../../components/ui/LoadingImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faLocationCrosshairs,
  faLocationDot,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FaEnvelope, FaPhone, FaLocationArrow } from "react-icons/fa";
import Button from "../../components/ui/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import Router from "next/router";
import Spinner from "../../components/ui/Spinner";
import ProductCard from "../../components/ProductCard";

const Store = () => {
  const [profileLoading, setProfileLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);

  return (
    <div className={styles.profile}>
      <div className={[styles.container, styles.store].join(" ")}>
        <div className={styles.detailsCol}>
          <h2 className={styles.heading}>Store</h2>

          <div className={styles.metadata}>
            <div className={styles.profilePicture}>
              <Image
                src={storeAvatar}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="profile"
              />
              <LoadingImage />
            </div>
            <h3 className={styles.fullname}>Rehx Stores</h3>
            <p className={styles.tagline}>The best in general merchandise</p>
          </div>

          <div className={styles.linkProfile}>
            <h3>Description</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam enim
              laudantium eaque minus, quis sint animi dolore. Eveniet, quaerat
              dolorum.
            </p>
          </div>

          <div className={styles.linkProfile}>
            <h3>Store Link</h3>
            <div className={styles.profileLink}>
              <p>https://{process.env.DOMAIN}/store/16572688673787</p>
              <span>
                <FontAwesomeIcon
                  icon={faCopy}
                  className={styles.copyIcon}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://${process.env.DOMAIN}/user/rehxofficial`
                    );

                    toast.success("Link Copied to clipboard");
                  }}
                />
                <FontAwesomeIcon
                  icon={faShareNodes}
                  className={styles.copyIcon}
                  onClick={() => {
                    navigator.share({
                      title: "Rehxofficial",
                      text: "Hi, checkout my Venndor profile.",
                      url: `https://${process.env.DOMAIN}/user/rehxofficial`,
                    });
                  }}
                />
              </span>
            </div>
          </div>

          <div className={styles.contact}>
            <h3>Info</h3>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faLocationDot} />
                    Address:
                  </td>
                  <td>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                    nobis eos illo eaque impedit minus illum. Labore magnam
                    asperiores vitae?
                  </td>
                </tr>
                <tr>
                  <td>
                    <FaLocationArrow />
                    State:
                  </td>
                  <td>Benue</td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faLocationCrosshairs} />
                    L.G.A:
                  </td>
                  <td>Makurdi</td>
                </tr>
                <tr>
                  <td>
                    <FaEnvelope />
                    Email:
                  </td>
                  <td>ajiohjesse@gmail.com</td>
                </tr>
                <tr>
                  <td>
                    <FaPhone />
                    Phone:
                  </td>
                  <td>07017890895</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.ownerWrapper}>
            <h2 className={styles.heading}>Owner</h2>
            <div className={styles.storeOwner}>
              <div className={styles.profilePicture}>
                <Image
                  src={userAvatar}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="profile"
                />
                <LoadingImage />
              </div>
              <div className={styles.ownerDetails}>
                <h3>Jesse Ajioh</h3>
                <h4>rehxofficial</h4>
                <p>07017890895</p>
              </div>
            </div>
            <Button
              color="text"
              disabled={profileLoading}
              onClick={() => {
                Router.push("/user/storeOwner");
                setProfileLoading(true);
              }}
            >
              {profileLoading ? (
                <>
                  <Spinner size="sm" /> Loading
                </>
              ) : (
                "View Profile"
              )}
            </Button>
          </div>

          <div className={styles.orders}>
            <h2 className={styles.heading}>Listed Products</h2>
            <div className={styles.storeListings}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
            <Button
              color="text"
              disabled={productsLoading}
              onClick={() => {
                Router.push("/store/products/id");
                setProductsLoading(true);
              }}
            >
              {productsLoading ? (
                <>
                  <Spinner size="sm" /> Loading
                </>
              ) : (
                "View all Products"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
