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
