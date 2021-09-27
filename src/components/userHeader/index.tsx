import React, { useState } from 'react'
import { User } from '../../redux/auth/auth-slice'
import FollowersModal from '../followersModal'
import FollowingModal from '../followingModal'
import FollowUnFollow from '../followUnFollow'

const UserHeader = ({
  data: { user, isFollow },
  idUserLogged
}: {
  idUserLogged: string | undefined
  data: { user: User; isFollow: boolean }
}) => {
  const [openFollowing, setOpenFollowing] = useState(false)
  const [openFollowers, setOpenFollowers] = useState(false)

  return (
    <div className="mx-auto max-w-4xl grid grid-cols-5 my-4">
      <div className="col-span-2 flex justify-center">
        <img
          className="rounded-full h-40 w-40"
          src={user.avatar ? user.avatar : '/avatar.png'}
          alt=""
        />
      </div>
      <div className="col-span-3">
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
        <div className="mt-4">
          <ul className="flex space-x-8">
            <li>
              <span className="font-semibold">503</span> post
            </li>
            <li
              className="cursor-pointer hover:underline"
              onClick={() => setOpenFollowers(true)}
            >
              <span className="font-semibold">{user.followers}</span> followers
              <FollowersModal
                isOpen={openFollowers}
                userId={user._id}
                setIsOpen={setOpenFollowers}
              />
            </li>
            <li
              className="cursor-pointer hover:underline"
              onClick={() => setOpenFollowing(true)}
            >
              <span className="font-semibold">{user.following}</span> following
              <FollowingModal
                isOpen={openFollowing}
                userId={user._id}
                setIsOpen={setOpenFollowing}
              />
            </li>
          </ul>
        </div>
        <div className="mt-5">
          <h1 className="font-semibold text-lg">{user.name} </h1>
          {user.siteWeb && (
            <a href={user.siteWeb} target="_blank">
              {user.siteWeb}
            </a>
          )}
          {user.desc && <p>{user.desc}</p>}
        </div>
      </div>
    </div>
  )
}

export default UserHeader
