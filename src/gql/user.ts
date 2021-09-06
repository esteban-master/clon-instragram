import { useMutation, useQuery } from 'react-query'
import { graphqlClient, gql } from '../api/graphql'
import { ValuesFormRegister } from '../components/auth/registerForm'

const useUsers = () => {
  return useQuery('users', async () => {
    const data = await graphqlClient.request(gql`
      query {
        users {
          _id
          name
          username
        }
      }
    `)
    return data.users
  })
}

const useUser = (userId: string) => {
  return useQuery(['user', userId], async () => {
    const { user } = await graphqlClient.request(
      gql`
        query getUser($userId: String!) {
          user(userId: $userId) {
            _id
            name
            username
          }
        }
      `,
      {
        userId
      }
    )
    return user
  })
}

const useLogin = () => {
  return useMutation(
    async (loginUserData: { email: string; password: string }) => {
      const data = await graphqlClient.request(
        gql`
          mutation loginUser($loginUserData: LoginUserInput!) {
            login(loginUserData: $loginUserData) {
              token
              user {
                _id
                username
                name
                email
                avatar
                createdAt
                desc
                siteWeb
              }
            }
          }
        `,
        {
          loginUserData
        }
      )
      return data
    }
  )
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

export { useUsers, useUser, useLogin, useRegister }
