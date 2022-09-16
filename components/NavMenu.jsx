import styles from "../styles/NavMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStore } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import { useEffect, useState } from "react";

const NavMenu = ({ setMenuOpen }) => {
  return (
    <ul className={styles.menu}>
      <h2>Menu</h2>
      <li
        data-id="home"
        onClick={() => {
          Router.push("/");
          setMenuOpen(false);
        }}
      >
        <div>
          <span className={styles.itemIcon} data-name="marketplace">
            <FontAwesomeIcon icon={faStore} className={styles.menuIcon} />
          </span>
          <span className={styles.itemName}>Marketplace</span>
        </div>
      </li>
      <li
        data-id="products"
        onClick={() => {
          Router.push("/search/products");
          setMenuOpen(false);
        }}
      >
        <div>
          <span className={styles.itemIcon} data-name="product">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={styles.menuIcon}
            />
          </span>
          <span className={styles.itemName}>Search products</span>
        </div>
      </li>
      <li
        data-id="stores"
        onClick={() => {
          Router.push("/search/stores");
          setMenuOpen(false);
        }}
      >
        <div>
          <span className={styles.itemIcon} data-name="store">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={styles.menuIcon}
            />
          </span>
          <span className={styles.itemName}>Search stores</span>
        </div>
      </li>
    </ul>
  );
};

export default NavMenu;
