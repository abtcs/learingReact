import "./sky.css";
import { useState } from "react";

const geoURL = "https://geocoding-api.open-meteo.com/v1/search?name=";
const weatherURL =
  "https://api.open-meteo.com/v1/forecast?current_weather=true&latitude=";

export default function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [isDay, setIsDay] = useState(null);

  const getWeather = async () => {
    if (!city) return;

    try {
      // 1️⃣ Get latitude & longitude from city name
      const geoRes = await fetch(geoURL + city);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("City not found");
        return;
      }

      const lat = geoData.results[0].latitude;
      const lon = geoData.results[0].longitude;

      // 2️⃣ Get weather using lat & lon
      const weatherRes = await fetch(
        `${weatherURL}${lat}&longitude=${lon}`
      );
      const weatherData = await weatherRes.json();

      setTemp(weatherData.current_weather.temperature);
      setIsDay(weatherData.current_weather.is_day);
    } catch (err) {
      console.error(err);
      alert("Error fetching weather");
    }
  };

  if (isDay === null)
    return (
      <div className="sky day">
        <div className="weather-card">
          <h2>Enter city to see weather</h2>
          <input
            type="text"
            placeholder="Enter city name : "
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>
      </div>
    );

  const day = isDay === 1;

  return (
    <div className={day ? "sky day" : "sky night"}>
      {day ? <Sun /> : <NightSky />}
      <Clouds />

      <div className="weather-card" style={{ color: day ? "black" : "white" }}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>

        <h1>{temp}°C</h1>
        <h2>{day ? "Sunny Day" : "Starry Night"}</h2>
      </div>
    </div>
  );
}

function Sun() {
  return <div className="sun" />;
}

function Clouds() {
  return (
    <>
      <div className="cloud cloud1" />
      <div className="cloud cloud2" />
    </>
  );
}

function NightSky() {
  return (
    <>
      <div className="moon" />
      <div className="stars" />
      <div className="shooting-star" />
      <div className="shooting-star1" />
    </>
  );
}
