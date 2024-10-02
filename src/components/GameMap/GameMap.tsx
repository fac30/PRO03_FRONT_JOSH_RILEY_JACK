import { useState, useEffect, useRef } from "react";
import panzoom from "panzoom";
import countriesData from "../../data/game-countries.json"; // Adjust the path as necessary
import CountryGroup from "./CountryGroup/CountryGroup";

const GameMap = ({ userAnswerHandler }) => {
  const [clickedCountries, setClickedCountries] = useState([]);

  const clickedCountriesHandler = (countryName) => {
    setClickedCountries((prevCountries) => [...prevCountries, countryName]);
  };

  const canvasRef = useRef(null);
  const panzoomRef = useRef(null); // Create a ref to hold the panzoom instance

  useEffect(() => {
    const canvas = panzoom(canvasRef.current, {
      autocenter: true,
      maxZoom: 10,
      minZoom: 0.9,
      initialX: 1000,
      initialY: 300,
      bounds: true,
      boundsPadding: 0.1,
    });

    panzoomRef.current = canvas;

    return () => {
      canvas.dispose();
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className=" rounded-lg cursor-grab active:cursor-grabbing w-9/12 bg-white overflow-hidden shadow-2xl m-auto">
      <svg
        // id="wrapper-svg"
        ref={canvasRef}
        className="game-map mx-auto"
        baseProfile="tiny"
        fill="green"
        // height="100vh"
        stroke="white"
        // stroke-linecap="round"
        // stroke-linejoin="round"
        // stroke-width="0.5"
        version="1.2"
        viewBox="0 0 2000 857"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {countriesData.map((country, countryIndex) => {
            return (
              <CountryGroup
                userAnswerHandler={userAnswerHandler}
                key={countryIndex}
                index={countryIndex}
                countryName={country.countryName}
                pathsArray={country.paths}
                clickedCountriesHandler={clickedCountriesHandler}
                clickedCountries={clickedCountries}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default GameMap;
