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
