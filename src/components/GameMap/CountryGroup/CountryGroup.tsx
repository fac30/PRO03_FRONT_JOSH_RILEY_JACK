import { useState, useRef, useEffect } from "react";
import panzoom from "panzoom";
import "./CountryGroup.css";

const CountryGroup = ({
  countryName,
  pathsArray,
  userCountryHandler,
  clickedCountriesHandler,
  clickedCountries,
  submitUserChoice,
}) => {
  const handleClick = () => {
    userCountryHandler(countryName);
    clickedCountriesHandler(countryName);
    submitUserChoice(countryName); // Initial fetch on component mount
  };

  return (
    <g
      onClick={handleClick}
      key={`${countryName}`}
      className={
        clickedCountries.includes(countryName)
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
