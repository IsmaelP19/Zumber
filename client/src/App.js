import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Index from './components/Index';
import SavedZumbies from './components/SavedZumbies';
import FollowingUsers from './components/FollowingZumbies';
import ProfileForm from './components/ProfileForm';
import Profile from './components/Profile';
import Error404 from './components/Error404';
import ZumbyDetails from './components/ZumbyDetails';
import userService from './services/users';

export default function App() {
  const [isDone, setIsDone] = useState(false);
  const [message, setMessage] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [style, setStyle] = useState("");

  useEffect(() => {
    const hook = async () => {
      const loggedUser = localStorage.getItem("loggedUser");
      if (loggedUser) {
        setIsLogged(true);
        const user = JSON.parse(loggedUser); //token
        const response = await userService.getUserByUsername(user.username);
        response.token = user.token;
        setUser(response);
      }
      if (window.location.pathname === "/login" || window.location.pathname === "/register" || ((window.location.pathname === "/saved" || window.location.pathname === "/following" || window.location.pathname === "/profile/edit" || window.location.pathname.includes('profile')) && !loggedUser)) {
        setStyle("justify-center");
      }
      setIsDone(true);
    }
    hook()
  }, [])

  if (!isDone) {
    return null;
  }
  
  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar user={user} />
      <div className='bg-light-blue border-0 border-none'>
        <Notification message={message[0]} type={message[1]}  />
      </div>
      <div className={`flex-1 flex flex-col bg-light-blue ${style}`} id='main'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index loggedUser={user} setMessage={setMessage} setLoggedUser={setUser} />} />
            <Route path="/register" element={<RegisterForm setMessage={setMessage} />} />
            <Route path="/login" element={isLogged ? <Navigate to="/" /> : <LoginForm setMessage={setMessage} isLogged={isLogged} />} />
            <Route path="/saved" element={isLogged ? <SavedZumbies loggedUser={user} setLoggedUser={setUser} /> : <Navigate to="/login" />} />
            <Route path="/profile/edit" element={isLogged ? <ProfileForm setMessage={setMessage} loggedUser={user} />: <Navigate to="/login" />} />
            <Route path="/following" element={isLogged ? <FollowingUsers loggedUser={user} setLoggedUser={setUser} /> : <Navigate to="/login" />} />
            <Route path="/profile/:username" element={isLogged ? <Profile loggedUser={user} setLoggedUser={setUser} setMessage={setMessage} /> : <Navigate to="/login" />} />
            <Route path="/:zumbyId" element={<ZumbyDetails loggedUser={user} setLoggedUser={setUser} />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );

}