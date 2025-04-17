import React, { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'
import DarkModeToggle from './DarkModeToggle'
import SearchBar from './SearchBar'

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(WeatherContext)

  return (
    <header className={`py-4 px-6 shadow-md ${darkMode ? 'bg-slate-900' : 'bg-primary-light'}`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white">WeatherSphere</h1>
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
        <SearchBar />
      </div>
    </header>
  )
}

export default Header