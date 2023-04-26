import React from 'react';
import ZumbyCard from './ZumbyCard';

export default function ZumbiesContainer({ zumbies, loggedUser }) {  
  return (
    <div className="w-110">
      {zumbies.map((zumby) => {
        return (
          <ZumbyCard
            key={zumby.id}
            zumby={zumby}
            loggedUser = {loggedUser}
          />
        );
      })}
    </div>
  );
}
