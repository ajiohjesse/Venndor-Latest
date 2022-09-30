import { gql } from '@apollo/client'

export const GET_CURRENT_USER = gql`
  query getCurrentUser($username: String!) {
    account(where: { username: $username }) {
      id
      firstname
      lastname
      username
      bio
      phone
      email
      facebook
      instagram
      twitter
      avatar {
        id
        url
      }
      store {
        id
        name
        tagline
        state
        district
        avatar {
          id
          url
        }
      }
    }
  }
`
export const GET_USER = gql`
  query getUser($username: String!) {
    account(where: { username: $username }) {
      id
      firstname
      lastname
      username
      bio
      phone
      email
      facebook
      instagram
      twitter
      avatar {
        id
        url
      }
      store {
        id
        name
        tagline
        state
        district
        avatar {
          id
          url
        }
      }
    }
  }
`

export const GET_USER_PASS = gql`
  query getUserPass($username: String!) {
    account(where: { username: $username }) {
      id
      password
    }
  }
`

export const GET_USER_IMG = gql`
  query getuserImage($username: String!) {
    account(where: { username: $username }) {
      avatar {
        id
        url
      }
    }
  }
`

export const GET_ALL_USERS = gql`
  query getAllUsers {
    accounts {
      username
      email
    }
  }
`
