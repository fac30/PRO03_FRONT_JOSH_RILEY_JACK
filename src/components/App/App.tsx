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
      const dataArray = data.allCountries;

      setCountriesData(dataArray);
    } catch (error) {
      console.error("Error fetching new country:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  //////////////// ************ GAMEPLAY LOGIC ************************* //////////////////
  const [currentCountry, setCurrentCountry] = useState<string>("");
  const [userChoice, setUserChoice] = useState<string>("");
  const [userScore, setUserScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(10);

  const getRandomCountry = () => {
    // Generate a random index based on the array length
    const randomIndex = Math.floor(Math.random() * countriesData.length);
    const randomCountry = countriesData[randomIndex].country;
    setCurrentCountry(randomCountry);
  };

  useEffect(() => {
    if (countriesData.length > 0) {
      getRandomCountry(); // Get a random country once data is loaded
    }
  }, [countriesData]);

  const checkAnswer = (userAnswer) => {
    if (userAnswer === currentCountry) {
      console.log(
        "Winner!",
        `User choice was ${userAnswer}, current country was ${currentCountry}`
      );
      handleScoreChange(true);
      getRandomCountry();
    } else {
      console.log(
        "Loser!",
        `User choice was ${userAnswer}, current country was ${currentCountry}`
      );
      handleScoreChange(false);
      getRandomCountry();
    }
  };

  const handleScoreChange = (isCorrect) => {
    setUserScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore - 1));
  };

  ////////////////************ USER COUNTRIES LOGIC ************************* *//////////////////

  const userAnswerHandler = (userAnswer: string) => {
    setUserChoice(userAnswer);
    checkAnswer(userAnswer);
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

  useEffect(() => {
    if (currentCountry) {
      // Only fetch if currentCountry is not an empty string
      fetchCountryFact(currentCountry);
    }
  }, [currentCountry]);

  const [countryFact, setCountryFact] = useState<string>(""); // Changed to camelCase
  const fetchCountryFact = async (country: string) => {
    try {
      const response = await fetch(`http://localhost:3000/random-fact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country }), // Send the current country
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setCountryFact(data.fact); // Set the fact from the response
    } catch (error) {
      console.error("Error fetching country fact:", error);
    }
  };

  ////////////////************ SCORE LOGIC ************************* *//////////////////

  return (
    <div>
      <header className="flex gap-20 w-full p-5 header">
        <Logo />
        <div className="flex gap-7 continent-buttons">{continentButtons}</div>
      </header>
      <ScoresBlock userScore={userScore} highScore={highScore} />
      {/* <p className="text-3xl ml-28 mb-7">{userChoice}</p> */}
      <GameMap userAnswerHandler={userAnswerHandler} />
      <p className="text-3xl m-auto w-80 mb-4 mt-4 text-center">
        {currentCountry}
      </p>
      <CountryFact fact={countryFact} />
    </div>
  );
};

export default App;
