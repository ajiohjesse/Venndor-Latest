import { gql } from '@apollo/client'
import client from '../../apollo-client'
import {
  CREATE_ACCOUNT,
  PUBLISH_ACCOUNT,
} from '../../graphql/mutations/userMutations'

export default async ({ body }, res) => {
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

      res.status(200).json(result.data.createAccount.username)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
}
