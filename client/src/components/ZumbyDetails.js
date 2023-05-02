import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import zumbiesService from '../services/zumbies';
import ZumbyCard from './ZumbyCard';
import ZumbyForm from './ZumbyForm';
import ZumbiesContainer from './ZumbiesContainer';

export default function ZumbyDetails ({loggedUser}) {
  const zumbyId = useParams().zumbyId;

  const [zumby, setZumby] = useState(null);
  const [comments, setComments] = useState([]); // for the comments

  useEffect(() => {
    const hook = async () => {
      const zumby_ = await zumbiesService.getZumby(zumbyId);
      setZumby(zumby_);
      setComments(zumby_.comments);
    }
    hook();
  }, [zumbyId])

  if (!zumby) {
    return null;
  }

  return (
    <div className='flex flex-col items-center'>
      <ZumbyCard zumby={zumby} loggedUser={loggedUser} />
      <ZumbyForm loggedUser={loggedUser} prevZumby={zumby} zumbies={comments} setZumbies={setComments}  />

      {zumby.comments.length > 0 ? (
        <ZumbiesContainer zumbies={zumby.comments} loggedUser={loggedUser} />
      ) : (
        <></>
      )}
    </div>
  )
}