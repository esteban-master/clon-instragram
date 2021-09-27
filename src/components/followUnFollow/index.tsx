import React from 'react'
import { useQueryClient } from 'react-query'
import { useFollow, useUnFollow } from '../../gql/follow'
import { toast } from 'react-toastify'
import { useAuth } from '../../redux/store'

const FollowUnFollow = ({
  userId,
  userIdReq,
  isFollow
}: {
  userId: string
  userIdReq: string
  isFollow: boolean
}) => {
  const queryClient = useQueryClient()
  const follow = useFollow()
  const unFollow = useUnFollow()
  const { login } = useAuth()

  function hacerFollow() {
    console.log('FOLLOW userId: ', userId)
    console.log('FOLLOW userIdReq: ', userIdReq)
    follow.mutate(userId, {
      onSuccess: ({ follow, user }, variables) => {
        // Actualizar usuario seguido
        queryClient.setQueryData(['user', follow.username], {
          user: follow,
          isFollow: true
        })
        // Actualizar usuario logeado en el sistema
        queryClient.setQueryData(['user', user.username], {
          user,
          isFollow: false
        })

        const dataFollowing: any = queryClient.getQueryData([
          'following',
          userIdReq
        ])
        console.log('DATA FOLLOWING: ', dataFollowing)
        if (dataFollowing) {
          const newPagesArray = dataFollowing?.pages.map((page: any) => {
            const dataFollows = page.data.map((val: any) => {
              if (val.follow._id === follow._id) {
                val.isFollow = true
                return val
              }
              return val
            })
            return {
              data: dataFollows,
              nextCursor: page.data.nextCursor
            }
          })
          queryClient.setQueryData(
            ['following', userIdReq],
            (dataQuery: any) => ({
              pages: newPagesArray,
              pageParams: dataQuery.pageParams
            })
          )
        }
        const dataFollowers: any = queryClient.getQueryData([
          'followers',
          userIdReq
        ])
        console.log('Darta followers: ', dataFollowers)
        if (dataFollowers) {
          const newPagesArray = dataFollowers?.pages.map((page: any) => {
            const dataFollows = page.data.map((val: any) => {
              if (val.userId._id === follow._id) {
                val.isFollow = true
                return val
              }
              return val
            })
            return {
              data: dataFollows,
              nextCursor: page.data.nextCursor
            }
          })
          queryClient.setQueryData(
            ['followers', userIdReq],
            (dataQuery: any) => ({
              pages: newPagesArray,
              pageParams: dataQuery.pageParams
            })
          )
        }

        toast.success(`Siguiendo a ${follow.username}`)
      },
      onError: (err, variables, ctx) => {
        console.log('Error follow: ', err, variables, ctx)
      }
    })
  }

  function hacerUnFollow() {
    unFollow.mutate(userId, {
      onSuccess: ({ user, unFollow }, variables) => {
        queryClient.setQueryData(['user', unFollow.username], {
          user: unFollow,
          isFollow: false
        })
        queryClient.setQueryData(['user', user.username], {
          user,
          isFollow: false
        })
        const data: any = queryClient.getQueryData(['following', user._id])
        if (data) {
          const newPagesArray = data?.pages.map((page: any) => {
            const dataFollows = page.data.filter(
              (val: any) => val.follow._id !== unFollow._id
            )
            return {
              data: dataFollows,
              nextCursor: page.data.nextCursor
            }
          })
          queryClient.setQueryData(
            ['following', user._id],
            (dataQuery: any) => ({
              pages: newPagesArray,
              pageParams: dataQuery.pageParams
            })
          )
        }
        const dataUserReqFollowing: any = queryClient.getQueryData([
          'following',
          userIdReq
        ])
        if (dataUserReqFollowing) {
          const newPagesArray = dataUserReqFollowing?.pages.map((page: any) => {
            const dataFollows = page.data.map((val: any) => {
              if (val.follow._id === unFollow._id) {
                val.isFollow = false
                return val
              }
              return val
            })
            return {
              data: dataFollows,
              nextCursor: page.data.nextCursor
            }
          })
          queryClient.setQueryData(
            ['following', userIdReq],
            (dataQuery: any) => ({
              pages: newPagesArray,
              pageParams: dataQuery.pageParams
            })
          )
        }

        const dataUserReqFollowers: any = queryClient.getQueryData([
          'followers',
          userIdReq
        ])
        if (dataUserReqFollowers) {
          const newPagesArray = dataUserReqFollowers?.pages.map((page: any) => {
            const dataFollows = page.data.map((val: any) => {
              if (val.userId._id === unFollow._id) {
                val.isFollow = false
                return val
              }
              return val
            })
            return {
              data: dataFollows,
              nextCursor: page.data.nextCursor
            }
          })
          queryClient.setQueryData(
            ['followers', userIdReq],
            (dataQuery: any) => ({
              pages: newPagesArray,
              pageParams: dataQuery.pageParams
            })
          )
        }
        toast.success(`Ya no sigues a ${unFollow.username}`)
      },
      onError: (err, variables, ctx) => {
        console.log('Error unfollow: ', err, variables, ctx)
      }
    })
  }

  if (userId === login.user?._id) return null
  return (
    <>
      {isFollow ? (
        <button
          onClick={hacerUnFollow}
          disabled={unFollow.isLoading}
          className="bg-red-500 text-white rounded-md px-5 py-0.5 font-semibold"
        >
          {unFollow.isLoading ? '...loading' : 'Unfollow'}
        </button>
      ) : (
        <button
          onClick={hacerFollow}
          disabled={follow.isLoading}
          className="bg-blue-500 text-white rounded-md px-5 py-0.5 font-semibold"
        >
          {follow.isLoading ? '...loading' : 'Follow'}
        </button>
      )}
    </>
  )
}

export default FollowUnFollow
