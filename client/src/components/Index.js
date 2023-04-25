import React, { useState, useEffect } from "react";
import zumbyService from "../services/zumbies";
import ZumbiesContainer from "./ZumbiesContainer";
export default function Index({ loggedUser }) {
    
    const [zumbies, setZumbies] = useState([]);

    const hook = () => {
      zumbyService.getAll().then((zumbies) => {
        setZumbies(zumbies);
      });
    };

    useEffect(hook, []);
    
    return (
      <div className="flex justify-center">
        <ZumbiesContainer
          zumbies={zumbies}
          loggedUser={loggedUser}
        />
      </div>
    );
}