"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="hireloop logo"
                  width={130}
                  height={32}
                  priority
                  className="object-contain"
                />
              </Link>
            </div>
          </div>

          {/* Right Side: Navigation Links & Auth Buttons */}
          <div className="hidden sm:flex items-center gap-6 ml-auto">
            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-8 mr-2">
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

            {/* Vertical Divider */}
            <div className="h-5 w-[1px] bg-zinc-700" />

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-[#6366f1] hover:text-[#a855f7] text-sm font-semibold transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-[#5b45ff] to-[#8b5cf6] text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/10 hover:opacity-90 transition-all transform hover:scale-[1.02]"
              >
                Get Started
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="sm:hidden bg-[#121212] border-b border-zinc-800 px-4 pt-2 pb-4 space-y-1">
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
          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
            <Link
              href="/login"
              className="text-center text-zinc-400 hover:text-white text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-center bg-gradient-to-r from-[#5b45ff] to-[#8b5cf6] text-white text-sm font-medium py-2.5 rounded-xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}