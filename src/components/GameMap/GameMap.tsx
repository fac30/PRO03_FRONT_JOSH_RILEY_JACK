import countriesData from "../../data/game-countries.json"; // Adjust the path as necessary
import Country from "./Country/Country";
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
          <g
            key={`${country.countryName}`}
            className="country-group"
            id={`${country.countryName}`}
          >
            {country.paths.map((path, pathIndex) => (
              <Country
                key={`${countryIndex}-${pathIndex}`} // Ensure unique keys
                path={path} // Pass the path to the Country component
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

export default GameMap;
