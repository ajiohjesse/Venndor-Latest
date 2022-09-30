import * as jose from 'jose'
import client from '../../apollo-client'
import { GET_USER_PASS } from '../../graphql/queries/userQueries'

export default async function handler(req, res) {
  const { username, password } = req.body

  const { data } = await client.query({
    query: GET_USER_PASS,
    variables: {
      username,
    },
    fetchPolicy: 'network-only',
  })

  if (!data.account)
    return res.json({ success: false, message: 'Account not found' })

  const pass = data.account.password

  if (pass !== password)
    return res.json({ success: false, message: 'Wrong password!' })

  return res.json({ success: true, message: 'Verified' })
}
