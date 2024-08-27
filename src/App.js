import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: 'eefbdfc62cef42e593f70908242708',
          q: cityName,
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather Application</h1>
      <div>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeatherData}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">Temperature: {weatherData.current.temp_c}°C</div>
          <div className="weather-card">Humidity: {weatherData.current.humidity}%</div>
          <div className="weather-card">Condition: {weatherData.current.condition.text}</div>
          <div className="weather-card">Wind Speed: {weatherData.current.wind_kph} kph</div>
        </div>
      )}
    </div>
  );
}

export default App;
