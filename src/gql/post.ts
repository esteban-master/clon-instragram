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
            likes {
              username
            }
            comments {
              _id
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
            comments {
              _id
              postedBy {
                username
                _id
                avatar
              }
              text
              createdAt
            }
            postedBy {
              _id
              username
              avatar
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
                }
                createdAt
                comments {
                  postedBy {
                    _id
                    username
                    avatar
                  }
                  _id
                  text
                  createdAt
                }
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

const useCommentPost = () => {
  return useMutation<
    Post,
    { response: ErrorGraphql },
    { text: string; idPost: string }
  >(async (createCommentData) => {
    const { commentPost } = await graphqlClient.request(
      gql`
        mutation CommentPost($createCommentData: CreateCommentInput!) {
          commentPost(createCommentData: $createCommentData) {
            _id
            text
            likes {
              _id
              username
            }
            comments {
              text
              createdAt
              _id
              postedBy {
                _id
                username
                avatar
              }
            }
            photo
            postedBy {
              _id
              username
              avatar
            }
          }
        }
      `,
      {
        createCommentData
      }
    )
    return commentPost
  })
}
const useDeleteCommentPost = () => {
  return useMutation<
    boolean,
    { response: ErrorGraphql },
    { idPostedBy: string; idComment: string; idPost: string }
  >(async (deleteCommentData) => {
    const { deleteCommentPost } = await graphqlClient.request(
      gql`
        mutation DeleteComment($deleteCommentData: DeleteCommentInput!) {
          deleteCommentPost(deleteCommentData: $deleteCommentData)
        }
      `,
      {
        deleteCommentData
      }
    )
    return deleteCommentPost
  })
}
export {
  useCommentPost,
  useDeleteCommentPost,
  useCreatePost,
  usePostsUsername,
  useFeed,
  useLikePost,
  useDisLikePost
}
