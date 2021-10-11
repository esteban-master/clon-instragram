import React from 'react'
import { Post } from '../../models'
import PostItemPerfil from './PostItemPerfil'

const ListPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 mx-auto max-w-4xl border-0 border-gray-200 sm:border-t sm:py-7">
      {posts.map((p) => (
        <PostItemPerfil key={p._id} p={p} />
      ))}
    </div>
  )
}

export default ListPosts
