import React, { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'
import { format, parseISO } from 'date-fns'
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'

const getWeatherIcon = (conditionCode) => {
  if (!conditionCode) return <WiDaySunny size={32} />

  // Clear
  if (conditionCode === 1000) return <WiDaySunny size={32} />
  // Rain
  if (conditionCode >= 1063 && conditionCode <= 1201) return <WiRain size={32} />
  // Snow
  if (conditionCode >= 1204 && conditionCode <= 1237) return <WiSnow size={32} />
  // Thunderstorm
  if (conditionCode >= 1273 && conditionCode <= 1282) return <WiThunderstorm size={32} />
  // Cloudy
  if (conditionCode >= 1003 && conditionCode <= 1009) return <WiCloudy size={32} />
  // Fog/Mist
  if (conditionCode >= 1030 && conditionCode <= 1135) return <WiFog size={32} />

  return <WiDaySunny size={32} />
}

const ForecastSection = () => {
  const { weatherData, unit = 'metric', loading } = useContext(WeatherContext)
  const tempUnit = unit === 'metric' ? '°C' : '°F'
  const forecast = weatherData?.forecast

  if (loading || !forecast || !forecast.forecastday) return null

  return (
    <div className="weather-card mt-6">
      <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.forecastday.map((day) => {
          if (!day || !day.date) return null
          
          const date = parseISO(day.date)
          const dayName = format(date, 'EEE')
          const conditions = day.day?.condition || {}

          return (
            <div key={day.date} className="flex flex-col items-center p-3 bg-gray-100 dark:bg-slate-700 rounded-lg">
              <p className="font-medium">{dayName}</p>
              <div className="my-2">
                {getWeatherIcon(conditions.code)}
              </div>
              <p className="text-lg font-semibold">
                {Math.round(day.day?.[`avgtemp_${unit}`] || 0)}{tempUnit}
              </p>
              <p className="text-sm capitalize text-gray-500 dark:text-gray-400">
                {conditions.text || 'Unknown'}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForecastSection