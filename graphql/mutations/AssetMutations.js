import { gql } from '@apollo/client'

export const PUBLISH_ASSET = gql`
  mutation publishAsset($id: ID!) {
    publishAsset(where: { id: $id }, to: PUBLISHED) {
      url
      id
    }
  }
`

export const UPDATE_ASSET = gql`
  mutation updateAsset($id: ID!, $username: String!, $filename: String) {
    updateAsset(
      data: {
        fileName: $filename
        avatarAccount: { connect: { where: { username: $username } } }
      }
      where: { id: $id }
    ) {
      url
    }
  }
`

export const UPDATE_STORE_IMAGE = gql`
  mutation updateStoreImage($id: ID!, $storeId: ID!, $filename: String) {
    updateAsset(
      data: {
        fileName: $filename
        avatarStore: { connect: { where: { id: $storeId } } }
      }
      where: { id: $id }
    ) {
      url
    }
  }
`

export const DELETE_ASSET = gql`
  mutation deleteAsset($id: ID!) {
    deleteAsset(where: { id: $id }) {
      id
    }
  }
`
export const DELETE_ALL_STORE_PRODUCT_IMAGES = gql`
  mutation deleteAllStoreProductImages($storeId: ID!) {
    deleteManyAssets(
      where: { imageProduct_every: { store: { id: $storeId } } }
    ) {
      count
    }
  }
`
