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

          {/* {routes.map((route) => {
            if (route.private) {
              return (
                <PrivateRoute
                  key={route.path?.toString()}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                  logged={auth.logged}
                />
              )
            } else {
              return (
                <Route
                  key={route.path?.toString()}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              )
            }
          })} */}
        </Switch>
      </BrowserRouter>
    </div>
  )
}

// interface RoutePropsWithPrivate extends RouteProps {
//   private?: boolean
// }

// const routes: RoutePropsWithPrivate[] = [
//   { path: '/', component: Home, exact: true, private: true },
//   { path: '/auth', component: AuthPage },
//   { path: '/:username', component: User }
// ]

const Menu = ({ auth }: { auth: StateAuth }) => {
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

  if (!auth.logged) {
    return null
  }

  if (auth.logged && location.pathname === '/auth') {
    return <Redirect to="/" />
  }

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
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
        </li>
        <li>
          <button
            onClick={() => {
              dispatch(logoutAction())
              history.replace('/')
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
