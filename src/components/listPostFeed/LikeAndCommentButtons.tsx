import React from 'react'
import { useDisLikePost, useLikePost } from '../../gql/post'
import { useQueryClient } from 'react-query'
import {
  HeartIcon as HeartIconOutline,
  ChatAlt2Icon
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { User } from '../../models'
import { toast } from 'react-toastify'

const LikeAndCommentButtons = ({
  user,
  postId,
  likes,
  isModal,
  usernamePerfil
}: {
  user: User
  postId: string
  likes: Pick<User, '_id' | 'avatar' | 'username'>[]
  isModal?: boolean
  usernamePerfil?: string
}) => {
  const queryClient = useQueryClient()
  const like = useLikePost()
  const disLike = useDisLikePost()

  function isLike(likes: any) {
    return likes.some((u: any) => u._id === user._id)
  }

  function likePost() {
    like.mutate(postId, {
      onSuccess: (data, variables, ctx) => {
        if (isModal) {
          const posts: any = queryClient.getQueryData(['posts', usernamePerfil])
          if (posts) {
            const newsPost = posts.map((p: any) => {
              if (p._id === postId) {
                return {
                  ...p,
                  likes: data.likes
                }
              } else {
                return p
              }
            })
            queryClient.setQueryData(['posts', usernamePerfil], newsPost)
          }
        } else {
          const feed: any = queryClient.getQueryData('feed')
          const newPagesArray = feed?.pages.map((page: any) => {
            const dataPosts = page.data.map((postPage: any) => {
              if (postPage._id === postId) {
                return { ...postPage, likes: data.likes }
              }
              return postPage
            })
            return {
              data: dataPosts,
              nextCursor: page.data.nextCursor
            }
          })
          queryClient.setQueryData('feed', (dataQuery: any) => ({
            pages: newPagesArray,
            pageParams: dataQuery.pageParams
          }))
        }
        toast.success(`Le diste like!`)
      },
      onError: (err, variables, ctx) => {
        console.log('ERRORES: ', err, variables)
      }
    })
  }
  function dislikePost() {
    disLike.mutate(postId, {
      onSuccess: (data, ctx) => {
        if (isModal) {
          const posts: any = queryClient.getQueryData(['posts', usernamePerfil])
          if (posts) {
            const newsPost = posts.map((p: any) => {
              if (p._id === postId) {
                return {
                  ...p,
                  likes: data.likes
                }
              } else {
                return p
              }
            })
            queryClient.setQueryData(['posts', usernamePerfil], newsPost)
          }
        } else {
          const feed: any = queryClient.getQueryData('feed')
          const newPagesArray = feed?.pages.map((page: any) => {
            const dataFollows = page.data.map((postPage: any) => {
              if (postPage._id === postId) {
                return { ...postPage, likes: data.likes }
              }
              return postPage
            })
            return {
              data: dataFollows,
              nextCursor: page.data.nextCursor
            }
          })
          queryClient.setQueryData('feed', (dataQuery: any) => ({
            pages: newPagesArray,
            pageParams: dataQuery.pageParams
          }))
        }
        toast.success(`Le diste dislike!`)
      },
      onError: (err, variables, ctx) => {
        console.log('ERRORES: ', err, variables)
      }
    })
  }

  return (
    <div className="flex space-x-3">
      {isLike(likes) ? (
        <HeartIconSolid
          className="h-7 w-7 cursor-pointer text-red-600"
          onClick={dislikePost}
        />
      ) : (
        <HeartIconOutline
          className="h-7 w-7 cursor-pointer"
          onClick={likePost}
        />
      )}

      <ChatAlt2Icon className="h-7 w-7 cursor-pointer" />
    </div>
  )
}

export default LikeAndCommentButtons
