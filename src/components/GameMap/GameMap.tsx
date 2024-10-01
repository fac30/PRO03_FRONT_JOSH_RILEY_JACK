import countriesData from "../../data/game-countries.json"; // Adjust the path as necessary
import Country from "./Country/Country";
import CountryGroup from "./CountryGroup/CountryGroup";
import "./GameMap.css";

const GameMap = () => {
  console.log(Array.isArray(countriesData));

  return (
    <svg
      // id="wrapper-svg"
      className="game-map"
      baseProfile="tiny"
      fill="green"
      // height="100vh"
      stroke="white"
      // stroke-linecap="round"
      // stroke-linejoin="round"
      // stroke-width="0.5"
      version="1.2"
      viewBox="0 0 2000 857"
      width="95vw"
      xmlns="http://www.w3.org/2000/svg"
    >
      {countriesData.map((country, countryIndex) => {
        return (
          <CountryGroup
            key={countryIndex}
            countryName={country.countryName}
            pathsArray={country.paths}
          />
        );
      })}
    </svg>
  );
};

export default GameMap;
