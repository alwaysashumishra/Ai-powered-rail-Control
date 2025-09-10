import React from "react";
import { Mail } from "lucide-react"; // icon for mail (optional)

export default function NeedHelp() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#1d3557] via-[#222] to-[#1d3557] text-white px-6">
      <div className="bg-[#1e293b] shadow-xl rounded-2xl max-w-lg w-full p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-4">
          Need Help with Login?
        </h1>
        <p className="text-center text-gray-300 mb-6">
          If you are facing issues while logging in, please contact our support
          team.  
          You can send us an email at:
        </p>

        {/* Mail Section */}
        <div className="flex flex-col items-center space-y-4">
          <a
            href="mailto:info@irailcontrol.com?subject=Login%20Issue%20-%20IRail%20Control&body=Please%20describe%20your%20issue%20here.%20Don't%20forget%20to%20attach%20a%20screenshot%20of%20the%20error."
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
          >
            <Mail className="w-5 h-5" /> info@irailcontrol.com
          </a>

          <p className="text-sm text-gray-400 text-center">
            ⚠️ Please attach a **screenshot** of the error you are getting so
            that our team can assist you faster.
          </p>
        </div>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-blue-400 hover:underline font-medium"
          >
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
