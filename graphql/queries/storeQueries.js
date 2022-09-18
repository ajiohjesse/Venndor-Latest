import { gql } from "@apollo/client";

export const GET_STORE = gql`
  query getStore($slug: String!) {
    store(where: { slug: $slug }) {
      id
      name
      tagline
      slug
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
`;
