import styles from '../../styles/pageStyles/Profile.module.css'
import Image from 'next/image'
import storeAvatar from '../../public/images/storeAvatar.jpg'
import LoadingImage from '../../components/ui/LoadingImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCamera,
  faCopy,
  faLocationCrosshairs,
  faLocationDot,
  faShareNodes,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { FaEnvelope, FaPhone, FaLocationArrow } from 'react-icons/fa'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Textarea from '../../components/ui/Textarea'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import Router from 'next/router'
import Spinner from '../../components/ui/Spinner'
import { states } from '../../lib/selections'
import Select from '../../components/ui/Select'
import { AuthContext } from '../../context/AuthContext'
import { GET_USER_STORE } from '../../graphql/queries/storeQueries'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CURRENT_USER, GET_USER } from '../../graphql/queries/userQueries'
import {
  PUBLISH_STORE,
  UPDATE_USER_STORE,
} from '../../graphql/mutations/storeMutations'

const MyStore = () => {
  const [trackLoading, setTrackLoading] = useState(false)
  const [productsLoading, setProductsLoading] = useState(false)
  const [deleteModal, setDeleteModalLoading] = useState(false)

  const [credentials, setCredentials] = useState({})

  const { user: username } = useContext(AuthContext)

  const { data: user, error: userError } = useQuery(GET_CURRENT_USER, {
    variables: { username },
  })

  const id = user?.account.store.id

  const { data, loading, error: storeError } = useQuery(GET_USER_STORE, {
    variables: { id },
  })

  const store = data?.store

  const [updateDetails, { loading: updateLoading }] = useMutation(
    UPDATE_USER_STORE,
  )

  const [publishStore] = useMutation(PUBLISH_STORE)

  //handle edit store form change

  const handleChange = (e) => {
    setCredentials({ ...credentials, id, [e.target.id]: e.target.value })
  }

  //handle edit store form submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    await updateDetails({
      variables: credentials,
    })
      .then((res) => {
        publishStore({
          variables: { id: res.data.updateStore.id },
        })

        toast.success('Updated')
      })
      .catch((err) => console.log(err))
  }

  if (userError || storeError) return <div>Something went wrong</div>

  return !data || loading ? (
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
          <h2 className={styles.heading}>My Store</h2>

          <div className={styles.metadata}>
            <div className={styles.profilePicture}>
              <Image
                src={store?.avatar ? store.avatar.url : storeAvatar}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt={store.name}
              />
              <LoadingImage />
            </div>
            <h3 className={styles.fullname}>{store?.name}</h3>
            <p className={styles.tagline}>{store?.tagline}</p>
          </div>

          <div className={styles.linkProfile}>
            <h3>Description</h3>
            <p>{store.description}</p>
          </div>

          <div className={styles.linkProfile}>
            <h3>Store Link</h3>
            <div className={styles.profileLink}>
              <p>
                https://{process.env.DOMAIN}/store/{store?.id}
              </p>
              <span>
                <FontAwesomeIcon
                  icon={faCopy}
                  className={styles.copyIcon}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://${process.env.DOMAIN}/store/${store?.id}`,
                    )

                    toast.success('Link Copied to clipboard')
                  }}
                />
                <FontAwesomeIcon
                  icon={faShareNodes}
                  className={styles.copyIcon}
                  onClick={() => {
                    navigator.share({
                      title: `${store?.name}`,
                      text: `Hi, checkout my Store on Venndor. ${store.description}`,
                      url: `https://${process.env.DOMAIN}/store/${store?.id}`,
                    })
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
                  <td>{store?.address}</td>
                </tr>
                <tr>
                  <td>
                    <FaLocationArrow />
                    State:
                  </td>
                  <td>{store?.state}</td>
                </tr>
                {store?.district && (
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faLocationCrosshairs} />
                      L.G.A:
                    </td>
                    <td>{store?.district}</td>
                  </tr>
                )}
                <tr>
                  <td>
                    <FaEnvelope />
                    Email:
                  </td>
                  <td>{store?.email}</td>
                </tr>
                <tr>
                  <td>
                    <FaPhone />
                    Phone:
                  </td>
                  <td>{store?.contact}</td>
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
                Router.push('/dashboard/products')
                setProductsLoading(true)
              }}
            >
              {productsLoading ? (
                <>
                  <Spinner size="sm" /> Loading
                </>
              ) : (
                'My Products'
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
                Router.push('/dashboard/storeOrders')
                setTrackLoading(true)
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
            <form onChange={handleChange} onSubmit={handleSubmit}>
              <Input
                type="text"
                label="Store name"
                placeholder="Store name"
                defaultValue={store?.name}
                required
                id="name"
              />
              <Input
                type="text"
                label="Tagline"
                placeholder="Short slogan"
                defaultValue={store?.tagline}
                msg="Optional"
                id="tagline"
              />
              <Textarea
                label="Description"
                placeholder="Describe your business. . ."
                defaultValue={store?.description}
                required
                id="description"
              />
              <Input
                type="text"
                label="Address"
                placeholder="Business Address"
                defaultValue={store?.address}
                required
                id="address"
              />
              <Select
                label="State"
                required
                defaultValue={store?.state}
                id="state"
              >
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
                defaultValue={store?.district}
                msg="Optional"
                id="district"
              />

              <Input
                type="text"
                label="Contact"
                placeholder="070 0000 0000"
                defaultValue={store?.contact}
                required
                id="contact"
              />

              <Input
                type="email"
                label="Email"
                placeholder="Your business email"
                defaultValue={store?.email}
                msg="Optional"
                id="email"
              />
              <Button color="text" type="submit" disabled={updateLoading}>
                Update details
              </Button>
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
                    Warning!!! You are about to delete your Store. This will
                    remove all listed products. You cannot undo this action.
                    Enter your Password to proceed.
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
                    Delete Store
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

export default MyStore
