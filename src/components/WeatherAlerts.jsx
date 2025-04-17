import React, { useState, useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { format } from 'date-fns';

const formatDate = (dateString) => {
  try {
    return format(new Date(dateString), 'MM/dd/yyyy HH:mm');
  } catch (e) {
    return dateString || 'Unknown date';
  }
};

const WeatherAlerts = () => {
  const { weatherData } = useContext(WeatherContext);
  const [expandedAlert, setExpandedAlert] = useState(null);
  
  if (!weatherData || !weatherData.alerts || !Array.isArray(weatherData.alerts) || weatherData.alerts.length === 0) {
    return null;
  }
  
  return (
    <div className="weather-card mb-8 border-l-4 border-yellow-500">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Weather Alerts ({weatherData.alerts.length})
      </h2>
      
      <div className="space-y-4">
        {weatherData.alerts.map((alert, index) => (
          <div 
            key={index} 
            className="bg-yellow-50 dark:bg-yellow-900/20 rounded-md p-4 border border-yellow-100 dark:border-yellow-800"
          >
            <div 
              className="flex justify-between items-start cursor-pointer"
              onClick={() => setExpandedAlert(expandedAlert === index ? null : index)}
            >
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-300">{alert.event || 'Weather Alert'}</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  {formatDate(alert.start || alert.effective)} - {formatDate(alert.end || alert.expires)}
                </p>
                <p className="text-sm text-yellow-600 dark:text-yellow-500">Source: {alert.sender_name || 'Weather Service'}</p>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-yellow-500 transform transition-transform ${expandedAlert === index ? 'rotate-180' : ''}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            
            {expandedAlert === index && (
              <div className="mt-4 text-sm text-yellow-800 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded">
                <p>{alert.description || alert.desc || 'No detailed information available.'}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts;
