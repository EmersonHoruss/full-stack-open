import React from "react";
import { useState } from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
  const [countriesStates, setCountriesStates] = useState([]);
  const handleShow = (name) => {
    if (countriesStates.find((countryName) => countryName === name)) {
      setCountriesStates(
        countriesStates.filter((countryName) => countryName !== name)
      );
    } else {
      setCountriesStates(countriesStates.concat(name));
    }
  };
  return (
    <>
      {countries.map((country) => (
        <div key={country.name.common}>
          <p>
            {country.name.common}
            <button
              onClick={() => {
                handleShow(country.name.common);
              }}
            >
              show
            </button>
          </p>
          {countriesStates.find(
            (countryName) => countryName === country.name.common
          ) && <Country country={country} />}
        </div>
      ))}
    </>
  );
};

export default Countries;
