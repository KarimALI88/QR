import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './user/home/Home'
import Login from './user/login/Login'
import Register from './user/register/Register'
import QrForm from './user/qrForm/QrForm'
import PackageOneTwo from './user/qrBigPackages/PackageOneTwo'

const UserLayout = () => {
  return (
    <Routes>
        <Route path='' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/generate-qr' element={<QrForm />}/>
        <Route path='/qr' element={<PackageOneTwo />}/>
    </Routes>
  )
}

export default UserLayout
