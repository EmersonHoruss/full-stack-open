import React from "react";

const Total = ({ parts }) => {
  return (
    <strong>
      total of {parts.map((part) => part.exercises).reduce((ac, cv) => ac + cv)}{" "}
      exercises
    </strong>
  );
};

export default Total;
