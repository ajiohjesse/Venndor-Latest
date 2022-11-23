import styles from '../styles/FeaturedStore.module.css'
import { stringLength } from '../lib/stringLength'
import LoadingImage from './ui/LoadingImage'
import Spinner from './ui/Spinner'
import storeAvatar from '../public/images/storeAvatar.jpg'
import { useState } from 'react'
import Image from 'next/image'
import Router from 'next/router'

const FeaturedStore = ({ store }) => {
  const [storeLoading, setStoreLoading] = useState(false)

  return (
    <div
      className={styles.store}
      onClick={() => {
        setStoreLoading(true)
        Router.push(`/store/${store.id}`)
      }}
    >
      <div className={styles.storeImg}>
        {storeLoading && (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
        <Image
          src={store.avatar ? store.avatar.url : storeAvatar}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <LoadingImage />
      </div>

      <h4>{stringLength(store.name, 12)}</h4>
    </div>
  )
}

export default FeaturedStore
