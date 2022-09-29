import { gql } from '@apollo/client'

export const PUBLISH_ASSET = gql`
  mutation publishAsset($id: ID!) {
    publishAsset(where: { id: $id }, to: PUBLISHED) {
      url
      id
    }
  }
`

export const UPDATE_ASSET = gql`
  mutation updateAsset($id: ID!, $username: String!, $filename: String) {
    updateAsset(
      data: {
        fileName: $filename
        avatarAccount: { connect: { where: { username: $username } } }
      }
      where: { id: $id }
    ) {
      url
    }
  }
`

export const DELETE_ASSET = gql`
  mutation deleteAsset($id: ID!) {
    deleteAsset(where: { id: $id }) {
      id
    }
  }
`
