import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded">
      <div className="flex items-center">
        <FiAlertTriangle className="mr-2" size={20} />
        <span className="font-medium">Error:</span>
        <span className="ml-1">{message}</span>
      </div>
    </div>
  )
}

export default ErrorMessage