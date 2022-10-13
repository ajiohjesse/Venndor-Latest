import styles from '../../styles/pageStyles/Profile.module.css'
import Image from 'next/image'
import storeAvatar from '../../public/images/storeAvatar.jpg'
import userAvatar from '../../public/images/userAvatar.jpg'
import LoadingImage from '../../components/ui/LoadingImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import {
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa'
import Button from '../../components/ui/Button'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Router from 'next/router'
import Spinner from '../../components/ui/Spinner'
import client from '../../apollo-client'
import { GET_USER } from '../../graphql/queries/userQueries'
import PageNotFound from '../../components/PageNotFound'

const User = ({ user }) => {
  const [profileLoading, setProfileLoading] = useState(false)

  if (!user) return <PageNotFound />

  return (
    <div className={styles.profile}>
      <div className={[styles.container, styles.store].join(' ')}>
        <div className={styles.detailsCol}>
          <h2 className={styles.heading}>Profile</h2>

          <div className={styles.metadata}>
            <div className={styles.profilePicture}>
              <Image
                src={user.avatar ? user.avatar.url : userAvatar}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt={`${user.firstname} ${user.lastname}`}
              />
              <LoadingImage />
            </div>
            <h3 className={styles.fullname}>
              {user.firstname} {user.lastname}
            </h3>
            <p className={styles.username}>{user.username}</p>
          </div>

          <div className={styles.bio}>
            <p>{user.bio}</p>
          </div>

          <div className={styles.linkProfile}>
            <h3>Profile Link</h3>
            <div className={styles.profileLink}>
              <p>
                https://{process.env.DOMAIN}/user/{user.username}
              </p>
              <span>
                <FontAwesomeIcon
                  icon={faCopy}
                  className={styles.copyIcon}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://${process.env.DOMAIN}/user/${user.username}}`,
                    )

                    toast.success('Link Copied to clipboard')
                  }}
                />
                <FontAwesomeIcon
                  icon={faShareNodes}
                  className={styles.copyIcon}
                  onClick={() => {
                    navigator.share({
                      title: `${user.firstname} ${user.lastname}`,
                      text: 'Hi, checkout my Venndor profile.',
                      url: `https://${process.env.DOMAIN}/user/${user.username}`,
                    })
                  }}
                />
              </span>
            </div>
          </div>

          <div className={styles.contact}>
            <h3>Contact</h3>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>
                    <FaEnvelope />
                    Email:
                  </td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>
                    <FaPhone />
                    Phone:
                  </td>
                  <td>{user.phone}</td>
                </tr>
                {user.facebook && (
                  <tr>
                    <td>
                      <FaFacebook />
                      Facebook:
                    </td>
                    <td>
                      <a href={user.facebook} target="_blank" rel="noreferrer">
                        {user.facebook}
                      </a>
                    </td>
                  </tr>
                )}
                {user.instagram && (
                  <tr>
                    <td>
                      <FaInstagram />
                      Instagram:
                    </td>
                    <td>
                      <a href={user.instagram} target="_blank" rel="noreferrer">
                        {user.instagram}
                      </a>
                    </td>
                  </tr>
                )}
                {user.twitter && (
                  <tr>
                    <td>
                      <FaTwitter />
                      Twitter:
                    </td>
                    <td>
                      <a href={user.twitter} target="_blank" rel="noreferrer">
                        {user.twitter}
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {user.store && (
            <div className={styles.ownerWrapper}>
              <h2 className={styles.heading}>Store</h2>
              <div className={styles.storeOwner}>
                <div className={styles.profilePicture}>
                  <Image
                    src={
                      user.store.avatar ? user.store.avatar.url : storeAvatar
                    }
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={user.store.name}
                  />
                  <LoadingImage />
                </div>
                <div className={styles.ownerDetails}>
                  <h3>{user.store.name}</h3>
                  <p className={styles.primary}>{user.store.tagline}</p>
                  <p>
                    <span>Location:</span> {user.store.state}{' '}
                    {user.store.district && (
                      <span>/ {user.store.district}</span>
                    )}
                  </p>
                </div>
              </div>
              <Button
                color="text"
                disabled={profileLoading}
                onClick={() => {
                  Router.push(`/store/${user.store.id}`)
                  setProfileLoading(true)
                }}
              >
                {profileLoading ? (
                  <>
                    <Spinner size="sm" /> Loading
                  </>
                ) : (
                  'View Store'
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default User

export const getServerSideProps = async ({ params }) => {
  const username = params.username

  const { data } = await client.query({
    query: GET_USER,
    variables: { username },
  })

  return {
    props: {
      user: data.account,
    },
  }
}
