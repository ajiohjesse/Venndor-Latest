import styles from "../styles/Featured.module.css";
import product1 from "../public/images/shoe.jpg";
import product2 from "../public/images/bags.jpg";
import slide1 from "../public/images/clothes.jpg";
import slide2 from "../public/images/shirts.jpg";
import slide3 from "../public/images/buysell.jpg";
import Image from "next/image";
import Slider from "../lib/Slider";
import { useEffect, useState } from "react";
import FeaturedStore from "./FeaturedStore";

const Featured = () => {
  useEffect(() => {
    const slider = new Slider("featuredSlider");
    slider.play();
  }, []);

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
  ];

  const stores = [
    {
      image: product1,
      title: "Rehx Stores",
      rating: 4,
      slug: "store",
    },
    {
      image: product2,
      title: "Carzily long title for a store",
      rating: 3.5,
      slug: "store",
    },
    {
      image: product1,
      title: "Another crazily long name that should not be written",
      rating: 2,
      slug: "store",
    },
    {
      image: product2,
      title: "Rehx Stores",
      rating: 5,
      slug: "store",
    },
    {
      image: product1,
      title: "Rehx Stores",
      rating: 4,
      slug: "store",
    },
    {
      image: product1,
      title: "Rehx Stores",
      rating: 2.5,
      slug: "store",
    },
  ];

  return (
    <div className={styles.featured}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.slider} id="featuredSlider">
            {slides.map((slide, index) => (
              <div className={["slide", styles.slide].join(" ")} key={index}>
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
              {stores.map((store, index) => (
                <FeaturedStore store={store} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
