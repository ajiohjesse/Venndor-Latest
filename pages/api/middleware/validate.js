import client from '../../../apollo-client'
import { GET_CURRENT_USER } from '../../../graphql/queries/userQueries'

export default async ({ body }, res) => {
  const { data } = await client.query({
    query: GET_CURRENT_USER,
    variables: {
      username: body.username,
    },
    fetchPolicy: 'network-only',
  })

  res.json(data)
}
