import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleFilter = ($event) => {
    setFilter($event.target.value);
  };
  const filteredPersons = filter
    ? persons.filter((person) => {
        const personName = person.name.toLowerCase();
        const filterToLowerCase = filter.toLowerCase();
        return personName.includes(filterToLowerCase);
      })
    : persons;
  const handleNewName = ($event) => {
    setNewName($event.target.value);
  };
  const handleNewNumber = ($event) => {
    setNewNumber($event.target.value);
  };
  const handleAdd = () => {
    const personAlreadyRegistered = persons.find(
      (person) => person.name === newName
    );
    if (!personAlreadyRegistered) {
      const newPhonebook = { name: newName, number: newNumber };
      axios
        .post("http://localhost:3001/persons", newPhonebook)
        .then((response) => {
          setPersons(persons.concat(response.data));
        });
    } else {
      const errorMessage = `${newName} is already added to phonebook`;
      alert(errorMessage);
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onChangeName={handleNewName}
        onChangeNumber={handleNewNumber}
        onSubmit={handleAdd}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
