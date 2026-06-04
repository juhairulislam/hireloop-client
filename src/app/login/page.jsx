"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password!");
        return;
      }

      toast.success("Welcome back! Successful login.");
      window.location.href = "/"
    } catch (err) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a12] px-4 relative overflow-hidden">
      {/* Background Neon Glow Effects */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glassmorphism Card with Neon Border */}
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-[#111122]/70 backdrop-blur-xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.2)] transition-all duration-500">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Welcome <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">Back</span>
          </h2>
          <p className="text-sm text-gray-400">Enter your credentials to access your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-purple-400 tracking-wider uppercase">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <FaEnvelope className="text-sm" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-[#0d0d1a]/80 text-white placeholder-gray-600 rounded-xl border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all duration-300 shadow-inner"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-purple-400 tracking-wider uppercase">Password</label>
              <a href="/forgot-password" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors">
                Forgot Password?
              </a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <FaLock className="text-sm" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-3 bg-[#0d0d1a]/80 text-white placeholder-gray-600 rounded-xl border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all duration-300 shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-purple-400 transition-colors focus:outline-none"
              >
                {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
              </button>
            </div>
          </div>

          {/* Login Button with Neon Glow */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-linear-to-r from-purple-600 to-cyan-500 text-white font-semibold tracking-wide hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transform active:scale-[0.98] transition-all duration-300 focus:outline-none"
          >
            Log In
          </button>
        </form>

        {/* Footer Link to Register */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-cyan-400 hover:text-purple-400 transition-colors duration-200 underline underline-offset-4 decoration-cyan-500/50 hover:decoration-purple-400"
            >
              Register Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}