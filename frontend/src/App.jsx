import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Navbar } from './components/Navbar';

function App() {

  return (
    <>
      <h2>Event</h2>
      <Router>
        <Navbar/>
        <Routes>
          
          <Route path="/Login" element={<Login/>} />
          <Route path="/Signup" element={<Signup/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
