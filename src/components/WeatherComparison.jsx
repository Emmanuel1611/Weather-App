import React, { useState } from 'react'
import { useWeather } from '../context/WeatherContext'
import { FiSearch } from 'react-icons/fi'

const WeatherComparison = () => {
  const { weather, unit } = useWeather()
  const [comparisonLocation, setComparisonLocation] = useState('')
  const [comparisonData, setComparisonData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  if (!weather?.current) return null

  const tempUnit = unit === 'metric' ? '°C' : '°F'
  
  // For demonstration purposes, let's create mock data instead of making an API call
  const handleCompare = () => {
    if (!comparisonLocation.trim()) return
    
    setLoading(true)
    setError(null)
    
    // Simulate API delay
    setTimeout(() => {
      try {
        // Create mock data based on the current weather
        const mockData = {
          location: {
            name: comparisonLocation,
            region: "Mock Region",
            country: "Mock Country",
            lat: weather.location.lat + 5,
            lon: weather.location.lon + 5,
            localtime: new Date().toISOString()
          },
          current: {
            temp_c: Math.round(weather.current.temp_c + (Math.random() * 10 - 5)),
            temp_f: Math.round(weather.current.temp_f + (Math.random() * 18 - 9)),
            condition: {
              text: ["Sunny", "Partly cloudy", "Cloudy", "Light rain", "Moderate rain"][Math.floor(Math.random() * 5)],
              icon: weather.current.condition.icon,
              code: weather.current.condition.code
            },
            humidity: Math.min(100, Math.max(0, weather.current.humidity + (Math.random() * 20 - 10))),
            wind_kph: Math.max(0, weather.current.wind_kph + (Math.random() * 10 - 5)),
            wind_mph: Math.max(0, weather.current.wind_mph + (Math.random() * 6 - 3)),
          }
        }
        
        setComparisonData(mockData)
      } catch (err) {
        setError("Error creating comparison data")
        console.error('Comparison error:', err)
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="weather-card mt-6">
      <h2 className="text-xl font-semibold mb-4">Weather Comparison</h2>
      
      <div className="mb-4 flex">
        <input
          type="text"
          value={comparisonLocation}
          onChange={(e) => setComparisonLocation(e.target.value)}
          placeholder="Enter another location to compare"
          className="flex-grow p-2 border border-gray-300 dark:border-slate-600 rounded-l bg-white dark:bg-slate-800"
        />
        <button 
          onClick={handleCompare}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition-colors"
          disabled={loading || !comparisonLocation.trim()}
        >
          {loading ? 'Loading...' : <FiSearch />}
        </button>
      </div>
      
      {error && (
        <div className="mb-4 text-red-500 bg-red-100 dark:bg-red-900/30 p-2 rounded">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg">
          <h3 className="font-medium mb-2">{weather.location.name}</h3>
          <p>Temperature: {Math.round(weather.current[`temp_${unit}`])}{tempUnit}</p>
          <p>Condition: {weather.current.condition.text}</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind: {weather.current[`wind_${unit}`]} {unit === 'metric' ? 'kph' : 'mph'}</p>
        </div>
        
        <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg">
          {comparisonData ? (
            <>
              <h3 className="font-medium mb-2">{comparisonData.location.name}</h3>
              <p>Temperature: {Math.round(comparisonData.current[`temp_${unit}`])}{tempUnit}</p>
              <p>Condition: {comparisonData.current.condition.text}</p>
              <p>Humidity: {Math.round(comparisonData.current.humidity)}%</p>
              <p>Wind: {Math.round(comparisonData.current[`wind_${unit}`])} {unit === 'metric' ? 'kph' : 'mph'}</p>
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              {loading ? 'Loading comparison data...' : 'Enter a location and click Compare'}
            </p>
          )}
        </div>
      </div>
      
      {comparisonData && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-medium mb-2">Temperature Difference</h3>
          <p>
            {weather.location.name} is {' '}
            {Math.abs(Math.round(weather.current[`temp_${unit}`] - comparisonData.current[`temp_${unit}`]))}°{' '}
            {weather.current[`temp_${unit}`] > comparisonData.current[`temp_${unit}`] ? 'warmer' : 'cooler'}{' '}
            than {comparisonData.location.name}
          </p>
        </div>
      )}
    </div>
  )
}

export default WeatherComparison