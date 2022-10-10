import styles from '../../styles/pageStyles/MyOrders.module.css'
import CompletedOrder from '../../components/CompletedOrder'
import { useContext, useEffect, useState } from 'react'
import Button from '../../components/ui/Button'
import StorePendingOrder from '../../components/StorePendingOrder'
import { AuthContext } from '../../context/AuthContext'
import { useLazyQuery } from '@apollo/client'
import {
  GET_STORE_ORDERS,
  GET_TOTAL_STORE_ORDERS,
} from '../../graphql/queries/orderQueries'
import Spinner from '../../components/ui/Spinner'

const StoreOrders = () => {
  const [tab, setTab] = useState('pending')
  const [data, setData] = useState([])

  /**
   * The below state is a hack for refrshing
   * the queries each time an order is deleted.
   */
  const [refetch, setRefetch] = useState(1)

  const [pageSize, setPageSize] = useState('')
  const [totalPages, setTotalPages] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(10)

  const { user: username } = useContext(AuthContext)

  const [getStoreOrders, { loading, error }] = useLazyQuery(GET_STORE_ORDERS)

  const [getPageSize] = useLazyQuery(GET_TOTAL_STORE_ORDERS)

  useEffect(() => {
    const get = async () => {
      await getStoreOrders({
        variables: {
          username,
          status: tab,
          first: productsPerPage,
          skip: currentPage * productsPerPage - productsPerPage,
        },
        fetchPolicy: 'network-only',
      })
        .then(({ data }) => {
          setData(data)
        })
        .catch((err) => console.log(JSON.stringify(err, null, 2)))

      //get page size
      await getPageSize({
        variables: { username, status: tab },
        fetchPolicy: 'network-only',
      }).then(({ data }) => {
        setPageSize(data.ordersConnection.aggregate.count)

        setTotalPages(
          Math.ceil(data.ordersConnection.aggregate.count / productsPerPage),
        )
      })
    }

    get()
  }, [currentPage, tab, refetch])

  const handleClick = (e) => {
    setTab(e.target.id)
    setCurrentPage(1)
  }

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

  if (error) return <p>Something Went Wrong.</p>

  return (
    <div className={styles.listed}>
      <h2 className={styles.pageTitle}>Client Orders:</h2>

      <div className={styles.filter}>
        <h2>Filter by:</h2>
        <div className={styles.buttons}>
          <Button
            color={tab !== 'pending' ? 'text' : 'warning'}
            id="pending"
            onClick={handleClick}
          >
            Pending
          </Button>
          <Button
            color={tab !== 'processing' ? 'text' : 'violet'}
            id="processing"
            onClick={handleClick}
          >
            Processing
          </Button>
          <Button
            color={tab !== 'completed' ? 'text' : 'success'}
            id="completed"
            onClick={handleClick}
          >
            Completed
          </Button>
        </div>
      </div>

      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '4rem',
          }}
        >
          <Spinner />
        </div>
      ) : (
        data.orders && (
          <>
            {tab === 'pending' && (
              <div className={styles.wrapper}>
                <div className={styles.heading}>
                  <h2>
                    <span
                      className={styles.colorIcon}
                      data-name="pendingOrders"
                    ></span>
                    Pending Orders: <span>{pageSize}</span>
                  </h2>
                </div>
                <div className={styles.container}>
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
                        disabled={
                          currentPage === totalPages || totalPages === 0
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className={styles.column}>
                    {data.orders
                      .filter((order) => order['order_status'] === 'pending')
                      .map((order, i) => (
                        <StorePendingOrder
                          key={i}
                          order={order}
                          refetch={refetch}
                          setRefetch={setRefetch}
                          tab={tab}
                        />
                      ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'processing' && (
              <div className={styles.wrapper}>
                <div className={styles.heading}>
                  <h2>
                    <span
                      className={styles.colorIcon}
                      data-name="processingOrders"
                    ></span>
                    Processing Orders: <span>{pageSize}</span>
                  </h2>
                </div>
                <div className={styles.container}>
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
                        disabled={
                          currentPage === totalPages || totalPages === 0
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className={styles.column}>
                    {data.orders
                      .filter((order) => order['order_status'] === 'processing')
                      .map((order, i) => (
                        <StorePendingOrder
                          key={i}
                          order={order}
                          refetch={refetch}
                          setRefetch={setRefetch}
                          tab={tab}
                        />
                      ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'completed' && (
              <div className={styles.wrapper}>
                <div className={styles.heading}>
                  <h2>
                    <span
                      className={styles.colorIcon}
                      data-name="completedOrders"
                    ></span>
                    Completed Orders: <span>{pageSize}</span>
                  </h2>
                </div>
                <div className={styles.container}>
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
                        disabled={
                          currentPage === totalPages || totalPages === 0
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className={styles.column}>
                    {data.orders
                      .filter((order) => order['order_status'] === 'completed')
                      .map((order, i) => (
                        <CompletedOrder key={i} order={order} type="store" />
                      ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )
      )}
    </div>
  )
}

export default StoreOrders
