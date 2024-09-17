import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import rulesImage from "../assets/images/image-rules-bonus.svg";
import closeIcon from "../assets/images/icon-close.svg";

const Rules: React.FC = () => {
  const [showRules, setShowRules] = useState(false);

  const handleOutsideClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        setShowRules(false);
      }
    },
    []
  );

  return (
    <>
      <motion.button
        onClick={() => setShowRules(true)}
        className="rules-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        RULES
      </motion.button>
      <AnimatePresence>
        {showRules && (
          <motion.div
            className="rules-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rules-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleOutsideClick}
          >
            <h2 id="rules-title">RULES</h2>
            <motion.div
              className="rules-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>RULES</h2>
              <img src={rulesImage} alt="Game Rules" className="rules-image" />
              <motion.button
                onClick={() => setShowRules(false)}
                className="close-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img src={closeIcon} alt="Close" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Rules;
