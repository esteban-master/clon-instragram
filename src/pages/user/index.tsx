import React from 'react'
import { useParams } from 'react-router'
import { useUserByUsername } from '../../gql/user'
import { Image, Spinner } from '@vechaiui/react'
import { UserNotFound } from '../usernotfound'

const User = () => {
  const { username } = useParams<{ username: string }>()
  const { data, isLoading, isError } = useUserByUsername(username)

  if (isError) return <UserNotFound />
  if (isLoading) return <Spinner size="xl" />

  return (
    <div className="mx-auto max-w-4xl grid grid-cols-5 mt-4">
      <div className="col-span-2 flex justify-center">
        <Image
          htmlWidth="170"
          htmlHeight="170"
          className="rounded-full"
          src={data.avatar ? data.avatar : '/avatar.png'}
        />
      </div>
      <div className="col-span-3">
        <div>Header profile</div>
        <div>Followers</div>
        {data.siteWeb && (
          <a href={data.siteWeb} target="_blank">
            {data.siteWeb}
          </a>
        )}
        {data.desc && <p>{data.desc}</p>}
      </div>
    </div>
  )
}

export default User
