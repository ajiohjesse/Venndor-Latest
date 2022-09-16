import styles from "../styles/MenuCategories.module.css";
import Image from "next/image";
import Router from "next/router";
import { categories } from "../lib/selections";

const MenuCategories = ({ setMenuOpen }) => {
  return (
    <ul className={styles.menu}>
      <h2>Categories</h2>
      {categories.map((category, i) => (
        <li
          key={i}
          onClick={() => {
            Router.push(`/category/${category.slug}`);
            setMenuOpen(false);
          }}
        >
          <div>
            <span className={styles.itemIcon} data-name="marketplace">
              <Image
                src={category.image}
                layout="fill"
                objectPosition="center"
                objectFit="cover"
                alt="category"
              />
            </span>
            <span className={styles.itemName}>{category.title}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MenuCategories;
