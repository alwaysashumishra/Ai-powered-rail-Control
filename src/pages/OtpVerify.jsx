import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpVerify() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(180); // 3 min = 180 sec
  const navigate = useNavigate();

  // Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  // Format mm:ss
  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle OTP input
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // only digits
    if (!value) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input
    if (e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  // Handle Verify
  const handleVerify = () => {
    if (otp.join("").length === 6) {
      alert("✅ OTP Verified Successfully!");
      navigate("/dashboard"); // change path as per flow
    } else {
      alert("⚠️ Please enter a valid 6-digit OTP.");
    }
  };

  // Resend OTP
  const handleResend = () => {
    setOtp(new Array(6).fill(""));
    setTimer(180);
    alert("📩 New OTP sent to your Email!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#1d3557] via-[#222] to-[#1d3557]">
      <div className="bg-[#1e293b] shadow-2xl rounded-2xl w-full max-w-md p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">OTP Verification</h2>
        <p className="text-gray-300 text-sm mb-6">
          Enter the 6 digit verification code received on your Email ID
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 text-center text-lg font-semibold rounded-lg bg-[#334155] border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ))}
        </div>

        {/* Timer + Resend */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <span className="text-gray-300">
            Verification code{" "}
            <span className="font-semibold text-blue-400">{formatTime(timer)}</span>
          </span>
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className={`${
              timer > 0
                ? "text-gray-500 cursor-not-allowed"
                : "text-blue-400 hover:underline"
            }`}
          >
            Resend OTP
          </button>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold hover:scale-105 transition transform shadow-md"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
