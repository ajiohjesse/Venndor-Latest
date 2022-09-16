import styles from "../../styles/pageStyles/Profile.module.css";
import Image from "next/image";
import storeAvatar from "../../public/images/storeAvatar.jpg";
import LoadingImage from "../../components/ui/LoadingImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faCopy,
  faLocationCrosshairs,
  faLocationDot,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FaEnvelope, FaPhone, FaLocationArrow } from "react-icons/fa";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import { useState } from "react";
import toast from "react-hot-toast";
import Router from "next/router";
import Spinner from "../../components/ui/Spinner";
import { states } from "../../lib/selections";
import Select from "../../components/ui/Select";

const MyStore = () => {
  const [trackLoading, setTrackLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);

  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <div className={styles.detailsCol}>
          <h2 className={styles.heading}>My Store</h2>

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

          <div className={styles.orders}>
            <h2 className={styles.heading}>Listed Products</h2>
            <h4>Add new products and view products you've listed:</h4>
            <Button
              color="text"
              disabled={productsLoading}
              onClick={() => {
                Router.push("/dashboard/products");
                setProductsLoading(true);
              }}
            >
              {productsLoading ? (
                <>
                  <Spinner size="sm" /> Loading
                </>
              ) : (
                "My Products"
              )}
            </Button>
          </div>

          <div className={styles.orders}>
            <h2 className={styles.heading}>Store Orders</h2>
            <h4>Track Order requests on products you've listed:</h4>
            <Button
              color="text"
              disabled={trackLoading}
              onClick={() => {
                Router.push("/dashboard/storeOrders");
                setTrackLoading(true);
              }}
            >
              {trackLoading ? (
                <>
                  <Spinner size="sm" /> Loading
                </>
              ) : (
                "Track"
              )}
            </Button>
          </div>
        </div>

        <div className={styles.editCol}>
          <h2 className={styles.heading}>Update Info</h2>
          <div className={styles.fileUpload}>
            <input type="file" name="image" accept="image/*" />
            <Button color="text">
              <FontAwesomeIcon icon={faCamera} />
              Upload Image
            </Button>
          </div>

          <div className={styles.editDetails}>
            <form>
              <Input
                type="text"
                label="Store name"
                placeholder="Store name"
                required
              />
              <Input
                type="text"
                label="Tagline"
                placeholder="Short slogan"
                msg="Optional"
              />
              <Textarea
                label="Description"
                placeholder="Describe your business. . ."
                required
              />
              <Input
                type="text"
                label="Address"
                placeholder="Business Address"
                required
              />
              <Select label="State" required defaultValue="Abuja">
                <option value="Abuja">Abuja</option>
                {states.map((state, i) => (
                  <option value={state} key={i}>
                    {state}
                  </option>
                ))}
              </Select>

              <Input
                type="text"
                label="L.G.A"
                placeholder="Local Area"
                msg="Optional"
              />

              <Input
                type="text"
                label="Contact"
                placeholder="070 0000 0000"
                required
              />

              <Input
                type="email"
                label="Email"
                placeholder="Your business email"
                msg="Optional"
              />
              <Button color="text">Update details</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStore;
