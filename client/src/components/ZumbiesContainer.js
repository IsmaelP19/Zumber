import React, { useState, useEffect } from 'react';
import ZumbyCard from './ZumbyCard';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function ZumbiesContainer({ zumbies, loggedUser }) {  
  const [hasMore, setHasMore] = useState(true)
  const [shownZumbies, setShownZumbies] = useState(5)

  const [isDone, setIsDone] = useState(false)

  const loadMore = () => {
    if (shownZumbies >= zumbies.length) {
      setHasMore(false)
      return ;
    }
    setShownZumbies(shownZumbies + 5)

  }

  const renderedZumbies = zumbies && zumbies.slice(0, shownZumbies).map((zumby, index) => {
    return (
      <ZumbyCard
        key={zumby.id}
        zumby={zumby}
        loggedUser = {loggedUser}
        condition = {true}
      />
    )
  })


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
      <InfiniteScroll
        dataLength={shownZumbies}
        next={loadMore}
        hasMore={hasMore}
      >
        {renderedZumbies}
      </InfiniteScroll>
      {/* {zumbies.map((zumby) => {
        return (
          <ZumbyCard
            key={zumby.id}
            zumby={zumby}
            loggedUser = {loggedUser}
            condition = {true}
          />
        );
      })} */}
    </div>
  );
}
