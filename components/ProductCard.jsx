import styles from '../styles/ProductCard.module.css'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import product from '../public/images/shoe.jpg'
import Image from 'next/image'
import { useState } from 'react'
import Router from 'next/router'
import Spinner from './ui/Spinner'
import { stringLength } from '../lib/stringLength'

const ProductCard = ({ product }) => {
  const [productLoading, setProductLoading] = useState(false)

  return (
    <div className={styles.row}>
      <div className={styles.image}>
        <Image
          src={product.image.url}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          alt={product.name}
        />
      </div>
      <div className={styles.orderDetails}>
        <p className={styles.title}>{product.name}</p>
        <div className={styles.storeName}>
          <span>Price: </span>
          <span className={styles.price}>
            &#8358; {product.price.toLocaleString('en-Us')}
          </span>
        </div>

        <div className={styles.storeName}>
          <span>Categroy: </span>
          <span
            className={styles.category}
            onClick={() => Router.push(`/category/${product.category}`)}
          >
            {product.category}
          </span>
        </div>

        <div className={styles.storeName}>
          <span>Store: </span>
          <span
            className={styles.category}
            onClick={() => Router.push(`/store/${product.store.id}`)}
          >
            {product.store.name}
          </span>
        </div>

        <div className={styles.storeName}>
          <span>Location: </span>
          <span className={styles.category}>
            {product.store.state}{' '}
            {product.store.district && `/ ${product.store.district}`}
          </span>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.view}
            onClick={() => {
              setProductLoading(true)
              Router.push(`/product/${product.id}`)
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
        </div>
      </div>
    </div>
  )
}

export default ProductCard
