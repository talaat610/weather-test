import React from 'react';

interface StatCardProps {
  iconClass: string;
  title: string;
  value: string | number;
}

export const StatCard: React.FC<StatCardProps> = ({ iconClass, title, value }) => {
  return (
    <div 
      className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-md flex flex-col items-center text-center hover:bg-white/70 dark:hover:bg-slate-600/60 transition-all duration-300 transform hover:scale-105"
      role="figure"
      aria-labelledby={`stat-title-${title.toLowerCase().replace(' ', '-')}`}
    >
      <i className={`${iconClass} text-xl sm:text-2xl mb-1 sm:mb-2 text-sky-600 dark:text-sky-300`} aria-hidden="true"></i>
      <h4 id={`stat-title-${title.toLowerCase().replace(' ', '-')}`} className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-sky-100">{title}</h4>
      <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">{value}</p>
    </div>
  );
};