import { gql } from '@apollo/client'

export const GET_USER_ORDERS = gql`
  query getUserOrders(
    $username: String!
    $status: String!
    $first: Int
    $skip: Int
  ) {
    orders(
      where: { order_status: $status, account: { username: $username } }
      first: $first
      skip: $skip
      orderBy: createdAt_DESC
    ) {
      id
      createdAt
      order_status
      message
      product {
        id
        name
        image {
          url
        }
      }
      store {
        id
        name
      }
    }
  }
`

export const GET_TOTAL_ORDERS = gql`
  query getTotalOrders($username: String!, $status: String!) {
    ordersConnection(
      where: { account: { username: $username }, order_status: $status }
    ) {
      aggregate {
        count
      }
    }
  }
`
export const VERIFY_ORDER = gql`
  query verifyOrder($username: String!, $productId: ID!) {
    orders(
      where: {
        account: { username: $username }
        AND: { product: { id: $productId } }
      }
    ) {
      id
      order_status
    }
  }
`

export const GET_STORE_ORDERS = gql`
  query getStoreOrders(
    $username: String!
    $status: String!
    $first: Int
    $skip: Int
  ) {
    orders(
      where: {
        order_status: $status
        store: { account: { username: $username } }
      }
      first: $first
      skip: $skip
      orderBy: createdAt_DESC
    ) {
      id
      createdAt
      order_status
      message
      product {
        id
        name
        image {
          url
        }
      }
      account {
        id
        username
      }
    }
  }
`

export const GET_TOTAL_STORE_ORDERS = gql`
  query getTotalOrders($username: String!, $status: String!) {
    ordersConnection(
      where: {
        store: { account: { username: $username } }
        order_status: $status
      }
    ) {
      aggregate {
        count
      }
    }
  }
`
