import { useMutation, useQuery } from 'react-query'
import { graphqlClient, gql } from '../api/graphql'
import { User } from '../redux/auth/auth-slice'
import { UserAllData } from './fragments'

export interface ErrorGraphql {
  errors: Error[]
  data: null
  status: number
  headers: Headers
}

export interface Error {
  message: string
  extensions: Extensions
}

export interface Extensions {
  code: string
  response: Response
}

export interface Response {
  statusCode: number
  message: string
  error: string
}

export interface Headers {
  map: Map
}

export interface Map {
  'content-length': string
  'content-type': string
}

const useFollow = () => {
  return useMutation<
    { user: User; follow: User },
    { response: ErrorGraphql },
    string,
    unknown
  >(async (_id: string) => {
    const { follow } = await graphqlClient.request(
      gql`
        mutation Follow($_id: String!) {
          follow(_id: $_id) {
            user {
              ...UserAllData
            }
            follow {
              ...UserAllData
            }
          }
        }
        ${UserAllData}
      `,
      {
        _id
      }
    )
    return follow
  })
}
const useUnFollow = () => {
  return useMutation<
    { user: User; unFollow: User },
    { response: ErrorGraphql },
    string,
    unknown
  >(async (_id: string) => {
    const { unFollow } = await graphqlClient.request(
      gql`
        mutation UnFollow($_id: String!) {
          unFollow(_id: $_id) {
            user {
              ...UserAllData
            }
            unFollow {
              ...UserAllData
            }
          }
        }
        ${UserAllData}
      `,
      {
        _id
      }
    )
    return unFollow
  })
}

const useIsFollow = (id: string) => {
  return useQuery(
    ['isFollow', id],
    async () => {
      const { isfollow } = await graphqlClient.request(
        gql`
          query isFollow($_id: String!) {
            isfollow(_id: $_id)
          }
        `,
        {
          _id: id
        }
      )
      return isfollow
    },
    {
      enabled: !!id
    }
  )
}

export { useFollow, useIsFollow, useUnFollow }
