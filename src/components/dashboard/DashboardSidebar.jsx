"use client";

import React, { useState } from 'react';
import { FiGrid, FiBriefcase, FiUsers, FiSettings, FiMenu, FiX } from 'react-icons/fi';

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        fixed top-0 left-0 h-screen w-64 bg-[#0d0f12] text-gray-400 p-6 flex flex-col z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 border-r border-gray-800/50
      `}>
        {/* Logo Section */}
        <div className="mb-10 mt-4 md:mt-0">
          <h1 className="text-2xl font-bold text-white tracking-wide">HireLoop</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${link.active 
                      ? 'bg-gray-800/60 text-white border-r-4 border-white' 
                      : 'hover:bg-gray-800/30 hover:text-white'}
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