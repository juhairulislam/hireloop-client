import React from 'react';
import Image from 'next/image';
import { Button } from '@heroui/react';
import { FiSearch, FiMapPin, FiBriefcase, FiLayers, FiUsers, FiAward } from 'react-icons/fi';

export default function Hero() {
    return (
        <div className="relative min-h-screen bg-[#030712] text-white overflow-hidden flex flex-col items-center justify-between px-4 pt-28 pb-12 md:pt-36 md:pb-20">

            {/* Background Globe Image - Covering the Entire Hero Section */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712] z-10" />
                <div className="absolute w-full h-full bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center">
                    <div className="absolute w-[90%] h-[60%] rounded-full bg-indigo-600/10 blur-[120px] bottom-0" />
                    <Image
                        src="/globe.png"
                        alt="Globe Background"
                        fill
                        priority
                        sizes="100vw"
                        className="object-contain object-bottom opacity-40 md:opacity-60"
                    />
                </div>
            </div>

            {/* Top Badge */}
            <div className="z-10">
                <span className="inline-flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 backdrop-blur-md px-4 py-1.5 rounded-full text-neutral-300 text-xs font-medium tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>
                        <strong className="text-amber-500 font-bold mr-1">50,000+</strong> New Jobs This Month
                    </span>
                </span>
            </div>

            {/* Main Heading & Subtitle */}
            <div className="z-10 text-center max-w-3xl mt-6 md:mt-8 space-y-4">
                <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent px-2">
                    Find Your Dream Job Today
                </h1>
                <p className="text-xs md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed px-4">
                    HireLoop connects top talent with world-class companies. Browse thousands of
                    curated opportunities and land your next role — faster.
                </p>
            </div>

            {/* Search Bar Section */}
            <div className="z-10 w-full max-w-4xl mt-8 md:mt-10 px-2 md:px-4 mx-auto flex flex-col items-center justify-center">
                <div className="w-full bg-[#0d0d0d]/40 border border-neutral-800/80 p-2 md:pl-5 rounded-xl backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center gap-3 md:gap-4">

                    {/* Job Title Input */}
                    <div className="w-full md:flex-1 flex items-center gap-3 py-1.5 px-3 md:px-0">
                        <FiSearch className="text-neutral-400 text-xl shrink-0" />
                        <input
                            type="text"
                            placeholder="Job title, skill or company"
                            className="w-full bg-transparent text-neutral-200 placeholder:text-neutral-500 text-[15px] focus:outline-none border-none p-0 m-0"
                        />
                    </div>

                    {/* Precision Sleek Divider */}
                    <div className="hidden md:block h-6 w-[1px] bg-neutral-800 shrink-0 mx-2" />

                    {/* Location Input */}
                    <div className="w-full md:flex-1 flex items-center gap-3 py-1.5 px-3 md:px-0">
                        <FiMapPin className="text-neutral-400 text-xl shrink-0" />
                        <input
                            type="text"
                            placeholder="Location or Remote"
                            className="w-full bg-transparent text-neutral-200 placeholder:text-neutral-500 text-[15px] focus:outline-none border-none p-0 m-0"
                        />
                    </div>

                    {/* Search Button */}
                    <Button
                        isIconOnly
                        radius="none"
                        className="w-full md:w-12 h-12 bg-[#5551ff] hover:bg-[#4641f2] text-white shrink-0 rounded-xl flex items-center justify-center transition-all md:ml-2"
                    >
                        <FiSearch className="text-xl text-white stroke-[2.5]" />
                    </Button>
                </div>

                {/* Trending Tags */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs w-full px-2">
                    <span className="text-neutral-500">Trending Position:</span>
                    {['Product Designer', 'AI Engineering', 'Devops Engineer'].map((tag) => (
                        <button
                            key={tag}
                            className="bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 px-3 py-1 rounded-full transition-all"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Middle Text Container */}
            <div className="z-10 text-center px-4 mt-10 mb-4 md:mb-12">
                <h2 className="text-lg md:text-3xl font-medium tracking-tight text-neutral-200">
                    Assisting over <span className="font-bold text-white">15,000 job seekers</span>
                </h2>
                <p className="text-xs md:text-lg text-neutral-400 mt-1">
                    find their dream positions.
                </p>
            </div>

            {/* Statistics Cards Grid */}
            <div className="z-10 w-full max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
                {[
                    { icon: FiBriefcase, value: "50K", label: "Active Jobs" },
                    { icon: FiLayers, value: "12K", label: "Companies" },
                    { icon: FiUsers, value: "2M", label: "Job Seekers" },
                    { icon: FiAward, value: "97%", label: "Satisfaction Rate" }
                ].map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 border border-neutral-800/60 p-4 md:p-6 rounded-2xl flex flex-col justify-between h-28 md:h-36 backdrop-blur-md hover:border-neutral-700/80 transition-all shadow-xl"
                    >
                        <stat.icon className="text-neutral-400 text-lg md:text-xl" />
                        <div>
                            <div className="text-xl md:text-3xl font-bold tracking-tight text-white">{stat.value}</div>
                            <div className="text-[10px] md:text-xs text-neutral-500 mt-0.5 md:mt-1">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}