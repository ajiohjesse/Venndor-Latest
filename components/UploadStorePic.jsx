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
  UPDATE_STORE_IMAGE,
} from '../graphql/mutations/AssetMutations'
import { GET_CURRENT_USER, GET_USER_IMG } from '../graphql/queries/userQueries'
import toast from 'react-hot-toast'
import { PUBLISH_ACCOUNT } from '../graphql/mutations/userMutations'
import { PUBLISH_STORE } from '../graphql/mutations/storeMutations'
import { GET_USER_STORE } from '../graphql/queries/storeQueries'

const UploadStorePic = ({ storeId, metadata, imageId }) => {
  const [src, setSrc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [formIsDirty, setFormIsDirty] = useState(true)

  const cancelBtn = useRef()

  /**
   * Asset mutations
   */
  const [publishAsset] = useMutation(PUBLISH_ASSET)
  const [updateAsset] = useMutation(UPDATE_STORE_IMAGE)
  const [deleteAsset] = useMutation(DELETE_ASSET)
  const [publishStore] = useMutation(PUBLISH_STORE, {
    refetchQueries: [
      {
        query: GET_USER_STORE,
        variables: { id: storeId },
        fetchPolicy: 'network-only',
      },
    ],
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

      //limit file upload size to 1mb
      if (e.target.files[0].size > 1048576) {
        return setUploadError(
          'The file size must be no more than ' +
            parseInt(1048576 / 1024 / 1024) +
            'MB',
        )
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

        //Attach uploaded asset to store
        await updateAsset({
          variables: { id: data.id, storeId, filename: metadata },
        })

        //publish asset
        await publishAsset({ variables: { id: data.id } })

        //publish user account
        await publishStore({ variables: { id: storeId } }).then(() => {
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

export default UploadStorePic
