import styles from '../styles/RecentlyAdded.module.css'
import ProductCard from '../components/ProductCard'
import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import {
  GET_ALL_PRODUCTS,
  GET_TOTAL_PRODUCTS,
} from '../graphql/queries/productQueries'
import SkeletonCard from './SkeletonCard'
import Input from '../components/ui/Input'
import HomepageProducts from './homepageProducts/HomepageProducts'

const RecentlyAdded = () => {
  const [products, setProducts] = useState([])
  const [pageSize, setPageSize] = useState('')
  const [totalPages, setTotalPages] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(18)

  const [getProducts, { loading }] = useLazyQuery(GET_ALL_PRODUCTS, {
    fetchPolicy: 'network-only',
  })

  const [getPageSize] = useLazyQuery(GET_TOTAL_PRODUCTS, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    const get = async () => {
      await getProducts({
        variables: {
          first: productsPerPage,
          skip: currentPage * productsPerPage - productsPerPage,
        },
      })
        .then(({ data: productData }) => {
          setProducts(productData.products)
        })
        .catch((err) => console.log(err))

      //get page size
      await getPageSize().then(({ data }) => {
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

  const handlePageInput = (e) => {
    if (+e.target.value > totalPages) {
      return setCurrentPage(totalPages)
    }

    if (+e.target.value < 1) {
      return setCurrentPage(1)
    }
    setCurrentPage(+e.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.heading}>Recently Added</div>

        {/* <div className={styles.paginationWrapper}>
          <div className={styles.paginationInput}>
            <Input
              type="number"
              label="Jump to page:"
              min={1}
              max={totalPages}
              onChange={handlePageInput}
            />
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
        </div> */}

        {/* <div className={styles.grid}>
          <div className={styles.column}>
            {loading
              ? Array(9)
                  .fill(null)
                  .map((_, i) => <SkeletonCard key={i} />)
              : products
                  .slice(0, 8)
                  .map((product, i) => (
                    <ProductCard product={product} key={i} />
                  ))}
          </div>
          <div className={styles.column}>
            {loading
              ? Array(9)
                  .fill(null)
                  .map((_, i) => <SkeletonCard key={i} />)
              : products
                  .slice(9, 17)
                  .map((product, i) => (
                    <ProductCard product={product} key={i} />
                  ))}
          </div>
        </div> */}

        <HomepageProducts products={products} />

        <div>
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
    </div>
  )
}

export default RecentlyAdded
