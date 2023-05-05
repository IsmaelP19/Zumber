import React, { useState, useEffect } from "react";
import userService from "../services/users";
import ZumbiesContainer from "./ZumbiesContainer";
export default function SavedZumbies({ loggedUser, setLoggedUser }) {
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    document.title = "Zumber | Guardados";
  }, []);

  const [zumbies, setZumbies] = useState([]);

  useEffect(() => {
    const hook = async () => {
      const zumbies = await userService.getUserSavedZumbies(loggedUser.username);
      setZumbies(zumbies);
      setIsDone(true)
    }
    hook();
  }, [loggedUser])


  return (isDone && (

    (zumbies.length === 0) ? (
      <div className="flex flex-col justify-center mt-10">
        <h1 className="text-3xl text-gray-700 font-bold text-center">No tienes Zumbies guardados</h1>
      </div>) : (
      <div className="flex flex-col justify-center items-center">
        <ZumbiesContainer
          zumbies={zumbies}
          loggedUser={loggedUser}
          setSavedZumbies={setZumbies}
          setLoggedUser={setLoggedUser}
        />
      </div>
    )
  )

  );
}