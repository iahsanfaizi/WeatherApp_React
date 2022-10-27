import { useEffect, useState } from "react";
import WeatherCard from "./weatherCard";
import "./style.css";

const Temperature = () => {
  const [searchValue, setSearchValue] = useState("Faisalabad");
  const [tempInfo, setTempInfo] = useState({});

  const getTemperature = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=62cb90e82b4d96e229e0bd69081971e9`;
      let result = await fetch(url);
      let data = await result.json();
      console.log(data);
      if (data.message === "city not found") {
        const weatherData = {
          temp: "-",
          humidity: "-",
          pressure: "-",
          weathermood: "-",
          name: "-",
          speed: "-",
          country: "-",
          sunset: null
        };

        setTempInfo(weatherData);
      } else {
        const { temp, humidity, pressure } = data.main;
        const { main: weathermood } = data.weather[0];
        const { name } = data;
        const { speed } = data.wind;
        const { country, sunset } = data.sys;

        const weatherData = {
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed,
          country,
          sunset
        };

        setTempInfo(weatherData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTemperature();
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="🔎 Search..."
            id="search"
            className="searchTerm"
            autoFocus
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button
            className="searchButton"
            type="button"
            onClick={() => {
              getTemperature();
            }}
          >
            Search
          </button>
        </div>
      </div>
      {/* weather component */}
      <WeatherCard tempInfo={tempInfo} />
    </>
  );
};
export default Temperature;
