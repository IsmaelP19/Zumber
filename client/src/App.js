import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm'; 
import LoginForm from './components/LoginForm'; 
import Notification from './components/Notification';
import Footer from './components/Footer';

function App() {
  const [message, setMessage] = useState([])
  const [isLogged, setIsLogged] = useState(false)
  async function getUser () {
    const loggedUser = localStorage.getItem('loggedUser')
    if (loggedUser) {
      setIsLogged(true)
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className="App flex flex-col min-h-screen">
      
      <div className='h-24 bg-dark-blue border-b border-gray-400'>
        AA
      </div>


      <div className='flex-1 bg-dark-blue'>
      <Notification message={message[0]} type={message[1]} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1> Home </h1>} />
            <Route path="/register" element={<RegisterForm setMessage={setMessage}/>} />

            <Route path="/login" element={isLogged ? <Navigate to="/" /> : <LoginForm setMessage={setMessage} isLogged={isLogged} />} />
            <Route path="*" element={<h1> 404 </h1>} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer className='bottom-0'/>
    </div>
  );
}

export default App;
