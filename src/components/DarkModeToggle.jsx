import React from 'react'
import { useContext } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { WeatherContext } from '../context/WeatherContext'

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  const { useWeather } = useContext(WeatherContext)
  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-900 text-yellow-300' : 'bg-yellow-100 text-yellow-600'}`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  )
}

export default DarkModeToggle