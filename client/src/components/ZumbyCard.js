import React, { useState, useEffect } from "react";
import userService from "../services/users";
import zumbyService from "../services/zumbies";
import defaultImage from "../utils/static/default.jpg";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { AiOutlineMessage } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { showMessage } from "../utils/utils"


export default function ZumbyCard({ zumby, loggedUser, condition, setSavedZumbies }) {

  const [zumby_, setZumby_] = useState({
    id: "",
    user: {
      id: "",
      username: "",
      image: ""
    },
    content: "",
    likes: [],
    comments: [],
    date: "",
  })

  useEffect(() => {
    if (zumby) {
      setZumby_({
        id: zumby.id,
        user: {
          id: zumby.user.id,
          username: zumby.user.username,
          image: zumby.user.image
        },
        content: zumby.content,
        likes: zumby.likes,
        comments: zumby.comments,
        date: zumby.date,
      })
    }
  }, [zumby])

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(zumby_.likes.length);
  const [comments, setComments] = useState(zumby_.comments.length);

  useEffect(() => {
    if (loggedUser) {
      zumby_.likes.filter((like) => like === loggedUser.id).length > 0
        ? setLiked(true)
        : setLiked(false);
    }
  }, [loggedUser, zumby_.likes]);

  useEffect(() => {
    setLikes(zumby_.likes.length);
    setComments(zumby_.comments.length);
  }, [zumby_.likes, zumby_.comments]);

  function handleClick() {
    if (liked) {
      loggedUser.likes = loggedUser.likes.filter((like) => like !== zumby_.id);
      zumby_.likes = zumby_.likes.filter((like) => like !== loggedUser.id);
      if (setSavedZumbies){
        setSavedZumbies((prev) => prev.filter((zumby) => zumby.id !== zumby_.id));
      }
    } else {
      loggedUser.likes = [...loggedUser.likes, zumby_.id];
      zumby_.likes = [...zumby_.likes, loggedUser.id];
    }
    userService.setToken(loggedUser.token);
    userService.update(loggedUser.id, loggedUser);
    zumbyService.update(zumby_.id, zumby_);
    setLiked(!liked);
  }

  function handleDelete() {
    if (window.confirm("¿De verdad deseas eliminar este zumby?")) {
      zumbyService.setToken(loggedUser.token);
      zumbyService.remove(zumby_.id,);
      userService.setToken(loggedUser.token);
      loggedUser.zumbies = loggedUser.zumbies.filter((zumby) => zumby !== zumby_.id);
      // we also have to update the users that liked this zumby and the users that commented this zumby
      zumby_.likes.forEach(async (like) => {
        const user = await userService.getUser(like);
        user.likes = user.likes.filter((like) => like !== zumby_.id);
        await userService.update(user.id, user);
      })
      zumby_.comments.forEach(async (comment) => {
        const user = await userService.getUser(comment);
        user.comments = user.comments.filter((comment) => comment !== zumby_.id);
        await userService.update(user.id, user);
      })

      userService.update(loggedUser.id, loggedUser);

      const message = ['Zumby eliminado correctamente', 'success']
      localStorage.setItem('message', JSON.stringify(message))
      window.location.href = "/";

    }
  }

  const image = zumby_.user.image || defaultImage;

  if (zumby_.user.private) {
    return <></>
  } else {
    return (
      <div className="bg-dark-blue my-2 mx-1 rounded-xl flex flex-row ">
        <div className="flex justify-center items-center w-3/12">
          <img
            src={image}
            alt="User profile icon"
            className="rounded-full object-cover p-2 h-20 w-20 md:h-28 md:w-28"
          />
        </div>
        <div className="flex flex-col w-9/12">
          <div className="flex flex-row font-bold justify-between text-light-gray">
            <div className="ml-2" >
              <a href={`/profile/${zumby_.user.username}`} className="cursor-pointer hover:underline">
                {zumby_.user.username}
              </a>
            </div>
            <div className="mr-3">{parseDateTime(zumby_.date)}</div>
          </div>
          <div className="flex flex-row font-bold h-full">
            <div className={`w-full items-center justify-center bg-light-blue mx-2 my-3 rounded-xl flex ${condition ? "cursor-pointer hover:bg-red-100 transition-all duration-300" : ""} `}
              onClick={() => {
                if (condition) {
                  window.location.href = `/${zumby_.id}`
                }
              }}
            >
              <div className="p-2">{zumby_.content}</div>
            </div>
          </div>
          {loggedUser ? (
            <div className="flex flex-row justify-around h-10 mb-1 text-lg">
              <span className="flex items-center text-light-gray font-bold">
                {comments}&nbsp;&nbsp;
                <button onClick={() => {
                  window.location.href = `/${zumby_.id}`
                }}>
                  <AiOutlineMessage />
                </button>
              </span>
              <span className="flex items-center text-light-gray font-bold">
                {likes}&nbsp;&nbsp;
                <button onClick={handleClick}>
                  {liked ? <FcLike /> : <FcLikePlaceholder />}
                </button>
              </span>
              {
                loggedUser.id === zumby_.user.id ? (
                  <span className="flex items-center text-light-gray font-bold">
                    <button onClick={handleDelete}>
                      <HiOutlineTrash />
                    </button>
                  </span>
                ) : (
                  <></>
                )

              }
            </div>
          ) : (
            <div className="flex flex-row justify-around h-10 mb-1 text-lg">
              <span className="text-light-gray font-bold flex flex-row items-center">
                {comments}&nbsp;&nbsp;<div><AiOutlineMessage /></div>
              </span>
              <span className="text-light-gray font-bold flex flex-row items-center">
                {likes}&nbsp;&nbsp;<div><FcLikePlaceholder /></div>
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function parseDateTime(datetime) {

  if (!datetime) return "";

  const date = new Date(datetime);
  const day = date.getDate();
  let month = date.getMonth() + 1;
  let hours = date.getHours();
  if (hours < 10) hours = "0" + hours;
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;
  return `${day}/${month} - ${hours}:${minutes}`;
}