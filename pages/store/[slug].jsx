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
import { GET_STORE } from "../../graphql/queries/storeQueries";
import client from "../../apollo-client";
import PageNotFound from "../../components/PageNotFound";

const Store = ({ store }) => {
  const [profileLoading, setProfileLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);

  if (!store) return <PageNotFound />;

  return (
    <div className={styles.profile}>
      <div className={[styles.container, styles.store].join(" ")}>
        <div className={styles.detailsCol}>
          <h2 className={styles.heading}>Store</h2>

          <div className={styles.metadata}>
            <div className={styles.profilePicture}>
              <Image
                src={store.avatar ? store.avatar.url : storeAvatar}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt={store.name}
              />
              <LoadingImage />
            </div>
            <h3 className={styles.fullname}>{store.name}</h3>
            <p className={styles.tagline}>{store.tagline}</p>
          </div>

          <div className={styles.linkProfile}>
            <h3>Description</h3>
            <p>{store.description}</p>
          </div>

          <div className={styles.linkProfile}>
            <h3>Store Link</h3>
            <div className={styles.profileLink}>
              <p>
                https://{process.env.DOMAIN}/store/{store.slug}
              </p>
              <span>
                <FontAwesomeIcon
                  icon={faCopy}
                  className={styles.copyIcon}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://${process.env.DOMAIN}/store/${store.slug}`
                    );

                    toast.success("Link Copied to clipboard");
                  }}
                />
                <FontAwesomeIcon
                  icon={faShareNodes}
                  className={styles.copyIcon}
                  onClick={() => {
                    navigator.share({
                      title: store.name,
                      text: "Hi, checkout my store on Venndor.",
                      url: `https://${process.env.DOMAIN}/store/${store.slug}`,
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
                  <td>{store.address}</td>
                </tr>
                <tr>
                  <td>
                    <FaLocationArrow />
                    State:
                  </td>
                  <td>{store.state}</td>
                </tr>
                {store.district && (
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faLocationCrosshairs} />
                      L.G.A:
                    </td>
                    <td>{store.district}</td>
                  </tr>
                )}
                <tr>
                  <td>
                    <FaEnvelope />
                    Email:
                  </td>
                  <td>{store.email}</td>
                </tr>
                <tr>
                  <td>
                    <FaPhone />
                    Phone:
                  </td>
                  <td>{store.contact}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.ownerWrapper}>
            <h2 className={styles.heading}>Owner</h2>
            <div className={styles.storeOwner}>
              <div className={styles.profilePicture}>
                <Image
                  src={
                    store.account.avatar ? store.account.avatar.url : userAvatar
                  }
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt={`${store.account.firstname} ${store.account.lastname}`}
                />
                <LoadingImage />
              </div>
              <div className={styles.ownerDetails}>
                <h3>
                  {store.account.firstname} {store.account.lastname}
                </h3>
                <h4>{store.account.username}</h4>
                <p>{store.account.phone}</p>
              </div>
            </div>
            <Button
              color="text"
              disabled={profileLoading}
              onClick={() => {
                Router.push(`/user/${store.account.username}`);
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
            {store.products[0] ? (
              <>
                <div className={styles.storeListings}>
                  {store.products.map((product, i) => (
                    <ProductCard id={product.id} key={i} />
                  ))}
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
              </>
            ) : (
              <p>No listed products.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;

export const getServerSideProps = async ({ params }) => {
  const slug = params.slug;

  const { data } = await client.query({
    query: GET_STORE,
    variables: { slug },
  });

  return {
    props: {
      store: data.store,
    },
  };
};
