import React, { useState } from "react";
import axios from "axios";

import "./Weather.css";

export default function Weather() {
  let [city, setCity] = useState(" ");
  let [weather, setWeather] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (city.trim().length > 1) {
      let apiKey = "63214c4281922e3bb72fdf12dada7734";
      let units = "metric";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
      axios.get(apiUrl).then(showTemperature);
    } else {
      setWeather("");
    }
  }
  function showTemperature(response) {
    console.log(response.data);
    if (response.data) {
      setWeather(
        <div className="WeatherDetails">
          <ul>
            <li>Temperature: {Math.round(response.data.main.temp)}℃</li>
            <li>Description:{response.data.weather[0].description}</li>
            <li>Humidity: {response.data.main.humidity}%</li>
            <li>Wind: {response.data.wind.speed} km/h</li>
            <li>
              <img
                alt="Weather Icon"
                src={`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
              />
            </li>
          </ul>
        </div>
      );
    }
  }

  function showCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }
  return (
    <div className="Weather">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="city"
          placeholder="Enter a city"
          onChange={showCity}
        />
        <input type="submit" className="button" value="Search" />
      </form>
      {weather}
    </div>
  );
}
