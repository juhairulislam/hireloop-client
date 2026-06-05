"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import React, { useState } from "react";
import { FiGrid, FiBriefcase, FiUsers, FiSettings } from "react-icons/fi";
import { HiMenuAlt2, HiX } from "react-icons/hi";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const navLinks = [
    { name: "Dashboard", icon: <FiGrid />, active: true },
    { name: "My Company", icon: <FiBriefcase />, active: false },
    { name: "Manage Jobs", icon: <FiBriefcase />, active: false },
    { name: "Applications", icon: <FiUsers />, active: false },
    { name: "Settings", icon: <FiSettings />, active: false },
  ];

  if (isPending) {
    return (
      <div className="fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-[#0a0c10] flex items-center justify-center border-r border-gray-800/40 z-40">
        <h1 className="text-gray-400 text-sm animate-pulse">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Menu Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-[76px] left-4 z-40 md:hidden h-10 w-10 rounded-xl border border-zinc-800 bg-zinc-900 text-white shadow-lg flex items-center justify-center"
        >
          <HiMenuAlt2 size={20} />
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 top-16 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0
          h-[calc(100vh-64px)]
          w-[280px]
          md:w-64
          bg-[#0a0c10]
          border-r border-gray-800/40
          p-6
          flex flex-col
          z-40
          transition-transform duration-300 ease-in-out
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end md:hidden mb-4">
          <button
            onClick={() => setIsOpen(false)}
            className="h-9 w-9 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center"
          >
            <HiX size={18} />
          </button>
        </div>

        {/* User Section */}
        <div className="flex flex-col items-start gap-2 mb-6 pb-6 border-b border-gray-800/50 flex-shrink-0">
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-800 bg-gray-700 flex items-center justify-center flex-shrink-0">
              {user?.image ? (
                <Image
                  width={40}
                  height={40}
                  src={user.image}
                  alt={user?.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-[#5b45ff] to-[#8b5cf6] flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0) || "R"}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-white truncate">
                {user?.name || "Recruiter"}
              </h2>

              <span className="text-[11px] text-zinc-500 block truncate">
                {user?.role || "Recruiter"}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto min-h-0 pr-1">
          <ul className="space-y-1.5">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-4
                    px-4 py-3
                    rounded-xl
                    text-sm font-medium
                    transition-all duration-200
                    ${
                      link.active
                        ? "bg-[#1a1f26] text-white border border-zinc-800/50"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                    }
                  `}
                >
                  <span
                    className={`text-lg ${
                      link.active
                        ? "text-white"
                        : "text-zinc-500"
                    }`}
                  >
                    {link.icon}
                  </span>

                  <span>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;