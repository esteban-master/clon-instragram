import React from 'react'
import { User } from '../../models'

const DescriptionUserHeader = ({ user }: { user: User }) => {
  return (
    <div className="px-3">
      <h1 className="font-semibold text-lg">{user.name} </h1>
      {user.siteWeb && (
        <a href={user.siteWeb} target="_blank">
          {user.siteWeb}
        </a>
      )}
      {user.desc && <p>{user.desc}</p>}
    </div>
  )
}

export default DescriptionUserHeader
