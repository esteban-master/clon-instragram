import React from 'react'
import { User } from '../../models'
import FollowUnFollow from '../followUnFollow'

const TitleUserHeader = ({
  user,
  idUserLogged,
  isFollow
}: {
  user: User
  idUserLogged: string
  isFollow: boolean
}) => {
  return (
    <div className="flex items-center space-x-3">
      <h2 className="text-2xl"> {user.username} </h2>
      {idUserLogged !== user._id ? (
        <FollowUnFollow
          userId={user._id}
          isFollow={isFollow}
          userIdReq={idUserLogged!}
        />
      ) : (
        <button className="border border-gray-300 rounded-md px-2 py-0.5 font-semibold">
          Edit Profile
        </button>
      )}
    </div>
  )
}

export default TitleUserHeader
