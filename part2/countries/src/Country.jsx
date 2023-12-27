import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import weatherService from "./services/weather";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    setWeather(null);
    weatherService
      .getByLatLong(country.latlng)
      .then((response) => setWeather(response));
  }, [country]);
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <strong>languages:</strong>
      <ul>
        {Object.entries(country.languages).map(([key, val]) => (
          <li key={key}>{val}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {weather && (
        <Weather
          name={country.name.common}
          temperature={weather.main.temp}
          icon={weather.weather[0].icon}
          description={weather.weather[0].description}
          windSpeed={weather.wind.speed}
        />
      )}
    </>
  );
};

export default Country;
