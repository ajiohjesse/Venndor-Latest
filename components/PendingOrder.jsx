import styles from '../styles/ListedProduct.module.css'
import {
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
import moment from 'moment/moment'

const PendingOrder = ({ order }) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [productLoading, setProductLoading] = useState(false)

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
      </div>
      <div className={styles.orderDetails}>
        <p className={styles.title}>{order.product.name}</p>
        <div className={styles.storeName}>
          <span>Store: </span>
          <span onClick={() => Router.push(`/store/${order.store.id}`)}>
            {order.store.name}
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
                This order will be cancelled!
              </p>
              <p>Confirm Delete?</p>
              <div className={styles.confirmDelete}>
                <button>Yes</button>
                <button onClick={() => setDeleteModal(false)}>No</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PendingOrder
