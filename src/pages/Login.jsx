import React, { useState } from "react";
import logo from "../assets/2.png";
import { Link } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState(() =>
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );
  const [showHelp, setShowHelp] = useState(false);
  const [showForgot, setShowForgot] = useState(false); // 👈 new modal state
  const [resetEmail, setResetEmail] = useState("");

  const handleLogin = () => {
    if (role && userId && password && captchaInput === captcha) {
      alert(`Welcome ${role} 🚆`);
    } else {
      alert("Please fill all fields correctly ❌");
    }
  };

  const regenerateCaptcha = () => {
    setCaptcha(Math.random().toString(36).substring(2, 8).toUpperCase());
    setCaptchaInput("");
  };

  const handlePasswordReset = () => {
    if (!resetEmail) {
      alert("⚠️ Please enter your registered email or user ID.");
      return;
    }
    alert(`📩 Reset link sent to ${resetEmail}`);
    setShowForgot(false); // close modal after request
    setResetEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#1d3557] via-[#222] to-[#1d3557] relative">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start p-8 md:pl-16 text-white">
        <img src={logo} alt="Indian Railways" className="w-72 h-28 object-contain mb-6" />
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">
          Indian Railway Traffic Control
        </h1>
        <p className="text-md md:text-lg text-center md:text-left">
          भारतीय रेल • iRAIL-Control Portal
        </p>
      </div>

      {/* Login Portal */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 relative">
        <div className="bg-[#1e293b] shadow-2xl rounded-2xl w-full max-w-md p-8 relative z-10">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            iRAIL-Control Login Portal
          </h2>

          {/* Role */}
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
            <p
              className="hover:underline cursor-pointer text-blue-500"
              onClick={() => setShowHelp(true)}
            >
              Need Help for Login?
            </p>
            <p
              className="hover:underline cursor-pointer text-yellow-400"
              onClick={() => setShowForgot(true)}
            >
              Forgot Password?
            </p>
            <p className="text-red-400 hover:underline cursor-pointer">
              📢 Notices
            </p>
          </div>
        </div>

        {/* ---------------- Need Help Modal ---------------- */}
        {showHelp && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-[#1e293b] rounded-2xl p-6 max-w-md w-full relative shadow-2xl">
              <button
                className="absolute top-3 right-4 text-white font-bold text-2xl"
                onClick={() => setShowHelp(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold text-white text-center mb-4">
                Need Help with Login?
              </h2>
              <p className="text-gray-300 text-center mb-4">
                If you are facing issues while logging in, please contact our
                support team:
              </p>
              <a
                href="mailto:info@irailcontrol.com?subject=Login%20Issue&body=Please%20describe%20your%20issue.%20Attach%20a%20screenshot."
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
              >
                info@irailcontrol.com
              </a>
              <p className="text-sm text-gray-400 text-center mt-2">
                ⚠️ Don’t forget to attach a screenshot of the error.
              </p>
            </div>
          </div>
        )}

        {/* ---------------- Forgot Password Modal ---------------- */}
        {showForgot && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-[#1e293b] rounded-2xl p-6 max-w-md w-full relative shadow-2xl">
              <button
                className="absolute top-3 right-4 text-white font-bold text-2xl"
                onClick={() => setShowForgot(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold text-white text-center mb-4">
                Forgot Password?
              </h2>
              <p className="text-gray-300 text-center mb-4">
                Enter your registered email or User ID.  
                We’ll send you a reset link.
              </p>
              <input
                type="text"
                placeholder="Email or User ID"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full mb-4 px-4 py-3 rounded-lg bg-[#334155] text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={handlePasswordReset}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg font-semibold hover:scale-105 transition transform shadow-md"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
