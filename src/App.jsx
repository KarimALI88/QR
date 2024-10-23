import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLayout from './pages/UserLayout'
import AdminLayout from './pages/AdminLayout'

function App() {
  return (
    <Routes>
      <Route path='/*' element={<UserLayout />}/>
      <Route path='/admin/*' element={<AdminLayout />}/>
    </Routes>
  )
}

export default App
