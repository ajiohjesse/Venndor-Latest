import styles from "../styles/MenuCategories.module.css";
import Image from "next/image";
import product from "../public/images/shoe.jpg";

const MenuCategories = ({ setMenuOpen }) => {
  const categories = [
    {
      title: "Art",
      image: product,
      slug: "all",
    },
    {
      title: "Computing",
      image: product,
      slug: "all",
    },
    {
      title: "Electronics",
      image: product,
      slug: "all",
    },
    {
      title: "Phones & Tablets",
      image: product,
      slug: "all",
    },
    {
      title: "Mobile Accessories",
      image: product,
      slug: "all",
    },
    {
      title: "Groceries",
      image: product,
      slug: "all",
    },
    {
      title: "Food & Beverages",
      image: product,
      slug: "all",
    },
    {
      title: "Household",
      image: product,
      slug: "all",
    },
    {
      title: "Male Fashion",
      image: product,
      slug: "all",
    },
    {
      title: "Female Fashion",
      image: product,
      slug: "all",
    },
    {
      title: "Unisex Fashion",
      image: product,
      slug: "all",
    },
    {
      title: "Shoes & Footwear",
      image: product,
      slug: "all",
    },
    {
      title: "Jewelry",
      image: product,
      slug: "all",
    },
    {
      title: "Kids Corner",
      image: product,
      slug: "all",
    },
    {
      title: "Sporting Goods",
      image: product,
      slug: "all",
    },
    {
      title: "Health & Beauty",
      image: product,
      slug: "all",
    },
    {
      title: "Services",
      image: product,
      slug: "all",
    },
    {
      title: "Others",
      image: product,
      slug: "all",
    },
  ];

  return (
    <ul className={styles.menu}>
      <h2>Categories</h2>
      {categories.map((category, i) => (
        <li
          key={i}
          onClick={() => {
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
