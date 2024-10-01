import { useState, useEffect } from "react";
import GameMap from "../GameMap/GameMap";
import "./App.css";

const App = () => {
  const [userScore, setUserScore] = useState<number>(0);
  const [currentCountry, setCurrentCountry] = useState<string>("");
  const [userChoice, setUserChoice] = useState<string>("");

  const userCountryHandler = (newCountry) => {
    setUserChoice(newCountry);
  };

  const currentCountryHandler = (newCountry) => {
    setCurrentCountry(newCountry);
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

  useEffect(() => {
    fetchNewCountry(); // Fetch the new country on component mount or on certain conditions
  }, []); // Add dependencies here if you want to refetch under certain conditions

  return (
    <div>
      <h1 className=" text-center  max-w-xl text-6xl  mb-11  mt-9  mx-auto">
        Map Tap Revenge
      </h1>
      <p className="text-3xl ml-28 mb-7">{currentCountry}</p>
      <p className="text-3xl ml-28 mb-7">{userChoice}</p>

      <GameMap userCountryHandler={userCountryHandler} />
    </div>
  );
};

export default App;
