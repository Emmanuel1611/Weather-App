import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

const WeatherIcon = ({ condition, className }) => {
  if (!condition) return <WiDaySunny className={className} size={64} />;
  
  const code = condition.code;
  const text = condition.text?.toLowerCase() || '';
  
  // Clear
  if (code === 1000 || text.includes('sunny') || text.includes('clear')) 
    return <WiDaySunny className={className} size={64} />;
  // Rain
  if ((code >= 1063 && code <= 1201) || text.includes('rain') || text.includes('drizzle')) 
    return <WiRain className={className} size={64} />;
  // Snow
  if ((code >= 1204 && code <= 1237) || text.includes('snow') || text.includes('ice')) 
    return <WiSnow className={className} size={64} />;
  // Thunderstorm
  if ((code >= 1273 && code <= 1282) || text.includes('thunder') || text.includes('storm')) 
    return <WiThunderstorm className={className} size={64} />;
  // Cloudy
  if ((code >= 1003 && code <= 1009) || text.includes('cloud')) 
    return <WiCloudy className={className} size={64} />;
  // Fog/Mist
  if ((code >= 1030 && code <= 1135) || text.includes('fog') || text.includes('mist')) 
    return <WiFog className={className} size={64} />;

  return <WiDaySunny className={className} size={64} />;
};

const WeatherCard = ({ className = '' }) => {
  const { weatherData } = useContext(WeatherContext);
  
  if (!weatherData || !weatherData.current || !weatherData.location) return null;
  
  const { current, location } = weatherData;
  
  return (
    <div className={`weather-card ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold">{location.name || 'Unknown Location'}</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {location.region && `${location.region}, `}{location.country || ''}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {location.localtime ? new Date(location.localtime).toLocaleString() : ''}
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="w-20 h-20 mr-4">
            <WeatherIcon condition={current.condition} />
          </div>
          <div>
            <div className="text-5xl font-bold">{Math.round(current.temp_c)}°</div>
            <p className="text-gray-600 dark:text-gray-300">
              Feels like {Math.round(current.feelslike_c)}°
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <p className="text-xl font-medium">{current.condition?.text || 'Unknown Condition'}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="flex flex-col items-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Wind</span>
            <span className="font-medium mt-1">{current.wind_kph || 0} km/h</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Humidity</span>
            <span className="font-medium mt-1">{current.humidity || 0}%</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <span className="text-gray-500 dark:text-gray-400 text-sm">UV Index</span>
            <span className="font-medium mt-1">{current.uv || 0}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Visibility</span>
            <span className="font-medium mt-1">{current.vis_km || 0} km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
