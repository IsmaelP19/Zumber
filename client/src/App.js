import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm'; 
import LoginForm from './components/LoginForm'; 
import Notification from './components/Notification';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Index from './components/Index';

function App() {
  const [message, setMessage] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  async function getUser() {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      setIsLogged(true);
      const user = JSON.parse(loggedUser).username;
      const token = JSON.parse(loggedUser).token;
      setUser(user);
      setToken(token);
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar isLogged={isLogged} username={user} />
      <div className='bg-dark-blue border-0 border-none'>
        <Notification message={message[0]} type={message[1]} />
      </div>
      <div className='flex-1 flex flex-col justify-center bg-light-blue'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index isLogged={isLogged} loggedUser={user} token={token}/>} />
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
