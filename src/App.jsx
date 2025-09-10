import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import CollectInfo from "./pages/CollectInfo";
import OtpVerify from "./pages/OtpVerify";

export default function App() {
  return (
  
      <Routes>
        {/* Default route = Login */}
       

        {/* Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/collect" element={<CollectInfo />} />
        <Route path="/otp-verify" element={<OtpVerify />} />
      </Routes>
    
  );
}
