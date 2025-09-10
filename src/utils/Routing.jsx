import React from 'react'
import ForgotPassword from '../components/ForgotPassword'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'

const Routing = () => {
  return (
    <Routes>
      <Route path="/forget" element={<ForgotPassword />} /> {/* ✅ route */}
    </Routes>
  )
}

export default Routing
