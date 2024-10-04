// src/ApolloClient.ts

import { ApolloClient, InMemoryCache } from '@apollo/client';

// Create an instance of ApolloClient
export const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta', // The GraphQL API endpoint
  cache: new InMemoryCache(), // Cache implementation
});