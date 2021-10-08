import React from 'react'
import { User } from '../../models'
import DataPostFollows from './DataPostFollows'
import DescriptionUserHeader from './DescriptionUserHeader'
import TitleUserHeader from './TitleUserHeader'

const UserHeader = ({
  data: { user, isFollow },
  idUserLogged,
  postCount
}: {
  idUserLogged: string | undefined
  data: { user: User; isFollow: boolean }
  postCount: number
}) => {
  return (
    <div className="mx-auto max-w-4xl grid-flow-row grid md:grid-cols-5 grid-rows-3 grid-cols-3 my-4">
      <div className="md:col-span-2 flex justify-center items-center">
        <img
          className="rounded-full h-20 w-20 md:h-40 md:w-40"
          src={user.avatar ? user.avatar : '/avatar.png'}
          alt=""
        />
      </div>
      <div>
        <TitleUserHeader
          user={user}
          isFollow={isFollow}
          idUserLogged={idUserLogged!}
        />
      </div>
      <div className="row-start-3 row-end-3 col-start-1 col-end-4 border-gray-200 border-t border-b">
        <DataPostFollows postCount={postCount} user={user} />
      </div>
      <div className="row-start-2 col-start-1 col-end-4">
        <DescriptionUserHeader user={user} />
      </div>
    </div>
  )
}

export default UserHeader
