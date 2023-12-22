import { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [statistics, setStatistics] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0 + "%",
  });
  const handleGood = () => {
    setGood(good + 1);
    updateStatistics(good + 1, neutral, bad);
  };
  const updateStatistics = (good, neutral, bad) => {
    setStatistics({
      good,
      neutral,
      bad,
      all: good + neutral + bad,
      average: (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad),
      positive: (good * 100) / (good + neutral + bad) + "%",
    });
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    updateStatistics(good, neutral + 1, bad);
  };
  const handleBad = () => {
    setBad(bad + 1);
    updateStatistics(good, neutral, bad + 1);
  };
  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics statistics={statistics} />
    </div>
  );
};

export default App;
