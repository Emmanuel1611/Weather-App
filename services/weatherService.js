// services/weatherService.js
const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY || 'your_free_key_here';

/**
 * Get complete weather forecast (current + 3 days)
 */
export const getWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=3&aqi=no&alerts=no`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Weather API error');
    }

    const data = await response.json();
    return transformWeatherData(data);
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw new Error(error.message || 'Failed to get weather data');
  }
};

/**
 * Search for locations by name
 */
export const searchLocations = async (query) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) throw new Error('Location search failed');
    
    return (await response.json()).map(item => ({
      name: item.name,
      country: item.country,
      lat: item.lat,
      lon: item.lon
    }));
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

// Data transformation to match your app's expected format
const transformWeatherData = (data) => {
  return {
    current: {
      temp: data.current.temp_c,
      feels_like: data.current.feelslike_c,
      humidity: data.current.humidity,
      wind_speed: data.current.wind_kph,
      uvi: data.current.uv,
      weather: [{
        description: data.current.condition.text,
        icon: data.current.condition.icon.replace('64x64', '128x128')
      }],
      dt: data.current.last_updated_epoch
    },
    daily: data.forecast.forecastday.map(day => ({
      dt: day.date_epoch,
      temp: {
        max: day.day.maxtemp_c,
        min: day.day.mintemp_c
      },
      weather: [{
        description: day.day.condition.text,
        icon: day.day.condition.icon.replace('64x64', '128x128')
      }]
    })),
    hourly: data.forecast.forecastday[0].hour.map(hour => ({
      dt: hour.time_epoch,
      temp: hour.temp_c,
      weather: [{
        description: hour.condition.text,
        icon: hour.condition.icon.replace('64x64', '128x128')
      }]
    })),
    timezone: data.location.tz_id
  };
};

// Utility functions (keep your existing ones)
export const getWeatherIconUrl = (iconCode) => {
  return iconCode.startsWith('http') ? iconCode : `https:${iconCode}`;
};

export const formatTemperature = (temp) => `${Math.round(temp)}°C`;

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};