import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
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
      {persons.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </div>
  );
};

export default App;
