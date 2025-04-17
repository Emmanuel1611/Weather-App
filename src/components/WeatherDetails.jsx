import React, { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'
import { WiSunrise, WiSunset, WiHumidity, WiStrongWind, WiBarometer, WiRaindrop } from 'react-icons/wi'
import { format, parseISO } from 'date-fns'

const WeatherDetails = () => {
  const { weatherData, unit = 'metric', loading } = useContext(WeatherContext)
  const windUnit = unit === 'metric' ? 'kph' : 'mph'

  if (loading || !weatherData || !weatherData.current) return null

  const current = weatherData.current
  const location = weatherData.location
  const forecast = weatherData.forecast

  return (
    <div className="weather-card">
      <h2 className="text-xl font-semibold mb-4">Weather Details</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <WiSunrise size={32} className="text-yellow-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sunrise</p>
            <p className="font-medium">
              {forecast?.forecastday?.[0]?.astro?.sunrise || 'N/A'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <WiSunset size={32} className="text-orange-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sunset</p>
            <p className="font-medium">
              {forecast?.forecastday?.[0]?.astro?.sunset || 'N/A'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <WiHumidity size={32} className="text-blue-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="font-medium">{current.humidity || 0}%</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <WiStrongWind size={32} className="text-gray-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
            <p className="font-medium">
              {current[`wind_${unit}`] || current.wind_kph || 0} {windUnit} {current.wind_dir && `(${current.wind_dir})`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <WiBarometer size={32} className="text-purple-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pressure</p>
            <p className="font-medium">{current.pressure_mb || 0} mb</p>
          </div>
        </div>

        <div className="flex items-center">
          <WiRaindrop size={32} className="text-blue-300 mr-3" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Precipitation</p>
            <p className="font-medium">{current.precip_mm || 0} mm</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherDetails