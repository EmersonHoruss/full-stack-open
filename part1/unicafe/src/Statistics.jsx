import React from "react";

const Statistics = ({ good, neutral, bad }) => {
  if (!good && !neutral && !bad) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>
        average {(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)}
      </p>
      <p>positive {(good * 100) / (good + neutral + bad)} %</p>
    </div>
  );
};

export default Statistics;
