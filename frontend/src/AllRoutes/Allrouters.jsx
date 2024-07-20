import { Routes, Route } from "react-router-dom";

import { Find } from "../pages/Find";
import { Home } from "../pages/Home";

import { CreateEvents } from "../pages/CreateEvents";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/Signup";
import BoookEvents from "../pages/BookEvents";

export const Allrouters = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find" element={<Find />} />
        <Route path="/bookevent" element={<BoookEvents />} />
        <Route path="/createEvents" element={<CreateEvents />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};
