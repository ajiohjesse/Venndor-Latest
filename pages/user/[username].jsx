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
import {
  FaEnvelope,
  FaPhone,
  FaLocationArrow,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import Button from "../../components/ui/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import Router from "next/router";
import Spinner from "../../components/ui/Spinner";
import ProductCard from "../../components/ProductCard";

const User = () => {
  const [profileLoading, setProfileLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);

  return (
    <div className={styles.profile}>
      <div className={[styles.container, styles.store].join(" ")}>
        <div className={styles.detailsCol}>
          <h2 className={styles.heading}>Profile</h2>

          <div className={styles.metadata}>
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
            <h3 className={styles.fullname}>jesse ajioh</h3>
            <p className={styles.username}>rehxofficial</p>
          </div>

          <div className={styles.bio}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam enim
              laudantium eaque minus, quis sint animi dolore. Eveniet, quaerat
              dolorum.
            </p>
          </div>

          <div className={styles.linkProfile}>
            <h3>Profile Link</h3>
            <div className={styles.profileLink}>
              <p>https://{process.env.DOMAIN}/user/rehxofficial</p>
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
            <h3>Contact</h3>
            <table className={styles.table}>
              <tbody>
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
                <tr>
                  <td>
                    <FaFacebook />
                    Facebook:
                  </td>
                  <td>
                    <a href="https://facebook.com" target="_blank">
                      http://facebook.com/rehxofficial
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FaInstagram />
                    Instagram:
                  </td>
                  <td>
                    <a href="https://facebook.com" target="_blank">
                      http://instagram.com/rehxofficial
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FaTwitter />
                    Twitter:
                  </td>
                  <td>
                    <a href="https://facebook.com" target="_blank">
                      http://twitter.com/rehxofficial
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.ownerWrapper}>
            <h2 className={styles.heading}>Store</h2>
            <div className={styles.storeOwner}>
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
              <div className={styles.ownerDetails}>
                <h3>Rehx Stores</h3>
                <p>This is the tagline</p>
                <p>Benue / Makurdi</p>
              </div>
            </div>
            <Button
              color="text"
              disabled={profileLoading}
              onClick={() => {
                Router.push("/store/id");
                setProfileLoading(true);
              }}
            >
              {profileLoading ? (
                <>
                  <Spinner size="sm" /> Loading
                </>
              ) : (
                "View Store"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
