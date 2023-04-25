import React, { useState, useEffect } from "react";
import userService from "../services/users";
import defaultImage from "../utils/static/default.jpg";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { BiComment } from "react-icons/bi";

export default function ZumbyCard({ zumby, isLogged, loggedUser, token }) {
  const [user, setUser] = useState({});
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    userService.getUser(zumby.user).then((response) => {
      setUser(response);
    });
  }, [zumby.user]);

  function handleClick() {
    userService.getUserByUsername(loggedUser).then((response) => {
      const currentUser = response;
      if (liked) {
        console.log("unlike");
        currentUser.likes = currentUser.likes.filter((like) => like !== zumby.id);
        console.log(currentUser.likes);
      } else {
        console.log("like");
        currentUser.likes = [...currentUser.likes, zumby._id];
        console.log(currentUser.likes);
      }
      userService.setToken(token);
      console.log(token);
      userService.update(currentUser.id, currentUser);
      setLiked(!liked);
    });
  }

  const image = user.image || defaultImage;

  if (user.private){
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
            <div className="ml-2">{user.username}</div>
            <div className="mr-3">{parseDateTime(zumby.date)}</div>
          </div>
          <div className="flex flex-row font-bold h-full">
            <div className="w-full items-center justify-center bg-light-blue mx-2 my-3 rounded-xl flex">
              <div className="">{zumby.content}</div>
            </div>
          </div>
          <div className="flex flex-row justify-around h-10 mb-1 text-lg">
            <BiComment className="text-gold" />
            {isLogged ? (
              liked ? (
                <button onClick={handleClick}>
                  <FcLike />
                </button>
              ) : (
                <button onClick={handleClick}>
                  <FcLikePlaceholder />
                </button>
              )
            ) : (
              <></>
            )}
          </div>
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