"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { BiLoaderAlt } from "react-icons/bi";
import { FiLogOut, FiUser } from "react-icons/fi";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast"; 

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); 
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const menuItems = [
    { label: "Browse Jobs", href:"/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/plans" },
  ];

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    const toastId = toast.loading("Logging out...");

    try {
      await authClient.signOut();
      toast.success("Logged out successfully!", { id: toastId });
      

      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-[#121212] border-b border-zinc-800 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left Side: Mobile Menu Button & Logo */}
          <div className="flex items-center gap-4">

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

          {/* Right Side: Navigation Links & Auth/User Content */}
          <div className="hidden sm:flex items-center gap-6 ml-auto">

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

            {/* Auth/User Dynamic Section */}
            <div className="flex items-center gap-4 min-w-[120px] justify-end">
              {isPending ? (
                <BiLoaderAlt className="animate-spin text-zinc-400 h-5 w-5" />
              ) : user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2.5 bg-zinc-900/50 border border-zinc-800 pl-2 pr-3 py-1.5 rounded-xl">
                    {user.image ? (
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-zinc-700/50 flex-shrink-0">
                        <Image
                          src={user.image}
                          alt={user.name || "User"}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="bg-zinc-800 p-2 rounded-full text-zinc-400 flex items-center justify-center w-9 h-9 flex-shrink-0 border border-zinc-700/50">
                        <FiUser className="h-4 w-4" />
                      </div>
                    )}
                    <span className="text-zinc-200 text-sm font-medium max-w-[100px] truncate">
                      {user.name}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-red-400 text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingOut ? (
                      <BiLoaderAlt className="animate-spin h-4 w-4" />
                    ) : (
                      <FiLogOut className="h-4 w-4" />
                    )}
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="text-[#6366f1] hover:text-[#a855f7] text-sm font-semibold transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-gradient-to-r from-[#5b45ff] to-[#8b5cf6] text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/10 hover:opacity-90 transition-all transform hover:scale-[1.02]"
                  >
                    Get Started
                  </Link>
                </                >
              )}
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
            {isPending ? (
              <div className="flex justify-center py-2">
                <BiLoaderAlt className="animate-spin text-zinc-400 h-5 w-5" />
              </div>
            ) : user ? (
              <>
                <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 p-2 rounded-xl">
                  {user.image ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-700/50 flex-shrink-0">
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="bg-zinc-800 p-2.5 rounded-full text-zinc-400 flex items-center justify-center w-10 h-10 flex-shrink-0 border border-zinc-700/50">
                      <FiUser className="h-5 w-5" />
                    </div>
                  )}
                  <span className="text-zinc-200 text-base font-medium truncate">
                    {user.name}
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  disabled={isLoggingOut}
                  className="flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 text-red-400 hover:bg-zinc-800 text-sm font-medium py-2.5 rounded-xl transition-colors w-full disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <BiLoaderAlt className="animate-spin h-4 w-4" />
                  ) : (
                    <FiLogOut className="h-4 w-4" />
                  )}
                  <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-center text-zinc-400 hover:text-white text-sm font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-center bg-gradient-to-r from-[#5b45ff] to-[#8b5cf6] text-white text-sm font-medium py-2.5 rounded-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}