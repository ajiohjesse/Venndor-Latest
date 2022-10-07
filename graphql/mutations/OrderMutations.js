import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
  mutation createOrder($username: String!, $storeId: ID!, $productId: ID!) {
    createOrder(
      data: {
        account: { connect: { username: $username } }
        order_status: "pending"
        product: { connect: { id: $productId } }
        store: { connect: { id: $storeId } }
      }
    ) {
      id
      createdAt
      order_status
      product {
        id
        store {
          id
        }
      }
      account {
        username
      }
    }

    publishAccount(where: { username: $username }, to: PUBLISHED) {
      id
    }
    publishProduct(where: { id: $productId }, to: PUBLISHED) {
      id
    }
  }
`

export const PUBLISH_ORDER = gql`
  mutation publishOrder($id: ID!) {
    publishOrder(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`
