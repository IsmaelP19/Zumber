import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import zumbiesService from '../services/zumbies';
import ZumbyCard from './ZumbyCard';
import ZumbyForm from './ZumbyForm';
import ZumbiesContainer from './ZumbiesContainer';
import Error404 from './Error404';

export default function ZumbyDetails({ loggedUser, setLoggedUser }) {
  const [isDone, setIsDone] = useState(false)
  useEffect(() => {
    document.title = "Zumber | Detalles Zumby";
  }, []);

  const zumbyId = useParams().zumbyId;

  const [zumby, setZumby] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const hook = async () => {
      try {
        const zumby_ = await zumbiesService.getZumby(zumbyId);
        setZumby(zumby_)
        zumby_.comments.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        }
        );
        setComments(zumby_.comments);
      } catch (error) {
        console.error(error)
      }

      setIsDone(true)
    }
    hook();
  }, [zumbyId])

  if (isDone && !zumby) {
    return <Error404 />;
  }

  return isDone && (
    <div className='flex flex-col items-center '>
      <div className='w-full md:w-110'>
        <ZumbyCard zumby={zumby} loggedUser={loggedUser} commentsState={comments} main={true} setLoggedUser={setLoggedUser} />
        {loggedUser ? (
          <ZumbyForm loggedUser={loggedUser} prevZumby={zumby} setPrevZumby={setZumby} zumbies={comments} setZumbies={setComments} setLoggedUser={setLoggedUser} />
        ) : (
          <hr className='border border-slate-400 rounded-full' />
        )
        }

        {comments.length > 0 ? (
          <ZumbiesContainer zumbies={comments} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
        ) : (
          <></>
        )}
      </div>
    </div>

  )
}