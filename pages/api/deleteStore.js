import client from '../../apollo-client'
import {
  DELETE_ALL_STORE_PRODUCTS,
  DELETE_ALL_STORE_PRODUCT_IMAGES,
  DELETE_ASSET,
} from '../../graphql/mutations/AssetMutations'
import { DELETE_STORE } from '../../graphql/mutations/storeMutations'

export default async function handler(req, res) {
  const { storeId, imageId } = req.body
  /**
   * send mutation to delete store,
   * delete products, product images,
   * and store image associated to the store
   */

  //delete store image
  await client
    .mutate({ mutation: DELETE_ASSET, variables: { id: imageId } })
    .catch((err) => res.json(JSON.stringify(err, null, 2)))

  //delete all products image
  await client
    .mutate({
      mutation: DELETE_ALL_STORE_PRODUCT_IMAGES,
      variables: { storeId },
    })
    .catch((err) => res.json(JSON.stringify(err, null, 2)))

  //delete all products
  await client
    .mutate({
      mutation: DELETE_ALL_STORE_PRODUCTS,
      variables: { storeId },
    })
    .catch((err) => res.json(JSON.stringify(err, null, 2)))

  //delete store
  await client
    .mutate({ mutation: DELETE_STORE, variables: { storeId } })
    .catch((err) => res.json(JSON.stringify(err, null, 2)))

  return res.json({ success: true, message: 'Delete Successful!' })
}
