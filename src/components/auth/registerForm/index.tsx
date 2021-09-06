import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button
} from '@vechaiui/react'

export interface ValuesFormRegister {
  email: string
  password: string
  username: string
  name: string
}

interface FormProps {
  handleSubmit: (values: ValuesFormRegister) => void
  isLoading: boolean
}

const RegisterForm = ({ handleSubmit, isLoading }: FormProps) => {
  const [verPassword, setVerPassword] = useState(false)

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        name: '',
        username: ''
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
          .min(5, 'El username debe tener al menos 5 caracteres'),
        name: Yup.string()
          .required('El name es requerido')
          .min(5, 'El name debe tener al menos 5 caracteres')
      })}
      onSubmit={async (
        values: ValuesFormRegister,
        { resetForm }: FormikHelpers<ValuesFormRegister>
      ) => {
        handleSubmit(values)
        // if (ok) {
        //   resetForm()
        // }
        // console.log(values)
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <FormControl
            id="name"
            invalid={!!formik.errors.name && formik.touched.name}
          >
            <FormLabel>Name</FormLabel>
            <Input
              color="blue"
              type="text"
              placeholder="Fernando"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? (
              <FormHelperText className="text-red-600 text-xs">
                {formik.errors.name}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            id="username"
            invalid={!!formik.errors.username && formik.touched.username}
          >
            <FormLabel>Username</FormLabel>
            <Input
              color="blue"
              type="text"
              placeholder="fernandito12"
              {...formik.getFieldProps('username')}
            />
            {formik.touched.username && formik.errors.username ? (
              <FormHelperText className="text-red-600 text-xs">
                {formik.errors.username}
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl
            id="email"
            invalid={!!formik.errors.email && formik.touched.email}
          >
            <FormLabel>Email</FormLabel>
            <Input
              color="blue"
              type="email"
              placeholder="jon@gmail.com"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <FormHelperText className="text-red-600 text-xs">
                {formik.errors.email}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            id="password"
            invalid={!!formik.errors.password && formik.touched.password}
          >
            <FormLabel>Password</FormLabel>
            <Input
              color="blue"
              type="password"
              placeholder="123456"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <FormHelperText className="text-red-600 text-xs">
                {formik.errors.password}
              </FormHelperText>
            ) : null}
          </FormControl>
          <Button
            className="w-full"
            type="submit"
            variant="solid"
            color="blue"
            loading={isLoading}
            loadingText="Registrando..."
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Registrar
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default RegisterForm
