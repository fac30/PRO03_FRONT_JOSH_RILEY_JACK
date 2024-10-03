import { useEffect, useRef } from "react";
import panzoom from "panzoom";
import countriesData from "../../data/game-countries.json"; // Adjust the path as necessary
import CountryGroup from "./CountryGroup/CountryGroup";

const GameMap = () => {
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
    <div className=" rounded-lg cursor-grab active:cursor-grabbing w-9/12 bg-white overflow-hidden shadow-lg mt-6 mb-8 m-auto">
      <svg
        ref={canvasRef}
        baseProfile="tiny"
        fill="green"
        stroke="white"
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
                key={countryIndex}
                index={countryIndex}
                countryName={country.countryName}
                pathsArray={country.paths}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default GameMap;
