import React, { useState } from 'react'
import { Post } from '../../models'
import { numeroAbreviado } from '../../utils/numero-abreviado'
import PostModal from '../postModal'

const PostItemPerfil = ({ p }: { p: Post }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      onClick={() => setIsOpen(true)}
      key={p._id}
      className="relative h-32 w-full sm:h-44 md:h-56  foto cursor-pointer"
    >
      <img
        src={p.photo}
        alt=" "
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="overlay absolute opacity-0 inset-0  bg-black "></div>
      <div className="content_foto opacity-0 relative h-full  text-white text-lg   flex items-center justify-center space-x-6">
        <div className="flex space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>{' '}
          <span> {numeroAbreviado(p.likes.length)}</span>
        </div>
        <div className="flex space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
          <span>{numeroAbreviado(p.comments.length)}</span>
        </div>
      </div>

      {isOpen && <PostModal isOpen={isOpen} setIsOpen={setIsOpen} post={p} />}
    </div>
  )
}

export default PostItemPerfil
