import React, { useState, useEffect } from "react";
import { Spinner } from "./Spinner";
import axios from "axios";
import { Page } from "./Page";

export function Countriefilter({ name }) {
  const [countrie, setcountrie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/name/" + name).then((result) => {
      setcountrie(result.data[0]);
      setIsLoading(false);
    });
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=New%20York`
      )
      .then((result) => {
        setWeather(result.data.current);
      });
  }, [name]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>{name}</h1>
      <img src={countrie.flags.png} />
      <p>Capital:{countrie.capital}</p>
      <Page countrie={countrie.languages} />
      <p>{countrie.capital}</p>
      <p>Temperature: {weather.temperature}</p>
      <img src={weather.weather_icons}></img>
      <p>
        wind: {weather.wind_speed} mph direction: {weather.wind_dir}
      </p>
    </>
  );
}
