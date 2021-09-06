import React from 'react'
import LoginForm from '../../../components/auth/loginForm'
import { toast } from 'react-toastify'
import { useLogin } from '../../../gql/user'
import { useHistory } from 'react-router'

const Login = () => {
  let history = useHistory()
  const { mutate, error, status, isLoading } = useLogin()

  function handleSubmit(values: any) {
    mutate(values, {
      onSuccess: ({ login: { user } }, variables, ctx) => {
        toast.success(`Bienvenido ${user.name}`)
        history.push('/home')
      },
      onError: (err: any, variables, ctx) => {
        toast.error(err.response.errors[0].message)
      }
    })
  }
  return (
    <div className="bg-white p-4 w-80 border border-gray-300 space-y-4">
      <h1 className="text-2xl font-bold text-center">Intagram</h1>
      <LoginForm handleSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}

export default Login
