import { useInfiniteQuery, useMutation, useQuery } from 'react-query'
import { graphqlClient, gql } from '../api/graphql'
import { ErrorGraphql, User } from '../models'
import { UserAllData } from './fragments'

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

const useFollowing = (
  userId: string,
  idUserReq: string | undefined,
  enabled: boolean
) => {
  return useInfiniteQuery(
    ['following', userId],
    async ({ pageParam }: any) => {
      const { following } = await graphqlClient.request(
        gql`
          query Following(
            $idUser: String!
            $idUserReq: String!
            $cursor: String
          ) {
            following(idUser: $idUser, idUserReq: $idUserReq, cursor: $cursor) {
              data {
                _id
                follow {
                  _id
                  name
                  avatar
                  username
                }
                isFollow
                createdAt
              }
              nextCursor
            }
          }
        `,
        {
          idUser: userId,
          idUserReq,
          cursor: pageParam
        }
      )
      return following
    },
    {
      enabled,
      getNextPageParam: (last, pages) => last.nextCursor
    }
  )
}
const useFollowers = (
  userId: string,
  idUserReq: string | undefined,
  enabled: boolean
) => {
  return useInfiniteQuery(
    ['followers', userId],
    async ({ pageParam }: any) => {
      const { followers } = await graphqlClient.request(
        gql`
          query Followers(
            $idUser: String!
            $idUserReq: String!
            $cursor: String
          ) {
            followers(idUser: $idUser, idUserReq: $idUserReq, cursor: $cursor) {
              data {
                _id
                userId {
                  _id
                  name
                  avatar
                  username
                }
                isFollow
                createdAt
              }
              nextCursor
            }
          }
        `,
        {
          idUser: userId,
          idUserReq,
          cursor: pageParam
        }
      )
      return followers
    },
    {
      enabled,
      getNextPageParam: (last, pages) => last.nextCursor
    }
  )
}

export { useFollow, useUnFollow, useFollowing, useFollowers }
