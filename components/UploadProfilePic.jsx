import styles from '../styles/UploadImg.module.css'
import Image from 'next/image'
import { useRef, useState } from 'react'
import Button from './ui/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import Spinner from './ui/Spinner'
import { useMutation, useQuery } from '@apollo/client'
import {
  DELETE_ASSET,
  PUBLISH_ASSET,
  UPDATE_ASSET,
} from '../graphql/mutations/AssetMutations'
import { GET_CURRENT_USER, GET_USER_IMG } from '../graphql/queries/userQueries'
import toast from 'react-hot-toast'
import { PUBLISH_ACCOUNT } from '../graphql/mutations/userMutations'

const UploadProfilePic = ({ username, metadata, imageId }) => {
  const [src, setSrc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [formIsDirty, setFormIsDirty] = useState(true)

  const cancelBtn = useRef()

  const { data } = useQuery(GET_USER_IMG, {
    variables: { username },
  })

  /**
   * Asset mutations
   */
  const [publishAsset] = useMutation(PUBLISH_ASSET)
  const [updateAsset] = useMutation(UPDATE_ASSET)
  const [deleteAsset] = useMutation(DELETE_ASSET)
  const [publishAccount] = useMutation(PUBLISH_ACCOUNT, {
    refetchQueries: [{ query: GET_CURRENT_USER, variables: { username } }],
  })

  /**
   * uploading the user profile picture
   */

  const handleImageChange = (e) => {
    setSrc(null)
    setUploadError('')

    if (e.target.files.length > 0) {
      if (!e.target.files[0].type.includes('image')) {
        return setUploadError('Selected file is not an image.')
      }

      setFormIsDirty(false)

      const reader = new FileReader()

      reader.onload = (e) => {
        setSrc(e.target.result)
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleUploadImage = async (e) => {
    e.preventDefault()

    if (formIsDirty) {
      return
    }

    const form = e.target

    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    )

    const formData = new FormData()

    formData.append('fileUpload', fileInput.files[0])

    setLoading(true)

    await fetch(process.env.HYGRAPH_ASSET_API, {
      method: 'POST',
      headers: {
        Authorization: process.env.HYGRAPH_ASSET_TOKEN,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(async (data) => {
        // delete previous user asset if one exists
        if (imageId) {
          await deleteAsset({
            variables: { id: imageId },
          })
        }

        //Attach uploaded asset to user
        await updateAsset({
          variables: { id: data.id, username, filename: metadata },
        })

        //publish asset
        await publishAsset({ variables: { id: data.id } })

        //publish user account
        await publishAccount({ variables: { username } }).then(() => {
          toast.success('Uploaded')
          cancelBtn.current.click()
        })
      })
      .catch((err) => console.log(JSON.stringify(err, null, 2)))
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      {isOpen ? (
        <>
          {src && (
            <div className={styles.preview}>
              <Image src={src} width="100px" height="100px" objectFit="cover" />
            </div>
          )}
          <div className={styles.fileUpload}>
            {uploadError && <p className={styles.error}>{uploadError}</p>}
            <form
              onChange={handleImageChange}
              onSubmit={handleUploadImage}
              encType="multipart/form-data"
            >
              <input type="file" name="file" accept="image/*" />
              <Button type="submit" disabled={loading || formIsDirty}>
                {loading ? (
                  <>
                    <Spinner size="sm" /> Uploading. . .
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCamera} />
                    Upload
                  </>
                )}
              </Button>
              <button
                type="reset"
                ref={cancelBtn}
                onClick={() => {
                  setIsOpen(false)
                  setSrc(null)
                  setUploadError('')
                  setFormIsDirty(true)
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </>
      ) : (
        <Button type="reset" onClick={() => setIsOpen(true)} color="text">
          <FontAwesomeIcon icon={faCamera} />
          Upload Image
        </Button>
      )}
    </>
  )
}

export default UploadProfilePic
