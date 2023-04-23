import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm'; 
import Footer from './components/Footer';

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <div className="flex-1 bg-dark-blue">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1> Home </h1>} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="*" element={<h1> 404 </h1>} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer className='bottom-0'/>
    </div>
  );
}

export default App;
