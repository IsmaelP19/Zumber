import React, { useState, useEffect } from 'react';
import ZumbyCard from './ZumbyCard';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function ZumbiesContainer({ zumbies, loggedUser, setLoggedUser, setSavedZumbies, main, setMessage }) {
  const [hasMore, setHasMore] = useState(true)
  const [shownZumbies, setShownZumbies] = useState(10)

  const [isDone, setIsDone] = useState(false)

  const loadMore = () => {
    if (shownZumbies >= zumbies.length) {
      setHasMore(false)
      return;
    }
    setShownZumbies(shownZumbies + 5)

  }

  const renderedZumbies = zumbies && zumbies.slice(0, shownZumbies).map((zumby, index) => {
    return (
      <ZumbyCard
        key={zumby.id}
        zumby={zumby}
        loggedUser={loggedUser}
        condition={true}
        main={main}
        setMessage={setMessage}
        setLoggedUser={setLoggedUser}
        setSavedZumbies={setSavedZumbies}
      />
    )
  })


  useEffect(() => {
    if (zumbies) {
      setIsDone(true)
    }
  }, [zumbies])

  if (!isDone) {
    return null;
  }

  return (
    <div className="w-full md:w-110">
      {zumbies && zumbies.length === 0 && (
        <div className="flex flex-col justify-center mt-10">
          <h1 className="text-3xl text-gray-700 font-bold text-center">No hay Zumbies</h1>
        </div>
      )}
      <InfiniteScroll
        dataLength={shownZumbies}
        next={loadMore}
        hasMore={hasMore}
      >
        {renderedZumbies}
      </InfiniteScroll>
    </div>
  );
}
