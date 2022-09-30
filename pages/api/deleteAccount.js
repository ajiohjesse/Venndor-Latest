import client from '../../apollo-client'
import { DELETE_ASSET } from '../../graphql/mutations/AssetMutations'
import { DELETE_ACCOUNT } from '../../graphql/mutations/userMutations'

export default async function handler(req, res) {
  const { username, imageId } = req.body

  //delete account image if it exists
  if (imageId) {
    await client
      .mutate({ mutation: DELETE_ASSET, variables: { id: imageId } })
      .catch((err) => res.json(JSON.stringify(err, null, 2)))
  }

  //delete account
  await client
    .mutate({ mutation: DELETE_ACCOUNT, variables: { username } })
    .catch((err) => res.json(JSON.stringify(err, null, 2)))

  return res.json({ success: true, message: 'Delete Successful!' })
}
