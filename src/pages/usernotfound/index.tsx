import React from 'react'
import { Link } from 'react-router-dom'

export const UserNotFound = () => {
  return (
    <div className="max-w-4xl mx-auto text-center mt-4">
      <h1 className="text-xl font-bold">Sorry, this page isn't available.</h1>
      <p>
        The link you followed may be broken, or the page may have been removed.{' '}
        <span>
          <Link className="text-blue-500" to="/">
            Go back to Instagram.
          </Link>
        </span>
      </p>
    </div>
  )
}
