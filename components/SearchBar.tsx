import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center space-x-2 bg-white/60 dark:bg-slate-700/60 backdrop-blur-md p-3 rounded-xl shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-sky-500 dark:focus-within:ring-sky-400"
      aria-label="City weather search"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter city name (e.g., London)"
        className="flex-grow p-3 bg-transparent text-slate-700 dark:text-white placeholder-slate-500 dark:placeholder-sky-100 focus:outline-none text-lg"
        disabled={isLoading}
        aria-label="City name input"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
        aria-label={isLoading ? "Searching for weather" : "Search for weather"}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="status" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <>
            <i className="fas fa-search mr-2" aria-hidden="true"></i> Search
          </>
        )}
      </button>
    </form>
  );
};