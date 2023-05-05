import React, { useState, useEffect } from "react";
import userService from "../services/users";
import ZumbiesContainer from "./ZumbiesContainer";

export default function FollowingUsers({ loggedUser, setLoggedUser }) {
  const [isDone, setIsDone] = useState(false)


  useEffect(() => {
    document.title = "Zumber | Siguiendo";
  }, []);

  const [zumbies, setZumbies] = useState([]);

  const hook = () => {
    userService.getUserFollowingZumbies(loggedUser.username).then((zumbies) => {
      setZumbies(zumbies);
      setIsDone(true)
    });
  };

  useEffect(hook, [loggedUser]);

  return (isDone && (
    (zumbies.length === 0) ? (
      <div className="flex flex-col justify-center mt-10">
        <h1 className="text-3xl text-gray-700 font-bold text-center">No tienes Zumbies de tus seguidos</h1>
      </div>) : (
      <div className="flex flex-col justify-center items-center">
        <ZumbiesContainer
          zumbies={zumbies}
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
        />
      </div>)
  )
  );
}