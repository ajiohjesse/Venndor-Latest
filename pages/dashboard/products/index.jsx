import styles from '../../../styles/pageStyles/MyOrders.module.css'
import ListedProduct from '../../../components/ListedProduct'
import Router from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Spinner from '../../../components/ui/Spinner'
import { AuthContext } from '../../../context/AuthContext'
import { GET_STORE_PRODUCTS } from '../../../graphql/queries/productQueries'
import { GET_CURRENT_USER } from '../../../graphql/queries/userQueries'
import { useLazyQuery, useQuery } from '@apollo/client'
import ClientOnly from '../../../components/ClientOnly'

const Products = () => {
  const [createLoading, setCreateLoading] = useState(false)
  const [products, setProducts] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(5)

  const { user: username } = useContext(AuthContext)

  const [getUser] = useLazyQuery(GET_CURRENT_USER, {
    variables: { username },
  })

  const [getProducts, { loading }] = useLazyQuery(GET_STORE_PRODUCTS)

  useEffect(() => {
    const get = async () => {
      await getUser().then(async ({ data }) => {
        await getProducts({
          variables: {
            storeId: data.account.store.id,
            first: productsPerPage,
            skip: currentPage * productsPerPage - productsPerPage,
          },
        })
          .then(({ data: productData }) => {
            setProducts(productData.products)
          })
          .catch((err) => console.log(err))
      })
    }

    get()
  }, [currentPage])

  return (
    <div className={styles.listed}>
      <div className={styles.listProductWrapper}>
        <div className={styles.listProduct}>
          <button
            disabled={createLoading}
            onClick={() => {
              setCreateLoading(true)
              Router.push('/dashboard/products/create')
            }}
          >
            {createLoading ? (
              <>
                <Spinner size="sm" /> Loading
              </>
            ) : (
              'Add new listing'
            )}
          </button>
        </div>
      </div>

      <h2 className={styles.pageTitle}>Products you listed:</h2>

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.column}>
            <ClientOnly />
            {loading ? (
              <div style={{ display: 'grid', placeItems: 'center' }}>
                <Spinner />
              </div>
            ) : (
              products.map((product, i) => (
                <ListedProduct key={i} product={product} />
              ))
            )}
          </div>
          <div className={styles.paginate}></div>
        </div>
      </div>
    </div>
  )
}

export default Products
