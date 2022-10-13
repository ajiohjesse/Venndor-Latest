import styles from '../../styles/pageStyles/Product.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Button from '../../components/ui/Button'
import LoadingImage from '../../components/ui/LoadingImage'
import client from '../../apollo-client'
import { GET_PRODUCT } from '../../graphql/queries/productQueries'
import Router from 'next/router'
import moment from 'moment/moment'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  CREATE_ORDER,
  PUBLISH_ORDER,
} from '../../graphql/mutations/OrderMutations'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import Spinner from '../../components/ui/Spinner'
import Modal from '../../components/ui/Modal'
import ClientOnly from '../../components/ClientOnly'
import { VERIFY_ORDER } from '../../graphql/queries/orderQueries'
import PageNotFound from '../../components/PageNotFound'

const SingleProduct = ({ product }) => {
  const [updateLoading, setUpdateLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [hasPendingOrder, setHasPendingOrder] = useState(false)

  const { user: username } = useContext(AuthContext)

  const [verifyOrder] = useLazyQuery(VERIFY_ORDER, {
    variables: {
      username,
      productId: product.id,
    },
    fetchPolicy: 'network-only',
  })

  const [createOrder] = useMutation(CREATE_ORDER, {
    variables: {
      productId: product.id,
      storeId: product.store.id,
      username,
    },
  })

  const [publishOrder] = useMutation(PUBLISH_ORDER)

  const handleOrder = async () => {
    setUpdateLoading(true)

    let duplicateRequest = false

    await verifyOrder().then(({ data }) => {
      data.orders.some((order) => {
        if (order['order_status'] !== 'completed') {
          duplicateRequest = true

          setUpdateLoading(false)

          setHasPendingOrder(true)
        }
      })
    })

    if (duplicateRequest) {
      return null
    }

    await createOrder()
      .then(async ({ data }) => {
        await publishOrder({ variables: { id: data.createOrder.id } })
      })
      .then(() => {
        toast.success('Successful')
        setModalOpen(true)
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2))
      })
      .finally(setUpdateLoading(false))
  }

  if (!product) return <PageNotFound />

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.image}>
            <Image
              src={product.image.url}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              alt={product.name}
            />
            <LoadingImage />
          </div>

          <div className={styles.details}>
            <h2>{product.name}</h2>
            <span className={styles.price}>
              &#8358; {product.price.toLocaleString('en-Us')}
            </span>

            <span className={styles.textGroup}>
              <span>Location:</span>{' '}
              <span>
                {product.store.state}{' '}
                {product.store.district && `/ ${product.store.district}`}
              </span>
            </span>

            <span className={styles.textGroup}>
              <span>Category:</span>{' '}
              <span
                className={styles.textLink}
                onClick={() => Router.push(`/category/${product.category}`)}
              >
                {product.category}
              </span>
            </span>

            <span className={styles.textGroup}>
              <span>Store:</span>{' '}
              <span
                className={styles.textLink}
                onClick={() => Router.push(`/store/${product.store.id}`)}
              >
                {product.store.name}
              </span>
            </span>

            <span className={styles.textGroup}>
              <span>Contact:</span>{' '}
              <span className={styles.phone}>{product.store.contact}</span>
            </span>

            <span className={styles.textGroup}>
              <span>Listed On:</span>{' '}
              <span className={styles.phone}>
                {moment(product.createdAt).format('MMM Do YYYY')}
              </span>
            </span>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.description}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          <div className={styles.request}>
            {modalOpen && (
              <Modal>
                <div className={styles.modalContentWrapper}>
                  <div className={styles.modalContent}>
                    <p>
                      You have successfully requested for this product. The
                      seller will contact you to confirm your order.
                      <br />
                      <br />
                      You can track your orders by clicking the track button
                      below.
                    </p>
                    <div className={styles.modalButtons}>
                      <button
                        type="button"
                        onClick={() => Router.push('/dashboard/myOrders')}
                      >
                        Track
                      </button>
                      <button type="button" onClick={() => setModalOpen(false)}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            )}

            {hasPendingOrder && (
              <Modal>
                <div className={styles.modalContentWrapper}>
                  <div className={styles.modalContent}>
                    <p>
                      You already have an open request for this product.
                      <br />
                      <br />
                      You can track your orders by clicking the track button
                      below.
                    </p>
                    <div className={styles.modalButtons}>
                      <button
                        type="button"
                        onClick={() => Router.push('/dashboard/myOrders')}
                      >
                        Track
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasPendingOrder(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            )}
            <ClientOnly>
              <h3>
                {product.store.account.username === username
                  ? 'This product belongs to you.'
                  : 'Request for this product'}
              </h3>
              {product.store.account.username !== username && (
                <Button
                  color="text"
                  onClick={handleOrder}
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <>
                      <Spinner size="sm" /> Loading
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faShoppingCart} /> Send Request
                    </>
                  )}
                </Button>
              )}
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct

export const getServerSideProps = async ({ params }) => {
  const id = params.id

  const { data } = await client
    .query({
      query: GET_PRODUCT,
      variables: { id },
    })
    .catch((err) => {
      console.log('Fetch Product Error:', JSON.stringify(err, null, 2))

      return {
        props: {
          product: null,
        },
      }
    })

  return {
    props: {
      product: data.product,
    },
  }
}
