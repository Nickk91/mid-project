import React, { useEffect, useState } from "react";
import "../stylesheets/page-styling.css";
import axios from "axios";
import "../stylesheets/mainpage-styling.css";

const StatsPage = () => {
  const [forecastData, setForecastData] = useState([]);
  const [isMetric, setIsMetric] = useState(false);
  const [location, setLocation] = useState("");
  const [measure, setMeasure] = useState("imperial");
  const [apiLocation, setApiLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [geolocationSuccess, setGeolocationSuccess] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const tempSymbol = isMetric ? "°C" : "°F";
  const windSpeed = isMetric ? "KM/PH" : "M/PH";

  const apiKey = "eefa518abc6de9538f3224bad9bdf308";
  const API_endpoint = "https://api.openweathermap.org/data/2.5/forecast/daily";

  useEffect(() => {
    setMeasure(isMetric ? "metric" : "imperial");
  }, [isMetric]);

  useEffect(() => {
    if (apiLocation !== "") {
      const url = `${API_endpoint}?q=${apiLocation}&units=${measure}&cnt=7&appid=${apiKey}`;
      setIsLoading(true);
      axios
        .get(url)
        .then((response) => {
          setForecastData(response.data.list);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching forecast data:", error);
          setIsLoading(false);
        });
    }
  }, [measure, apiLocation]);

  useEffect(() => {
    if (geolocationSuccess && latitude && longitude) {
      const url = `${API_endpoint}?lat=${latitude}&lon=${longitude}&units=${measure}&cnt=7&appid=${apiKey}`;
      setIsLoading(true);
      axios
        .get(url)
        .then((response) => {
          setForecastData(response.data.list);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching forecast data by geolocation:", error);
          setIsLoading(false);
        });
    }
  }, [latitude, longitude, measure, geolocationSuccess]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setGeolocationSuccess(true);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        setGeolocationSuccess(false);
      }
    );
  }, []); // Empty dependency array means this effect runs once after the initial render

  const toggleIsMetric = () => {
    setIsMetric(!isMetric);
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      setApiLocation(location);
      setIsLoading(true);
      setLocation("");
    }
  };

  const useGeolocation = () => {
    setGeolocationSuccess(true);
    setIsLoading(true);
    setApiLocation(""); // Clear the location input when using geolocation
    setLatitude("");
    setLongitude("");
  };

  return (
    <section className="page">
      <div className="main-container">
        <div className="search-location-container">
          <input
            id="search-city"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            placeholder="Enter Location"
            type="text"
          />
          <button disabled={isLoading} onClick={toggleIsMetric} id="toggle">
            {tempSymbol}
          </button>
          <button
            disabled={isLoading}
            onClick={useGeolocation}
            id="geolocation-button"
          >
            Use Geolocation
          </button>
        </div>
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <>
            {forecastData.length > 0 && (
              <div className="forecast-container">
                {forecastData.map((day, index) => (
                  <div key={index} className="forecast-item">
                    <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                    <p>
                      {day.temp.day} {tempSymbol}
                    </p>
                    <p>{day.weather[0].main}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default StatsPage;
