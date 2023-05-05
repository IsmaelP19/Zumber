import React, { useState, useEffect } from "react"
import userService from "../services/users"
import Button from "./Button"
import FormInput from "./FormInput"
import defaultImage from "../utils/static/default.jpg";
import { useFormik } from 'formik'
import { showMessage } from "../utils/utils"
import { ImCross } from "react-icons/im";

const validate = (values) => {
  const errors = {}
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/

  if (!values.email) {
    errors.email = 'No puede dejar vacío este campo'
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Introduzca una dirección de correo electrónico válida'
  }

  if (!values.password) {
    errors.password = 'No puede dejar vacío este campo'
  } else if (values.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres'
  } else if (!passwordRegex.test(values.password)) {
    errors.password = 'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.'
  }

  if (!values.username) {
    errors.username = 'No puede dejar vacío este campo'
  } else if (values.username.length < 3) {
    errors.username = 'El nombre de usuario debe tener al menos 3 caracteres'
  } else if (!/^[a-zA-Z0-9_&.]+$/.test(values.username)) {
    errors.username = 'El nombre de usuario solo puede contener letras y números (sin espacios ni caracteres especiales)'
  } else if (values.username.length > 20) {
    errors.username = 'El nombre de usuario no puede tener más de 20 caracteres'
  }

  if (values.name && values.name.length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres'
  }

  if (values.surname && values.surname.length < 3) {
    errors.surname = 'Los apellidos deben contener al menos 3 caracteres'
  }

  if (values.bio && values.bio.length > 240) {
    errors.bio = 'La biografía no puede tener más de 240 caracteres'
  }

  return errors
}


export default function ProfileForm ({ setMessage, loggedUser }) {

  useEffect(() => {
    document.title = "Zumber | Editar Perfil";
  }, []);
  
  const [errorMessage, setErrorMessage] = useState(null);

  function handleChange(event) {
    const files = event.target.files;

    const file = files[0];
    const fileSize = file.size / 1024 / 1024; // in MB
    if (fileSize > 2) {
      setErrorMessage("El tamaño máximo de la imagen es de 2MB")
      return
    }

    setErrorMessage(null)

    Promise.all(
      [...files].map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
              const canvas = document.createElement("canvas");
              const MAX_WIDTH = 1920;
              const MAX_HEIGHT = 1080;
              let width = img.width;
              let height = img.height;

              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }

              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0, width, height);

              const base64Image = canvas.toDataURL("image/jpeg", 0.8);

              resolve(base64Image);
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      })
    ).then((base64Images) => {
      formik.setFieldValue("image", base64Images[0]);
    });
  }

  const [formikValues, setFormikValues] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    if(loggedUser){
      setFormikValues({
        name: loggedUser.name,
        surname: loggedUser.surname,
        username: loggedUser.username,
        email: loggedUser.email,
        password: "",
        bio: loggedUser.bio,
        image: loggedUser.image,
      });
    }
  }, [loggedUser]);

  const formik = useFormik({
    initialValues: {
      name: formikValues.name,
      surname: formikValues.surname,
      username: formikValues.username,
      email: formikValues.email,
      password: formikValues.password,
      bio: formikValues.bio,
      image: formikValues.image,
    },

    onSubmit: values => {

      if (errorMessage) {
        return
      }
      userService.setToken(loggedUser.token);
      userService
        .update(loggedUser.id, values)
        .then((response) => {
          //Remove token from local storage
          localStorage.removeItem("loggedUser");
          //Save in local storage loggedUser with name, token and username
          localStorage.setItem(
            "loggedUser",
            JSON.stringify({
              name: values.name,
              username: values.username,
              token: loggedUser.token,
            })
          );
          showMessage(
            "Ha actualizado su perfil satisfactoriamente 👏",
            "success",
            setMessage,
            4000
          );
          setTimeout(() => {
            window.location.href = `/profile/${values.username}`;
          }, 4000);
        })

        .catch((error) => {
          if (
            error.response.data.error.includes(
              "expected `username` to be unique"
            )
          ) {
            showMessage(
              "El nombre de usuario ya está en uso",
              "error",
              setMessage,
              4000
            );
          } else if (
            error.response.data.error.includes("expected `email` to be unique")
          ) {
            showMessage(
              "El correo electrónico ya está en uso",
              "error",
              setMessage,
              4000
            );
          } else {
            showMessage(
              "Ha ocurrido un error. Por favor, prueba más tarde ⌛",
              "error",
              setMessage,
              4000
            );
          }
        });
    },

    validate

  })

  useEffect(() => {
    formik.setValues({
      name: formikValues.name,
      surname: formikValues.surname,
      username: formikValues.username,
      email: formikValues.email,
      password: formikValues.password,
      bio: formikValues.bio,
      image: formikValues.image,
      });
  }, [formikValues]);

  function deleteImage() {
    formik.setFieldValue("image", "");
  }

    return (
      <div className="flex justify-center w-full">
        <form
          className="flex flex-col items-center justify-center bg-dark-blue px-4 py-4 rounded-xl border-2 border-gray-600 shadow-xl mx-2 my-2 mb-32 md:mb-4"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-row items-center">
            <div>
              <img
                src={formik.values.image || defaultImage}
                className="w-32 h-32 m-2 rounded-full"
                alt="Profile icon"
              />
            </div>
            {formik.values.image && <div className="text-red-400">
              <button type="button" onClick={deleteImage}>
                <ImCross />
              </button>
            </div>}
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col mx-2 h-full justify-around">
              <FormInput
                label="Nombre"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-400 font-bold px-4">
                  {formik.errors.name}
                </div>
              ) : null}
              <FormInput
                label="Apellidos"
                type="text"
                name="surname"
                value={formik.values.surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.surname && formik.errors.surname ? (
                <div className="text-red-400 font-bold px-4">
                  {formik.errors.surname}
                </div>
              ) : null}
              <FormInput
                label="Correo electrónico"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-400 font-bold px-4">
                  {formik.errors.email}
                </div>
              ) : null}

              <FormInput
                label="Nombre de usuario"
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-400 font-bold px-4">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div className="flex-flex-col mx-2">
              <FormInput
                label="Contraseña"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-400 font-bold px-8 md:px-2 md:max-w-lg max-w-sm text-center md:text-left">
                  {formik.errors.password}
                </div>
              ) : null}

              <FormInput
                label="Biografía"
                name="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                component="textarea"
              />
              {formik.touched.bio && formik.errors.bio ? (
                <div className="text-red-400 font-bold px-4">
                  {formik.errors.bio}
                </div>
              ) : null}

              <FormInput
                label="Imagen de perfil"
                type="file"
                name="image"
                onChange={handleChange}
              />
              {errorMessage ? (
                <div className="text-red-400 font-bold px-4">
                  {errorMessage}
                </div>
              ) : null}
            </div>
          </div>

          <span className="text-red-400 font-bold py-2">
            * Campos obligatorios
          </span>

          <Button type="submit">Actualizar perfil</Button>
        </form>
      </div>
    );
  
}
