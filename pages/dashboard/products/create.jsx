import { useContext, useEffect, useState } from 'react'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import Textarea from '../../../components/ui/Textarea'
import styles from '../../../styles/pageStyles/Auth.module.css'
import uploadStyles from '../../../styles/UploadImg.module.css'
import Select from '../../../components/ui/Select'
import { categories } from '../../../lib/selections'
import { AuthContext } from '../../../context/AuthContext'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../../../graphql/queries/userQueries'
import { PUBLISH_ASSET } from '../../../graphql/mutations/AssetMutations'
import {
  CREATE_PRODUCT,
  PUBLISH_PRODUCT,
} from '../../../graphql/mutations/productMutations'
import { PUBLISH_STORE } from '../../../graphql/mutations/storeMutations'
import { GET_STORE_PRODUCTS } from '../../../graphql/queries/productQueries'
import toast from 'react-hot-toast'
import Router from 'next/router'
import Spinner from '../../../components/ui/Spinner'
import Image from 'next/image'

const CreateProduct = () => {
  const [createProductError, setCreateProductError] = useState('')
  const [src, setSrc] = useState(null)
  const [uploadError, setUploadError] = useState('')
  const [formIsDirty, setFormIsDirty] = useState(true)
  const [loading, setLoading] = useState(false)

  const { user: username } = useContext(AuthContext)

  const { data } = useQuery(GET_CURRENT_USER, {
    variables: { username },
  })

  const storeId = data?.account?.store.id

  const [credentials, setCredentials] = useState({
    category: 'others',
  })

  const [publishAsset] = useMutation(PUBLISH_ASSET)
  const [createProduct] = useMutation(CREATE_PRODUCT)

  const [publishProduct] = useMutation(PUBLISH_PRODUCT)
  const [publishStore] = useMutation(PUBLISH_STORE, {
    variables: { id: storeId },
    refetchQueries: [
      {
        query: GET_STORE_PRODUCTS,
        variables: { storeId },
        fetchPolicy: 'network-only',
      },
    ],
  })

  const handleChange = (name, e) => {
    if (name === 'price') {
      //parse the number as an integer !important.
      setCredentials({ ...credentials, storeId, price: +e.target.value })

      return
    }

    setCredentials({ ...credentials, storeId, [name]: e.target.value })
  }

  const handleImageChange = (e) => {
    setSrc(null)
    setCreateProductError('')

    if (e.target.files.length > 0) {
      if (!e.target.files[0].type.includes('image')) {
        return setCreateProductError('Selected file is not an image.')
      }

      if (e.target.files[0].size > 2097152) {
        return setUploadError(
          'The file size must be no more than ' +
            parseInt(2097152 / 1024 / 1024) +
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
        //create product
        await createProduct({
          variables: {
            ...credentials,
            imageId: data.id,
          },
        }).then(async ({ data }) => {
          //publish  product
          await publishProduct({ variables: { id: data.createProduct.id } })
        })

        //publish asset
        await publishAsset({ variables: { id: data.id } }).then(() =>
          toast.success('Image uploaded'),
        )

        //publish store
        await publishStore()

        toast.success('Product created')

        Router.push('/dashboard/products')
      })
      .catch((err) => console.log(JSON.stringify(err, null, 2)))
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="section">
      <div className={styles.container}>
        <h1>Add Product</h1>
        {createProductError && (
          <p className={styles.error}>{createProductError}</p>
        )}
        <form onSubmit={handleUploadImage} encType="multipart/form-data">
          <Input
            type="text"
            label="Product name"
            placeholder="Product name"
            required
            onChange={(e) => handleChange('name', e)}
          />
          <Input
            type="number"
            label="Price"
            min="0"
            required
            onChange={(e) => handleChange('price', e)}
          />

          <Select
            label="Categories"
            defaultValue="art"
            onChange={(e) => handleChange('category', e)}
          >
            {categories.map((category, i) => (
              <option value={category.slug} key={i}>
                {category.title}
              </option>
            ))}
          </Select>

          <Textarea
            label="Description"
            placeholder="Product description. . ."
            required
            onChange={(e) => handleChange('description', e)}
          />
          <div>
            {src && (
              <div className={uploadStyles.preview}>
                <Image
                  src={src}
                  width="100px"
                  height="100px"
                  objectFit="cover"
                />
              </div>
            )}
          </div>
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            onChange={handleImageChange}
          />

          <Button disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" /> loading
              </>
            ) : (
              'Add product'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct
