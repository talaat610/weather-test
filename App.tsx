import React, { useState, useEffect, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { ThemeToggleButton } from './components/ThemeToggleButton';
import { HistoryCard } from './components/HistoryCard';
import { getWeatherForCity } from './services/geminiService';
import type { WeatherData } from './types';

const MAX_HISTORY_ITEMS = 6;

const App: React.FC = () => {
  const [currentCitySearch, setCurrentCitySearch] = useState<string>(''); // For the input field, not necessarily the displayed weather
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [appBackground, setAppBackground] = useState<string>('from-sky-400 to-blue-600');
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('weatherAppTheme') as 'light' | 'dark' | null;
    if (storedTheme) return storedTheme;
    // Optional: check system preference
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   return 'dark';
    // }
    return 'light'; // Default to light
  });

  const [searchHistory, setSearchHistory] = useState<WeatherData[]>(() => {
    const storedHistory = localStorage.getItem('weatherAppHistory');
    try {
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (e) {
      console.error("Failed to parse search history from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('weatherAppTheme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('weatherAppHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSearch = useCallback(async (searchedCity: string) => {
    if (!searchedCity.trim()) {
      setError("Please enter a city name.");
      setWeatherData(null);
      return;
    }
    // setCurrentCitySearch(searchedCity); // Keep input field managed by SearchBar
    setIsLoading(true);
    setError(null);
    setWeatherData(null); 

    try {
      const data = await getWeatherForCity(searchedCity);
      setWeatherData(data);

      // Update search history
      setSearchHistory(prevHistory => {
        const existingIndex = prevHistory.findIndex(item => item.city.toLowerCase() === data.city.toLowerCase());
        let newHistory = [...prevHistory];
        if (existingIndex > -1) {
          newHistory.splice(existingIndex, 1); // Remove existing to move to top
        }
        newHistory.unshift(data); // Add new data to the beginning
        if (newHistory.length > MAX_HISTORY_ITEMS) {
          newHistory = newHistory.slice(0, MAX_HISTORY_ITEMS);
        }
        return newHistory;
      });

    } catch (err) {
      if (err instanceof Error) {
        setError(`${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Dynamic background based on weather conditions
    if (weatherData) {
      const iconId = weatherData.iconIdentifier.toLowerCase();
      if (iconId.includes('night')) setAppBackground('from-slate-800 to-indigo-900');
      else if (iconId.includes('rain') || iconId.includes('thunderstorm')) setAppBackground('from-slate-500 to-slate-700');
      else if (iconId.includes('snow')) setAppBackground('from-sky-200 to-slate-400');
      else if (iconId.includes('fog')) setAppBackground('from-gray-400 to-gray-600');
      else if (iconId.includes('clear') || iconId.includes('sun')) setAppBackground('from-sky-400 to-blue-600');
      else setAppBackground('from-sky-400 to-blue-600');
    } else {
      // Default background when no weather data (e.g., initial load or error)
      // Consider a more neutral default if theme is dark
      if (theme === 'dark') {
        setAppBackground('from-slate-700 to-slate-900');
      } else {
        setAppBackground('from-sky-400 to-blue-600');
      }
    }
  }, [weatherData, theme]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${appBackground} p-4 sm:p-8 flex flex-col items-center transition-all duration-1000 ease-in-out`}>
      <header className="w-full max-w-4xl mb-6 sm:mb-8 text-center relative">
        <div className="absolute top-0 right-0 p-2">
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-800 dark:text-white text-shadow-md animate-fadeIn">
          <i className="fas fa-cloud-sun-rain mr-2 sm:mr-3"></i>Global Weather Monitor
        </h1>
        <p className="text-lg text-sky-700 dark:text-sky-200 mt-2 animate-fadeInDelay200">
          Real-time weather updates with a touch of city imagery.
        </p>
      </header>

      <main className="w-full max-w-xl space-y-6">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        {isLoading && <LoadingSpinner />}
        {error && !isLoading && <ErrorDisplay message={error} />}
        
        {!isLoading && !error && !weatherData && searchHistory.length === 0 && (
           <div className="text-center text-sky-700 dark:text-sky-100 p-6 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-lg shadow-lg slide-up-fade-in">
            <i className="fas fa-map-marker-alt text-4xl mb-3"></i>
            <p className="text-xl">Enter a city name to get the latest weather forecast.</p>
          </div>
        )}

        {weatherData && !isLoading && !error && (
          <div className="slide-up-fade-in">
            <WeatherDisplay weatherData={weatherData} />
          </div>
        )}
      </main>

      {!isLoading && !error && searchHistory.length > 0 && !weatherData && (
        <section className="w-full max-w-4xl mt-10 slide-up-fade-in">
          <h2 className="text-2xl font-semibold mb-4 text-center text-slate-800 dark:text-white">Previously Searched Cities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchHistory.map((historyItem) => (
              <HistoryCard key={historyItem.city + historyItem.sunriseISO} weatherData={historyItem} onSelectCity={handleSearch} />
            ))}
          </div>
        </section>
      )}
      
      {weatherData && searchHistory.length > 0 && (
         <section className="w-full max-w-4xl mt-10">
          <h3 className="text-xl font-semibold mb-3 text-center text-slate-700 dark:text-sky-100">Search History</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
            {searchHistory
              .filter(item => item.city.toLowerCase() !== weatherData.city.toLowerCase()) // Don't show current city in this list if already displayed
              .slice(0, MAX_HISTORY_ITEMS) 
              .map((historyItem) => (
              <HistoryCard miniCard key={historyItem.city + historyItem.sunsetISO} weatherData={historyItem} onSelectCity={handleSearch} />
            ))}
          </div>
        </section>
      )}


      <footer className="mt-auto pt-8 text-center text-sky-600 dark:text-sky-300 text-sm">
        <p>&copy; {new Date().getFullYear()} Weather Monitor. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;