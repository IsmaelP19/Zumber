import React, { useState, useEffect } from "react";
import zumbyService from "../services/zumbies";
import ZumbiesContainer from "./ZumbiesContainer";
import ZumbyForm from "./ZumbyForm";
import { showMessage } from "../utils/utils";
export default function Index({ loggedUser, setMessage }) {

  const [zumbies, setZumbies] = useState([]);

  useEffect(() => {
    const hook = async () => {
      const zumbies_ = await zumbyService.getAll();
      setZumbies(zumbies_);
    } 
    hook();
    if (localStorage.getItem('message')) {
      const message = JSON.parse(localStorage.getItem('message'));
      showMessage(message[0], message[1], setMessage, 3000)
      localStorage.removeItem('message');
    }
  }, [setMessage]);

  return (
    <div className="flex flex-col justify-center items-center">
      {loggedUser ? (
        <ZumbyForm loggedUser={loggedUser} setZumbies={setZumbies} zumbies={zumbies} />
      ) : (
        <></>
      )}

      <ZumbiesContainer
        zumbies={zumbies}
        loggedUser={loggedUser}
      />
    </div>
  );
}