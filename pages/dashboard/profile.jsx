import styles from '../../styles/pageStyles/Profile.module.css'
import Image from 'next/image'
import userAvatar from '../../public/images/userAvatar.jpg'
import storeAvatar from '../../public/images/storeAvatar.jpg'
import LoadingImage from '../../components/ui/LoadingImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCamera,
  faCopy,
  faShareNodes,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Textarea from '../../components/ui/Textarea'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Router from 'next/router'
import Spinner from '../../components/ui/Spinner'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER } from '../../graphql/queries/userQueries'
import Cookies from 'js-cookie'
import {
  PUBLISH_ACCOUNT,
  UPDATE_ACCOUNT,
} from '../../graphql/mutations/userMutations'

const Profile = () => {
  const [trackLoading, setTrackLoading] = useState(false)
  const [storeLoading, setStoreLoading] = useState(false)
  const [createStoreLoading, setCreateStoreLoading] = useState(false)
  const [deleteModal, setDeleteModalLoading] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const { user: username, dispatch } = useContext(AuthContext)

  //get the user account information
  const { data, loading } = useQuery(GET_USER, {
    variables: { username },
  })

  const user = data?.account

  //edit account details credentials
  const [credentials, setCredentials] = useState({})

  const handleLogout = () => {
    setLoggingOut(true)
    Cookies.remove('VenndorUser')
    dispatch({ type: 'LOGOUT' })
    toast.success('Logged out')
    Router.push('/auth/login')
  }

  const [updateDetails, { loading: updateLoading }] = useMutation(
    UPDATE_ACCOUNT,
  )

  const [publishAccount] = useMutation(PUBLISH_ACCOUNT, {
    refetchQueries: [{ query: GET_USER, variables: { username } }],
  })

  //handle change on details input fields
  const handleChangeDetails = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value })
  }

  const handleSubmitDetails = async (e) => {
    e.preventDefault()

    await updateDetails({
      variables: {
        ...credentials,
        username,
      },
    })
      .then((res) => {
        publishAccount({
          variables: { username: res.data.updateAccount.username },
        })

        toast.success('Updated')
      })
      .catch((err) => console.log(err))
  }

  return loading || loggingOut ? (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingBlock: '100px',
      }}
    >
      <Spinner />
    </div>
  ) : (
    <div className={styles.profile}>
      <div className={styles.container}>
        <div className={styles.detailsCol}>
          <h2 className={styles.heading}>My Profile</h2>

          <div className={styles.metadata}>
            <div className={styles.profilePicture}>
              <Image
                src={user?.avatar ? user?.avatar.url : userAvatar}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="profile"
                priority
              />
              <LoadingImage />
            </div>
            <h3 className={styles.fullname}>
              {user?.firstname} {user?.lastname}
            </h3>
            <p className={styles.username}>{user?.username}</p>
          </div>

          <div className={styles.bio}>
            <p>{user?.bio}</p>
          </div>

          <div className={styles.linkProfile}>
            <h3>Profile Link</h3>
            <div className={styles.profileLink}>
              <p>
                https://{process.env.DOMAIN}/user/{user?.username}
              </p>
              <span>
                <FontAwesomeIcon
                  icon={faCopy}
                  className={styles.copyIcon}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://${process.env.DOMAIN}/user/${user?.username}`,
                    )

                    toast.success('Link Copied to clipboard')
                  }}
                />
                <FontAwesomeIcon
                  icon={faShareNodes}
                  className={styles.copyIcon}
                  onClick={() => {
                    navigator.share({
                      title: `${user?.firstname} ${user?.lastname}`,
                      text: 'Hi, checkout my Venndor profile.',
                      url: `https://${process.env.DOMAIN}/user/${user?.username}`,
                    })
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
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <td>
                    <FaPhone />
                    Phone:
                  </td>
                  <td>{user?.phone}</td>
                </tr>
                {user?.facebook && (
                  <tr>
                    <td>
                      <FaFacebook />
                      Facebook:
                    </td>
                    <td>
                      <a href={user?.facebook} target="_blank">
                        {user?.facebook}
                      </a>
                    </td>
                  </tr>
                )}
                {user?.instagram && (
                  <tr>
                    <td>
                      <FaInstagram />
                      Instagram:
                    </td>
                    <td>
                      <a href={user?.instagram} target="_blank">
                        {user?.instagram}
                      </a>
                    </td>
                  </tr>
                )}
                {user?.twitter && (
                  <tr>
                    <td>
                      <FaTwitter />
                      Twitter:
                    </td>
                    <td>
                      <a href={user?.twitter} target="_blank">
                        {user?.twitter}
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.myStore}>
            <h2 className={styles.heading}>My Store</h2>
            {user?.store?.name ? (
              <div className={styles.storeDetails}>
                <div className={styles.storeImg}>
                  <Image
                    src={
                      user?.store.avatar ? user?.store.avatar.url : storeAvatar
                    }
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={user?.store.name}
                  />
                  <LoadingImage />
                </div>
                <div className={styles.storeText}>
                  <h3>{user?.store.name}</h3>
                  <p className={styles.primary}>{user?.store.tagline}</p>
                  <p>{user?.store.description}</p>
                  <Button
                    disabled={storeLoading}
                    onClick={() => {
                      setStoreLoading(true)
                      Router.push('/dashboard/myStore')
                    }}
                  >
                    {storeLoading ? (
                      <>
                        <Spinner size="sm" /> Loading
                      </>
                    ) : (
                      'Manage Store'
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className={styles.createStore}>
                <button
                  onClick={() => {
                    setCreateStoreLoading(true)
                    Router.push('/dashboard/createStore')
                  }}
                >
                  {createStoreLoading ? (
                    <>
                      <Spinner size="sm" /> Loading
                    </>
                  ) : (
                    'Create Store'
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
                setTrackLoading(true)
                Router.push('/dashboard/myOrders')
              }}
            >
              {trackLoading ? (
                <>
                  <Spinner size="sm" /> Loading
                </>
              ) : (
                'Track'
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
            <form onChange={handleChangeDetails} onSubmit={handleSubmitDetails}>
              <Textarea label="Bio" defaultValue={user?.bio} id="bio" />
              <Input label="Phone" defaultValue={user?.phone} id="phone" />
              <Input
                type="url"
                label="Facebook"
                defaultValue={user?.facebook}
                msg="Link to Facebook profile"
                id="facebook"
              />
              <Input
                type="url"
                label="Instagram"
                defaultValue={user?.instagram}
                msg="Link to Instagram profile"
                id="instagram"
              />
              <Input
                type="url"
                label="Twitter"
                defaultValue={user?.twitter}
                msg="Link to Twitter profile"
                id="twitter"
              />
              <Button color="text" disabled={updateLoading}>
                Update details
              </Button>
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
            <Button
              color="text"
              style={{ marginBottom: '3rem' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
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
  )
}

export default Profile
