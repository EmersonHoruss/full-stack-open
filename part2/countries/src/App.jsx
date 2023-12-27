import { useState } from "react";
import countriesService from "./services/countries";

function App() {
  const [findCountry, setFindCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const handleFindCountry = ($event) => {
    const findCountry = $event.target.value;
    setFindCountry(findCountry);
    countriesService.getByName(findCountry).then((response) => {
      if (findCountry === $event.target.value) {
        setCountries(response);
      }
    });
  };
  return (
    <>
      <label htmlFor="findCountries">find countries</label>
      <input
        type="text"
        id="findCountries"
        value={findCountry}
        onChange={handleFindCountry}
      />
      {countries.length === 1 ? (
        <>
          <h1>{countries[0].name.common}</h1>
          <p>capital {countries[0].capital[0]}</p>
          <p>area {countries[0].area}</p>
          <strong>languages:</strong>
          <ul>
            {Object.entries(countries[0].languages).map(([key, val]) => (
              <li key={key}>{val}</li>
            ))}
          </ul>
          <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
        </>
      ) : countries.length > 10 ? (
        <>
          <p>Too many matches, specify another filter</p>
        </>
      ) : countries.length <= 10 ? (
        <>
          {countries.map((country) => (
            <p key={country.name.common}>{country.name.common}</p>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
