import { gql } from '@apollo/client'

export const GET_STORE_PRODUCTS = gql`
  query getStoreProducts($storeId: ID!, $first: Int, $skip: Int) {
    products(where: { store: { id: $storeId } }, first: $first, skip: $skip) {
      id
      name
      price
      category
      image {
        id
        url
      }
    }
  }
`
