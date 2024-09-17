import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/images/logo.svg";

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <motion.div
      className="scoreboard"
      role="region"
      aria-label="Score"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={logo} alt="Rock Paper Scissors" className="logo" />
      <motion.div
        className="score"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 10 }}
      >
        <span>SCORE</span>
        <motion.span
          key={score}
          className="score-value"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {score}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default ScoreBoard;
