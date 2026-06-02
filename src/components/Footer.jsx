"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image"; // Next.js Image Component ইম্পোর্ট করা হয়েছে
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Job discovery", href: "/jobs" },
        { label: "Worker AI", href: "/worker-ai" },
        { label: "Companies", href: "/companies" },
        { label: "Salary data", href: "/salary" },
      ],
    },
    {
      title: "Navigations",
      links: [
        { label: "Help center", href: "/help" },
        { label: "Career library", href: "/library" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Brand Guideline", href: "/brand" },
        { label: "Newsroom", href: "/news" },
      ],
    },
  ];

  return (
    <footer className="bg-[#030303] text-zinc-500 text-sm font-light pt-16 pb-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Logo, Description & Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-16">
          
          {/* Left Column: Logo & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="hireloop logo"
                  width={130}
                  height={32}
                  className="object-contain"
                />
              </Link>
            </div>
            <p className="text-zinc-600 max-w-xs leading-relaxed">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Right Columns: Links Sections */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerSections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-[#3b37ff] font-medium text-base tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Section: Social Icons & Copyright */}
        <div className="pt-8 border-t border-zinc-900/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-[#121212] hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-[#2b26c3] text-white rounded-lg opacity-90 hover:opacity-100 transition-opacity"
            >
              <FaPinterestP size={16} />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-[#121212] hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors"
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>

          {/* Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-zinc-600 text-xs text-center sm:text-right">
            <span>Copyright 2024 — Programming Hero</span>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-zinc-400 transition-colors">
                Terms & Policy
              </Link>
              <span>-</span>
              <Link href="/privacy" className="hover:text-zinc-400 transition-colors">
                Privacy Guideline
              </Link>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}