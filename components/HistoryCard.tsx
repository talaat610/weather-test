import React from 'react';
import type { WeatherData } from '../types';

interface HistoryCardProps {
  weatherData: WeatherData;
  onSelectCity: (city: string) => void;
  miniCard?: boolean; // For a smaller version
}

const DEFAULT_IMAGE_PLACEHOLDER = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd64d728%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd64d728%22%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.3359375%22%20y%3D%22106.5%22%3EImage%20Not%20Found%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";


export const HistoryCard: React.FC<HistoryCardProps> = ({ weatherData, onSelectCity, miniCard }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = DEFAULT_IMAGE_PLACEHOLDER;
    e.currentTarget.classList.add('object-contain'); // Adjust fitting for placeholder
  };
  
  const imageUrl = weatherData.cityImageUrl || DEFAULT_IMAGE_PLACEHOLDER;

  if (miniCard) {
    return (
      <button
        onClick={() => onSelectCity(weatherData.city)}
        className="group relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400"
        aria-label={`View weather for ${weatherData.city}`}
      >
        <img 
          src={imageUrl} 
          alt={`View of ${weatherData.city}`} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-2 flex flex-col justify-end">
          <h3 className="text-sm font-semibold text-white truncate group-hover:underline">{weatherData.city}</h3>
          <p className="text-xs text-sky-200">{weatherData.temperatureCelsius}°C, {weatherData.condition}</p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => onSelectCity(weatherData.city)}
      className="group relative w-full aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 ring-offset-2 ring-sky-500 dark:ring-offset-slate-800 dark:focus:ring-sky-400"
      aria-label={`View weather for ${weatherData.city}`}
    >
      <img
        src={imageUrl}
        alt={`View of ${weatherData.city}`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
        onError={handleImageError}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 flex flex-col justify-end">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:underline">
          {weatherData.city}
        </h3>
        <p className="text-sm text-sky-200 dark:text-sky-300">
          {weatherData.temperatureCelsius}°C, {weatherData.condition}
        </p>
      </div>
    </button>
  );
};