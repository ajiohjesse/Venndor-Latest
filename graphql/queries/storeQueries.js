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
        id
        url
      }
      account {
        firstname
        lastname
        username
        phone
        avatar {
          id
          url
        }
      }
      products(last: 4) {
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
        id
        url
      }
      account {
        firstname
        lastname
        username
        phone
        avatar {
          id
          url
        }
      }
      products(last: 4) {
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
  }
`
export const GET_ALL_STORES = gql`
  query getAllStores {
    stores {
      id
      name
      avatar {
        id
        url
      }
    }
  }
`
