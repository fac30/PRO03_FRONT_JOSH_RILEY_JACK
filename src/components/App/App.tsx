import { useState, useEffect } from "react";
import GameMap from "../GameMap/GameMap";
import "./App.css";
import ScoresBlock from "../ScoresBlock/ScoresBlock";

const App = () => {
  const [userScore, setUserScore] = useState<number>(0);
  const [currentCountry, setCurrentCountry] = useState<string>("");
  const [userChoice, setUserChoice] = useState<string>("");
  const [highScore, setHighScore] = useState<number>(10);
  const userCountryHandler = (newCountry) => {
    setUserChoice(newCountry);
    // console.log(userChoice);
  };

  const currentCountryHandler = (newCountry) => {
    setCurrentCountry(newCountry);
  };

  const userScoreHandler = (boolean) => {
    setUserScore((prevScore) => {
      const newScore = boolean ? prevScore + 1 : prevScore - 1; // Calculate new score
      console.log(newScore); // Log the new score here
      return newScore; // Return the new score to update the state
    });
  };

  const fetchNewCountry = async () => {
    try {
      const response = await fetch("http://localhost:3000/question"); // Replace with your actual API endpoint
      const data = await response.json();
      console.log(data);
      setCurrentCountry(data.currentCountry); // Assuming the API returns a "country" field
    } catch (error) {
      console.error("Error fetching new country:", error);
    }
  };

  const submitUserChoice = async (countryClicked) => {
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
      // Handle the response data as needed
    } catch (error) {
      console.error("Error submitting user choice:", error);
    }
  };

  useEffect(() => {
    fetchNewCountry(); // Fetch the new country on component mount or on certain conditions
  }, []); // Add dependencies here if you want to refetch under certain conditions

  return (
    <div>
      <h1 className=" text-center  max-w-xl text-6xl  mb-11  mt-9  mx-auto">
        Map Tap Revenge
      </h1>
      <ScoresBlock userScore={userScore} highScore={highScore} />

      <p className="text-3xl ml-28 mb-7">{currentCountry}</p>
      <p className="text-3xl ml-28 mb-7">{userChoice}</p>

      <GameMap
        userCountryHandler={userCountryHandler}
        submitUserChoice={submitUserChoice}
      />
    </div>
  );
};

export default App;
