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
    <BrowserRouter>
      <Menu auth={auth} />
      <div className="mt-14 py-3">
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
      </div>
    </BrowserRouter>
  )
}
