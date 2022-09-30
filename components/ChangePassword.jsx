import { useEffect, useRef, useState } from 'react'
import Button from './ui/Button'
import Input from './ui/Input'
import StringValidator from '../lib/stringValidator'
import Spinner from './ui/Spinner'
import axios from 'axios'
import { useMutation } from '@apollo/client'
import { UPDATE_USER_PASSWORD } from '../graphql/mutations/userMutations'
import toast from 'react-hot-toast'
import { GET_USER_PASS } from '../graphql/queries/userQueries'

const ChangePassword = ({ username }) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [inputPassword, setInputPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordRpt, setNewPasswordRpt] = useState('')
  const resetBtn = useRef()

  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 5000)
  }, [error])

  const string = new StringValidator()

  const [updatePassword] = useMutation(UPDATE_USER_PASSWORD, {
    variables: { username, password: newPassword },
    refetchQueries: [{ query: GET_USER_PASS, variables: { username } }],
  })

  const handleChange = (type, e) => {
    if (type === 'password') {
      setInputPassword(e.target.value)
    } else if (type === 'newPassword') {
      setNewPassword(e.target.value)
    } else if (type === 'rptPassword') {
      setNewPasswordRpt(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      string.isEmpty(inputPassword) ||
      string.isEmpty(newPassword) ||
      string.isEmpty(newPasswordRpt)
    ) {
      return setError('All inputs are required.')
    }

    if (newPassword.length < 6) {
      return setError('Password must be six (6) characters and above.')
    }

    if (newPassword === newPasswordRpt) {
    } else {
      return setError('Provided passwords do not match!')
    }

    setLoading(true)

    await axios
      .post('/api/verifyPassword', {
        username,
        password: inputPassword,
      })
      .then(async ({ data }) => {
        if (!data.success) {
          setLoading(false)
          return setError(data.message)
        }

        await updatePassword()
          .then(() => {
            toast.success('Password changed')
            setLoading(false)

            return resetBtn.current.click()
          })
          .catch((err) => {
            console.log(err)
            toast.error('Something wrong')
          })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
      <form
        onChange={() => {
          setError('')
        }}
      >
        <Input
          label="Current password"
          type="password"
          onChange={(e) => handleChange('password', e)}
          required
        />
        <Input
          label="New password"
          type="password"
          onChange={(e) => handleChange('newPassword', e)}
          required
          msg="At least 6 characters required."
        />
        <Input
          label="Repeat New password"
          type="password"
          onChange={(e) => handleChange('rptPassword', e)}
          required
          msg="At least 6 characters required."
        />
        <button
          ref={resetBtn}
          type="reset"
          style={{ display: 'none' }}
        ></button>
        <Button
          type="submit"
          color="text"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" /> Updating
            </>
          ) : (
            'Update password'
          )}
        </Button>
      </form>
    </>
  )
}

export default ChangePassword
