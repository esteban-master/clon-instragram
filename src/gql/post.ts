import { useMutation, useQuery } from 'react-query'
import { graphqlClient, gql } from '../api/graphql'
import { User } from '../redux/auth/auth-slice'

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

export interface Post {
  postedBy: User
  text?: string
  _id: string
  createdAt: string
  photo: string
}

const useCreatePost = () => {
  return useMutation<
    Post,
    { response: ErrorGraphql },
    Pick<Post, 'text' | 'postedBy' | 'photo'>,
    unknown
  >(async (createPostData) => {
    const { createPost } = await graphqlClient.request(
      gql`
        mutation CreatePost($createPostData: CreatePostInput!) {
          createPost(createPostData: $createPostData) {
            _id
            text
            photo
            postedBy {
              _id
              username
            }
            createdAt
          }
        }
      `,
      {
        createPostData
      }
    )
    return createPost
  })
}

const usePostsUsername = (username: string) => {
  return useQuery<Post[]>(['posts', username], async () => {
    const { postsByUsername } = await graphqlClient.request(
      gql`
        query PostByUsermane($username: String!) {
          postsByUsername(username: $username) {
            _id
            text
            photo
            likes {
              _id
              username
            }
            createdAt
          }
        }
      `,
      {
        username
      }
    )

    return postsByUsername
  })
}

export { useCreatePost, usePostsUsername }
