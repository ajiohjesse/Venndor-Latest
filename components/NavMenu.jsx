import styles from '../styles/NavMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCartShopping,
  faLink,
  faMagnifyingGlass,
  faShippingFast,
  faStore,
} from '@fortawesome/free-solid-svg-icons'
import Router from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import ClientOnly from './ClientOnly'

const NavMenu = ({ setMenuOpen }) => {
  const { user } = useContext(AuthContext)

  return (
    <ul className={styles.menu}>
      <h2>Menu</h2>
      <li
        data-id="home"
        onClick={() => {
          Router.push('/')
          setMenuOpen(false)
        }}
      >
        <div>
          <span className={styles.itemIcon} data-name="marketplace">
            <FontAwesomeIcon
              icon={faCartShopping}
              className={styles.menuIcon}
            />
          </span>
          <span className={styles.itemName}>Marketplace</span>
        </div>
      </li>
      <li
        data-id="products"
        onClick={() => {
          Router.push('/search/products')
          setMenuOpen(false)
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
          Router.push('/search/stores')
          setMenuOpen(false)
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
      <ClientOnly>
        {user && (
          <>
            <li
              data-id="stores"
              onClick={() => {
                Router.push('/dashboard/myStore')
                setMenuOpen(false)
              }}
            >
              <div>
                <span className={styles.itemIcon} data-name="marketplace">
                  <FontAwesomeIcon icon={faStore} className={styles.menuIcon} />
                </span>
                <span className={styles.itemName}>My Store</span>
              </div>
            </li>

            <li
              data-id="stores"
              onClick={() => {
                Router.push('/dashboard/storeOrders')
                setMenuOpen(false)
              }}
            >
              <div>
                <span className={styles.itemIcon} data-name="marketplace">
                  <FontAwesomeIcon
                    icon={faShippingFast}
                    className={styles.menuIcon}
                  />
                </span>
                <span className={styles.itemName}>Store Orders</span>
              </div>
            </li>

            <li
              data-id="stores"
              onClick={() => {
                Router.push('/dashboard/myOrders')
                setMenuOpen(false)
              }}
            >
              <div>
                <span className={styles.itemIcon} data-name="marketplace">
                  <FontAwesomeIcon icon={faLink} className={styles.menuIcon} />
                </span>
                <span className={styles.itemName}>My Orders</span>
              </div>
            </li>
          </>
        )}
      </ClientOnly>
    </ul>
  )
}

export default NavMenu
