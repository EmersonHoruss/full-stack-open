import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ statistics }) => {
  const { good, neutral, bad, all, average, positive } = statistics;
  if (!good && !neutral && !bad) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <h2>statistics</h2>
      <StatisticLine text={"good"} value={good} />
      <StatisticLine text={"neutral"} value={neutral} />
      <StatisticLine text={"bad"} value={bad} />
      <StatisticLine text={"all"} value={all} />
      <StatisticLine text={"average"} value={average} />
      <StatisticLine text={"positive"} value={positive} />
    </div>
  );
};

export default Statistics;
