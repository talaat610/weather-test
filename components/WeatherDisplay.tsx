import React from 'react';
import type { WeatherData } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { StatCard } from './StatCard';

interface WeatherDisplayProps {
  weatherData: WeatherData;
}

const formatTime = (isoString: string): string => {
  try {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  } catch (e) {
    console.error("Error formatting time:", e);
    return "N/A";
  }
};

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg p-4 sm:p-6 rounded-xl shadow-2xl text-slate-800 dark:text-white animate-fadeIn space-y-4 sm:space-y-6">
      {weatherData.cityImageUrl && (
        <div className="mb-4 rounded-lg overflow-hidden shadow-lg aspect-video max-h-48 mx-auto">
          <img 
            src={weatherData.cityImageUrl} 
            alt={`View of ${weatherData.city}`} 
            className="w-full h-full object-cover" 
            onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails to load
          />
        </div>
      )}
      
      {/* Main weather info */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-3xl sm:text-4xl font-bold">{weatherData.city}</h2>
          <p className="text-lg text-slate-600 dark:text-sky-100">{weatherData.conditionDescription}</p>
          <p className="text-sm text-slate-500 dark:text-sky-200 mt-1">
            Feels like {weatherData.feelsLikeCelsius}°C
          </p>
        </div>
        <div className="flex items-center">
          <WeatherIcon iconIdentifier={weatherData.iconIdentifier} className="w-20 h-20 sm:w-24 sm:h-24 mr-3 sm:mr-4" />
          <div>
            <p className="text-5xl sm:text-6xl font-bold">{weatherData.temperatureCelsius}°C</p>
            <p className="text-lg text-slate-600 dark:text-sky-100">{weatherData.temperatureFahrenheit}°F</p>
          </div>
        </div>
      </div>

      {/* Additional stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-slate-300 dark:border-slate-700">
        <StatCard iconClass="fas fa-tint" title="Humidity" value={`${weatherData.humidityPercent}%`} />
        <StatCard iconClass="fas fa-wind" title="Wind" value={`${weatherData.windSpeedKph} kph ${weatherData.windDirection}`} />
        <StatCard iconClass="fas fa-tachometer-alt" title="Pressure" value={`${weatherData.pressureMb} mb`} />
        <StatCard iconClass="fas fa-eye" title="Visibility" value={`${weatherData.visibilityKm} km`} />
        <StatCard iconClass="fas fa-sun" title="UV Index" value={`${weatherData.uvIndex}`} />
        <StatCard iconClass="fas fa-umbrella-beach" title="Condition" value={weatherData.condition} />
      </div>
      
      {/* Sunrise & Sunset */}
      {(weatherData.sunriseISO || weatherData.sunsetISO) && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-slate-300 dark:border-slate-700">
          {weatherData.sunriseISO && <StatCard iconClass="fas fa-sunrise" title="Sunrise" value={formatTime(weatherData.sunriseISO)} />}
          {weatherData.sunsetISO && <StatCard iconClass="fas fa-sunset" title="Sunset" value={formatTime(weatherData.sunsetISO)} />}
        </div>
      )}
    </div>
  );
};