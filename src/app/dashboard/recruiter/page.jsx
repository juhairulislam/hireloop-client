'use client'
import { useSession } from '@/lib/auth-client';
import { FiFileText, FiUsers, FiZap, FiCheckCircle } from 'react-icons/fi';
import React from 'react';

const statsData = [
  {
    id: 1,
    title: 'Total Job Posts',
    value: '48',
    icon: FiFileText,
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 2,
    title: 'Total Applicants',
    value: '1,284',
    icon: FiUsers,
    iconColor: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: 3,
    title: 'Active Jobs',
    value: '18',
    icon: FiZap, 
    iconColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
  {
    id: 4,
    title: 'Jobs Closed',
    value: '32',
    icon: FiCheckCircle,
    iconColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
];

// Dark themed StatCard Component
const StatCard = ({ title, value, icon: Icon, iconColor, bgColor }) => {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between shadow-lg">
      <div>
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-slate-100">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${bgColor} ${iconColor}`}>
        <Icon size={24} />
      </div>
    </div>
  );
};

const RecruiterPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-100 md:pl-64">
        <h1 className="text-xl font-semibold animate-pulse">Loading...</h1>
      </div>
    );
  }

  const user = session?.user;

  return (
    // md:pl-64 layout block fixed visual overlap with sidebar
    <div className="min-h-screen bg-slate-950 p-6 space-y-6 text-slate-100 md:pl-64">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-100">
          Welcome Back, {user?.name || 'Recruiter'}
        </h1>
        
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
            bgColor={stat.bgColor}
          />
        ))}
      </div>
      
    </div>
  );
};

export default RecruiterPage;