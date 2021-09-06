import { GraphQLClient, gql } from 'graphql-request'

const API_GRAPHQL = import.meta.env.VITE_API_GRAPHQL as string

const graphqlClient = new GraphQLClient(API_GRAPHQL, {})

export { graphqlClient, gql }
