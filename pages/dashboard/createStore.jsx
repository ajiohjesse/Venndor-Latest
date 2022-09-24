import { useContext, useState } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Textarea from '../../components/ui/Textarea'
import styles from '../../styles/pageStyles/Auth.module.css'
import Select from '../../components/ui/Select'
import { states } from '../../lib/selections'
import toast from 'react-hot-toast'
import axios from 'axios'
import Spinner from '../../components/ui/Spinner'
import { AuthContext } from '../../context/AuthContext'
import Router from 'next/router'
import { useMutation } from '@apollo/client'
import {
  CREATE_STORE,
  PUBLISH_STORE,
} from '../../graphql/mutations/storeMutations'
import { GET_CURRENT_USER } from '../../graphql/queries/userQueries'
import { GET_USER_STORE } from '../../graphql/queries/storeQueries'
import { PUBLISH_ACCOUNT } from '../../graphql/mutations/userMutations'

const CreateStore = () => {
  const [createStoreError, setCreateStoreError] = useState('')
  const [loading, setLoading] = useState(false)

  const { user: username } = useContext(AuthContext)

  const [credentials, setCredentials] = useState({ username, state: 'Abuja' })

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value })
  }

  const [createStore, { error }] = useMutation(CREATE_STORE, {
    variables: credentials,
  })

  const [publishStore] = useMutation(PUBLISH_STORE, {
    refetchQueries: [{ query: GET_CURRENT_USER, variables: { username } }],
  })

  const [publishUser] = useMutation(PUBLISH_ACCOUNT, {
    variables: { username },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    toast.loading('Creating Store. . .')

    /**
     * check if user already has a store
     */

    /**
     * check if store already exists
     */

    //create and publish store
    await createStore()
      .then(async (res) => {
        await publishStore({ variables: { id: res.data.createStore.id } })
        //update user
        await publishUser()
      })
      .catch((error) => setRegisterError(error.message))

    if (!error) {
      toast.dismiss()
      toast.success('Store Created!')
      Router.push('/dashboard/profile')
    } else {
      toast.dismiss()
      toast.error('Failed!')
      setLoading(false)
      setRegisterError(error.message)
    }
  }

  return (
    <div className="section">
      <div className={styles.container}>
        <h1>Create Store</h1>
        {createStoreError && <p className={styles.error}>{createStoreError}</p>}
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Store name"
            placeholder="Store name"
            required
            id="name"
          />
          <Input
            type="text"
            label="Tagline"
            placeholder="Short slogan"
            msg="Optional"
            id="tagline"
          />
          <Textarea
            label="Description"
            placeholder="Describe your business. . ."
            required
            id="description"
          />
          <Input
            type="text"
            label="Address"
            placeholder="Business Address"
            required
            id="address"
          />
          <Select label="State" defaultValue="Abuja" id="state">
            <option value="Abuja">Abuja</option>
            {states.map((state, i) => (
              <option value={state} key={i}>
                {state}
              </option>
            ))}
          </Select>

          <Input
            type="text"
            label="L.G.A"
            placeholder="Local Area"
            msg="Optional"
            id="district"
          />

          <Input
            type="text"
            label="Contact"
            placeholder="070 0000 0000"
            required
            id="contact"
          />

          <Input
            type="email"
            label="Email"
            placeholder="Your business email"
            msg="Optional"
            id="email"
          />

          <Button disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" /> loading
              </>
            ) : (
              'Create Store'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateStore
