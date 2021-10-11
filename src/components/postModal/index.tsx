import React, { useRef } from 'react'
import { Dialog } from '@headlessui/react'
import CommentPost from '../listPostFeed/CommentPost'
import { Post } from '../../models'
import { useAuth } from '../../redux/store'
import { XIcon } from '@heroicons/react/solid'
const PostModal = ({
  isOpen,
  setIsOpen,
  post
}: {
  isOpen: boolean
  post: Post
  setIsOpen: any
}) => {
  let textRef = useRef(null)
  const { login } = useAuth()
  return (
    <Dialog
      open={isOpen}
      initialFocus={textRef}
      onClose={() => setIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center  min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded  mx-auto flex">
          <img className="max-w-xl" src={post.photo} alt="" />
          <div className="px-2  flex flex-col justify-between py-3 ">
            <div className="border-b border-gray-200 pb-3">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-3">
                  <img
                    src={
                      post.postedBy.avatar
                        ? post.postedBy.avatar
                        : '/avatar.png'
                    }
                    className="h-10 w-10 rounded-full"
                    alt=""
                  />
                  <span className="text-xl">{post.postedBy.username}</span>
                </div>
                <button onClick={() => setIsOpen(false)}>
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              {post.text && <div className="px-3 mt-2">{post.text}</div>}
            </div>

            <CommentPost
              comments={post.comments}
              idPost={post._id}
              userAuth={login.user!}
              listarComments={true}
              likes={post.likes}
              textRef={textRef}
              usernamePerfil={post.postedBy.username}
              createPost={post.createdAt}
            />
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default PostModal
