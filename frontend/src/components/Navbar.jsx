import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const event = localStorage.getItem('event');
        setIsLoggedIn(!!event);
    }, []);

    return (
        <>
            <li>
                <NavLink
                    to="/Login"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                    <button className="nav-button">LOG IN</button>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/Signup"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                    <button className="nav-button signup-button">SIGN UP</button>
                </NavLink>
            </li>
        </>
    )

}