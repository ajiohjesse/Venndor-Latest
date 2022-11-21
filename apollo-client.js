import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// const httpLink = createHttpLink({
//   uri: process.env.ENDPOINT,
// })

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: process.env.GRAPH_CMS_TOKEN,
    },
  }
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        orders: {
          merge(existing, incoming) {
            return incoming
          },
        },
      },
    },
  },
})

const client = new ApolloClient({
  uri: process.env.ENDPOINT,
  link: authLink,
  cache: cache,
})

export default client
