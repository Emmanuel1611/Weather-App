export const API_URLS = {
  CURRENT: `${import.meta.env.VITE_WEATHER_API_URL}/current.json`,
  FORECAST: `${import.meta.env.VITE_WEATHER_API_URL}/forecast.json`,
  SEARCH: `${import.meta.env.VITE_WEATHER_API_URL}/search.json`,
  HISTORY: `${import.meta.env.VITE_WEATHER_API_URL}/history.json`,
  FUTURE: `${import.meta.env.VITE_WEATHER_API_URL}/future.json`,
  TIMEZONE: `${import.meta.env.VITE_WEATHER_API_URL}/timezone.json`,
  SPORTS: `${import.meta.env.VITE_WEATHER_API_URL}/sports.json`,
  ASTRONOMY: `${import.meta.env.VITE_WEATHER_API_URL}/astronomy.json`,
  IP: `${import.meta.env.VITE_WEATHER_API_URL}/ip.json`,
};

export const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '28bf447768974bd2ae260752251704';