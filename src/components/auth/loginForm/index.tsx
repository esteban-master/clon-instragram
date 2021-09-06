import React, { useState } from 'react'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button
} from '@vechaiui/react'

interface ValuesForm {
  email: string
  password: string
}

interface FormProps {
  handleSubmit: (values: ValuesForm) => void
  isLoading: boolean
}

const LoginForm = ({ handleSubmit, isLoading }: FormProps) => {
  const [verPassword, setVerPassword] = useState(false)
  return (
    <Formik
      initialValues={{
        email: '',
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
          </div>
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
            loadingText="Ingresando..."
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Ingresar
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default LoginForm
