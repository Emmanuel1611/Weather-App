import React, { useState, useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'
import { format, subDays } from 'date-fns'
import { FiCalendar } from 'react-icons/fi'

const WeatherHistory = () => {
  const { weatherData, unit = 'metric' } = useContext(WeatherContext)
  const [daysBack, setDaysBack] = useState(3)
  
  if (!weatherData?.location) return null

  // Note: This is a placeholder - WeatherAPI.com requires a separate API call for historical data
  // You would need to implement the actual API call in weatherService.js

  return (
    <div className="weather-card mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FiCalendar /> Weather History
        </h2>
        <select 
          value={daysBack}
          onChange={(e) => setDaysBack(Number(e.target.value))}
          className="bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded px-3 py-1 text-sm"
        >
          {[1, 3, 5, 7].map(num => (
            <option key={num} value={num}>Last {num} days</option>
          ))}
        </select>
      </div>
      
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>Historical weather data would be displayed here</p>
        <p className="text-sm mt-2">Note: Requires WeatherAPI.com premium plan</p>
      </div>
    </div>
  )
}

export default WeatherHistory