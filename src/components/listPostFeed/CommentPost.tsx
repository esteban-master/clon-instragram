import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Comment, Post, User } from '../../models'
import TimeAgoReact from 'timeago-react'
import * as timeago from 'timeago.js'
import es from 'timeago.js/lib/lang/es'
import { useCommentPost, useDeleteCommentPost } from '../../gql/post'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { XCircleIcon } from '@heroicons/react/solid'
import LikeAndCommentButtons from './LikeAndCommentButtons'
import { numeroAbreviado } from '../../utils/numero-abreviado'
timeago.register('es', es)

const CommentPost = ({
  comments,
  idPost,
  userAuth,
  listarComments = false,
  likes,
  textRef,
  usernamePerfil,
  createPost
}: {
  comments: Comment[]
  idPost: string
  userAuth: User
  listarComments?: boolean
  likes?: Pick<User, '_id' | 'avatar' | 'username'>[]
  textRef?: any
  usernamePerfil?: string
  createPost?: string
}) => {
  const queryClient = useQueryClient()
  const [mostrarComments, setMostrarComments] = useState(listarComments)
  const [text, setText] = useState('')

  const commentPost = useCommentPost()
  const deleteCommentPost = useDeleteCommentPost()

  function deleteComment({ postedBy, _id, ...rest }: Comment) {
    const posts: any = queryClient.getQueryData(['posts', usernamePerfil])
    console.log('idPosts: ', idPost, 'IDECOMENT: ', _id)
    deleteCommentPost.mutate(
      {
        idPost,
        idComment: _id,
        idPostedBy: postedBy._id
      },
      {
        onSuccess: (_, { idComment, idPost }, ctx) => {
          if (listarComments) {
            const postsCache: any = queryClient.getQueryData([
              'posts',
              usernamePerfil
            ])
            const newPosts = postsCache.map((p: any) => {
              if (p._id === idPost) {
                return {
                  ...p,
                  comments: p.comments.filter((c: any) => c._id !== _id)
                }
              } else {
                return p
              }
            })
            queryClient.setQueryData(['posts', usernamePerfil], newPosts)
            toast.success(`Comentario borrado!`)
          } else {
            const feed: any = queryClient.getQueryData('feed')
            const newPagesArray = feed?.pages.map((page: any) => {
              const dataFollows = page.data.map((postPage: Post) => {
                if (postPage._id === idPost) {
                  return {
                    ...postPage,
                    comments: postPage.comments.filter(
                      (c) => c._id !== idComment
                    )
                  }
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
            toast.success(`Comentario borrado!`)
          }
        },
        onError: (err, variables, ctx) => {
          console.log('ERRORES: ', err, variables)
        }
      }
    )
  }

  function publicarComment() {
    commentPost.mutate(
      { text, idPost },
      {
        onSuccess: (data, variables, ctx) => {
          if (listarComments) {
            const postsCache: any = queryClient.getQueryData([
              'posts',
              usernamePerfil
            ])
            const newPosts = postsCache.map((p: any) => {
              if (p._id === data._id) {
                return data
              }
              return p
            })

            queryClient.setQueryData(['posts', usernamePerfil], newPosts)
            toast.success(`Comentario agregado!`)
            setText('')
          } else {
            const feed: any = queryClient.getQueryData('feed')
            const newPagesArray = feed?.pages.map((page: any) => {
              const dataFollows = page.data.map((postPage: any) => {
                if (postPage._id === idPost) {
                  return data
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
            setText('')
            toast.success(`Comentario agregado!`)
          }
        },
        onError: (err, variables, ctx) => {
          console.log('ERRORES: ', err, variables)
        }
      }
    )
  }

  function mostrar() {
    return (
      <div>
        <div
          className={`overflow-y-auto ${listarComments ? 'h-56' : 'max-h-28'}`}
        >
          {comments
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .map((c) => (
              <div
                key={c._id}
                className="flex my-2 items-center justify-between px-2"
              >
                <div className="flex space-x-2 items-center">
                  <img
                    className="h-6 w-6 rounded-full"
                    src={c.postedBy.avatar ? c.postedBy.avatar : '/avatar.png'}
                    alt=""
                  />
                  <Link
                    className="font-semibold text-sm"
                    to={`/${c.postedBy.username}`}
                  >
                    {c.postedBy.username}
                  </Link>
                  <p className="text-sm">{c.text}</p>
                  <TimeAgoReact
                    className="text-xs text-gray-500 font-light"
                    datetime={c.createdAt}
                    locale="es"
                  />
                </div>
                {c.postedBy._id === userAuth._id && (
                  <button>
                    <XCircleIcon
                      className="h-5 w-5 text-red-600 cursor-pointer"
                      onClick={() => deleteComment(c)}
                    />
                  </button>
                )}
              </div>
            ))}
        </div>
        {listarComments && (
          <>
            <LikeAndCommentButtons
              user={userAuth}
              likes={likes!}
              postId={idPost}
              usernamePerfil={usernamePerfil}
              isModal
            />
            <div className="font-semibold ">
              {numeroAbreviado(likes?.length!)} Me gusta
            </div>
            <div className="text-xs text-gray-400">
              <TimeAgoReact datetime={createPost!} locale="es" />
            </div>
          </>
        )}
      </div>
    )
  }
  return (
    <div className="flex flex-col justify-between">
      {listarComments ? null : comments.length ? (
        <button
          className="text-sm text-gray-400 hover:underline"
          onClick={() => setMostrarComments((state) => !state)}
        >
          {mostrarComments ? 'Ocultar' : 'Ver'} los {comments.length}{' '}
          comentarios
        </button>
      ) : (
        <p className="text-sm text-gray-400">Sin comentarios</p>
      )}

      {mostrarComments && mostrar()}

      <div className="flex border-t border-gray-200">
        <textarea
          className="w-full rounded-sm outline-none h-10 text-xs py-3 resize-none"
          rows={4}
          ref={textRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Agregar un comentario"
        ></textarea>
        <button
          onClick={publicarComment}
          className="text-blue-500 font-semibold text-sm"
        >
          {commentPost.isLoading ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
    </div>
  )
}

export default CommentPost
