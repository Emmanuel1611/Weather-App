import React from 'react'
import { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'
import CurrentWeather from './CurrentWeather'
import ForecastSection from './ForecastSection'
import AirQuality from './AirQuality'
import WeatherDetails from './WeatherDetails'
import WeatherMap from './WeatherMap'
import FavoriteLocations from './FavoriteLocations'
import WeatherAlerts from './WeatherAlerts'
import WeatherHistory from './WeatherHistory'
import WeatherComparison from './WeatherComparison'

const WeatherDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CurrentWeather />
        </div>
        <div>
          <WeatherDetails />
        </div>
      </div>

      <ForecastSection />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeatherMap />
        </div>
        <div>
          <AirQuality />
        </div>
      </div>

      <FavoriteLocations />
      <WeatherAlerts />
      <WeatherHistory />
      <WeatherComparison />
    </div>
  )
}

export default WeatherDashboard