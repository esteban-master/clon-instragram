import React from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import RegisterForm, {
  ValuesFormRegister
} from '../../../components/auth/registerForm'
import { useRegister } from '../../../gql/user'

const Register = () => {
  const { mutate, isLoading } = useRegister()
  let history = useHistory()
  function handleSubmit(values: ValuesFormRegister) {
    mutate(values, {
      onSuccess: ({ createUser }, variables, ctx) => {
        toast.success(`Registrado exitosamente ${createUser.name}`)
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
      <h2 className="text-gray-400 font-semibold text-center">
        Regístrate para ver fotos y videos de tus amigos.
      </h2>

      <RegisterForm handleSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}

export default Register
