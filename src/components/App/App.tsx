import { useState, useEffect } from "react";
import GameMap from "../GameMap/GameMap";

import ScoresBlock from "../ScoresBlock/ScoresBlock";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import CountryFact from "../CountryFact/CountryFact";

const App = () => {
  ////////////////************ FETCH ALL DATABASE COUNTRIES LOGIC ************************* *//////////////////
  const [countriesData, setCountriesData] = useState<any[]>([]);

  const fetchCountries = async () => {
    try {
      const response = await fetch(`http://localhost:3000/countries`); // Fetch data
      const data = await response.json();
      console.log(data);
      setCountriesData(data);
    } catch (error) {
      console.error("Error fetching new country:", error);
    }
  };
  //////////////// ************ GAMEPLAY LOGIC ************************* //////////////////

  const getRandomCountry = () => {
    // Generate a random index based on the array length
    const randomIndex = Math.floor(Math.random() * countriesData.length);
    const randomCountry = countriesData[randomIndex];

    console.log(randomCountry);
  };

  getRandomCountry();

  ////////////////************ USER COUNTRIES LOGIC ************************* *//////////////////
  const [currentCountry, setCurrentCountry] = useState<string>("");

  const userCountryHandler = (newCountry: string) => {
    setUserChoice(newCountry);
  };

  const currentCountryHandler = (newCountry: string) => {
    setCurrentCountry(newCountry);
  };

  ////////////////************ CONTINENT LOGIC ************************* *//////////////////
  const [continentChoice, setContinentChoice] = useState<string>("");
  const [continents, setContinents] = useState<string[]>([]); // State to hold continents

  // Hard-coded continents array for now
  const hardCodedContinents = [
    "North America",
    "South America",
    "Asia",
    "Europe",
    "Africa",
    "Whole World",
  ];

  const handleContinentClick = (continent: string) => {
    setContinentChoice(continent);
    console.log("User selected:", continent);
    // fetchNewCountry(continent);
  };

  const continentButtons = hardCodedContinents.map((continent) => (
    <Button
      key={continent}
      label={continent}
      onClick={() => handleContinentClick(continent)}
    />
  ));

  ////////////////************ FACT LOGIC ************************* *//////////////////

  // Hard-coded country fact variable
  const fact =
    "This country is home to the world's longest fence, known as the Dingo Fence. Originally built to keep dingoes away from fertile land";

  ////////////////************ SCORE LOGIC ************************* *//////////////////
  const [highScore, setHighScore] = useState<number>(10);
  const [userScore, setUserScore] = useState<number>(0);
  const [userChoice, setUserChoice] = useState<string>("");

  const userScoreHandler = (isCorrect: boolean) => {
    setUserScore((prevScore) => {
      const newScore = isCorrect ? prevScore + 1 : prevScore - 1; // Calculate new score
      console.log(newScore); // Log the new score here
      return newScore; // Return the new score to update the state
    });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      <header className="flex gap-20 w-full p-5 header">
        <Logo />
        <div className="flex gap-7 continent-buttons">{continentButtons}</div>
      </header>
      <ScoresBlock userScore={userScore} highScore={highScore} />
      <p className="text-3xl ml-28 mb-7">{currentCountry}</p>
      <p className="text-3xl ml-28 mb-7">{userChoice}</p>
      <GameMap
        userCountryHandler={userCountryHandler}
        // submitUserChoice={submitUserChoice}
      />
      <CountryFact fact={fact} /> {/* Pass the hard-coded fact as a prop */}
    </div>
  );
};

export default App;
