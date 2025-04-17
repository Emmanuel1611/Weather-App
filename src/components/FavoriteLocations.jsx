import React from 'react'
import { FiStar, FiMapPin } from 'react-icons/fi'
import { useWeather } from '../context/WeatherContext'

const FavoriteLocations = () => {
  const { 
    weatherData, 
    fetchWeatherData, 
    favorites = [], 
    addFavorite, 
    removeFavorite 
  } = useWeather()

  // Get the current location name from weatherData
  const currentLocation = weatherData?.location?.name

  const handleFavoriteClick = (fav) => {
    fetchWeatherData(fav)
  }

  const handleAddRemoveFavorite = () => {
    if (!currentLocation) return
    
    if (favorites.includes(currentLocation)) {
      removeFavorite(currentLocation)
    } else {
      addFavorite(currentLocation)
    }
  }

  return (
    <div className="weather-card mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Favorite Locations</h2>
        {currentLocation && (
          <button
            onClick={handleAddRemoveFavorite}
            className={`p-2 rounded-full ${favorites.includes(currentLocation) ? 'text-yellow-500' : 'text-gray-400'}`}
            aria-label={favorites.includes(currentLocation) ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiStar size={20} fill={favorites.includes(currentLocation) ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {favorites.map((fav) => (
            <button
              key={fav}
              onClick={() => handleFavoriteClick(fav)}
              className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
            >
              <FiMapPin size={18} />
              <span>{fav}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No favorite locations added yet
        </p>
      )}
    </div>
  )
}

export default FavoriteLocations