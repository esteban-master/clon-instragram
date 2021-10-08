import React from 'react'
import LoginForm from '../../../components/auth/loginForm'
import { toast } from 'react-toastify'
import { useLogin } from '../../../gql/user'
import { useHistory } from 'react-router'
import { useAppDispatch } from '../../../redux/store'
import { loginAction } from '../../../redux/auth/auth-slice'

const Login = ({ initialValues }: { initialValues: { email: string } }) => {
  const { mutate, isLoading } = useLogin()
  const history = useHistory()
  const dispatch = useAppDispatch()

  function handleSubmit(values: any) {
    mutate(values, {
      onSuccess: ({ login }, variables, ctx) => {
        toast.success(`Bienvenido ${login.user?.name}`)
        dispatch(loginAction(login))
        history.replace('/')
      },
      onError: (err, variables, ctx) => {
        toast.error(err.response.errors[0].message)
      }
    })
  }
  return (
    <div className="bg-white p-4 w-80 border border-gray-300 space-y-4">
      <h1 className="text-2xl font-bold text-center">Intagram</h1>
      <LoginForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}

export default Login
