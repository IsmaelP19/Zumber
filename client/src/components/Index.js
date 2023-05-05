import React, { useState, useEffect } from "react";
import zumbyService from "../services/zumbies";
import ZumbiesContainer from "./ZumbiesContainer";
import ZumbyForm from "./ZumbyForm";
import { showMessage } from "../utils/utils";
export default function Index({ loggedUser, setMessage, setLoggedUser }) {
  useEffect(() => {
    document.title = "Zumber | Inicio";
  }, []);

  const [isDone, setIsDone] = useState(false);
  const [zumbies, setZumbies] = useState([]);

  useEffect(() => {
    const hook = async () => {
      const zumbies_ = await zumbyService.getAll();
      setZumbies(zumbies_);
      setIsDone(true);
    };
    hook();
    if (localStorage.getItem("message")) {
      const message = JSON.parse(localStorage.getItem("message"));
      showMessage(message[0], message[1], setMessage, 3000);
      localStorage.removeItem("message");
    }
  }, [setMessage]);

  return (isDone &&(
    <div className="flex flex-col justify-center items-center">
      {loggedUser ? (
        <ZumbyForm
          loggedUser={loggedUser}
          setZumbies={setZumbies}
          zumbies={zumbies}
          setLoggedUser={setLoggedUser}
        />
      ) : (
        <></>
      )}

      <ZumbiesContainer
        zumbies={zumbies}
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
      />
    </div>
  ));
}
