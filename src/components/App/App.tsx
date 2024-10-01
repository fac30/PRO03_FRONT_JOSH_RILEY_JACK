import { useState } from "react";
import GameMap from "../GameMap/GameMap";
import "./App.css";

const App = () => {
  const [userScore, setUserScore] = useState<number>(0);
  const [currentCountry, setCurrentCountry] = useState<string>("Zimbabwe");
  const [userChoice, setUserChoice] = useState<string>("");

  return (
    <div>
      <GameMap />
    </div>
  );
};

export default App;
