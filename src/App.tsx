import { useState, useEffect } from "react";
import "./App.css";
import Game from "./components/Game";
import Rules from "./components/Rules";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem("score");
    return savedScore ? parseInt(savedScore, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("score", score.toString());
  }, [score]);

  const handleScoreChange = (result: "win" | "lose") => {
    setScore((prevScore) => prevScore + (result === "win" ? 1 : -1));
  };

  return (
    <div className="app">
      <ScoreBoard score={score} />
      <Game onGameResult={handleScoreChange} />
      <Rules />
    </div>
  );
}

export default App;
