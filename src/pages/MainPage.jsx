import React, { useEffect, useState } from "react";
import "../stylesheets/page-styling.css";
import axios from "axios";
import "../stylesheets/mainpage-styling.css";

const MainPage = () => {
  const [data, setData] = useState({});
  const [isMetric, setIsMetric] = useState(false);
  const [location, setLocation] = useState("");
  const [measure, setMeasure] = useState("imperial");
  const [apiLocation, setApiLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const tempSymbol = isMetric ? "°C" : "°F";
  const windSpeed = isMetric ? "KM/PH" : "M/PH";

  const apiKey = "eefa518abc6de9538f3224bad9bdf308";

  useEffect(() => {
    setMeasure(isMetric ? "metric" : "imperial");
  }, [isMetric]);

  useEffect(() => {
    if (apiLocation !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${apiLocation}&units=${measure}&appid=${apiKey}`;
      setIsLoading(true);
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        });
    }
  }, [measure, apiLocation]);

  useEffect(() => {
    const fetchDataByLocation = () => {
      if (latitude && longitude) {
        setIsLoading(true);
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${measure}&appid=${apiKey}`;
        axios
          .get(url)
          .then((response) => {
            setData(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data by geolocation:", error);
            setIsLoading(false);
          });
      }
    };

    fetchDataByLocation();
  }, [latitude, longitude, measure]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, []);

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
        </div>
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <>
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main && (
                  <>
                    <h1 className="bold">
                      {data.main.temp} {tempSymbol}
                    </h1>
                  </>
                )}
                <div className="description">
                  {data.weather && <p>{data.weather[0].main}</p>}
                  {data.weather && (
                    <img
                      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                      alt={data.weather[0].main}
                    ></img>
                  )}
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="feels">
                {data.main && (
                  <p className="bold">
                    {data.main.feels_like} {tempSymbol}
                  </p>
                )}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main && <p className="bold">{data.main.humidity}%</p>}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.main && (
                  <p className="bold">
                    {data.wind.speed}
                    {windSpeed}
                  </p>
                )}
                <p>Wind Speed</p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MainPage;
