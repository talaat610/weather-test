
import React from 'react';

interface WeatherIconProps {
  iconIdentifier: string;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ iconIdentifier, className = "w-16 h-16" }) => {
  const baseClasses = `inline-block ${className} text-yellow-300 filter drop-shadow-lg`; // Default color, can be overridden by specific icons

  switch (iconIdentifier.toUpperCase()) {
    case 'CLEAR_DAY':
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${baseClasses} text-yellow-400`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>;
    case 'CLEAR_NIGHT':
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${baseClasses} text-indigo-300`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>;
    case 'CLOUDY':
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${baseClasses} text-slate-400`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>;
    case 'PARTLY_CLOUDY_DAY':
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${baseClasses} text-yellow-400`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636m5.652 1.404a5.25 5.25 0 00-6.986 4.065A4.502 4.502 0 002.25 15h11.078a3.75 3.75 0 000-7.5H13.5a5.25 5.25 0 00-3.796-1.596z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" className="text-slate-400 opacity-70" /> {/* Cloud part */}
      </svg>;
    case 'PARTLY_CLOUDY_NIGHT':
        return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${baseClasses} text-indigo-300`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-2.36 0-4.52-.838-6.198-2.202A4.502 4.502 0 002.25 15h11.078a3.75 3.75 0 000-7.5H13.5a5.25 5.25 0 00-3.796-1.596 9.753 9.753 0 009.002-5.998z" />
             <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.75A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752z" className="text-slate-400 opacity-60" /> {/* Cloud part */}
        </svg>;
    case 'RAIN':
    case 'SHOWERS_DAY':
    case 'SHOWERS_NIGHT':
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${baseClasses} text-blue-400`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21L15.75 21M5.25 15.75L9.75 21M12 3l2.25 2.25M12 3v12m0 0l-2.25 2.25M12 15l2.25 2.25M12 15L9.75 17.25M12 3c-1.406 0-2.73.373-3.844 1.031C6.296 5.143 6 6.286 6 7.5c0 .964.214 1.86.586 2.656M18 7.5c0-1.214-.296-2.357-.844-3.469C16.03 3.373 14.707 3 13.293 3M12 15c1.406 0 2.73-.373 3.844-1.031.707-.468 1.156-1.214 1.156-2.031 0-.964-.214-1.86-.586-2.656M6 7.5c.372-.796.586-1.692.586-2.656 0-1.214-.296-2.357-.844-3.469C4.03 3.373 2.707 3 1.293 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" className="text-slate-400 opacity-70"/>
      </svg>;
    case 'SNOW':
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${baseClasses} text-sky-300`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m0 0l-3-3m3 3l3-3M6 12H3m3 0H1m14 0h3m-3 0h1m-4-5.25L8.75 3M19.25 3L15.5 6.75M6.75 21L10.5 17.25M13.5 17.25L17.25 21" />
      </svg>;
    case 'WINDY':
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${baseClasses} text-teal-400`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 13.75M18.25 12L17 10.25M18.25 12L21.75 12M12 12H4.25M12 12V4.25M12 12v7.75" />
      </svg>;
    case 'FOG':
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${baseClasses} text-slate-500`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5M3.75 14.25h16.5M6.75 4.5l3.75 3.75M13.5 4.5l3.75 3.75M6.75 19.5l3.75-3.75M13.5 19.5l3.75-3.75" />
      </svg>;
    case 'THUNDERSTORM':
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${baseClasses} text-amber-400`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l-.625 1.5L2.25 15l.625-1.5.625-1.5L4.5 12l-.625 1.5-.625 1.5zM19.5 13.5l-.625 1.5L18 15l.625-1.5.625-1.5L20.25 12l-.625 1.5-.625 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" className="text-slate-500 opacity-70"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l-2.25 6H15l-2.25 6" />
      </svg>;
    default: // Fallback icon
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${baseClasses} text-gray-400`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>;
  }
};
