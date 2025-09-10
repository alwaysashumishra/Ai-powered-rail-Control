import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CollectInfo() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && mobile) {
      // ✅ Normally yahan OTP send API call hogi
      alert(`OTP sent to ${email} and ${mobile}`);
      navigate("/otp-verify"); // 👈 OTP verify page pe bhej do
    } else {
      alert("Please fill all fields ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1d3557] via-[#222] to-[#1d3557]">
      <div className="bg-[#1e293b] shadow-2xl rounded-2xl w-full max-w-md p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Provide Your Details
        </h2>

        <p className="text-gray-300 text-center mb-6 text-sm">
          Please enter your <span className="text-blue-400">Email</span> and{" "}
          <span className="text-blue-400">Mobile Number</span> to continue.
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-[#334155] text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Mobile */}
        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-[#334155] text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold hover:scale-105 transition transform shadow-md"
        >
          Send OTP & Continue
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          🔒 Your information is safe with us.
        </p>
      </div>
    </div>
  );
}
