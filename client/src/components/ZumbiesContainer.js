import React from 'react';
import ZumbyCard from './ZumbyCard';

export default function ZumbiesContainer({ zumbies, isLogged, loggedUser, token }) {
  return (
    <div className="w-110 overflow-y-auto h-screen-80">
      {zumbies.map((zumby) => {
        return (
          <ZumbyCard
            key={zumby.id}
            zumby={zumby}
            isLogged={isLogged}
            loggedUser = {loggedUser}
            token = {token}
          />
        );
      })}
    </div>
  );
}
