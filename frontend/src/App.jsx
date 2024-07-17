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
    </>
  );
}

export default App;
