import React from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../../models'
import { formatNumero } from '../../utils/formatNumero'
import TimeAgoReact from 'timeago-react'
import * as timeago from 'timeago.js'
import es from 'timeago.js/lib/lang/es'
timeago.register('es', es)

const PostItem = ({ post }: { post: Post }) => {
  const { postedBy, text, photo, likes, createdAt } = post
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
        <div className="flex justify-between ">
          <div className="flex space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
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
