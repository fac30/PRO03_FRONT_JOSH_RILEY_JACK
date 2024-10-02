import { useState, useEffect } from "react";
import GameMap from "../GameMap/GameMap";
import "./App.css";
import ScoresBlock from "../ScoresBlock/ScoresBlock";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import CountryFact from "../CountryFact/CountryFact";

const App = () => {
  const [userScore, setUserScore] = useState<number>(0);
  const [currentCountry, setCurrentCountry] = useState<string>("");
  const [userChoice, setUserChoice] = useState<string>("");
  const [continentChoice, setContinentChoice] = useState<string>("");
  const [randomFact, setRandomFact] = useState<string>("");
  const [highScore, setHighScore] = useState<number>(10);
  const [continents, setContinents] = useState<string[]>([]); // State to hold continents

  // Hard-coded country fact variable
  const fact =
    "This country is home to the world's longest fence, known as the Dingo Fence. Originally built to keep dingoes away from fertile land";

  const userCountryHandler = (newCountry: string) => {
    setUserChoice(newCountry);
  };

  const currentCountryHandler = (newCountry: string) => {
    setCurrentCountry(newCountry);
  };

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

  const userScoreHandler = (isCorrect: boolean) => {
    setUserScore((prevScore) => {
      const newScore = isCorrect ? prevScore + 1 : prevScore - 1; // Calculate new score
      console.log(newScore); // Log the new score here
      return newScore; // Return the new score to update the state
    });
  };

  // Fetch the continents from the backend when the component mounts
  const fetchContinents = async () => {
    try {
      const response = await fetch("http://localhost:3000/continents");
      const data: string[] = await response.json();
      setContinents(data); // Set the continents into state (currently unused)
    } catch (error) {
      console.error("Error fetching continents:", error);
    }
  };

  const fetchNewCountry = async (continent: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/question?continent=${continent}`
      ); // Fetch based on selected continent
      const data = await response.json();
      console.log(data);
      setCurrentCountry(data.currentCountry); // Assuming the API returns a "country" field
    } catch (error) {
      console.error("Error fetching new country:", error);
    }
  };

  const submitUserChoice = async (countryClicked: string) => {
    try {
      const response = await fetch("http://localhost:3000/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({ answer: countryClicked }), // Send as {"answer": "userChoice"}
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from server:", data);
      userScoreHandler(data.isCorrect);
      if (data.isCorrect) {
        console.log("correct!!!");
        fetchNewCountry();
      } else {
        console.log("wrong!!");
        fetchNewCountry();
      }
    } catch (error) {
      console.error("Error submitting user choice:", error);
    }
  };

  useEffect(() => {
    fetchNewCountry(""); // Optional: fetch an initial country or based on continent
  }, []);

  // Keep the continents fetch logic in place
  useEffect(() => {
    fetchContinents();
  }, []);

  return (
    <div>
      <header className="flex gap-20 w-full p-5 header">
        <Logo />
      </header>
      <div className="flex justify-center items-center gap-7 continent-buttons">
        {continentButtons}
      </div>
      <div className="flex justify-center flex-row items-center mt-2">
        <ScoresBlock userScore={userScore} highScore={highScore} />
      </div>
      <p className="text-3xl ml-28 mb-7">{currentCountry}</p>
      <p className="text-3xl ml-28 mb-7">{userChoice}</p>
      <GameMap
        userCountryHandler={userCountryHandler}
        submitUserChoice={submitUserChoice}
      />
      <CountryFact fact={fact} /> {/* Pass the hard-coded fact as a prop */}
    </div>
  );
};

export default App;
