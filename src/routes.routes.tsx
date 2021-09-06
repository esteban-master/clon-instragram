import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthPage from './pages/auth'
import Home from './pages/home'
import User from './pages/user'

export default function Router() {
  return (
    <div className="">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <AuthPage />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/:username">
            <User />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
