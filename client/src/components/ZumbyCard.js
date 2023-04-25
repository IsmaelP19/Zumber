import React, { useState, useEffect } from "react";
import userService from "../services/users";
import zumbyService from "../services/zumbies";
import defaultImage from "../utils/static/default.jpg";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { AiOutlineMessage } from "react-icons/ai";

export default function ZumbyCard({ zumby, loggedUser }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(zumby.likes.length);
  const [comments, setComments] = useState(zumby.comments.length);

  useEffect(() => {
    if (loggedUser) {
      zumby.likes.filter((like) => like === loggedUser.id).length > 0
        ? setLiked(true)
        : setLiked(false);
    } 
  }, [loggedUser, zumby.likes]);

  useEffect(() => {
    setLikes(zumby.likes.length);
    setComments(zumby.comments.length);
  }, [zumby.likes, zumby.comments]);

  function handleClick() {
    if (liked) {
      loggedUser.likes = loggedUser.likes.filter((like) => like !== zumby.id);
      zumby.likes = zumby.likes.filter((like) => like !== loggedUser.id);
    } else {
      loggedUser.likes = [...loggedUser.likes, zumby.id];
      zumby.likes = [...zumby.likes, loggedUser.id];
    }
    userService.setToken(loggedUser.token);
    userService.update(loggedUser.id, loggedUser);
    zumbyService.update(zumby.id, zumby);
    setLiked(!liked);
  }

  const image = zumby.user.image || defaultImage;

  if (zumby.user.private){
    return <></>
  }else{
    return (
      <div className="bg-dark-blue h-36 my-2 mx-1 rounded-xl flex flex-row ">
        <div className="flex justify-center items-center w-3/12">
          <img
            src={image}
            alt="User profile icon"
            className="rounded-full max-h-28 p-2"
          />
        </div>
        <div className="flex flex-col w-9/12">
          <div className="flex flex-row font-bold justify-between text-light-gray">
            <div className="ml-2">{zumby.user.username}</div>
            <div className="mr-3">{parseDateTime(zumby.date)}</div>
          </div>
          <div className="flex flex-row font-bold h-full">
            <div className="w-full items-center justify-center bg-light-blue mx-2 my-3 rounded-xl flex">
              <div className="">{zumby.content}</div>
            </div>
          </div>
          {loggedUser ? (
            <div className="flex flex-row justify-around h-10 mb-1 text-lg">
              <span className="text-light-gray font-bold">
                {comments}&nbsp;&nbsp;
                <button>
                  <AiOutlineMessage />
                </button>
              </span>
              <span className="text-light-gray font-bold">
                {likes}&nbsp;&nbsp;
                <button onClick={handleClick}>
                  {liked ? <FcLike /> : <FcLikePlaceholder />}
                </button>
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

function parseDateTime(datetime){
  const date = new Date(datetime);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day}/${month} - ${hours}:${minutes}`;
}