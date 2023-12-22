import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleFilter = ($event) => {
    setFilter($event.target.value);
    const filter = $event.target.value;
    if (filter) {
      const filteredPersons = persons.filter((person) => {
        const personName = person.name.toLowerCase();
        const filterToLowerCase = filter.toLowerCase();
        return personName.includes(filterToLowerCase);
      });
      setFilteredPersons([...filteredPersons]);
    } else {
      setFilteredPersons([...persons]);
    }
  };
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
      setPersons(persons.concat({ name: newName, number: newNumber }));
    } else {
      const errorMessage = `${newName} is already added to phonebook`;
      alert(errorMessage);
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filter} onChange={handleFilter} />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="button" onClick={handleAdd}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(({ id, name, number }) => (
        <p key={id}>
          {name} {number}
        </p>
      ))}
    </div>
  );
};

export default App;
