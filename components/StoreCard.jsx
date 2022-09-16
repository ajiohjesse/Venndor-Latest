import styles from "../styles/StoreCard.module.css";
import storeAvatar from "../public/images/storeAvatar.jpg";
import { useState } from "react";
import Image from "next/image";
import Button from "./ui/Button";
import Spinner from "./ui/Spinner";
import LoadingImage from "./ui/LoadingImage";
import Router from "next/router";

const StoreCard = () => {
  const [profileLoading, setProfileLoading] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image
            src={storeAvatar}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="store"
          />
          <LoadingImage />
        </div>
        <div className={styles.details}>
          <h3>Rehx Stores</h3>
          <p>This is the tagline</p>
          <p>
            <span>Location:</span> Benue / Makurdi
          </p>

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
  );
};

export default StoreCard;
