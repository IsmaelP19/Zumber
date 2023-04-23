import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm'; 
import Footer from './components/Footer';

function App() {
  return (
    <div className="App w-full h-full">
      <div className="bg-dark-blue w-full h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1> Home </h1>} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="*" element={<h1> 404 </h1>} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
