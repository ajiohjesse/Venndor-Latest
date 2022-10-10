import styles from '../styles/ListedProduct.module.css'
import {
  faClose,
  faEdit,
  faEye,
  faTrash,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import product from '../public/images/shoe.jpg'
import Image from 'next/image'
import { useState } from 'react'
import Spinner from './ui/Spinner'
import Router from 'next/router'
import { useMutation } from '@apollo/client'
import {
  DELETE_STORE_ORDER,
  UPDATE_STORE_ORDER,
} from '../graphql/mutations/OrderMutations'
import toast from 'react-hot-toast'
import LoadingImage from './ui/LoadingImage'
import moment from 'moment'

const StorePendingOrder = ({ order, refetch, setRefetch, tab }) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, seteditModal] = useState(false)
  const [productLoading, setProductLoading] = useState(false)

  const [deleteOrder, { loading }] = useMutation(DELETE_STORE_ORDER, {
    variables: {
      id: order.id,
    },
  })

  const [updateOrder, { loading: updateLoading }] = useMutation(
    UPDATE_STORE_ORDER,
  )

  const handleDelete = () => {
    toast.loading('Deleting. . .')
    deleteOrder()
      .then(() => {
        toast.success('Deleted')
        setDeleteModal(false)

        setRefetch(refetch + 1)
      })
      .catch((err) => console.log(JSON.stringify(err, null, 2)))
      .finally(toast.dismiss())
  }

  const handleEditOrder = (e) => {
    const status = e.target.id

    toast.loading('Updating. . .')

    if (status !== 'delivered') {
      updateOrder({
        variables: {
          id: order.id,
          status,
        },
      })
        .then(() => {
          toast.dismiss()
          toast.success('Updated')

          seteditModal(false)
          setRefetch(refetch + 1)
        })
        .catch((err) =>
          console.log('Edit Order Error', JSON.stringify(err, null, 0)),
        )
        .finally()
    } else {
      updateOrder({
        variables: {
          id: order.id,
          status: 'completed',
          message: 'delivered',
        },
      })
        .then(() => {
          toast.dismiss()
          toast.success('Updated')

          seteditModal(false)
          setRefetch(refetch + 1)
        })
        .catch((err) =>
          console.log('Edit Order Error', JSON.stringify(err, null, 0)),
        )
        .finally()
    }
  }

  return (
    <div className={styles.row}>
      <div className={styles.image}>
        <Image
          src={order.product.image.url}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          alt="product"
        />
        <LoadingImage />
      </div>
      <div className={styles.orderDetails}>
        <p className={styles.title}>{order.product.name}</p>
        <div className={styles.storeName}>
          <span>Client: </span>
          <span onClick={() => Router.push(`/user/${order.account.username}`)}>
            @{order.account.username}
          </span>
        </div>

        <div className={styles.date}>
          <p>{moment(order.createdAt).format('MMM Do YYYY')}</p>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.view}
            onClick={() => {
              setProductLoading(true)
              Router.push(`/product/${order.product.id}`)
            }}
          >
            {productLoading ? (
              <>
                <Spinner size="sm" />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faEye} />
                <span className={styles.buttonTitle}>View</span>
              </>
            )}
          </button>

          <button className={styles.edit} onClick={() => seteditModal(true)}>
            <FontAwesomeIcon icon={faEdit} />
            <span className={styles.buttonTitle}>Edit</span>
          </button>

          {editModal && (
            <div className={styles.deleteModal}>
              <p>Mark this order as:</p>
              <div className={styles.confirmEdit}>
                {tab !== 'pending' && (
                  <button
                    data-pending
                    id="pending"
                    onClick={handleEditOrder}
                    disabled={updateLoading}
                  >
                    Pending
                  </button>
                )}
                {tab !== 'processing' && (
                  <button
                    data-processing
                    id="processing"
                    onClick={handleEditOrder}
                    disabled={updateLoading}
                  >
                    Processing
                  </button>
                )}
                <button
                  data-delivered
                  id="delivered"
                  onClick={handleEditOrder}
                  disabled={updateLoading}
                >
                  Delivered
                </button>
                <button data-close onClick={() => seteditModal(false)}>
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
            </div>
          )}

          <button
            className={styles.delete}
            onClick={() => setDeleteModal(true)}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className={styles.buttonTitle}>Delete</span>
          </button>

          {deleteModal && (
            <div className={styles.deleteModal}>
              <p>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className={styles.warning}
                />
                This order will be marked as declined!
              </p>
              <p>Confirm Delete?</p>
              <div className={styles.confirmDelete}>
                <button onClick={handleDelete} disabled={loading}>
                  Yes
                </button>
                <button onClick={() => setDeleteModal(false)}>No</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StorePendingOrder
