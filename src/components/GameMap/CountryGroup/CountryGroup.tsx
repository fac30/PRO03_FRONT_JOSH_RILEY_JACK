import { useContext } from "react";
import GameContext from "../../../context/GameContext";

const CountryGroup = ({ countryName, pathsArray }) => {
  // Import functions from GameContext
  const { userAnswerHandler, filledCountries } = useContext(GameContext);

  return (
    <g
      onClick={() => userAnswerHandler(countryName)}
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
