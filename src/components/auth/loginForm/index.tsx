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
      onSubmit={async (
        values: ValuesForm,
        { resetForm }: FormikHelpers<ValuesForm>
      ) => {
        handleSubmit(values)
        // if (ok) {
        //   resetForm()
        // }
        // console.log(values)
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="space-y-3 ">
          <div>
            <input
              type="text"
              {...formik.getFieldProps('email')}
              className="focus:outline-none"
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="text-red-600 text-xs">
                {formik.errors.email}
              </span>
            ) : null}
          </div>
          <div>
            <input type="password" {...formik.getFieldProps('password')} />
            {formik.touched.password && formik.errors.password ? (
              <span className="text-red-600 text-xs">
                {formik.errors.password}
              </span>
            ) : null}
          </div>

          <button
            className="w-full"
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
