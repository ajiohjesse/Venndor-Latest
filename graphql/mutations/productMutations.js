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
