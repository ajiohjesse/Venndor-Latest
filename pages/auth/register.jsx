import styles from '../../styles/pageStyles/Auth.module.css'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  CREATE_ACCOUNT,
  PUBLISH_ACCOUNT,
} from '../../graphql/mutations/userMutations'
import Spinner from '../../components/ui/Spinner'
import toast from 'react-hot-toast'
import axios from 'axios'

const Register = () => {
  const [registerError, setRegisterError] = useState('')
  const [credentials, setCredentails] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  })

  const handleChange = (e) => {
    setCredentails({ ...credentials, [e.target.id]: e.target.value })
  }

  const [createAccount, { loading, error }] = useMutation(CREATE_ACCOUNT)
  const [publishAccount] = useMutation(PUBLISH_ACCOUNT)

  const handleSubmit = async (e) => {
    e.preventDefault()

    toast.loading('Creating Account. . .')

    await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...credentials,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.networkError) {
          const msg = data.networkError.result.errors[0].message
          setRegisterError(msg)

          toast.dismiss()
        } else {
          toast.dismiss()
          toast.success('Account Created!')
          // Router.push(`/accounts/${data}`)
        }
      })
  }

  return (
    <div className="section">
      <div className={styles.container}>
        <h1>Sign Up</h1>
        {registerError && <p className={styles.error}>{registerError}</p>}
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <Input
            type="text"
            label="First name"
            placeholder="First name"
            id="firstname"
          />
          <Input
            type="text"
            label="Last name"
            placeholder="Last name"
            id="lastname"
          />
          <Input
            type="text"
            label="Username"
            placeholder="Username"
            msg="Only alphabets, numbers, dash &#40; &#45; &#41; and underscore &#40; &#95; &#41; allowed."
            id="username"
          />
          <Input
            type="email"
            label="Email"
            placeholder="sample@email.com"
            id="email"
          />
          <Input
            type="text"
            label="Phone"
            placeholder="070 0000 0000"
            id="phone"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            msg="At least 6 characters required."
            id="password"
          />
          <Input
            type="password"
            label="Repeat Password"
            placeholder="Retype password"
            disabled
          />
          <Button disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" /> loading
              </>
            ) : (
              'Create account'
            )}
          </Button>
        </form>
        <p className={styles.link}>
          Already have an account? <Link href="/auth/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
