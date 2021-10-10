import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../../models'
import { formatNumero } from '../../utils/formatNumero'
import TimeAgoReact from 'timeago-react'
import * as timeago from 'timeago.js'
import es from 'timeago.js/lib/lang/es'
import { useDisLikePost, useLikePost } from '../../gql/post'
import {
  HeartIcon as HeartIconOutline,
  ChatAlt2Icon
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { useAuth } from '../../redux/store'
import { useQueryClient } from 'react-query'
timeago.register('es', es)

const PostItem = ({ post }: { post: Post }) => {
  const queryClient = useQueryClient()
  const { postedBy, text, photo, likes, createdAt } = post
  const { login } = useAuth()

  const like = useLikePost()
  const disLike = useDisLikePost()

  function isLike(likes: any[]) {
    return likes.some((u) => u._id === login.user?._id)
  }

  function likePost() {
    like.mutate(post._id, {
      onSuccess: (data, variables, ctx) => {
        const feed: any = queryClient.getQueryData('feed')
        const newPagesArray = feed?.pages.map((page: any) => {
          const dataPosts = page.data.map((postPage: any) => {
            if (postPage._id === post._id) {
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
      },
      onError: (err, variables, ctx) => {
        console.log('ERRORES: ', err, variables)
      }
    })
  }
  function dislikePost() {
    disLike.mutate(post._id, {
      onSuccess: (data, ctx) => {
        const feed: any = queryClient.getQueryData('feed')
        const newPagesArray = feed?.pages.map((page: any) => {
          const dataFollows = page.data.map((postPage: any) => {
            if (postPage._id === post._id) {
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
      },
      onError: (err, variables, ctx) => {
        console.log('ERRORES: ', err, variables)
      }
    })
  }

  return (
    <div className="border border-gray-300 max-w-lg rounded-sm">
      <div className="flex justify-between items-center py-2 px-3">
        <div className="flex space-x-3 items-center">
          <img
            className="rounded-full h-9"
            src={postedBy.avatar ? postedBy.avatar : '/avatar.png'}
            alt="Foto"
          />
          <Link className="font-semibold text-sm" to={`/${postedBy.username}`}>
            {postedBy.username}
          </Link>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </div>
      <div>
        <img className="object-cover w-full" src={photo} alt="" />
      </div>

      <div className="py-2 px-3 space-y-2">
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

        <div className="space-y-2">
          <span className="font-semibold text-sm ">
            {formatNumero(likes.length)} Me Gusta
          </span>
          <div className="flex space-x-3">
            <a className="font-semibold text-sm" href="">
              {postedBy.username}
            </a>
            <p className="text-sm">{text}</p>
          </div>
          <div className="text-xs text-gray-400">
            <TimeAgoReact datetime={createdAt} locale="es" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
