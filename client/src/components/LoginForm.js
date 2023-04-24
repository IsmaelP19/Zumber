import React, { useState, useEffect } from "react"
import loginService from "../services/login"
import Button from "./Button"
import FormInput from "./FormInput"
import { useFormik } from 'formik'
import { showMessage } from "../utils/utils"

const validate = (values) => {
  const errors = {}

  if (!values.password) {
    errors.password = 'No puede dejar vacío este campo'
  } 

  if (!values.username) {
    errors.username = 'No puede dejar vacío este campo'
  } 

  return errors
}


export default function LoginForm ({ setMessage, isLogged }) {
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if(isLogged) {
      window.location.href = '/'
    }
    setIsDone(true)
  }, [isLogged])

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },

    onSubmit: async(values) => {
      try {
        const user = await loginService.login(values)
        showMessage(`Bienvenido, ${user.username}`, 'success', setMessage, 4000)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        setTimeout(() => {
          window.location.href = '/'
        }, 4000)
      } catch (error) {
        if(error.response.data.error.includes('invalid username or password')) {
          showMessage('Nombre de usuario o contraseña incorrectos', 'error', setMessage, 5000)
        } else {
          showMessage('Ha ocurrido un error. Por favor, prueba más tarde ⌛', 'error', setMessage, 5000)
        }
      }
    },

    validate,
    validateOnBlur: true

  })

  return (
    isDone &&
    <div className="flex justify-center w-full">
      <form
        className="flex flex-col items-center justify-center bg-dark-blue px-6 py-6 rounded-xl border-2 border-gray-600 shadow-xl"
        onSubmit={formik.handleSubmit}
      >

        <FormInput
          label="Nombre de usuario"
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-400 font-bold px-4">
            {formik.errors.username}
          </div>
        ) : null}

        <FormInput
          label="Contraseña"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-400 font-bold px-8 md:px-2 md:max-w-lg max-w-sm text-center md:text-left">
            {formik.errors.password}
          </div>
        ) : null}

        <Button type="submit">Iniciar sesión</Button>
        
      </form>
    </div>
  );
}
