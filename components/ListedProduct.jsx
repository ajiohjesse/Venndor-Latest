import styles from '../styles/ListedProduct.module.css'
import {
  faEye,
  faTrash,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useState } from 'react'
import Spinner from './ui/Spinner'
import Router from 'next/router'
import { DELETE_PRODUCT } from '../graphql/mutations/productMutations'
import { useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

const ListedProduct = ({ product, refetch }) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [productLoading, setProductLoading] = useState(false)

  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT, {
    variables: {
      productId: product.id,
      storeId: product.store.id,
      imageId: product.image.id,
    },
  })

  const handleDeleteProduct = async () => {
    const loadingToast = toast.loading('Deleting. . .')

    await deleteProduct()
      .then(() => {
        toast.remove(loadingToast)
        toast.success('Deleted.')

        refetch()
      })
      .catch((err) => {
        toast.dismiss()
        console.log('Delete Product Error:', JSON.stringify(err, null, 2))
      })
  }

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
          <span>Category: </span>
          <span className={styles.category}>{product.category}</span>
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

          <button
            className={styles.delete}
            onClick={() => setDeleteModal(true)}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className={styles.buttonTitle}>Delete</span>
          </button>
          {deleteModal && (
            <div className={styles.deleteModal}>
              <p>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className={styles.warning}
                />
                This product will be deleted!
              </p>
              <p>Confirm Delete?</p>
              <div className={styles.confirmDelete}>
                <button onClick={handleDeleteProduct} disabled={loading}>
                  Yes
                </button>
                <button onClick={() => setDeleteModal(false)}>No</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListedProduct
