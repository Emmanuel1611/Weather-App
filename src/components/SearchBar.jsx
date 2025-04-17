import React, { useState, useContext, useEffect, useRef } from 'react'
import { FiSearch } from 'react-icons/fi'
import { WeatherContext } from '../context/WeatherContext'

const SearchBar = () => {
  const { fetchWeatherData } = useContext(WeatherContext)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef(null)
  
  // Add this to safely handle suggestions
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || []

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      fetchWeatherData(query)
      
      // Save to recent searches
      const searches = JSON.parse(localStorage.getItem('recentSearches')) || []
      if (!searches.includes(query)) {
        const newSearches = [query, ...searches].slice(0, 5)
        localStorage.setItem('recentSearches', JSON.stringify(newSearches))
      }
      
      setQuery('')
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    
    // Show recent searches as suggestions
    if (value.trim()) {
      // Filter recent searches that match the input
      const filtered = recentSearches.filter(search => 
        search.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions(recentSearches)
      setShowSuggestions(!!recentSearches.length)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    fetchWeatherData(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="relative" ref={inputRef}>
      <form onSubmit={handleSearch} className="flex">
        <div className="relative flex-grow">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(!!recentSearches.length)}
            className="w-full p-2 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
            placeholder="Search for a location..."
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button
          type="submit"
          className="ml-2 bg-primary-light dark:bg-primary-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Search
        </button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar