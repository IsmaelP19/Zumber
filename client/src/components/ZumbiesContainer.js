import React, { useState, useEffect } from 'react';
import ZumbyCard from './ZumbyCard';

export default function ZumbiesContainer({ zumbies, loggedUser, setSavedZumbies }) {  

  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if(zumbies){  
      setIsDone(true)
    }
  }, [zumbies])

  if (!isDone) {
    return null;
  }

  return (
    <div className="w-full md:w-110">
      {zumbies.map((zumby) => {
        return (
          <ZumbyCard
            key={zumby.id}
            zumby={zumby}
            loggedUser = {loggedUser}
            setSavedZumbies = {setSavedZumbies}
          />
        );
      })}
    </div>
  );
}
