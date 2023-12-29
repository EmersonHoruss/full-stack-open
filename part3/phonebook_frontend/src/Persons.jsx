import React from "react";

const Persons = ({ persons, onDelete }) => {
  return (
    <>
      {persons.map(({ id, name, number }) => (
        <p key={id}>
          {name} {number}
          <button
            onClick={() => {
              onDelete(id, name);
            }}
          >
            delete
          </button>
        </p>
      ))}
    </>
  );
};

export default Persons;
