import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './user/home/Home'

const UserLayout = () => {
  return (
    <Routes>
        <Route path='' element={<Home />}/>
    </Routes>
  )
}

export default UserLayout
