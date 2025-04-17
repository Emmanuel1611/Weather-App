import { useWeather } from '../context/WeatherContext'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const WeatherMap = () => {
  const { weather, loading } = useWeather()

  if (loading || !weather) return null

  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

  return (
    <div className="weather-card h-full">
      <h2 className="text-xl font-semibold mb-4">Weather Map</h2>
      <div className="map-container" style={{ height: '300px' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [weather.location.lon, weather.location.lat],
            scale: 400
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))
            }
          </Geographies>
          <Marker coordinates={[weather.location.lon, weather.location.lat]}>
            <circle r={8} fill="#F53" stroke="#FFF" strokeWidth={2} />
          </Marker>
        </ComposableMap>
      </div>
    </div>
  )
}

export default WeatherMap