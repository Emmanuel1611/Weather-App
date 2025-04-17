import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.jsx';
import { WeatherProvider } from './context/WeatherContext';
import './index.css';

function Fallback({ error }) {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-800">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </ErrorBoundary>
  </React.StrictMode>
);