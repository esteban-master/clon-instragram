import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

export interface ValuesFormRegister {
  email: string
  password: string
  username: string
  name: string
  avatar: string
}

interface FormProps {
  handleSubmit: (values: ValuesFormRegister) => void
  isLoading: boolean
}

const RegisterForm = ({ handleSubmit, isLoading }: FormProps) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        name: '',
        username: '',
        avatar: ''
      }}
      validationSchema={Yup.object({
        email: Yup.string().email().required('El email es requerido'),
        password: Yup.string()
          .min(5, 'Debe tener al menos 5 caracteres')
          .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, {
            message:
              'Debe tener al menos 1 letra mayuscula, 1 un caracter especial y 1 numero '
          })
          .required('El password es requerido'),
        username: Yup.string()
          .required('El username es requerido')
          .min(5, 'El username debe tener al menos 5 caracteres')
          .matches(/^[a-zA-Z0-9-]*$/, {
            message: 'Username no debe tener espacios ni caracteres raros'
          }),
        name: Yup.string()
          .required('El name es requerido')
          .min(5, 'El name debe tener al menos 5 caracteres')
      })}
      onSubmit={async (
        values: ValuesFormRegister,
        { resetForm }: FormikHelpers<ValuesFormRegister>
      ) => {
        handleSubmit(values)
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              {...formik.getFieldProps('name')}
              className="focus:outline-none w-full py-0 px-2 border-2 border-gray-300 rounded-sm"
              placeholder="Name"
            />
            {formik.touched.name && formik.errors.name ? (
              <span className="text-red-600 text-xs">{formik.errors.name}</span>
            ) : null}
          </div>
          <div>
            <input
              type="text"
              {...formik.getFieldProps('username')}
              className="focus:outline-none w-full py-0 px-2 border-2 border-gray-300 rounded-sm"
              placeholder="fernandito2"
            />
            {formik.touched.username && formik.errors.username ? (
              <span className="text-red-600 text-xs">
                {formik.errors.username}
              </span>
            ) : null}
          </div>
          <div>
            <input
              type="text"
              {...formik.getFieldProps('avatar')}
              className="focus:outline-none w-full py-0 px-2 border-2 border-gray-300 rounded-sm"
              placeholder="Avatar - opcional"
            />
          </div>
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
            Registrar
          </button>
        </form>
      )}
    </Formik>
  )
}

export default RegisterForm
