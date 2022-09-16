import styles from "../../styles/pageStyles/Profile.module.css";
import Image from "next/image";
import userAvatar from "../../public/images/userAvatar.jpg";
import storeAvatar from "../../public/images/storeAvatar.jpg";
import LoadingImage from "../../components/ui/LoadingImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faCopy,
  faShareNodes,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import { useState } from "react";
import toast from "react-hot-toast";
import Router from "next/router";
import Spinner from "../../components/ui/Spinner";

const Profile = () => {
  const [store] = useState(true);
  const [trackLoading, setTrackLoading] = useState(false);
  const [storeLoading, setStoreLoading] = useState(false);
  const [createStoreLoading, setCreateStoreLoading] = useState(false);
  const [deleteModal, setDeleteModalLoading] = useState(false);

  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <div className={styles.detailsCol}>
          <h2 className={styles.heading}>My Profile</h2>

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

          <div className={styles.myStore}>
            <h2 className={styles.heading}>My Store</h2>
            {store ? (
              <div className={styles.storeDetails}>
                <div className={styles.storeImg}>
                  <Image
                    src={storeAvatar}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="store"
                  />
                  <LoadingImage />
                </div>
                <div className={styles.storeText}>
                  <h3>Rehx Media Inc.</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugiat, unde. Obcaecati neque ad adipisci id aut. Magnam
                    obcaecati in rem? Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Id, sed?
                  </p>
                  <Button
                    disabled={storeLoading}
                    onClick={() => {
                      setStoreLoading(true);
                      Router.push("/dashboard/myStore");
                    }}
                  >
                    {storeLoading ? (
                      <>
                        <Spinner size="sm" /> Loading
                      </>
                    ) : (
                      "Manage Store"
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className={styles.createStore}>
                <button
                  onClick={() => {
                    setCreateStoreLoading(true);
                    Router.push("/dashboard/createStore");
                  }}
                >
                  {createStoreLoading ? (
                    <>
                      <Spinner size="sm" /> Loading
                    </>
                  ) : (
                    "Create Store"
                  )}
                </button>
              </div>
            )}
          </div>

          <div className={styles.orders}>
            <h2 className={styles.heading}>My Orders</h2>
            <h4>Track Orders you've made:</h4>
            <Button
              color="text"
              disabled={trackLoading}
              onClick={() => {
                setTrackLoading(true);
                Router.push("/dashboard/myOrders");
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
              <Input label="First name" defaultValue="Jesse" />
              <Input label="Last name" defaultValue="Ajioh" />
              <Input
                label="Username"
                readOnly
                defaultValue="rehxofficial"
                msg="Cannot edit username."
              />
              <Textarea label="Bio" defaultValue="description of yourself" />
              <Input
                label="Email"
                type="email"
                defaultValue="ajiohjesse@gmail.com"
              />
              <Input label="Phone" defaultValue="07017890895" />
              <Input
                type="url"
                label="Facebook"
                defaultValue="http://sample.com/username"
                msg="Link to Facebook profile"
              />
              <Input
                type="url"
                label="Instagram"
                defaultValue="http://sample.com/username"
                msg="Link to Instagram profile"
              />
              <Input
                type="url"
                label="Twitter"
                defaultValue="http://sample.com/username"
                msg="Link to Twitter profile"
              />
              <Button color="text">Update details</Button>
            </form>
          </div>

          <div className={styles.editPassword}>
            <h2 className={styles.heading}>Change Password</h2>

            <form>
              <Input label="Current password" type="password" />
              <Input label="New password" type="password" />
              <Input label="Repeat New password" type="password" />
              <Button color="text">Update password</Button>
            </form>
          </div>

          <div className={styles.editPassword}>
            <h2 className={styles.heading}>Settings</h2>
            <div className={styles.setting}>
              {deleteModal ? (
                <div className={styles.deleteModal}>
                  <p>
                    <span>
                      <FontAwesomeIcon icon={faTriangleExclamation} />
                    </span>
                    Warning!!! You are about to delete your Venndor Account. You
                    cannot undo this action. Enter your Password to proceed.
                  </p>

                  <Input type="password" label="Password" />
                  <Button color="danger">Delete</Button>
                  <Button
                    color="text"
                    onClick={() => setDeleteModalLoading(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <h3>
                    <span>
                      <FontAwesomeIcon icon={faTriangleExclamation} />
                    </span>
                    Delete Account
                  </h3>
                  <Button
                    color="danger"
                    onClick={() => setDeleteModalLoading(true)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
