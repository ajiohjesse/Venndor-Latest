import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($username: String!) {
    account(where: { username: $username }) {
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
        url
      }
      store {
        id
        name
        tagline
        state
        district
        slug
        avatar {
          url
        }
      }
    }
  }
`;

export const GET_USER_PASS = gql`
  query getUserPass($username: String!) {
    account(where: { username: $username }) {
      password
    }
  }
`;
