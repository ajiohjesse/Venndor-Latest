import styles from '../styles/ListedProduct.module.css'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import product from '../public/images/shoe.jpg'
import Image from 'next/image'
import Spinner from './ui/Spinner'
import { useState } from 'react'
import Router from 'next/router'
import moment from 'moment/moment'
import LoadingImage from './ui/LoadingImage'

const CompletedOrder = ({ order, type }) => {
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
        <LoadingImage />
      </div>
      <div className={styles.orderDetails}>
        <p className={styles.title}>{order.product.name}</p>
        <div className={styles.storeName}>
          {type === 'user' ? (
            <>
              <span>Store: </span>
              <span onClick={() => Router.push(`/store/${order.store.id}`)}>
                {order.store.name}
              </span>
            </>
          ) : (
            <>
              <span>Client: </span>
              <span
                onClick={() => Router.push(`/user/${order.account.username}`)}
              >
                @{order.account.username}
              </span>
            </>
          )}
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
          <span className={styles.orderStatus} data-name={order.message}>
            {order.message}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CompletedOrder

{
  /* <span className={styles.orderStatus} data-name="delivered">
          Declivered
        </span> */
}
