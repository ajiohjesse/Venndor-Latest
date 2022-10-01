import styles from '../../styles/pageStyles/Product.module.css'
import shoe from '../../public/images/shoe.jpg'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Button from '../../components/ui/Button'
import LoadingImage from '../../components/ui/LoadingImage'
import client from '../../apollo-client'
import { GET_PRODUCT } from '../../graphql/queries/productQueries'
import Router from 'next/router'
import moment from 'moment/moment'

const SingleProduct = ({ product }) => {
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
            <h3>Request for this product</h3>
            <Button color="text">
              <FontAwesomeIcon icon={faShoppingCart} /> Send Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct

export const getServerSideProps = async ({ params }) => {
  const id = params.id

  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: { id },
  })

  return {
    props: {
      product: data.product,
    },
  }
}
