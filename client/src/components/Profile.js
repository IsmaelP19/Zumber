import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Error404 from "./Error404"
import userService from "../services/users"
import defaultImage from "../utils/static/default.jpg"
import Button from "./Button"
import ZumbiesContainer from "./ZumbiesContainer"

export default function Profile({ loggedUser }) {
  const { username } = useParams()
  const [isDone, setIsDone] = useState(false)
  const [user, setUser] = useState(null)
  const [zumbies, setZumbies] = useState(null)
  const [image, setImage] = useState(defaultImage)
  const [isSame, setIsSame] = useState(false)
  const [follow, setFollow] = useState(false)
  const [followers, setFollowers] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await userService.getUserByUsername(username)
        setUser(user)
        if (user.image) setImage(user.image)
        if (user.followers.includes(loggedUser.id)) setFollow(true)
        setFollowers(user.followers.length)
        setIsDone(true)
      } catch (error) {
        console.error(error)
        setIsDone(true)
      }
    }
    const getZumbies = async () => {
      try {
        const zumbies = await userService.getUserZumbies(username)
        setZumbies(zumbies)
      } catch (error) {
        console.error(error)
      }
    }
    if (loggedUser && loggedUser.username === username) {
      getZumbies()
      setUser(loggedUser)
      if (loggedUser.image) setImage(loggedUser.image)
      setIsSame(true)
      setFollowers(loggedUser.followers.length)
      setIsDone(true)
    } else {
      getZumbies()
      getUser()
    }

  }, [username, loggedUser])

  if (isDone && !user) {
    return <Error404 />
  }

  const handleFollow = async () => {

    if (follow) {
      user.followers = user.followers.filter((follower) => follower !== loggedUser.id)
      loggedUser.following = loggedUser.following.filter((following) => following !== user.id)
      setFollowers(followers - 1)
    } else {
      user.followers = [...user.followers, loggedUser.id]
      loggedUser.following = [...loggedUser.following, user.id]
      setFollowers(followers + 1)
    }
    setFollow(!follow)
    userService.setToken(loggedUser.token)
    await userService.update(user.id, user)
    await userService.update(loggedUser.id, loggedUser)
  }

  const followBtn = follow ?
    <button onClick={handleFollow} className="px-3 py-2 text-lg text-white bg-red-800 rounded-2xl border-2 border-light-gray  hover:bg-red-200 hover:text-black hover:border-red-800 transition-all duration-200">
      Dejar de seguir
    </button>
    : <button onClick={handleFollow} className="px-3 py-2 text-lg bg-green-800 rounded-2xl border-2 border-light-gray  hover:bg-green-200 hover:text-black hover:border-green-800 transition-all duration-200">
      Seguir
    </button>

  return isDone ? (
    <div className="flex flex-col justify-center items-center mx-2 md:mx-0"> 
      <div className="flex flex-col md:flex-row my-8 py-4 px-4 w-full mx-4 md:w-4/5 lg:w-2/3 lg:mx-0 bg-dark-blue text-white rounded-2xl">
        <div className="flex flex-col items-center gap-3 py-2 px-2 md:w-2/5 ">
          <img src={image} alt={user.username} className="h-32 w-32 md:h-52 md:w-52 object-cover rounded-full border-4 border-gold"></img>
          <h1 className="font-bold text-xl">{user.username}</h1>
          {isSame ? <Button onClick={() => {
            window.location.href = `/profile/edit`
          }}>Editar perfil</Button> : followBtn}
        </div>
        <div className="flex flex-col gap-2 justify-between py-2 px-2 md:w-3/5 ">
          <h1 className="font-bold text-xl ">{user.name} {user.surname}</h1>
          <span className="">{user.bio}</span>
          <div className="flex gap-4 justify-center md:justify-start flex-wrap ">
            <span className="px-3 py-3 bg-light-gray max-w-min rounded-2xl text-black text-center whitespace-nowrap">{user.followers.length} {user.followers.length === 1 ? 'seguidor' : 'seguidores'}</span>
            <span className="px-3 py-3 bg-light-gray max-w-min rounded-2xl text-black text-center whitespace-nowrap">{user.following.length} {user.following.length === 1 ? 'seguido' : 'seguidos'}</span>
            <span className="px-3 py-3 bg-light-gray max-w-min rounded-2xl text-black text-center whitespace-nowrap">{user.zumbies.length} {user.zumbies.length === 1 ? 'zumby' : 'zumbies'}</span>
          </div>
        </div>
      </div>

      <ZumbiesContainer zumbies={zumbies} loggedUser={loggedUser} />
    </div>

  ) : null
}