import React, { useState, useEffect } from "react";
import zumbyService from "../services/zumbies";
import ZumbiesContainer from "./ZumbiesContainer";
import ZumbyForm from "./ZumbyForm";
export default function Index({ loggedUser }) {

  const [zumbies, setZumbies] = useState([]);

  const hook = () => {
    zumbyService.getAll().then((zumbies) => {
      setZumbies(zumbies);
    });
  };

  useEffect(hook, []);

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