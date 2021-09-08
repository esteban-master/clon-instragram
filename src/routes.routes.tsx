import React, { useEffect } from 'react'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
  Link
} from 'react-router-dom'
import Home from './pages/home'
import User from './pages/user'
import { useAppDispatch, useAuth } from './redux/store'
import { logoutAction, StateAuth } from './redux/auth/auth-slice'
import AuthPage from './pages/auth'
import PrivateRoute from './components/auth/privateRoute'

export default function Router() {
  const auth = useAuth()
  return (
    <div className="">
      <BrowserRouter>
        <Menu auth={auth} />
        <Switch>
          <PrivateRoute path="/" exact logged={auth.logged}>
            <Home />
          </PrivateRoute>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route path="/:username">
            <User />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

const Menu = ({ auth }: { auth: StateAuth }) => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
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
    }
  }, [location.pathname])

  if (location.pathname === '/auth') {
    return null
  }

  if (auth.logged && location.pathname === '/auth') {
    return <Redirect to="/" />
  }

  return (
    <div className="border-2 border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto flex justify-between py-3">
        <div>
          <Link className="font-bold text-xl" to="/">
            Instagram
          </Link>
        </div>
        <div>
          <label htmlFor="buscar" className="relative">
            <input
              type="text"
              id="buscar"
              className="py-0 border-2 border-gray-300 rounded-sm"
            />
            <div className="flex space-x-1 items-center absolute -inset-y-1 inset-x-1/3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text">Buscar</span>
            </div>
          </label>
        </div>
        <div className="flex space-x-1">
          <div>
            <Link to={`/${auth.login.user?.username}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9"
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
                className="h-9 w-9"
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
  )
}
