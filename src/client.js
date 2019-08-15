import { AccountsClient } from '@accounts/client'
import { accountsLink } from '@accounts/apollo-link'
import { AccountsClientPassword } from '@accounts/client-password'
import GraphQLClient from '@accounts/graphql-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'

const httpLink = new HttpLink({
  uri: '/.netlify/functions/graphql',
  credentials: 'same-origin'
})
const cache = new InMemoryCache()

const authLink = accountsLink(() => accountsClient)
// const authLink = accountsLink(accountsClient)

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    authLink,
    httpLink
  ]),
  cache
})

const accountsGraphQL = new GraphQLClient({ graphQLClient: client })
const accountsClient = new AccountsClient({}, accountsGraphQL)
const accountsPassword = new AccountsClientPassword(accountsClient, {
  hashPassword: (password) => password
})

export { client, accountsPassword, accountsGraphQL, accountsClient }
