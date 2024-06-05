import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Preview from './component/Preview'
import Login from './auth/Login'
import Register from './auth/Register'
import Home from './component/Home'
import './App.css'


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Preview/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App