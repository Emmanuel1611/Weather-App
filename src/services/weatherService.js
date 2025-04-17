import axios from 'axios';
import { API_URLS, API_KEY } from '../config/api';

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const fetchWeatherData = async (location, unit) => {
  try {
    const response = await axios.get(
      `${API_URLS.CURRENT}?key=${API_KEY}&q=${location}&aqi=yes`
    );
    const data = response.data;
    return {
      temp: unit === 'metric' ? data.current.temp_c : data.current.temp_f,
      condition: data.current.condition.text.toLowerCase(),
      humidity: data.current.humidity,
      wind_speed: unit === 'metric' ? data.current.wind_kph : data.current.wind_mph,
    };
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchForecast = async (location, unit, days = 5) => {
  try {
    const response = await axios.get(
      `${API_URLS.FORECAST}?key=${API_KEY}&q=${location}&days=${days}&aqi=yes&alerts=yes`
    );
    return response.data.forecast.forecastday.map((day) => ({
      date: day.date,
      temp: unit === 'metric' ? day.day.avgtemp_c : day.day.avgtemp_f,
      condition: day.day.condition.text.toLowerCase(),
      precip: day.day.totalprecip_mm,
    }));
  } catch (error) {
    throw new Error('Failed to fetch forecast data');
  }
};

export const fetchAirQuality = async (location, unit) => {
  try {
    const response = await axios.get(
      `${API_URLS.CURRENT}?key=${API_KEY}&q=${location}&aqi=yes`
    );
    return response.data.current.air_quality;
  } catch (error) {
    throw new Error('Failed to fetch air quality data');
  }
};

export const searchLocations = async (query) => {
  try {
    const response = await axios.get(
      `${API_URLS.SEARCH}?key=${API_KEY}&q=${query}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to search locations');
  }
};