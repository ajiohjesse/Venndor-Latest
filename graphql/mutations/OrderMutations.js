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
    publishStore(where: { id: $storeId }, to: PUBLISHED) {
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
export const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    updateOrder(
      data: { order_status: "completed", message: "cancelled" }
      where: { id: $id }
    ) {
      id
      order_status
      message
    }
    publishOrder(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`
export const DELETE_STORE_ORDER = gql`
  mutation deleteStoreOrder($id: ID!) {
    updateOrder(
      data: { order_status: "completed", message: "declined" }
      where: { id: $id }
    ) {
      id
      order_status
      message
    }
    publishOrder(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`
export const UPDATE_STORE_ORDER = gql`
  mutation updateStoreOrder($id: ID!, $status: String!, $message: String) {
    updateOrder(
      data: { order_status: $status, message: $message }
      where: { id: $id }
    ) {
      id
      message
      order_status
    }
    publishOrder(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`
