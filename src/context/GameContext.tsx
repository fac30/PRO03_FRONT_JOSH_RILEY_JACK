import { createContext, useState, useEffect } from "react";

// Create the context
const GameContext = createContext();

// Create a provider component
export const GameProvider = ({ children }) => {
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [currentCountry, setCurrentCountry] = useState<string>("");
  const [userScore, setUserScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(10);
  const [remainingGuesses, setRemainingGuesses] = useState(3);
  const [continentChoice, setContinentChoice] = useState<string>("Europe");
  const [filledCountries, setFilledCountries] = useState<string[]>([]);

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

  const addToFilledCountries = (countryName) => {
    setFilledCountries((prevCountries) => [...prevCountries, countryName]);
  };

  const getRandomCountry = () => {
    const filteredCountries = countriesData.filter((country) => {
      return country.continent === continentChoice;
    });
    // Generate a random index based on the array length
    const randomIndex = Math.floor(Math.random() * filteredCountries.length);
    const randomCountry = filteredCountries[randomIndex].country;
    setCurrentCountry(randomCountry); // Remove the selected country from the array

    // Remove the selected country from countriesData using splice
    const countryIndexInOriginalArray = countriesData.findIndex(
      (country) => country.country === randomCountry
    );
    countriesData.splice(countryIndexInOriginalArray, 1);
  };

  useEffect(() => {
    if (countriesData.length > 0) {
      getRandomCountry(); // Get a random country once data is loaded
    }
  }, [countriesData]);

  const decreaseRemainingGuesses = () => {
    setRemainingGuesses((prevState) => prevState - 1);
  };

  // Reset remaining guesses to 3
  const resetRemainingGuesses = () => {
    setRemainingGuesses(3);
  };

  const checkAnswer = (userAnswer) => {
    if (userAnswer === currentCountry) {
      addToFilledCountries(userAnswer);
      resetRemainingGuesses();
      increaseScore(true);
      getRandomCountry();
    } else if (remainingGuesses > 1) {
      decreaseRemainingGuesses();
    } else {
      resetRemainingGuesses();
      addToFilledCountries(currentCountry);
      getRandomCountry();
    }
  };

  // Either increase or decrease score depending on boolean
  const increaseScore = () => {
    setUserScore((prevScore) => prevScore + 1);
  };

  ////////////////************ USER COUNTRIES LOGIC ************************* *//////////////////

  const userAnswerHandler = (userAnswer: string) => {
    checkAnswer(userAnswer);
  };

  const handleContinentClick = (continent: string) => {
    setContinentChoice(continent);
    console.log("User selected:", continent);
    // fetchNewCountry(continent);
  };

  return (
    <GameContext.Provider
      value={{
        fetchCountries,
        currentCountry,
        userScore,
        highScore,
        remainingGuesses,
        continentChoice,
        filledCountries,
        userAnswerHandler,
        handleContinentClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
