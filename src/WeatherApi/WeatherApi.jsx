import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './WeatherApi.css'
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { TiWeatherSunny } from "react-icons/ti";
export const WeatherApi = () => {
  const [cityName, setcityName] = useState("Mohali");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");  
  const apiKey = "0d6fa12aaa97c02556b5f07a1852543c";

  const fetchWeatherData = async () => {
    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError("");
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("City not found. Please enter a valid city name.");
      } else {
        setError("Error fetching weather data. Please try again later.");
      }
      setWeatherData(null);
      console.error("Error fetching weather data:", error);
    }
  };

  const handlecityNameChange = (event) => {
    setcityName(event.target.value);
  };

  const handlecityNameSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData(); // Fetch weather data when form is submitted
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${date} at ${time}`;
  };

  return (
    <div className="maindiv">
    <div className="headermain">
      <div className="innerdiv">
        <div className="formdiv">
          <form onSubmit={handlecityNameSubmit}>
            <input
              type="text"
              value={cityName}
              onChange={handlecityNameChange}
              placeholder="Enter City Name"
            />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <div className="cityname">
            {weatherData && !error ? (
              <>
                <h1>Weather in {weatherData.name}</h1>
                <p>{getCurrentDateTime()}</p>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
        {error && <div className="error-alert">{error}</div>}
        {weatherData && !error ? (
          <div className="data-box">
            <div className="data-box temp">
              <p>{weatherData.main.temp} °C</p>
            </div>
            <div className=" wind">
          
<span className="windicon">  <FaWind /></span>
              <p> Wind: {weatherData.wind.speed} KM/H</p>
            </div>
            <div className=" humidity">
              <span className="humicon"><WiHumidity /></span>
              <p>Humidity: {weatherData.main.humidity} %</p>
            </div>
            <div className=" visibility">
              <span className="Visicon"><MdVisibility /></span>
              <p>visibility: {weatherData.visibility} %</p>
            </div>
            <div className="description">
              <span className="weaicon">
                <TiWeatherSunny />
              </span>
              <p>description: {weatherData.weather[0].description}</p>
            </div>
          </div>
        ) : (
          !error && <p>Loading weather data...</p>
        )}
      </div>
    </div>
    </div>
  );
};
