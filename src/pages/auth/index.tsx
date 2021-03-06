import React, { ReactNode, useEffect, useState } from 'react'
import Login from './login'
import Register from './register'
import { useLocation } from 'react-router'

const AuthPage = () => {
  const { state } = useLocation<{ email?: string }>()

  useEffect(() => {
    setShowLogin(true)
  }, [state])

  const [showLogin, setShowLogin] = useState(true)
  return (
    <div className="flex justify-center h-screen items-center">
      <div>
        <div className="">
          {showLogin ? (
            <div>
              <Login initialValues={{ email: state?.email || '' }} />
              <p className="border border-gray-300 p-4 bg-white my-2">
                ¿No tienes una cuenta?
                <span
                  className="mx-1 font-bold text-blue-500"
                  onClick={() => setShowLogin(false)}
                >
                  Regístrate
                </span>
              </p>
            </div>
          ) : (
            <div>
              <Register />
              <p className="border border-gray-300 p-4 bg-white my-2">
                ¿Tienes una cuenta?
                <span
                  className="mx-1 font-bold text-blue-500"
                  onClick={() => setShowLogin(true)}
                >
                  Inicia sesión
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
