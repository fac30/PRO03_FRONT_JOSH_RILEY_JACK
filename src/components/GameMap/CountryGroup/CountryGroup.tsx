import { useContext } from "react";
import GameContext from "../../../context/GameContext";

const CountryGroup = ({ countryName, pathsArray }) => {
  // Importing necessary values and functions from GameContext
  // filledCountries: An array of countries already selected or filled
  // setUserAnswer: A function to set the user's answer when a country is clicked
  const { filledCountries, setUserAnswer } = useContext(GameContext);

  return (
    <g
      // When the user clicks on a country, log the selected country and set it as the user's answer
      onClick={() => {
        console.log("Setting user answer:", countryName);
        setUserAnswer(countryName); // Update the user's selected answer
      }}
      key={`${countryName}`} // Unique key for the group element based on country name
      // Dynamically set the class based on whether the country has already been filled
      // If the country is filled, it gets a yellow fill, otherwise it’s green and changes to pink on hover
      className={
        filledCountries.includes(countryName)
          ? `fill-yellow-400` // Country already selected
          : `fill-green-700 hover:fill-pink-300 cursor-pointer` // Default state with hover effect
      }
      id={`${countryName}`} // Set the ID for each country
    >
      {/* Map over the array of path data to render individual path elements for the country's shape */}
      {pathsArray.map((path: string, pathIndex: number) => {
        return (
          <path
            id={`${countryName} ${pathIndex}`} // Unique ID for each path based on country and path index
            key={`${countryName} ${pathIndex}`} // Unique key for React's reconciliation process
            d={path} // Set the "d" attribute of the path (defining the shape of the country)
          ></path>
        );
      })}
    </g>
  );
};

export default CountryGroup; // Export the component for use elsewhere
