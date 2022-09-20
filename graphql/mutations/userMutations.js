import { gql } from '@apollo/client'

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $firstname: String!
    $lastname: String!
    $username: String!
    $password: String!
    $phone: String!
    $email: String!
  ) {
    createAccount(
      data: {
        firstname: $firstname
        lastname: $lastname
        password: $password
        username: $username
        phone: $phone
        email: $email
      }
    ) {
      username
    }
  }
`

export const PUBLISH_ACCOUNT = gql`
  mutation publishAccount($username: String!) {
    publishAccount(where: { username: $username } to: PUBLISHED) {
      username
    }
  }
`
