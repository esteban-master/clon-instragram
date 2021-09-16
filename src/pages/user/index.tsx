import React from 'react'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router'
import { useFollow, useIsFollow, useUnFollow } from '../../gql/follow'
import { useUserByUsername } from '../../gql/user'
import { useAuth } from '../../redux/store'
import { UserNotFound } from '../usernotfound'
import { toast } from 'react-toastify'

const User = () => {
  const queryClient = useQueryClient()
  const auth = useAuth()
  const follow = useFollow()
  const unFollow = useUnFollow()
  const { username } = useParams<{ username: string }>()
  const user = useUserByUsername(username)
  const userId = user.data?._id
  const isFollow = useIsFollow(userId)

  if (user.isError) return <UserNotFound />
  if (isFollow.isLoading || user.isLoading) return <p>Cargando</p>

  function hacerFollow() {
    follow.mutate(user.data._id, {
      onSuccess: ({ follow, user }) => {
        queryClient.setQueryData(['user', follow.username], follow)
        queryClient.setQueryData(['isFollow', follow._id], true)
        queryClient.setQueryData(['user', user.username], user)
        toast.success(`Siguiendo a ${follow.username}`)
      },
      onError: (err, variables, ctx) => {
        console.log('Error follow: ', err, variables, ctx)
      }
    })
  }
  function hacerUnFollow() {
    unFollow.mutate(user.data._id, {
      onSuccess: ({ user, unFollow }) => {
        queryClient.setQueryData(['user', unFollow.username], unFollow)
        queryClient.setQueryData(['isFollow', unFollow._id], false)
        queryClient.setQueryData(['user', user.username], user)
        toast.success(`Ya no sigues a ${unFollow.username}`)
      },
      onError: (err, variables, ctx) => {
        console.log('Error unfollow: ', err, variables, ctx)
      }
    })
  }
  return (
    <div className="mx-auto max-w-4xl grid grid-cols-5 mt-4">
      <div className="col-span-2 flex justify-center">
        <img
          className="rounded-full h-40 w-40"
          src={user.data.avatar ? user.data.avatar : '/avatar.png'}
          alt=""
        />
      </div>
      <div className="col-span-3">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl"> {user.data.username} </h2>
          {auth.login.user?._id !== user.data._id ? (
            <>
              {isFollow.data ? (
                <button
                  onClick={hacerUnFollow}
                  className="bg-red-500 text-white rounded-md px-5 py-0.5 font-semibold"
                >
                  {unFollow.isLoading ? '...loading' : 'Unfollow'}
                </button>
              ) : (
                <button
                  onClick={hacerFollow}
                  className="bg-blue-500 text-white rounded-md px-5 py-0.5 font-semibold"
                >
                  {follow.isLoading ? '...loading' : 'Follow'}
                </button>
              )}
            </>
          ) : (
            <button className="border border-gray-300 rounded-md px-2 py-0.5 font-semibold">
              Edit Profile
            </button>
          )}
        </div>
        <div className="mt-4">
          <ul className="flex space-x-8">
            <li>
              <span className="font-semibold">503</span> post
            </li>
            <li>
              <span className="font-semibold">{user.data.followers}</span>{' '}
              followers
            </li>
            <li>
              <span className="font-semibold">{user.data.following}</span>{' '}
              following
            </li>
          </ul>
        </div>
        <div className="mt-5">
          <h1 className="font-semibold text-lg">{user.data.name} </h1>
          {user.data.siteWeb && (
            <a href={user.data.siteWeb} target="_blank">
              {user.data.siteWeb}
            </a>
          )}
          {user.data.desc && <p>{user.data.desc}</p>}
        </div>
      </div>
    </div>
  )
}

export default User
