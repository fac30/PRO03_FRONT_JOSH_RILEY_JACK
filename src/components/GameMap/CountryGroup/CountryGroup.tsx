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

  const canvasRef = useRef(null);
  const panzoomRef = useRef(null); // Create a ref to hold the panzoom instance

  useEffect(() => {
    const canvas = panzoom(canvasRef.current, {
      autocenter: true,
      maxZoom: 3,
      minZoom: 0.15,
      initialX: 7000,
      initialY: 0,
    });

    panzoomRef.current = canvas;

    return () => {
      canvas.dispose();
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <g
      ref={canvasRef}
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
