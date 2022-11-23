import styles from '../styles/Featured.module.css'
import product1 from '../public/images/shoe.jpg'
import product2 from '../public/images/bags.jpg'
import slide1 from '../public/images/clothes.jpg'
import slide2 from '../public/images/shirts.jpg'
import slide3 from '../public/images/buysell.jpg'
import Image from 'next/image'
import Slider from '../lib/Slider'
import { useEffect, useState } from 'react'
import FeaturedStore from './FeaturedStore'
import { GET_ALL_STORES } from '../graphql/queries/storeQueries'
import { useQuery } from '@apollo/client'

const Featured = () => {
  const { data } = useQuery(GET_ALL_STORES)

  useEffect(() => {
    const slider = new Slider('featuredSlider')
    slider.play()
  }, [])

  const slides = [
    {
      Image: slide1,
    },
    {
      Image: slide2,
    },
    {
      Image: product1,
    },
    {
      Image: slide3,
    },
  ]

  return (
    <div className={styles.featured}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.slider} id="featuredSlider">
            {slides.map((slide, index) => (
              <div className={['slide', styles.slide].join(' ')} key={index}>
                <Image
                  src={slide.Image}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  placeholder="blur"
                  alt="Venndor"
                />
                <div className={styles.slideFilter}></div>
                <div className={styles.slideText}>
                  <h1>Venndor.</h1>
                  <p>The online marketplace.</p>
                  <h3>BUY. SELL. EXPLORE.</h3>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.stores}>
            <h3 className={styles.storeHeading}>Featured Stores</h3>

            <div className={styles.storeGrid}>
              {data &&
                data.stores
                  .slice(0, 6)
                  .map((store, index) => (
                    <FeaturedStore store={store} key={index} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
