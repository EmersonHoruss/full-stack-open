import React from "react";

const Country = ({ country }) => {
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
    </>
  );
};

export default Country;
