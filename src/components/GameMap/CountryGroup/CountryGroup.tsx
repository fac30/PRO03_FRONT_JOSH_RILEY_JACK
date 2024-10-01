import Country from "../Country/Country";
import "./CountryGroup.css";

const CountryGroup = ({ countryName, pathsArray }) => {
  return (
    <g key={`${countryName}`} className="country-group" id={`${countryName}`}>
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
