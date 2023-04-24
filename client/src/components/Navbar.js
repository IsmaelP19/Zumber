import logo from '../logo.svg'
import { useState } from 'react'

export default function Navbar({ isLogged, username }) {
  const [isOpenDrawer, setOpenDrawer] = useState(false)
  const [isOpenDropdown, setOpenDropdown] = useState(false)

  const links = [
    {
      name: 'Inicio',
      href: '/'
    },
    {
      name: 'Guardados',
      href: '/saved'
    }

  ]



  return (
    <nav className='shadow-2xl md:shadow-md w-full sticky md:block top-0 left-0 border-b border-gray-600'>
      <div className='md:flex items-center justify-between bg-dark-blue md:px-10 px-7 py-4 md:py-0'>
        <div className='font-bold text-xl flex items-center text-gray-800 gap-10 h-full justify-between md:justify-start'>
          <a href='/' className='flex items-center cursor-pointer'>
            <img src={logo} className='h-10 w-10' alt='logo' />
            {/* TODO: change logo icon*/}
            <span className='self-center text-xl font-semibold whitespace-nowrap text-white tracking-widest'>Zumber</span>
          </a>
          <ul className='hidden md:flex md:h-20'>
            {
              links.map((link, index) => (
                <li key={index} className='cursor-pointer hover:bg-gold hover:text-gray-700 text-white h-full flex items-center transition-all duration-200 px-4' >
                  <a href={link.href} className='h-full w-full flex items-center'>
                    {link.name}
                  </a>
                </li>

              ))
            }
          </ul>


          <div className='md:hidden'>
            <button onClick={() => setOpenDrawer(!isOpenDrawer)} className='flex items-center px-3 py-2 border rounded text-white border-white cursor-pointer'>
              <svg className='fill-current h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <title>Menu</title>
                <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
              </svg>
            </button>
          </div>
        </div>

        <div className='hidden md:flex items-center gap-10 font-bold text-xl'>
          {
            isLogged ? (
              <div >
                <button onClick={() => setOpenDropdown(!isOpenDropdown)} className='flex items-center px-3 py-2 text-white'>
                  <span className='text-white'>{username}</span>
                  {/* add dropdown svg icon */}
                  <svg
                    className="w-5 h-5 inline-block ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" clipRule="evenodd" />
                  </svg>

                </button>
                {
                  isOpenDropdown && (
                    <div className='absolute right-16 mt-2 py-2 w-40 bg-white rounded-md shadow-xl border-2 border-gray-600'>
                      <a href='/profile' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gold transition-all duration-200'>Perfil</a>
                      <a href='/' onClick={() => { localStorage.removeItem('loggedUser') }} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gold transition-all duration-200'>Cerrar sesión</a>
                    </div>
                  )
                }
              </div>
            ) : (
              <div className='flex items-center gap-10'>
                <a href='/login' className='text-white'>Iniciar sesión</a>
                <a href='/register' className='text-white'>Registrarse</a>
              </div>
            )
          }
        </div>

        {/* mobile menu */}
        {isOpenDrawer && (
          <div className='md:hidden flex flex-col gap-2'>
            <ul>
              {
                links.map((link, index) => (
                  <li key={index} className='text-center font-bold text-xl py-4 hover:bg-gold hover:text-gray-700 text-white '>
                    <a href={link.href} onClick={() => setOpenDrawer(!isOpenDrawer)}>
                      {link.name}
                    </a>
                  </li>
                ))
              }
              {isLogged ? (
                <>
                  <li className='text-center font-bold text-xl py-5 hover:bg-gold hover:text-gray-700 text-white'>
                    <a href='/profile' onClick={() => setOpenDrawer(!isOpenDrawer)}>
                      Perfil
                    </a>
                  </li>
                  <li className='text-center font-bold text-xl py-5 hover:bg-gold hover:text-gray-700 text-white'>
                    <a href='/' onClick={() => {
                      localStorage.removeItem('loggedUser')
                      setOpenDrawer(!isOpenDrawer)
                    }}>
                      Cerrar sesión
                    </a>
                  </li>
                </>
              ) : (
<>
                  <li className='text-center font-bold text-xl py-5 hover:bg-gold hover:text-gray-700 text-white'>
                    <a href='/login' onClick={() => setOpenDrawer(!isOpenDrawer)}>
                      Iniciar sesión
                    </a>
                  </li>
                  <li className='text-center font-bold text-xl py-5 hover:bg-gold hover:text-gray-700 text-white'>
                    <a href='/register' onClick={() => {setOpenDrawer(!isOpenDrawer)}}>
                      Registrarse
                    </a>
                  </li>
                </>
              )
              }
            </ul>
          </div>
        )}

      </div>
    </nav>

  )
}
