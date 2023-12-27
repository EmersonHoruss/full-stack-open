import React from "react";

const Weather = ({
  countryName,
  temperature,
  icon,
  description,
  windSpeed,
}) => {
  return (
    <>
      <h2>Weather in {countryName}</h2>
      <p>temperature {temperature} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <p>wind {windSpeed} m/s</p>
    </>
  );
};

export default Weather;
