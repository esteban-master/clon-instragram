import { gql } from '../api/graphql'

export const UserAllData = gql`
  fragment UserAllData on User {
    _id
    name
    username
    email
    siteWeb
    desc
    avatar
    followers
    following
    createdAt
  }
`
