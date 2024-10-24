import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './user/home/Home'
import Login from './user/login/Login'
import Register from './user/register/Register'

const UserLayout = () => {
  return (
    <Routes>
        <Route path='' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
    </Routes>
  )
}

export default UserLayout
