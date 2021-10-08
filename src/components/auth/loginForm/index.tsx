import React from 'react'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

interface ValuesForm {
  email: string
  password: string
}

interface FormProps {
  handleSubmit: (values: ValuesForm) => void
  isLoading: boolean
  initialValues: {
    email: string
  }
}

const LoginForm = ({ initialValues, handleSubmit, isLoading }: FormProps) => {
  // const [verPassword, setVerPassword] = useState(false)
  return (
    <Formik
      initialValues={{
        email: initialValues.email || '',
        password: ''
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Debe ser un correo valido')
          .required('El email es requerido'),
        password: Yup.string()
          .min(5, 'Debe tener al menos 5 caracteres')
          .required('El password es requerido')
      })}
      onSubmit={async (values: ValuesForm) => {
        handleSubmit(values)
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="space-y-3 ">
          <div>
            <input
              type="text"
              {...formik.getFieldProps('email')}
              className="focus:outline-none w-full py-0 px-2 border-2 border-gray-300 rounded-sm"
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="text-red-600 text-xs">
                {formik.errors.email}
              </span>
            ) : null}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...formik.getFieldProps('password')}
              className="focus:outline-none w-full py-0 px-2 border-2 border-gray-300 rounded-sm"
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="text-red-600 text-xs">
                {formik.errors.password}
              </span>
            ) : null}
          </div>

          <button
            className="w-full bg-blue-500 text-white p-1 font-semibold"
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Ingresar
          </button>
        </form>
      )}
    </Formik>
  )
}

export default LoginForm
