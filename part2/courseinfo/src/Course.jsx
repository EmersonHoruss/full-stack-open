import React from "react";
import Header from "./Header";
import Content from "./Content";
const Course = ({ course }) => {
  const { id, name, parts } = course;
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
    </div>
  );
};

export default Course;
