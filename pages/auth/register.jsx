import styles from '../../styles/pageStyles/Auth.module.css'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'
import Spinner from '../../components/ui/Spinner'
import toast from 'react-hot-toast'
import axios from 'axios'
import Router from 'next/router'

const Register = () => {
  const [registerError, setRegisterError] = useState('')
  const [loading, setLoading] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    toast.loading('Creating Account. . .')

    const { data } = await axios.post('/api/register', credentials)

    if (data.success) {
      toast.dismiss()
      toast.success('Account Created!')
      Router.push('/dashboard/profile')
    } else {
      toast.dismiss()
      toast.error('Failed!')
      setLoading(false)
      setRegisterError(data.message)
    }
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
