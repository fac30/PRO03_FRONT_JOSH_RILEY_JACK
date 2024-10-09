import { createContext, useState, ReactNode } from "react";

// Define the type for the context value
interface GameContextType {
  filledCountries: string[];
  setFilledCountries: React.Dispatch<React.SetStateAction<string[]>>;
  userAnswer: string;
  setUserAnswer: React.Dispatch<React.SetStateAction<string>>;
  redFilledCountries: string[];
  setRedFilledCountries: React.Dispatch<React.SetStateAction<string[]>>;
}

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Create a provider component
export const GameProvider = ({ children }: { children: ReactNode }) => {
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
