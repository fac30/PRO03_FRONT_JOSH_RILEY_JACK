import { useState, useRef, useEffect } from "react";
import panzoom from "panzoom";
import "./CountryGroup.css";

const CountryGroup = ({
  countryName,
  pathsArray,
  currentCountryHandler,
  clickedCountriesHandler,
  clickedCountries,
}) => {
  const handleClick = () => {
    currentCountryHandler(countryName);
    clickedCountriesHandler(countryName);
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
