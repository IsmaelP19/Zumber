import { TbError404 } from 'react-icons/tb'
import { HiOutlineEmojiSad } from 'react-icons/hi'
import Button from './Button'
import { useEffect } from 'react'

export default function Error404() {

  useEffect (() => {
    document.getElementById('main').classList.add('justify-center')
  }, [])

  // TODO: change styles
  return (
    <div className="flex flex-col justify-center w-full px-7">
      <div className='flex w-full justify-center'>
        <TbError404 className="text-9xl text-dark-blue" />
        <HiOutlineEmojiSad className="text-9xl text-dark-blue" />
      </div>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-center text-xl font-mono'>Parece que la página a la que intentas acceder no existe</h1>
        <Button onClick={() => { window.location.href = '/' }}> Volver al inicio </Button>
      </div>
    </div>

  )

}