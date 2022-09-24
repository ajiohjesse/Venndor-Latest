import { gql } from '@apollo/client'

export const GET_USER_STORE = gql`
  query getUserStore($id: ID!) {
    store(where: { id: $id }) {
      id
      name
      tagline
      description
      state
      district
      contact
      email
      address
      avatar {
        url
      }
      account {
        firstname
        lastname
        username
        phone
        avatar {
          url
        }
      }
      products(last: 4) {
        id
        name
        price
        category
        image {
          url
        }
      }
    }
  }
`
export const GET_STORE = gql`
  query getStore($id: ID!) {
    store(where: { id: $id }) {
      id
      name
      tagline
      description
      state
      district
      contact
      email
      address
      avatar {
        url
      }
      account {
        firstname
        lastname
        username
        phone
        avatar {
          url
        }
      }
      products(last: 4) {
        id
        name
        price
        category
        image {
          url
        }
      }
    }
  }
`
export const GET_ALL_STORES = gql`
  query getAllStores {
    stores {
      name
    }
  }
`
