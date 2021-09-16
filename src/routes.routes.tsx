import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/home'
import User from './pages/user'
import Menu from './components/menu'
import { useAuth } from './redux/store'
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
