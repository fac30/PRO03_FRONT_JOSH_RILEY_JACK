import { useEffect, useState } from "react";
import useGameContext from "../../CustomHooks/useGameContext";
import GameMap from "../GameMap/GameMap";
import ScoresBlock from "../ScoresBlock/ScoresBlock";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import CountryFact from "../CountryFact/CountryFact";

const App = () => {
  interface CountryData {
    country: string;
    path: string[];
    continent: string;
  }

  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [currentCountry, setCurrentCountry] = useState<string>("");
  const [userScore, setUserScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [remainingGuesses, setRemainingGuesses] = useState(3);
  const [continentChoice, setContinentChoice] = useState<string>("Europe");

  const { setFilledCountries, userAnswer, setRedFilledCountries } =
    useGameContext();

  //////////////////// ************ CONTINENTS LOGIC **************** /////////////////

  // Hard-coded continents array for now
  const hardCodedContinents = [
    "North America",
    "South America",
    "Asia",
    "Europe",
    "Africa",
  ];

  //Generates Buttons for each continent in hardCodedContinents array and assigns each with the relative functionality.
  const continentButtons = hardCodedContinents.map((continent) => (
    <Button
      data-test={`continent-button-${continent}`}
      key={continent}
      label={continent}
      onClick={() => handleContinentClick(continent)}
      isSelected={continentChoice === continent}
    />
  ));

  // Handle when a continent is selected
  const handleContinentClick = (continent: string) => {
    setContinentChoice(continent); // Only set continent choice here
    resetRemainingGuesses();
    console.log("User selected:", continent);
  };

  // This effect will trigger whenever continentChoice changes
  useEffect(() => {
    if (countriesData.length > 0) {
      getRandomCountry(); // Fetch a random country based on the new continent
    }
  }, [continentChoice, countriesData]); // Trigger when continentChoice or countriesData changes

  //////////////////// ************ FACT LOGIC **************** /////////////////
  const [countryFact, setCountryFact] = useState<string>("");

  // Sends POST request to back end with the generated country and returns a random fact about that country using OpenAI
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
      setCountryFact(data.fact); //set countryFact state to data recieved from backend
    } catch (error) {
      console.error("Error fetching country fact:", error);
    }
  };

  //Triggers a side effect whenever the value of currentCountry changes.
  useEffect(() => {
    if (currentCountry) {
      // Only fetch if currentCountry is not an empty string
      fetchCountryFact(currentCountry);
    }
  }, [currentCountry]);

  //////////////////// ************ DATABASE LOGIC **************** /////////////////

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

  const addToFilledCountries = (countryName: string) => {
    setFilledCountries((prevCountries: string[]) => [
      ...prevCountries,
      countryName,
    ]);
  };
  const addToRedFilledCountries = (countryName: string) => {
    setRedFilledCountries((prevCountries: string[]) => [
      ...prevCountries,
      countryName,
    ]);
  };

  const getRandomCountry = () => {
    const filteredCountries = countriesData.filter((country) => {
      return country.continent === continentChoice; // Use the updated continent choice here
    });

    if (filteredCountries.length > 0) {
      // Generate a random index based on the array length
      const randomIndex = Math.floor(Math.random() * filteredCountries.length);
      const randomCountry = filteredCountries[randomIndex].country;
      setCurrentCountry(randomCountry); // Set the selected country

      // Remove the selected country from countriesData using splice
      const countryIndexInOriginalArray = countriesData.findIndex(
        (country) => country.country === randomCountry
      );
      countriesData.splice(countryIndexInOriginalArray, 1);
    } else {
      console.error(
        "No countries found for the selected continent:",
        continentChoice
      );
    }
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

  const checkAnswer = () => {
    console.log(`user answer is ${userAnswer}`);
    if (userAnswer === currentCountry) {
      addToFilledCountries(userAnswer);
      resetRemainingGuesses();
      increaseScore();
      getRandomCountry();
    } else if (remainingGuesses > 1) {
      decreaseRemainingGuesses();
    } else {
      resetRemainingGuesses();
      addToRedFilledCountries(currentCountry);
      getRandomCountry();
    }
  };

  useEffect(() => {
    if (userAnswer) {
      // Ensure `userAnswer` is not empty before checking
      checkAnswer();
    }
  }, [userAnswer]); // Dependencies

  // Either increase or decrease score depending on boolean
  const increaseScore = () => {
    setUserScore((prevScore) => prevScore + 1);
  };

  useEffect(() => {
    if (userScore > highScore) {
      setHighScore(userScore);
    }
    localStorage.setItem("highScore", highScore.toString());
  }, [userScore, highScore]);

  useEffect(() => {
    const savedHighScore = localStorage.getItem("highScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  return (
    <div>
      <header className="flex gap-20 w-full p-2  px-5 header">
        <Logo />
      </header>

      <div className="flex justify-center gap-16 continent-buttons mb-10 mt-3">
        {continentButtons}
      </div>

      <GameMap />
      <ScoresBlock userScore={userScore} highScore={highScore} />

      <p
        data-test="current-country"
        className="text-3xl m-auto w-80 mb-4 mt-4 text-center"
      >
        {currentCountry}
      </p>
      <CountryFact fact={countryFact} />
      <p
        data-test="remaining-guesses"
        className="text-3xl m-auto w-80 mb-4 mt-4 text-center"
      >
        You have {remainingGuesses} guesses left!
      </p>
    </div>
  );
};

export default App;
