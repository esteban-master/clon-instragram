import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

interface RoutePropsPrivate extends RouteProps {
  logged: boolean
}

const PrivateRoute = ({ logged, children, ...rest }: RoutePropsPrivate) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return logged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: props.location }
            }}
          />
        )
      }}
    />
  )
}

export default PrivateRoute
