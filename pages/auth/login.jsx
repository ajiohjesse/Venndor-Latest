import styles from '../../styles/pageStyles/Auth.module.css'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Router from 'next/router'
import toast from 'react-hot-toast'
import Spinner from '../../components/ui/Spinner'
import axios from 'axios'
import Cookies from 'js-cookie'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { loading, error, dispatch } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()

    dispatch({ type: 'LOGIN_START' })

    await axios
      .post('/api/login', { username, password })
      .then((res) => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.username })

        Cookies.set('VenndorUser', res.data.token, { expires: 30 })

        toast.success('Logged in')

        Router.push('/dashboard/profile')
      })
      .catch((err) =>
        dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data }),
      )
  }

  return (
    <div className="section">
      <div className={styles.container}>
        <h1>Sign In</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form>
          <Input
            type="text"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" /> Loading
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
        <p className={styles.link}>
          Don't have an account? <Link href="/auth/register">Register</Link>
        </p>
        <p className={styles.link}>
          Forgot your password?{' '}
          <Link href="/auth/recover">Recover Password</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
