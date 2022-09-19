import styles from '../styles/Nav.module.css'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Router from 'next/router'
import logoIcon from '../public/images/venndor.svg'
import userAvatar from '../public/images/userAvatar.jpg'
import Input from './ui/Input'
import Button from './ui/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faClose,
  faMagnifyingGlass,
  faSignIn,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import NavMenu from './NavMenu'
import MenuCategories from './MenuCategories'
import { AuthContext } from '../context/AuthContext'
const ThemeToggler = dynamic(() => import('../components/ui/ThemeToggler'), {
  ssr: false,
})

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const { user: username } = useContext(AuthContext)

  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(username)
  }, [username])

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <aside
          className={
            menuOpen ? [styles.aside, styles.active].join(' ') : styles.aside
          }
        >
          <div className={styles.asideContainer}>
            <div className={styles.logo}>
              <span
                className={styles.logoIcon}
                onClick={() => Router.push('/')}
              >
                <Image
                  src={logoIcon}
                  alt="Venndor-Logo"
                  layout="fill"
                  objectFit="contain"
                />
              </span>
              <h1>Venndor.</h1>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                id={styles.logoCloseBtn}
                title="Close menu"
              >
                <FontAwesomeIcon icon={faClose} className={styles.menuBars} />
              </button>
            </div>

            <div className={styles.asideScroll}>
              <div>
                <NavMenu setMenuOpen={setMenuOpen} />

                <MenuCategories setMenuOpen={setMenuOpen} />
              </div>
            </div>
          </div>
        </aside>

        {/* displays only on smaller screens */}
        <div className={styles.logo} id={styles.logo2}>
          <span className={styles.logoIcon} onClick={() => Router.push('/')}>
            <Image
              src={logoIcon}
              alt="Venndor-Logo"
              layout="fill"
              objectFit="contain"
            />
          </span>
          <h1>Venndor.</h1>
        </div>

        <div className={styles.search}>
          <Input placeholder="Search product. . ." />
          <Button title="Search products">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span>Search</span>
          </Button>
        </div>

        <ThemeToggler />

        <div className={styles.info}>
          {user !== null ? (
            <div className={styles.user}>
              <span className={styles.userImg}>
                <Image
                  src={userAvatar}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="profile"
                />
              </span>
              <div className={styles.userDetails}>
                <h2>rehxofficial</h2>
                <Link href="/dashboard/profile">View profile</Link>
              </div>
            </div>
          ) : (
            <div className={styles.buttons}>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
            </div>
          )}
        </div>

        {/* displays only on smaller screens */}
        <div className={styles.info} id={styles.info2}>
          <div className={styles.navIcons}>
            <button onClick={() => setMenuOpen(!menuOpen)} title="Menu">
              {menuOpen ? (
                <FontAwesomeIcon icon={faClose} className={styles.menuBars} />
              ) : (
                <FontAwesomeIcon icon={faBars} className={styles.menuBars} />
              )}
            </button>
            {user ? (
              <button
                onClick={() => Router.push('/dashboard/profile')}
                title="View Profile"
              >
                <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
              </button>
            ) : (
              <button
                onClick={() => Router.push('/auth/login')}
                title="Sign In"
              >
                <FontAwesomeIcon icon={faSignIn} className={styles.userIcon} />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
