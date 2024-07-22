import { Link } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import React from 'react'
import { Find } from '../pages/Find'
import { Home } from '../pages/Home'
import { BookEvents } from '../pages/BookEvents'
import { CreateEvents } from '../pages/CreateEvents'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'
import { Eventdetails } from '../pages/Eventdetails'

export const Allrouters = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/find" element={<Find />} />
                <Route path="/bookevent" element={<BookEvents />} />
                <Route path="/createEvents" element={<CreateEvents />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/eventdetails/:id" element={<Eventdetails />} />
            </Routes>
        </>
    )
}

// there is comit
