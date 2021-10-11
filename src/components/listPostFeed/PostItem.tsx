import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../../models'
import { formatNumero } from '../../utils/formatNumero'
import TimeAgoReact from 'timeago-react'
import * as timeago from 'timeago.js'
import es from 'timeago.js/lib/lang/es'

import { useAuth } from '../../redux/store'

import CommentPost from './CommentPost'
import LikeAndCommentButtons from './LikeAndCommentButtons'

timeago.register('es', es)

const PostItem = ({ post }: { post: Post }) => {
  const { postedBy, text, photo, likes, createdAt, comments } = post
  const { login } = useAuth()

  return (
    <div className="border border-gray-300 max-w-lg rounded-sm bg-white">
      <div className="flex justify-between items-center py-2 px-3">
        <div className="flex space-x-3 items-center">
          <img
            className="rounded-full h-8 w-8 object-cover"
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

      <div className="py-2 px-3 space-y-2 ">
        <LikeAndCommentButtons
          user={login.user!}
          likes={likes}
          postId={post._id}
        />

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
          <CommentPost
            comments={comments}
            idPost={post._id}
            userAuth={login.user!}
          />
        </div>
      </div>
    </div>
  )
}

export default PostItem
