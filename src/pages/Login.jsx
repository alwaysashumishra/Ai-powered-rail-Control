import React, { useState } from "react";
import logo from "../assets/2.png"; 
import { Link, Route, Routes } from "react-router-dom";
import NeedHelp from "../components/NeedHelp";

// apna logo path daalna

export default function Login() {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState(() =>
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );

  const handleLogin = () => {
    if (role && userId && password && captchaInput === captcha) {
      alert(`Welcome ${role} 🚆`);
      setIsLoggedIn(true);
    } else {
      alert("Please fill all fields correctly ❌");
    }
  };

  const regenerateCaptcha = () => {
    setCaptcha(Math.random().toString(36).substring(2, 8).toUpperCase());
    setCaptchaInput("");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#1d3557] via-[#222] to-[#1d3557]">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start p-8 md:pl-16 text-white">
        <img
          src={logo}
          alt="Indian Railways"
          className="w-72 h-28 object-contain mb-6"
        />
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">
          Indian Railway Traffic Control
        </h1>
        <p className="text-md md:text-lg text-center md:text-left">
          भारतीय रेल • iRAIL-Control Portal
        </p>
      </div>

      {/* Login Portal (Right Side Card) */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <div className="bg-[#1e293b] shadow-2xl rounded-2xl w-full max-w-md p-8">
          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            iRAIL-Control Login Portal
          </h2>

          {/* Role Selector */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-lg bg-[#334155] text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">-- Select Role --</option>
            <option value="Admin">Admin</option>
            <option value="Divisional Headquater">Divisonal Headquater</option>
            <option value="Train Controller">Train Controller</option>
            <option value="Station Master">Station Master</option>
          </select>

          {/* User ID */}
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-lg bg-[#334155] text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-lg bg-[#334155] text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Captcha */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-4 py-2 bg-[#475569] text-white rounded-lg font-mono tracking-widest">
              {captcha}
            </span>
            <button
              onClick={regenerateCaptcha}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              ↻
            </button>
          </div>

          <input
            type="text"
            placeholder="Enter Captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-lg bg-[#334155] text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold hover:scale-105 transition transform shadow-md"
          >
            Login
          </button>

          {/* Extra Links */}
          <div className="mt-6 text-center text-sm text-gray-300 space-y-2">
            
              
             <Link to ="/need-help" className="hover:underline cursor-pointer text-blue-500"> Need Help for Login?</Link>
            
            <p className="hover:underline cursor-pointer">Forgot Password?</p>
            <p className="text-red-400 hover:underline cursor-pointer">
              📢 Notices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
