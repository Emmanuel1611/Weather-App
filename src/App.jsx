import React, { useContext, useState, useEffect } from 'react';
import { WeatherContext } from './context/WeatherContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WeatherDashboard from './components/WeatherDashboard';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const { weatherData, loading, error, fetchWeatherData, darkMode, toggleDarkMode } = useContext(WeatherContext);
  const [searchQuery, setSearchQuery] = useState('');

  // Update body class when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeatherData(searchQuery);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-black text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            {!weatherData ? (
              <div className="glass-card animate-fade-in p-8 rounded-lg bg-white/80 dark:bg-gray-900/80 shadow-lg">
                <div className="text-center py-10">
                  <div className="w-24 h-24 mx-auto mb-4 animate-float">
                    <span className="text-6xl">🌤️</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to WeatherSphere</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Search for a location to see detailed weather information
                  </p>
                  <form onSubmit={handleSearch} className="mb-6 max-w-md mx-auto">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                        placeholder="Search for a city..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        🔍
                      </button>
                    </div>
                  </form>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['London', 'New York', 'Tokyo', 'Sydney', 'Paris'].map(city => (
                      <button
                        key={city}
                        className="px-4 py-2 bg-blue-600 dark:bg-blue-800 text-white rounded-lg hover:opacity-90 transition-opacity"
                        onClick={() => fetchWeatherData(city)}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <WeatherDashboard />
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;