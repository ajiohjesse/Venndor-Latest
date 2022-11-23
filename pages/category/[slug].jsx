import ProductCard from '../../components/ProductCard'
import styles from '../../styles/pageStyles/Category.module.css'
import client from '../../apollo-client'
import { GET_PRODUCT_BY_CATEGORY } from '../../graphql/queries/productQueries'
import HomepageProducts from '../../components/homepageProducts/HomepageProducts'

const Category = ({ products }) => {
  console.log(products)
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          <span>Categories</span> / <span>Male Fashion</span>
        </h1>

        {products === null || products.length > 0 ? (
          <HomepageProducts products={products} />
        ) : (
          <h2>No product available</h2>
        )}
      </div>
    </div>
  )
}

export default Category

export const getServerSideProps = async ({ params }) => {
  let products = null

  try {
    const { data } = await client.query({
      query: GET_PRODUCT_BY_CATEGORY,
      variables: {
        category: params.slug,
      },
    })

    products = data.products
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      products: products,
    },
  }
}
