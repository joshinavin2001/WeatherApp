import React, { useRef, useState } from "react";
import Search from "../assets/search.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import { useEffect } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name...?");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icons = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        temprature: Math.floor(data.main.temp),
        location: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: icons,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in Fetching Weather Data");
    }
  };
  useEffect(() => {
    search("mumbai");
  }, []);
  return (
    <>
      <div className=" bg-linear-to-r from-zinc-500 via-stone-600 to-zinc-900 h-screen w-full flex justify-center p-[20px]">
        <div className="bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500  place-content-center p-[40px] rounded-[15px]">
          <div className="flex gap-2 ">
            <input
              ref={inputRef}
              className="bg-white rounded-[20px] h-9 pl-[10px]"
              type="text"
              placeholder="Search"
            />
            <img
              onClick={() => search(inputRef.current.value)}
              className="bg-white rounded-full p-[8px] cursor-pointer active:scale-95"
              src={Search}
              alt=""
            />
          </div>
          {weatherData ? (
            <>
              <div className="text-center text-white text-2xl">
                <img src={weatherData.icon} alt="" />
                <h1>{weatherData.temprature}°c</h1>
                <h1>{weatherData.location}</h1>
              </div>
              <div className="flex justify-between ">
                <div className="flex gap-2 mt-5">
                  <img className="h-5 mt-2" src={humidity} alt="" />
                  <div className="text-white">
                    <p>{weatherData.humidity}%</p>
                    <p>Humidity</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-5 ">
                  <img className="h-6 mt-2" src={wind} alt="" />
                  <div className="text-white">
                    <p> {weatherData.windSpeed}km/h</p>
                    <p>Wind Speed</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
