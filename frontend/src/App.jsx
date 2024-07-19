
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppNavbar from "./componets/AppNavBar";
import Footer from "./componets/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppNavbar />
      <Footer />

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
  );
}

export default App;
