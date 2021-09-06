import React, { ReactNode, useState } from 'react'
import Login from './login'
import Register from './register'
import { Link as LinkUI } from '@vechaiui/react'
const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true)
  return (
    <div className="flex justify-center h-screen items-center">
      <div>
        <div className="">
          {showLogin ? (
            <SelectUI
              type="login"
              Component={Login}
              setShowLogin={setShowLogin}
            />
          ) : (
            <SelectUI
              type="register"
              Component={Register}
              setShowLogin={setShowLogin}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const SelectUI = ({
  type,
  Component,
  setShowLogin
}: {
  type: 'login' | 'register'
  Component: React.ComponentType
  setShowLogin: (show: boolean) => void
}) => {
  return (
    <div>
      <Component />
      <p className="border border-gray-300 p-4 bg-white my-2">
        {`¿${type === 'login' ? 'No ' : 'Tienes '} una cuenta?`}
        <LinkUI
          as="span"
          className="mx-1 font-bold text-blue-500"
          onClick={() => setShowLogin(type === 'login' ? false : true)}
        >
          {type === 'login' ? 'Regístrate' : 'Inicia sesión'}
        </LinkUI>
      </p>
    </div>
  )
}

export default AuthPage
