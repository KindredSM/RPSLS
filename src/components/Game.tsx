import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import rockIcon from "../assets/images/icon-rock.svg";
import paperIcon from "../assets/images/icon-paper.svg";
import scissorsIcon from "../assets/images/icon-scissors.svg";
import lizardIcon from "../assets/images/icon-lizard.svg";
import spockIcon from "../assets/images/icon-spock.svg";

type Choice = "rock" | "paper" | "scissors" | "lizard" | "spock";
type GameResult = "win" | "lose" | "draw";

interface GameProps {
  onGameResult: (result: "win" | "lose") => void;
}

const choices: Choice[] = ["rock", "paper", "scissors", "lizard", "spock"];

const choiceIcons = {
  rock: rockIcon,
  paper: paperIcon,
  scissors: scissorsIcon,
  lizard: lizardIcon,
  spock: spockIcon,
};

const choiceVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
};

const resultVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, delay: 0.5 } },
};

const Game: React.FC<GameProps> = ({ onGameResult }) => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);

  const handleChoice = (choice: Choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    const gameResult = getGameResult(choice, computerChoice);
    setResult(gameResult);
    if (gameResult !== "draw") {
      onGameResult(gameResult);
    }
  };

  const getGameResult = (player: Choice, computer: Choice): GameResult => {
    if (player === computer) return "draw";
    const winConditions = {
      rock: ["scissors", "lizard"],
      paper: ["rock", "spock"],
      scissors: ["paper", "lizard"],
      lizard: ["paper", "spock"],
      spock: ["rock", "scissors"],
    };
    return winConditions[player].includes(computer) ? "win" : "lose";
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  if (!playerChoice) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="pentagon"
          className="game pentagon-layout"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src="/src/assets/images/bg-pentagon.svg"
            alt="Pentagon"
            className="pentagon-bg"
          />
          {choices.map((choice) => (
            <motion.button
              key={choice}
              onClick={() => handleChoice(choice)}
              className={`choice ${choice}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src={choiceIcons[choice]} alt={choice} />
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="game-result">
      <AnimatePresence mode="wait">
        {playerChoice && computerChoice && (
          <motion.div
            key="choices"
            className="choices"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={choiceVariants}
          >
            <motion.div className="player-choice" variants={choiceVariants}>
              <span>You picked</span>
              <div className={`choice ${playerChoice}`}>
                <img src={choiceIcons[playerChoice]} alt={playerChoice} />
              </div>
            </motion.div>
            <motion.div className="computer-choice" variants={choiceVariants}>
              <span>The house picked</span>
              <div className={`choice ${computerChoice}`}>
                {computerChoice && (
                  <img src={choiceIcons[computerChoice]} alt={computerChoice} />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
        {result && (
          <motion.div
            key="result"
            className="result"
            variants={resultVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {result === "win" && <h2>You win</h2>}
            {result === "lose" && <h2>You lose</h2>}
            {result === "draw" && <h2>It's a draw</h2>}
            <motion.button
              onClick={resetGame}
              className="play-again"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
        {result && (
          <div className="visually-hidden" aria-live="assertive">
            {result === "win"
              ? "You win!"
              : result === "lose"
              ? "You lose!"
              : "It's a draw!"}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Game;
