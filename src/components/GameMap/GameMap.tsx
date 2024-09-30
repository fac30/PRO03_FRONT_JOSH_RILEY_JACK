import countryPaths from "../../data/countries.json"; // Adjust the path as necessary
import Country from "./Country/Country";

const GameMap = () => {
  return (
    <svg
      stroke="white"
      strokeWidth="1px"
      width="100vw"
      height="100vh"
      fill="green"
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
