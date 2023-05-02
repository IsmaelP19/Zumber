import { useFormik } from "formik"
import zumbyService from "../services/zumbies"
export default function ZumbyForm({ loggedUser, zumbies, setZumbies, prevZumby }) {

  const formik = useFormik({
    initialValues: {
      content: "",
      user: loggedUser.id
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        let zumby = await zumbyService.create(values)
        resetForm()

        if (prevZumby) { // If prevZumby is passed, it means that the ZumbyForm is being used to create a comment
          // we change the prevZumby object to add the new comment (only its id) to the comments array
          // the comments array is an array of ids of the comments so we have to change the ...prevZumby.comments to get only the id of those comments we already have (not the whole comment object)
          const comments = prevZumby.comments.map(comment => comment.id)
          prevZumby.comments = [...comments, zumby.id]
          zumbyService.update(prevZumby.id, prevZumby)
          window.location.reload()
        } else {
          zumby.user = {
            name: loggedUser.name,
            username: loggedUser.username,
            image: loggedUser.image,
          }

          // for some reason this doesn't work, the zumbies container will render again but all zumbies are ids and not objects so it will crash
          setZumbies([...zumbies, zumby]) // not working on ZumbyDetails page 
        } 


      } catch (error) {
        console.error(error)
      }
    },

    validate: values => {
      const errors = {}
      if (!values.content) {
        errors.content = "No puedes crear un zumby vacío"
      } else if (values.content.length > 140) {
        errors.content = "Sólo se permiten 140 caracteres por zumby"
      }
      return errors
    }
  })

  document.getElementById("zumby-textarea")?.addEventListener("input", function () {
    this.style.height = "auto"
    this.style.height = (this.scrollHeight) + "px"
  }, false)


  return (
    <div className="flex flex-col w-full md:w-110">
      <div className="my-2 mx-1">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 justify-center items-center bg-dark-blue  rounded-xl py-4" id="zumby-form" >
          <textarea
            type="text"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-11/12 h-auto bg-light-gray text-black text-xl px-4 py-2 rounded-xl resize-none overflow-y-hidden"
            id="zumby-textarea"
            placeholder="¿Qué quieres zumbar?"
          >
          </textarea>
          {
            formik.touched.content && formik.errors.content ? (
              <div className="text-red-400 font-bold px-4">
                {formik.errors.content}
              </div>
            ) : null
          }
          <button type="submit" className="bg-gold text-dark-purple font-bold text-lg px-4 rounded active:bg-dark-purple active:text-gold active:border active:border-gold transition-all duration-200">
            Zumbar
          </button>
        </form >
      </div >



    </div >
  )
}