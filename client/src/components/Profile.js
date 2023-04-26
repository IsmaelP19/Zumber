import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Error404 from "./Error404"
import userService from "../services/users"
import defaultImage from "../utils/static/default.jpg";
import Button from "./Button";

export default function Profile({ loggedUser }) {
  const { username } = useParams()
  const [isDone, setIsDone] = useState(false)
  const [user, setUser] = useState(null)
  const [image, setImage] = useState(defaultImage)
  const [isSame, setIsSame] = useState(false)

  useEffect(() => {
    // if I am visiting my own profile, I already have my own information on loggedUser, there's no need of fetching it again
    const getUser = async () => {
      try {
        const user = await userService.getUserByUsername(username)
        setUser(user)
        if (user.image) setImage(user.image)
        setIsDone(true)
      } catch (error) {
        console.error(error)
        setIsDone(true)
      }
    }
    if (loggedUser && loggedUser.username === username) {
      setUser(loggedUser)
      if (loggedUser.image) setImage(loggedUser.image)
      setIsSame(true)
      setIsDone(true)
    } else {
      getUser()
    }

  }, [username, loggedUser])

  if (isDone && !user) {
    return <Error404 />
  }

  return isDone ? (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col  md:flex-row my-8 py-4 px-4 w-full mx-4 md:w-4/5 lg:w-2/3 lg:mx-0 bg-dark-blue text-white rounded-2xl">
        <div className="flex flex-col items-center gap-3 py-2 px-2 md:w-2/5 ">
          <img src={image} alt={user.username} className="h-52 w-52 object-cover rounded-full border-4 border-gold"></img>
          <h1 className="font-bold text-xl">{user.username}</h1>
          {isSame ? <Button onClick={() => {
            window.location.href = `/profile/edit`
          }}>Editar perfil</Button> : null}
        </div>
        <div className="flex flex-col gap-2 justify-between py-2 px-2 md:w-3/5 ">
          <h1 className="font-bold text-xl ">{user.name} {user.surname}</h1>
          <span className="">{user.bio}</span>
          <div className="flex gap-4 justify-center md:justify-start flex-wrap ">
            <span className="px-3 py-3 bg-light-gray max-w-min rounded-2xl text-black text-center whitespace-nowrap">{user.followers.length} seguidores</span>
            <span className="px-3 py-3 bg-light-gray max-w-min rounded-2xl text-black text-center whitespace-nowrap">{user.following.length} seguidos</span>
            <span className="px-3 py-3 bg-light-gray max-w-min rounded-2xl text-black text-center whitespace-nowrap">{user.zumbies.length} zumbies</span>
          </div>
        </div>

      </div>
    </div>

  ) : null
}