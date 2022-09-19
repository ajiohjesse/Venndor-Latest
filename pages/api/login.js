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
  })

  if (!data.account) return res.status(404).json('Account not found.')

  const pass = data.account.password

  if (pass !== password)
    return res.status(401).json('Invalid username or password')

  const token = await new jose.SignJWT({ username: username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(new TextEncoder().encode(process.env.JWT))

  res.json({ username, token })
}
