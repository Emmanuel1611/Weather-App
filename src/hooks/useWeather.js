import { useContext, useMemo } from 'react';
import { WeatherContext } from '../context/WeatherContext';

export function useWeather() {
  const context = useContext(WeatherContext);
  
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  
  const { weatherData } = context;
  
  // Derived data with proper formatting
  const formattedData = useMemo(() => {
    if (!weatherData) return null;
    
    // Format forecast days
    const forecastDays = weatherData.forecast?.forecastday?.map(day => {
      const date = new Date(day.date);
      return {
        date: date,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        maxTemp: Math.round(day.day.maxtemp_c),
        minTemp: Math.round(day.day.mintemp_c),
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
        chanceOfRain: day.day.daily_chance_of_rain,
        sunrise: day.astro.sunrise,
        sunset: day.astro.sunset
      };
    }) || [];
    
    // Get weather condition category for styling
    const getWeatherCategory = (condition) => {
      const text = condition?.toLowerCase() || '';
      if (text.includes('sun') || text.includes('clear')) return 'sunny';
      if (text.includes('rain') || text.includes('drizzle')) return 'rainy';
      if (text.includes('cloud')) return 'cloudy';
      if (text.includes('snow') || text.includes('ice')) return 'snowy';
      return 'default';
    };
    
    return {
      location: {
        name: weatherData.location?.name || '',
        region: weatherData.location?.region || '',
        country: weatherData.location?.country || '',
        localTime: weatherData.location?.localtime || '',
      },
      current: {
        temp: Math.round(weatherData.current?.temp_c) || 0,
        feelsLike: Math.round(weatherData.current?.feelslike_c) || 0,
        condition: weatherData.current?.condition?.text || '',
        icon: weatherData.current?.condition?.icon || '',
        weatherCategory: getWeatherCategory(weatherData.current?.condition?.text),
        wind: {
          speed: weatherData.current?.wind_kph || 0,
          direction: weatherData.current?.wind_dir || '',
          degree: weatherData.current?.wind_degree || 0,
        },
        humidity: weatherData.current?.humidity || 0,
        cloud: weatherData.current?.cloud || 0,
        uv: weatherData.current?.uv || 0,
        pressure: weatherData.current?.pressure_mb || 0,
        visibility: weatherData.current?.vis_km || 0,
        airQuality: weatherData.current?.air_quality || {},
        isDay: weatherData.current?.is_day === 1,
      },
      forecast: forecastDays,
      alerts: weatherData.alerts?.alert || [],
    };
  }, [weatherData]);
  
  return {
    ...context,
    formattedWeather: formattedData,
  };
}
