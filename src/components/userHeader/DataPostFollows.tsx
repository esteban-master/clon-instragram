import React, { useState } from 'react'
import { User } from '../../models'
import { numeroAbreviado } from '../../utils/numero-abreviado'
import FollowersModal from '../followersModal'
import FollowingModal from '../followingModal'

const DataPostFollows = ({
  user,
  postCount
}: {
  user: User
  postCount: number
}) => {
  const [openFollowing, setOpenFollowing] = useState(false)
  const [openFollowers, setOpenFollowers] = useState(false)
  return (
    <>
      <ul className="flex space-x-8 justify-center">
        <li>
          <span className="font-semibold">{postCount}</span> post
        </li>
        <li
          className="cursor-pointer hover:underline"
          onClick={() => setOpenFollowers(true)}
        >
          <span className="font-semibold">
            {numeroAbreviado(user.followers)}
          </span>{' '}
          followers
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
          <span className="font-semibold">
            {numeroAbreviado(user.following)}
          </span>{' '}
          following
          <FollowingModal
            isOpen={openFollowing}
            userId={user._id}
            setIsOpen={setOpenFollowing}
          />
        </li>
      </ul>
    </>
  )
}

export default DataPostFollows
