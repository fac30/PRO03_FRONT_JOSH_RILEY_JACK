import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/GameContext";
import GameMap from "../GameMap/GameMap";
import ScoresBlock from "../ScoresBlock/ScoresBlock";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import CountryFact from "../CountryFact/CountryFact";

const App = () => {
  // Import functions from GameContext
  const {
    currentCountry,
    userScore,
    highScore,
    remainingGuesses,
    handleContinentClick,
  } = useContext(GameContext);

  

  // Hard-coded continents array for now
  const hardCodedContinents = [
    "North America",
    "South America",
    "Asia",
    "Europe",
    "Africa",
    "Whole World",
  ];

  const continentButtons = hardCodedContinents.map((continent) => (
    <Button
      key={continent}
      label={continent}
      onClick={() => handleContinentClick(continent)}
    />
  ));

  const [countryFact, setCountryFact] = useState<string>("");

  const fetchCountryFact = async (country: string) => {
    try {
      const response = await fetch(`http://localhost:3000/random-fact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCountryFact(data.fact);
    } catch (error) {
      console.error("Error fetching country fact:", error);
    }
  };

  useEffect(() => {
    if (currentCountry) {
      // Only fetch if currentCountry is not an empty string
      fetchCountryFact(currentCountry);
    }
  }, [currentCountry]);

  return (
    <div>
      <header className="flex gap-20 w-full p-5 header">
        <Logo />
        <div className="flex gap-7 continent-buttons">{continentButtons}</div>
      </header>
      <ScoresBlock userScore={userScore} highScore={highScore} />
      <GameMap />
      <p className="text-3xl m-auto w-80 mb-4 mt-4 text-center">
        {currentCountry}
      </p>
      <CountryFact fact={countryFact} />
      <p className="text-3xl m-auto w-80 mb-4 mt-4 text-center">
        You have {remainingGuesses} guesses left!
      </p>
    </div>
  );
};

export default App;
