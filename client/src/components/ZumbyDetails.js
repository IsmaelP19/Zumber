import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import zumbiesService from '../services/zumbies';
import ZumbyCard from './ZumbyCard';
import ZumbyForm from './ZumbyForm';
import ZumbiesContainer from './ZumbiesContainer';

export default function ZumbyDetails({ loggedUser }) {

  useEffect(() => {
    document.title = "Zumber | Detalles Zumby";
  }, []);

  const zumbyId = useParams().zumbyId;

  const [zumby, setZumby] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const hook = async () => {
      const zumby_ = await zumbiesService.getZumby(zumbyId);
      setZumby(zumby_);
      zumby_.comments.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setComments(zumby_.comments);
    }
    hook();
  }, [zumbyId])

  if (!zumby) {
    return null;
  }

  return (
    <div className='flex flex-col items-center '>
      <div className='w-full md:w-110'>
        <ZumbyCard zumby={zumby} loggedUser={loggedUser} commentsState={comments} main={true} />
        {loggedUser ? (
          <ZumbyForm loggedUser={loggedUser} prevZumby={zumby} setPrevZumby={setZumby} zumbies={comments} setZumbies={setComments} />
        ) : (
          <></>
        )
        }

        {comments.length > 0 ? (
          <ZumbiesContainer zumbies={comments} loggedUser={loggedUser} />
        ) : (
          <></>
        )}
      </div>
    </div>

  )
}