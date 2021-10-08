import { useMutation, useQuery } from 'react-query'
import { graphqlClient, gql } from '../api/graphql'
import { ValuesFormRegister } from '../components/auth/registerForm'
import { ErrorGraphql, Login, User } from '../models'
import { UserAllData } from './fragments'

const useSearchUsers = (search: string) => {
  return useQuery(
    ['search', search],
    async () => {
      const data = await graphqlClient.request(
        gql`
          query SearchUsers($search: String!) {
            searchUsers(search: $search) {
              username
              avatar
            }
          }
        `,
        {
          search
        }
      )
      return data.searchUsers
    },
    { enabled: !!search }
  )
}

const useUserById = (userId: string) => {
  return useQuery(['user', userId], async () => {
    const { user } = await graphqlClient.request(
      gql`
        query getUserById($userId: String!) {
          userById(userId: $userId) {
            ...UserAllData
          }
        }
        ${UserAllData}
      `,
      {
        userId
      }
    )
    return user
  })
}
const useUserByUsername = (username: string, userReq: string | undefined) => {
  return useQuery<{ user: User; isFollow: boolean }>(
    ['user', username],
    async () => {
      const { userByUsername } = await graphqlClient.request(
        gql`
          query getUserByUsername($username: String!, $userReq: String) {
            userByUsername(username: $username, userReq: $userReq) {
              user {
                ...UserAllData
              }
              isFollow
            }
          }
          ${UserAllData}
        `,
        {
          username,
          userReq
        }
      )

      return userByUsername
    }
  )
}

const useLogin = () => {
  return useMutation<
    { login: Login },
    { response: ErrorGraphql },
    { email: string; password: string },
    unknown
  >(async (loginUserData: { email: string; password: string }) => {
    const data = await graphqlClient.request(
      gql`
        mutation loginUser($loginUserData: LoginUserInput!) {
          login(loginUserData: $loginUserData) {
            token
            user {
              _id
              username
              name
            }
          }
        }
      `,
      {
        loginUserData
      }
    )
    return data
  })
}
const useRegister = () => {
  return useMutation(async (createUserData: ValuesFormRegister) => {
    const data = await graphqlClient.request(
      gql`
        mutation createUser($createUserData: CreateUserInput!) {
          createUser(createUserData: $createUserData) {
            name
            email
          }
        }
      `,
      {
        createUserData
      }
    )
    return data
  })
}

export { useSearchUsers, useUserById, useUserByUsername, useLogin, useRegister }
