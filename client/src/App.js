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
import userService from './services/users';

export default function App() {
  const [isDone, setIsDone] = useState(false);
  const [message, setMessage] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  // we will add a different style only on login and register pages
  const style = window.location.pathname === "/login" || window.location.pathname === "/register" ? "justify-center" : "";


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
        <Notification message={message[0]} type={message[1]} />
      </div>
      <div className={`flex-1 flex flex-col bg-light-blue ${style}`} id='main'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index loggedUser={user} />} />
            <Route path="/register" element={<RegisterForm setMessage={setMessage} />} />
            <Route path="/login" element={isLogged ? <Navigate to="/" /> : <LoginForm setMessage={setMessage} isLogged={isLogged} />} />
            <Route path="/saved" element={isLogged ? <SavedZumbies loggedUser={user} /> : <Navigate to="/login" />} />
            {/* <Route path="/profile/edit" element={isLogged ? <ProfileForm setMessage={setMessage} loggedUser={user} />: <Navigate to="/" />} /> */}
            <Route path="/profile/edit" element={<ProfileForm setMessage={setMessage} loggedUser={user} />} />
            { /* <Route path="/saved" element={isLogged ? <SavedZumbies loggedUser={user} /> : <Navigate to="/login" />} /> */ }
            <Route path="/saved" element={<SavedZumbies loggedUser={user} />} />
            { /* <Route path="/following" element={isLogged ? <FollowingUsers loggedUser={user} /> : <Navigate to="/login" />} /> */ }
            <Route path="/following" element={<FollowingUsers loggedUser={user} />} />
            <Route path="/profile/:username" element={<Profile loggedUser={user} />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );

}