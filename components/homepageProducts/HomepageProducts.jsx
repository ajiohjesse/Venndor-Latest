import HomeProductCard from '../homeProductCard/HomeProductCard'
import styles from './HomepageProducts.module.css'

const HomepageProducts = ({ products }) => {
  return (
    <div className={styles.grid}>
      {products.map((product, i) => (
        <HomeProductCard product={product} key={i} />
      ))}
    </div>
  )
}

export default HomepageProducts
