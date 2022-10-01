import styles from '../../../styles/pageStyles/MyOrders.module.css'
import Spinner from '../../../components/ui/Spinner'
import ProductCard from '../../../components/ProductCard'
import Button from '../../../components/ui/Button'
import { useEffect, useState } from 'react'
import {
  GET_STORE_PRODUCTS,
  GET_TOTAL_LISTED_PRODUCTS,
} from '../../../graphql/queries/productQueries'
import { useLazyQuery } from '@apollo/client'
import SkeletonCard from '../../../components/SkeletonCard'
import Router from 'next/router'

const AllStoreProducts = ({ storeId }) => {
  const [products, setProducts] = useState([])
  const [store, setStore] = useState({})
  const [pageSize, setPageSize] = useState('')
  const [totalPages, setTotalPages] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(6)

  const [getProducts, { loading }] = useLazyQuery(GET_STORE_PRODUCTS)

  const [getPageSize] = useLazyQuery(GET_TOTAL_LISTED_PRODUCTS)

  useEffect(() => {
    const get = async () => {
      await getProducts({
        variables: {
          storeId,
          first: productsPerPage,
          skip: currentPage * productsPerPage - productsPerPage,
        },
      })
        .then(({ data: productData }) => {
          setProducts(productData.products)
          setStore(productData.products[0].store)
        })
        .catch((err) => console.log(err))

      //get page size
      await getPageSize({
        variables: { storeId },
      }).then(({ data }) => {
        setPageSize(data.productsConnection.aggregate.count)

        setTotalPages(
          Math.ceil(data.productsConnection.aggregate.count / productsPerPage),
        )
      })
    }

    get()
  }, [currentPage])

  const paginate = (type) => {
    if (type === 'next') {
      setCurrentPage((prev) => prev + 1)
    } else {
      if (currentPage === 1) {
        return
      }
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <div className={styles.listed}>
      <h2 className={styles.storeName}>
        Store Name: <span>{store.name}</span>
      </h2>
      <h2 className={styles.pageTitle}>All Products:</h2>

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.column}>
            {!loading && products && (
              <div className={styles.pagination}>
                <span className={styles.pageCount}>
                  Page: {currentPage} / {totalPages}
                </span>
                <div className={styles.paginationBtns}>
                  <button
                    onClick={() => paginate('prev')}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => paginate('next')}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {loading
              ? Array(6)
                  .fill(null)
                  .map((_, i) => <SkeletonCard key={i} />)
              : products.map((product, i) => (
                  <ProductCard product={product} key={i} />
                ))}

            {!loading && products && (
              <div className={styles.pagination}>
                <span className={styles.pageCount}>
                  Page: {currentPage} / {totalPages}
                </span>
                <div className={styles.paginationBtns}>
                  <button
                    onClick={() => paginate('prev')}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => paginate('next')}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <Button color="text" onClick={() => Router.push(`/store/${store.id}`)}>
          Store Profile
        </Button>
      </div>
    </div>
  )
}

export default AllStoreProducts

export const getServerSideProps = async ({ params }) => {
  const storeId = params.id

  return {
    props: {
      storeId,
    },
  }
}
