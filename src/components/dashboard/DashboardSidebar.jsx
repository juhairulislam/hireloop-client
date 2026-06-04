"use client";

import { useSession } from '@/lib/auth-client';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiGrid, FiBriefcase, FiUsers, FiSettings, FiMenu, FiX } from 'react-icons/fi';

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending } = useSession();

  const user = session?.user;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Dashboard', icon: <FiGrid />, active: true },
    { name: 'My Company', icon: <FiBriefcase />, active: false },
    { name: 'Manage Jobs', icon: <FiBriefcase />, active: false },
    { name: 'Applications', icon: <FiUsers />, active: false },
    { name: 'Settings', icon: <FiSettings />, active: false },
  ];

  if (isPending) {
    return (
      <div className="fixed top-0 left-0 h-screen w-64 bg-[#0d0f12] flex items-center justify-center border-r border-gray-800/50">
        <h1 className="text-gray-400 text-sm">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-gray-800 text-white rounded-md focus:outline-none"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Backdrop Overlay for Mobile Drawer */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 bg-[#0a0c10] text-[#8a94a6] p-6 flex flex-col z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 border-r border-gray-800/40
      `}>
        {/* Logo Section */}
        <div className="mb-6 mt-4 md:mt-0">
          <h1 className="text-2xl font-bold text-white tracking-wide">HireLoop</h1>
        </div>

        {/* User Profile Section from Image */}
        <div className="flex flex-col items-start gap-2 mb-8 pb-6 border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
              {user?.image ? (
                <Image width={50} height={50} src={user.image} alt={user?.name || 'User'} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name ? user.name.charAt(0) : 'AS'}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white leading-tight">
                {user?.name || 'Alex Sterling'}
              </h2>
              <span className="text-[11px] text-gray-500">
                {user?.role || 'Recruiter'}
              </span>
            </div>
          </div>
         
        </div>

        {/* Navigation Links */}
        <nav className="flex-1">
          <ul className="space-y-1.5">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150
                    ${link.active
                      ? 'bg-[#1a1f26] text-white'
                      : 'hover:bg-gray-850 hover:text-white text-gray-400'}
                  `}
                >
                  <span className={`text-lg ${link.active ? 'text-white' : 'text-gray-500'}`}>
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