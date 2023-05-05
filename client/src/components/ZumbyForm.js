import { useFormik } from "formik"
import zumbyService from "../services/zumbies"
export default function ZumbyForm({ loggedUser, zumbies, setZumbies, prevZumby, setPrevZumby }) {

  const formik = useFormik({
    initialValues: {
      content: "",
      user: loggedUser.id,
      commented: prevZumby ? prevZumby.id : null
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        let zumby = await zumbyService.create(values)
        resetForm()

        if (prevZumby) { 
          let comments
          if(typeof prevZumby.comments[0] !== "string"){
            comments = prevZumby.comments = prevZumby.comments.map(comment => comment.id)
          } else {
            comments = prevZumby.comments
          }
          prevZumby.comments = [...comments, zumby.id]
          zumbyService.update(prevZumby.id, prevZumby)
          // zumbyService.update(zumby.id, zumby) // not sure if this is necessary
        }
        zumby.user = loggedUser
        setZumbies(zumbies => [zumby, ...zumbies])
        setPrevZumby(prevZumby)
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