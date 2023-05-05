import React, { useState, useEffect } from "react";
import userService from "../services/users";
import ZumbiesContainer from "./ZumbiesContainer";
export default function SavedZumbies({ loggedUser }) {
    
    const [zumbies, setZumbies] = useState([]);

    const hook = () => {
      userService.getUserSavedZumbies(loggedUser.username).then((zumbies) => {
        setZumbies(zumbies);
      });
    };

    useEffect(hook, [loggedUser]);
        
    return ((zumbies.length === 0) ? (
      <div className="flex flex-col justify-center mt-10">
        <h1 className="text-3xl text-gray-700 font-bold text-center">No tienes Zumbies guardados</h1>
      </div>): (
      <div className="flex flex-col justify-center items-center">      
        <ZumbiesContainer
          zumbies={zumbies}
          loggedUser={loggedUser}
          setSavedZumbies={setZumbies}
        />
      </div>)
    );
}