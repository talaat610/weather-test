import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="bg-red-500/30 dark:bg-red-700/40 backdrop-blur-md text-red-700 dark:text-red-100 p-4 rounded-lg shadow-lg text-center border border-red-400 dark:border-red-500" role="alert">
      <i className="fas fa-exclamation-triangle mr-2 text-red-600 dark:text-red-200"></i>
      <strong>Error:</strong> {message}
    </div>
  );
};