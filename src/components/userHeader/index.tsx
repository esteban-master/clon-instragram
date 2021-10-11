import React, { useState } from 'react'
import { User } from '../../models'
import { numeroAbreviado } from '../../utils/numero-abreviado'
import FollowersModal from '../followersModal'
import FollowingModal from '../followingModal'
import FollowUnFollow from '../followUnFollow'

const UserHeader = ({
  data: { user, isFollow },
  idUserLogged,
  postCount
}: {
  idUserLogged: string | undefined
  data: { user: User; isFollow: boolean }
  postCount: number
}) => {
  const [openFollowing, setOpenFollowing] = useState(false)
  const [openFollowers, setOpenFollowers] = useState(false)

  return (
    <div className="max-w-3xl mx-auto grid grid-cols-7 gap-x-2 gap-y-2 sm:gap-y-0 sm:grid sm:grid-rows-2 sm:grid-cols-12  pb-5 items-center">
      <div className="col-span-3 sm:col-span-4 sm:row-span-2">
        <img
          className=" h-24 w-24 sm:h-40 sm:w-40 object-cover rounded-full mx-auto"
          src={user.avatar ? user.avatar : '/avatar.png'}
          alt=""
        />
      </div>
      <div className="col-span-4 sm:col-span-8 space-y-1 sm:flex sm:space-x-3">
        <h2 className="text-2xl">{user.username}</h2>
        {idUserLogged !== user._id ? (
          <FollowUnFollow
            userId={user._id}
            isFollow={isFollow}
            userIdReq={idUserLogged!}
          />
        ) : (
          <button className="border border-gray-300 rounded-md px-2 py-0.5 font-semibold">
            Edit
          </button>
        )}
      </div>

      <div className="col-span-7 sm:col-span-8 sm:flex sm:flex-col-reverse">
        <div className="px-3 py-3 sm:px-0 text-sm">
          <h1 className="font-semibold">{user.name}</h1>
          {user.siteWeb && (
            <a className="text-blue-900 font-semibold" href="">
              {user.siteWeb}
            </a>
          )}
          {user.desc && <p>{user.desc}</p>}
        </div>
        <ul className="text-sm flex justify-around sm:justify-between border-t border-b  border-gray-300 py-2 sm:py-0 sm:border-0">
          <li className="text-center">
            <span className="text-gray-500 sm:text-black font-light sm:font-normal">
              {' '}
              <span className="block sm:inline-block font-semibold text-black">
                {postCount}
              </span>{' '}
              publicaciones{' '}
            </span>
          </li>
          <li
            onClick={() => setOpenFollowers(true)}
            className="text-center cursor-pointer text-gray-500 sm:text-black font-light sm:font-normal"
          >
            <span className="block sm:inline-block font-semibold text-black">
              {numeroAbreviado(user.followers)}
            </span>{' '}
            seguidores{' '}
            <FollowersModal
              isOpen={openFollowers}
              userId={user._id}
              setIsOpen={setOpenFollowers}
            />
          </li>
          <li
            onClick={() => setOpenFollowing(true)}
            className="text-center cursor-pointer sm:text-black font-light sm:font-normal"
          >
            <span className="block sm:inline-block font-semibold text-black">
              {numeroAbreviado(user.following)}
            </span>{' '}
            seguidos{' '}
            <FollowingModal
              isOpen={openFollowing}
              userId={user._id}
              setIsOpen={setOpenFollowing}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserHeader
