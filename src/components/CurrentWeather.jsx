import React, { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'
import { format } from 'date-fns'

const getWeatherIcon = (condition) => {
  const code = condition?.code
  if (!code) return <WiDaySunny size={64} />

  // Clear
  if (code === 1000) return <WiDaySunny size={64} />
  // Rain
  if (code >= 1063 && code <= 1201) return <WiRain size={64} />
  // Snow
  if (code >= 1204 && code <= 1237) return <WiSnow size={64} />
  // Thunderstorm
  if (code >= 1273 && code <= 1282) return <WiThunderstorm size={64} />
  // Cloudy
  if (code >= 1003 && code <= 1009) return <WiCloudy size={64} />
  // Fog/Mist
  if (code >= 1030 && code <= 1135) return <WiFog size={64} />

  return <WiDaySunny size={64} />
}

const CurrentWeather = () => {
  const { weatherData, unit, loading } = useContext(WeatherContext)

  if (loading || !weatherData) return null

  const tempUnit = unit === 'metric' ? '°C' : '°F'
  const windUnit = unit === 'metric' ? 'kph' : 'mph'
  const current = weatherData.current
  const location = weatherData.location

  return (
    <div className="weather-card">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center">
          {getWeatherIcon(current.condition)}
          <h2 className="text-2xl font-semibold">{location.name}, {location.country}</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {format(new Date(location.localtime), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-5xl font-bold my-2">
            {Math.round(current.temp_c)}{tempUnit}
          </p>
          <p className="text-xl capitalize">{current.condition.text}</p>
          <p className="text-gray-500 dark:text-gray-400">
            Feels like: {Math.round(current.feelslike_c)}{tempUnit}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
          <p className="text-xl font-semibold">{current.humidity}%</p>
        </div>
        <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Wind</p>
          <p className="text-xl font-semibold">{current.wind_kph} {windUnit}</p>
        </div>
        <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pressure</p>
          <p className="text-xl font-semibold">{current.pressure_mb} mb</p>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather