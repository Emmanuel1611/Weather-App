import React, { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'

const getAQICategory = (aqi) => {
  if (aqi <= 50) return { level: 'Good', color: 'bg-green-500' }
  if (aqi <= 100) return { level: 'Moderate', color: 'bg-yellow-500' }
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500' }
  if (aqi <= 200) return { level: 'Unhealthy', color: 'bg-red-500' }
  if (aqi <= 300) return { level: 'Very Unhealthy', color: 'bg-purple-500' }
  return { level: 'Hazardous', color: 'bg-maroon-500' }
}

const AirQuality = () => {
  const { weatherData, loading } = useContext(WeatherContext)
  const airQuality = weatherData?.current?.air_quality

  if (loading || !airQuality) return null

  const aqi = airQuality['us-epa-index']

  // If EPA index is not available, use the overall AQI
  const aqiValue = aqi || Math.round(
    (airQuality.co + 
     airQuality.no2 + 
     airQuality.o3 + 
     airQuality.so2 + 
     airQuality.pm2_5 + 
     airQuality.pm10) / 6
  )

  const { level, color } = getAQICategory(aqiValue)

  return (
    <div className="weather-card">
      <h2 className="text-xl font-semibold mb-4">Air Quality</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${color}`}>
            <span className="text-2xl font-bold">{aqiValue}</span>
          </div>
          <div className="ml-4">
            <p className="font-medium">{level}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">AQI Index</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Good</span>
          <span>Hazardous</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" 
            style={{ width: `${(aqiValue / 300) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default AirQuality