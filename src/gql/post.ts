import { useInfiniteQuery, useMutation, useQuery } from 'react-query'
import { graphqlClient, gql } from '../api/graphql'
import { ErrorGraphql, Post, User } from '../models'

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

const useFeed = () => {
  return useInfiniteQuery<
    {
      data: Post[]
      nextCursor?: string
    },
    { response: ErrorGraphql }
  >(
    ['feed'],
    async ({ pageParam }: any) => {
      const { feed } = await graphqlClient.request(
        gql`
          query Feed($feedInput: FeedInput!) {
            feed(feedInput: $feedInput) {
              data {
                _id
                postedBy {
                  _id
                  username
                  avatar
                }
                text
                photo
                likes {
                  _id
                  username
                  avatar
                }
                createdAt
              }

              nextCursor
            }
          }
        `,
        {
          feedInput: pageParam ? { cursor: pageParam } : {}
        }
      )
      return feed
    },
    {
      getNextPageParam: (last, pages) => last.nextCursor
    }
  )
}

const useLikePost = () => {
  return useMutation<
    { likes: Pick<User, '_id' | 'username' | 'avatar'>[] },
    { response: ErrorGraphql },
    string
  >(async (idPost) => {
    const { likePost } = await graphqlClient.request(
      gql`
        mutation LikePost($idPost: String!) {
          likePost(idPost: $idPost) {
            likes {
              _id
              username
              avatar
            }
          }
        }
      `,
      {
        idPost
      }
    )
    return likePost
  })
}
const useDisLikePost = () => {
  return useMutation<
    { likes: Pick<User, '_id' | 'username' | 'avatar'>[] },
    { response: ErrorGraphql },
    string
  >(async (idPost) => {
    const { dislikePost } = await graphqlClient.request(
      gql`
        mutation DislikePost($idPost: String!) {
          dislikePost(idPost: $idPost) {
            likes {
              _id
              username
              avatar
            }
          }
        }
      `,
      {
        idPost
      }
    )
    return dislikePost
  })
}

export { useCreatePost, usePostsUsername, useFeed, useLikePost, useDisLikePost }
