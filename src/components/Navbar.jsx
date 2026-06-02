"use client";

import React, { useState } from "react";
import Link from "next/link"; // If using Next.js Pages router, use "next/link"
import { HiBars3, HiXMark } from "react-icons/hi2";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="bg-[#121212] border-b border-zinc-800 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side: Mobile Menu Button & Logo */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <HiXMark className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiBars3 className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="font-bold text-2xl flex items-center gap-1">
                <span className="text-[#00d2ff]">hire</span>
                <span className="bg-gradient-to-r from-[#00d2ff] via-[#9d4edd] to-[#ff6b00] bg-clip-text text-transparent">
                  loop
                </span>
              </Link>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden sm:flex items-center justify-center flex-1 space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side: Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-[#7000ff] hover:text-[#8a2be2] text-sm font-semibold transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-sm font-medium px-5 py-2 rounded-xl shadow-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Pure HTML/CSS Toggle) */}
      {isMenuOpen && (
        <div className="sm:hidden id=mobile-menu" className="bg-[#121212] border-b border-zinc-800 px-4 pt-2 pb-4 space-y-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block text-zinc-300 hover:text-white hover:bg-zinc-800 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}