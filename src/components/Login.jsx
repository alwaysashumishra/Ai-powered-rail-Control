import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import logo from "../assets/rail-logo.png"; 

export default function Login({ setIsLoggedIn }) {
  const [role, setRole] = useState(""); // role select
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [step, setStep] = useState("email");

  const captchaTimerRef = useRef(null);

  // Random captcha generator
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(text);

    setCaptchaInput("");
    if (captchaTimerRef.current) clearTimeout(captchaTimerRef.current);

    captchaTimerRef.current = setTimeout(() => {
      generateCaptcha();
    }, 60000); // auto refresh 1 min
  };

  useEffect(() => {
    generateCaptcha();
    return () => {
      if (captchaTimerRef.current) clearTimeout(captchaTimerRef.current);
    };
  }, []);

  // Send OTP
  const sendOtp = () => {
    if (captchaInput !== captcha) {
      alert("Captcha galat hai!");
      generateCaptcha();
      return;
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);

    const templateParams = {
      to_email: email,
      otp: otpCode,
    };

    emailjs
      .send(
        "service_612cj6r", // replace with EmailJS service ID
        "template_ce6qkvm", // replace with template ID
        templateParams,
        "hbmfDbK0he23pGzaL" // replace with public key
      )
      .then(
        () => {
          alert("Otp send successfully!");
          setStep("otp");
        },
        (error) => {
          console.error("Error:", error.text);
        }
      );
  };

  // Verify OTP
  const verifyOtp = () => {
    if (otp === generatedOtp) {
      alert(`Login successful as ${role} 🎉`);
      setIsLoggedIn(true);
    } else {
      alert("Wrong Otp ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 via-gray-50 to-blue-100">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-[420px] border border-gray-200">
        
        {/* Railway Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Indian Railway"
            className="w-20 h-20 object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Indian Railway Login
        </h2>

        {/* Role Selector */}
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setStep("email"); // reset to email step
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none mb-6"
        >
          <option value="">-- Select Role --</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Controller">Controller</option>
        </select>

        {/* Supervisor Flow */}
        {role === "Supervisor" && step === "email" && (
          <>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
            />

            {/* Captcha */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-4 py-2 bg-gray-200 rounded-lg font-mono tracking-widest text-gray-800">
                {captcha}
              </span>
              <button
                onClick={generateCaptcha}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                ↻
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter Captcha"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none mb-6"
            />

            <button
              onClick={sendOtp}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-md hover:scale-[1.02] transform transition"
            >
              Send OTP
            </button>
          </>
        )}

        {/* Supervisor OTP Step */}
        {role === "Supervisor" && step === "otp" && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none mb-6"
            />

            <button
              onClick={verifyOtp}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-md hover:scale-[1.02] transform transition"
            >
              Verify & Login
            </button>
          </>
        )}

        {/* Controller Flow (placeholder for now) */}
        {role === "Controller" && (
          <div className="text-center text-gray-600 mt-6">
            <p>Controller login coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
