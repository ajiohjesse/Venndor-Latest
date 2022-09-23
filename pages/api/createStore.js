import client from '../../apollo-client'
import {
  CREATE_STORE,
  PUBLISH_STORE,
} from '../../graphql/mutations/storeMutations'
import { GET_ALL_STORES } from '../../graphql/queries/storeQueries'
import { GET_USER } from '../../graphql/queries/userQueries'

export default async ({ body }, res) => {
  /**
   * check if user already has a store
   */

  /**
   * check if store already exists
   */

  //create and publish store
  await client
    .mutate({
      mutation: CREATE_STORE,
      variables: {
        ...body,
      },
    })
    .then(async (result) => {
      await client
        .mutate({
          mutation: PUBLISH_STORE,
          variables: {
            id: result.data.createStore.id,
          },
          refetchQueries: [
            { query: GET_USER, variables: { username: body.username } },
          ],
        })
        .catch((error) =>
          res.json({
            success: false,
            message: 'Failed to publish account',
            error: error,
          }),
        )

      return res.json({ success: true, id: result.data.createStore.id })
    })
    .catch((error) => {
      return res.status(500).json({ success: false, error: error })
    })
}
