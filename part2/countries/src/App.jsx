import { useState } from "react";
import countriesService from "./services/countries";
import Country from "./Country";
import Countries from "./Countries";

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
        <Country country={countries[0]} />
      ) : countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length <= 10 ? (
        <Countries countries={countries} />
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
