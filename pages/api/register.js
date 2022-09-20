import client from '../../apollo-client'
import {
  CREATE_ACCOUNT,
  PUBLISH_ACCOUNT,
} from '../../graphql/mutations/userMutations'
import { GET_ALL_USERS } from '../../graphql/queries/userQueries'

export default async ({ body }, res) => {
  /**
   * check if the username and email
   * has already been used
   */

  let duplicateUsername = false
  let duplicateEmail = false

  await client
    .query({ query: GET_ALL_USERS })
    .then((result) => {
      const accounts = result.data.accounts
      const username = body.username
      const email = body.email

      accounts.some((account) => {
        if (account.username === username) {
          duplicateUsername = true
        } else if (account.email === email) {
          duplicateEmail = true
        }
      })
    })
    .catch((err) => res.json(err))

  if (duplicateUsername)
    return res.json({ success: false, message: 'Username already exists.' })

  if (duplicateEmail)
    return res.json({ success: false, message: 'Email already exists.' })

  //create and publish account account

  await client
    .mutate({
      mutation: CREATE_ACCOUNT,
      variables: {
        ...body,
      },
    })
    .then(async (result) => {
      await client.mutate({
        mutation: PUBLISH_ACCOUNT,
        variables: {
          username: result.data.createAccount.username,
        },
      })

      res.json({ success: true, username: result.data.createAccount.username })
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}
