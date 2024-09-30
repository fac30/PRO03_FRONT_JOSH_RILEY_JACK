import countryPaths from "../../data/countries.json"; // Adjust the path as necessary
import Country from "./Country/Country";
import "./GameMap.css";

const GameMap = () => {
  return (
    <svg
      // id="wrapper-svg"
      className="game-map"
      baseProfile="tiny"
      fill="green"
      // height="100vh"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="0.5"
      version="1.2"
      viewBox="0 0 2000 857"
      width="95vw"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Object.keys(countryPaths).map((country) => {
        return countryPaths[country].map((path, index) => {
          console.log(path);
          return (
            <Country
              key={`${country}-${index}`} // Ensure unique keys for each element
              path={path} // Pass each path from the array
            />
          );
        });
      })}
    </svg>
  );
};

export default GameMap;
