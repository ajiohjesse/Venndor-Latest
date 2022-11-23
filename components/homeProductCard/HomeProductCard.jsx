import Image from 'next/image'
import Link from 'next/link'
import styles from './HomeProductCard.module.css'

const HomeProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className={styles.card}>
        <div className={styles.image}>
          <Image
            src={product.image.url}
            layout="fill"
            objectFit="cover"
            alt={product.name}
          />
        </div>
        <div className={styles.metadata}>
          <p className={styles.name}>{product.name}</p>
          <p className={styles.price}>
            &#8358; {product?.price.toLocaleString('en-Us')}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default HomeProductCard
