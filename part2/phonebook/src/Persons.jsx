import React from "react";

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(({ id, name, number }) => (
        <p key={id}>
          {name} {number}
        </p>
      ))}
    </>
  );
};

export default Persons;
