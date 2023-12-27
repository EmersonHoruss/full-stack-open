import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personsService from "./services/persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);
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
      personsService.create(newPhonebook).then((response) => {
        setPersons(persons.concat(response.data));
        manageNotification(`Added ${response.data.name}`);
      });
    } else {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const id = personAlreadyRegistered.id;
        const person = { id, name: newName, number: newNumber };
        personsService.update(id, person).then((response) => {
          setPersons(
            persons.map((person) => {
              if (person.id === response.data.id) {
                return { ...person, number: response.data.number };
              }
              return person;
            })
          );
          manageNotification(`Number is changed of ${response.data.name}`);
        });
      }
    }
  };
  const manageNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };
  const handleDelete = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      personsService.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
