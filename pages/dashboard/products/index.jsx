import styles from '../../../styles/pageStyles/MyOrders.module.css'
import ListedProduct from '../../../components/ListedProduct'
import Router from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Spinner from '../../../components/ui/Spinner'
import { AuthContext } from '../../../context/AuthContext'
import {
  GET_STORE_PRODUCTS,
  GET_TOTAL_LISTED_PRODUCTS,
} from '../../../graphql/queries/productQueries'
import { GET_CURRENT_USER } from '../../../graphql/queries/userQueries'
import { useLazyQuery, useQuery } from '@apollo/client'
import ClientOnly from '../../../components/ClientOnly'
import SkeletonCard from '../../../components/SkeletonCard'

const Products = () => {
  const [createLoading, setCreateLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [pageSize, setPageSize] = useState('')
  const [totalPages, setTotalPages] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(6)

  /**
   * the following state is for triggering
   * a refetch of the products and the boolean
   * value doesnt really matter.
   */
  const [shouldRefetch, setShouldRefetch] = useState(true)
  const refetch = () => {
    setShouldRefetch(!shouldRefetch)
  }

  const { user: username } = useContext(AuthContext)

  const [getUser] = useLazyQuery(GET_CURRENT_USER, {
    variables: { username },
  })

  const [getProducts, { loading }] = useLazyQuery(GET_STORE_PRODUCTS, {
    fetchPolicy: 'network-only',
  })

  const [getPageSize] = useLazyQuery(GET_TOTAL_LISTED_PRODUCTS, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    const get = async () => {
      await getUser().then(async ({ data }) => {
        await getProducts({
          variables: {
            storeId: data?.account.store.id,
            first: productsPerPage,
            skip: currentPage * productsPerPage - productsPerPage,
          },
        })
          .then(({ data: productData }) => {
            setProducts(productData.products)
          })
          .catch((err) => console.log(err))

        //get page size
        await getPageSize({
          variables: { storeId: data?.account.store.id },
        }).then(({ data }) => {
          setPageSize(data.productsConnection.aggregate.count)

          setTotalPages(
            Math.ceil(
              data.productsConnection.aggregate.count / productsPerPage,
            ),
          )
        })
      })
    }

    get()
  }, [currentPage, shouldRefetch])

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

      <h2 className={styles.pageTitle}>
        Products you listed:{' '}
        <span style={{ color: 'var(--primary)' }}>{pageSize}</span>
      </h2>
      <ClientOnly>
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
                    <ListedProduct
                      key={i}
                      product={product}
                      refetch={refetch}
                    />
                  ))}
            </div>
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
      </ClientOnly>
    </div>
  )
}

export default Products
