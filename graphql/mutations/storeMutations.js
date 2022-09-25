import { gql } from '@apollo/client'

export const CREATE_STORE = gql`
  mutation createStore(
    $name: String!
    $address: String!
    $state: String!
    $description: String!
    $contact: String!
    $district: String
    $email: String
    $tagline: String
    $username: String!
  ) {
    createStore(
      data: {
        name: $name
        address: $address
        state: $state
        description: $description
        contact: $contact
        district: $district
        email: $email
        tagline: $tagline
        account: { connect: { username: $username } }
      }
    ) {
      id
      name
      address
      state
      description
      contact
      district
      email
      tagline
      account {
        id
        username
      }
    }
  }
`

export const PUBLISH_STORE = gql`
  mutation publishStore($id: ID!) {
    publishStore(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`

export const UPDATE_USER_STORE = gql`
  mutation updateUserStore(
    $id: ID!
    $name: String
    $tagline: String
    $state: String
    $email: String
    $district: String
    $description: String
    $contact: String
    $address: String
  ) {
    updateStore(
      where: { id: $id }
      data: {
        name: $name
        tagline: $tagline
        state: $state
        email: $email
        district: $district
        description: $description
        contact: $contact
        address: $address
      }
    ) {
      id
      name
      email
      district
      description
      contact
      state
      tagline
      address
    }
  }
`
