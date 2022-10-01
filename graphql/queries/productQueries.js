import { gql } from '@apollo/client'

export const GET_STORE_PRODUCTS = gql`
  query getStoreProducts($storeId: ID!, $first: Int, $skip: Int) {
    products(
      where: { store: { id: $storeId } }
      first: $first
      skip: $skip
      orderBy: createdAt_DESC
    ) {
      id
      name
      price
      category
      store {
        id
        name
        state
        district
      }
      image {
        id
        url
      }
    }
  }
`
export const GET_TOTAL_LISTED_PRODUCTS = gql`
  query getTotalListedProducts($storeId: ID!) {
    productsConnection(where: { store: { id: $storeId } }) {
      aggregate {
        count
      }
    }
  }
`
export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      price
      category
      description
      createdAt
      store {
        id
        name
        contact
        state
        district
      }
      image {
        url
      }
    }
  }
`
