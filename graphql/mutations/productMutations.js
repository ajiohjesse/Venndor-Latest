import { gql } from '@apollo/client'

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $price: Int!
    $category: String!
    $imageId: ID!
    $storeId: ID!
    $description: String
  ) {
    createProduct(
      data: {
        name: $name
        price: $price
        category: $category
        image: { connect: { id: $imageId } }
        store: { connect: { id: $storeId } }
        description: $description
      }
    ) {
      id
      name
      price
      category
      description
      image {
        id
        url
      }
    }
  }
`
export const PUBLISH_PRODUCT = gql`
  mutation publishProduct($id: ID!) {
    publishProduct(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`
export const DELETE_PRODUCT = gql`
  mutation deleteProduct($productId: ID!, $storeId: ID!, $imageId: ID!) {
    deleteManyOrders(where: { product: { id: $productId } }) {
      count
    }

    deleteAsset(where: { id: $imageId }) {
      id
    }

    deleteProduct(where: { id: $productId }) {
      id
    }

    publishStore(where: { id: $storeId }, to: PUBLISHED) {
      id
    }
  }
`
