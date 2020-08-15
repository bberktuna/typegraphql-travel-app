/*import {
    ApolloClient,
    InMemoryCache,
    gql,
    NormalizedCacheObject
  } from '@apollo/client';

  export const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
  });



export * from './graphql-hooks';

*/


import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql'
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

export * from './graphql-hooks';