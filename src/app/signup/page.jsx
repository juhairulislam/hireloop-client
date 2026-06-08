"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaEye, FaEyeSlash, FaSpinner, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    imageLink: "",
    password: "",
    role: "seeker", 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.imageLink,
        // Better-Auth expects additional fields under the data object or direct payload depending on client setup
        data: {
          role: formData.role,
        },
      });

      if (error) {
        toast.error(error.message || "Something went wrong!");
        return;
      }

      toast.success("Successful sign up!");
      window.location.href = "/";
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a12] px-4 relative overflow-hidden py-12">
      {/* Background Neon Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glassmorphism Card with Neon Border */}
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-[#111122]/70 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:border-purple-500/40 hover:shadow-[0_0_35px_rgba(168,85,247,0.2)] transition-all duration-500">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Create <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">Account</span>
          </h2>
          <p className="text-sm text-gray-400">Fill in the details to register your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Custom Professional Radio Group for Role Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Join As</label>
            <div className="grid grid-cols-2 gap-3">
              {/* Seeker Option */}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleRoleChange("seeker")}
                className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border text-sm font-medium transition-all duration-300 outline-none ${
                  formData.role === "seeker"
                    ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    : "bg-[#0d0d1a]/60 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300"
                }`}
              >
                <FaGraduationCap className="text-base" />
                <span>Job Seeker</span>
              </button>

              {/* Recruiter Option */}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleRoleChange("recruiter")}
                className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border text-sm font-medium transition-all duration-300 outline-none ${
                  formData.role === "recruiter"
                    ? "bg-purple-500/10 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                    : "bg-[#0d0d1a]/60 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300"
                }`}
              >
                <FaBriefcase className="text-sm" />
                <span>Recruiter</span>
              </button>
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                <FaUser className="text-sm" />
              </div>
              <input
                type="text"
                name="name"
                disabled={isLoading}
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 bg-[#0d0d1a]/80 text-white placeholder-gray-600 rounded-xl border border-gray-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all duration-300 shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                <FaEnvelope className="text-sm" />
              </div>
              <input
                type="email"
                name="email"
                disabled={isLoading}
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[#0d0d1a]/80 text-white placeholder-gray-600 rounded-xl border border-gray-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all duration-300 shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Image Link Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Profile Image URL</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                <FaImage className="text-sm" />
              </div>
              <input
                required
                type="url"
                name="imageLink"
                disabled={isLoading}
                value={formData.imageLink}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                className="w-full pl-10 pr-4 py-2.5 bg-[#0d0d1a]/80 text-white placeholder-gray-600 rounded-xl border border-gray-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all duration-300 shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                <FaLock className="text-sm" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                disabled={isLoading}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-2.5 bg-[#0d0d1a]/80 text-white placeholder-gray-600 rounded-xl border border-gray-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all duration-300 shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-cyan-400 transition-colors focus:outline-none disabled:opacity-50"
              >
                {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
              </button>
            </div>
          </div>

          {/* Register Button with Neon Glow and Loading State */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 px-4 rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 text-white font-semibold tracking-wide hover:from-cyan-400 hover:to-purple-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transform active:scale-[0.98] transition-all duration-300 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin text-lg" />
                <span>Registering...</span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Footer Link to Login */}
        <div className="mt-5 text-center">
          <p className="text-xs text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-purple-400 hover:text-cyan-400 transition-colors duration-200 underline underline-offset-4 decoration-purple-500/50 hover:decoration-cyan-400"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}