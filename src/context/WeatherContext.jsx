import React, { createContext, useState, useContext, useEffect } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('weatherFavorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error parsing favorites from localStorage:', e);
      return [];
    }
  });
  const [location, setLocation] = useState(null);

  // Check system preference for dark mode
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites || []));
  }, [favorites]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchWeatherData = async (query) => {
    if (!query) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API call
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=5&aqi=yes&alerts=yes`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setLocation(data.location?.name);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching weather data');
      console.error('Weather API error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const addFavorite = (locationName) => {
    if (!locationName || favorites.includes(locationName)) return;
    const newFavorites = [...favorites, locationName];
    setFavorites(newFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
  };

  const removeFavorite = (locationName) => {
    const newFavorites = favorites.filter(fav => fav !== locationName);
    setFavorites(newFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
  };

  return (
    <WeatherContext.Provider value={{
      weatherData,
      loading,
      error,
      unit,
      darkMode,
      favorites,
      location,
      fetchWeatherData,
      toggleUnit,
      toggleDarkMode,
      addFavorite,
      removeFavorite
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);