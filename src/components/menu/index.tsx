import React, { useEffect, useState } from 'react'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { Redirect, useHistory, useLocation } from 'react-router'
import { logoutAction, StateAuth } from '../../redux/auth/auth-slice'
import { useAppDispatch } from '../../redux/store'
import { Link } from 'react-router-dom'
import Search from '../search'
import CreatePostModal from '../upload/createPost-modal'

const Menu = ({ auth }: { auth: StateAuth }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (auth.logged && auth.login.token) {
      const { exp }: JwtPayload = jwtDecode(auth.login.token)
      // Lo multiplico por 1000 para tener la fecha actual
      // Si la fecha es menor a la feca actual, es por que expiro el token
      if (exp! * 1000 < new Date().getTime()) {
        console.log('jwt expirado')
        dispatch(logoutAction())
        history.push('/')
      }
    }
  }, [location.pathname])

  if (location.pathname === '/auth') {
    return null
  }

  if (auth.logged && location.pathname === '/auth') {
    return <Redirect to="/" />
  }

  return (
    <>
      <div className="border-2 border-b border-gray-200 shadow-sm py-2">
        <div className="max-w-4xl mx-auto grid grid-cols-12">
          <div className="col-span-3">
            <Link className="font-bold text-xl" to="/">
              Instagram
            </Link>
          </div>
          <div className="col-span-6  place-self-center">
            <Search />
          </div>
          <div className="col-span-3 flex space-x-2 justify-self-end">
            <div>
              <button onClick={() => setIsOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.3}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
            <div>
              <Link to={`/${auth.login.user?.username}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.3}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch(logoutAction())
                  history.replace('/')
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.3}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CreatePostModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userId={auth.login.user?._id}
      />
    </>
  )
}

export default Menu
