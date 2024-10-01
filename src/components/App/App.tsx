import { useState } from "react";
import GameMap from "../GameMap/GameMap";
import "./App.css";

const App = () => {
  const [userScore, setUserScore] = useState<number>(0);
  const [currentCountry, setCurrentCountry] = useState<string>("Zimbabwe");
  const [userChoice, setUserChoice] = useState<string>("");

  const currentCountryHandler = (newCountry) => {
    setCurrentCountry(newCountry);
  };

  return (
    <div>
      <h1 className=" text-center  max-w-xl text-6xl  mb-11  mt-9  mx-auto">
        Map Tap Revenge
      </h1>
      <p className="text-3xl ml-28 mb-7">{currentCountry}</p>

      <GameMap currentCountryHandler={currentCountryHandler} />
    </div>
  );
};

export default App;
