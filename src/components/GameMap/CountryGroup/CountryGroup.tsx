import useGameContext from "../../../CustomHooks/useGameContext";

interface CountryGroupProps {
  "data-test": string;
  key: number;
  index: number;
  countryName: string;
  pathsArray: string[];
}

const CountryGroup = ({ countryName, pathsArray }: CountryGroupProps) => {
  // Import functions from GameContext
  const { filledCountries, setUserAnswer, redFilledCountries } =
    useGameContext();

  return (
    <g
      data-test={countryName}
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
          ? `fill-yellow-400`
          : redFilledCountries.includes(countryName)
          ? `fill-red-500`
          : `fill-green-700 hover:fill-green-500 cursor-pointer`
      }
      id={`${countryName}`} // Set the ID for each country
    >
      {/* Map over the array of path data to render individual path elements for the country's shape */}
      {pathsArray.map((path: string, pathIndex: number) => {
        return (
          <path
            id={`${countryName} ${pathIndex}`} // Unique ID for each path based on country and path index
            key={`${countryName} ${pathIndex}`} // Unique key for React's reconciliation process
            data-test={`${countryName} ${pathIndex}`}
            d={path} // Set the "d" attribute of the path (defining the shape of the country)
          ></path>
        );
      })}
    </g>
  );
};

export default CountryGroup; // Export the component for use elsewhere
