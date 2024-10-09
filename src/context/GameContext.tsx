import { createContext, useState, useEffect } from "react";

// Create the context
const GameContext = createContext();

// Create a provider component
export const GameProvider = ({ children }) => {
  const [filledCountries, setFilledCountries] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [redFilledCountries, setRedFilledCountries] = useState<string[]>([]);

  return (
    <GameContext.Provider
      value={{
        setFilledCountries,
        filledCountries,
        setUserAnswer,
        userAnswer,
        redFilledCountries,
        setRedFilledCountries,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
