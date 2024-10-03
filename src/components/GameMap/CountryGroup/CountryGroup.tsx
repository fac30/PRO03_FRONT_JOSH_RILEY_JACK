import { useContext } from "react";
import GameContext from "../../../context/GameContext";

const CountryGroup = ({ countryName, pathsArray }) => {
  // Import functions from GameContext
  const { filledCountries, setUserAnswer } = useContext(GameContext);

  return (
    <g
      onClick={() => {
        console.log("Setting user answer:", countryName);
        setUserAnswer(countryName);
      }}
      key={`${countryName}`}
      className={
        filledCountries.includes(countryName)
          ? `fill-yellow-400`
          : `fill-green-700 hover:fill-pink-300 cursor-pointer`
      }
      id={`${countryName}`}
    >
      {pathsArray.map((path: string, pathIndex: number) => {
        return (
          <path
            id={`${countryName} ${pathIndex}`}
            key={`${countryName} ${pathIndex}`}
            d={path}
          ></path>
        );
      })}
    </g>
  );
};

export default CountryGroup;
