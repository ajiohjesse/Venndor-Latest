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
    publishAccount(where: { username: $username }, to: PUBLISHED) {
      username
    }
  }
`

export const UPDATE_ACCOUNT = gql`
  mutation updateAccount(
    $username: String!
    $bio: String
    $phone: String
    $facebook: String
    $instagram: String
    $twitter: String
  ) {
    updateAccount(
      data: {
        bio: $bio
        phone: $phone
        facebook: $facebook
        instagram: $instagram
        twitter: $twitter
      }
      where: { username: $username }
    ) {
      id
      bio
      phone
      facebook
      instagram
      twitter
      username
    }
  }
`
export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($username: String!) {
    deleteAccount(where: { username: $username }) {
      id
    }
  }
`
export const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword($username: String!, $password: String!) {
    updateAccount(
      data: { password: $password }
      where: { username: $username }
    ) {
      id
      password
    }
    publishAccount(where: { username: $username }, to: PUBLISHED) {
      id
    }
  }
`
