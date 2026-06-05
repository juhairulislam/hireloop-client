import React from 'react';

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="rounded-xl border border-neutral-800 bg-[#131315] p-6 transition-all duration-200 hover:border-neutral-700">
      {/* Icon Wrapper */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400">
        {Icon && <Icon size={20} />}
      </div>

      {/* Content */}
      <div className="mt-6 space-y-1">
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          {title}
        </p>
        <p className="text-3xl font-semibold text-white tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;