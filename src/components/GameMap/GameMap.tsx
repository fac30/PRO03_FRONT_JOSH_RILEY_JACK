import { useEffect, useRef } from "react";
import panzoom from "panzoom";
import countriesData from "../../data/game-countries.json"; // Adjust the path as necessary
import CountryGroup from "./CountryGroup/CountryGroup";

const GameMap = () => {
  const canvasRef = useRef(null);
  const panzoomRef = useRef(null); // Create a ref to hold the panzoom instance

  useEffect(() => {
    // Initialize the panzoom functionality on the SVG canvas
    const canvas = panzoom(canvasRef.current, {
      autocenter: true, // Automatically center the SVG
      maxZoom: 10, // Set maximum zoom level
      minZoom: 0.9, // Set minimum zoom level
      initialX: 1000, // Initial x-offset for centering the view
      initialY: 300, // Initial y-offset for centering the view
      bounds: true, // Restrict the zoom/panning within the canvas bounds
      boundsPadding: 0.1, // Padding to ensure panning stops near the edges
    });

    // Store the panzoom instance in a ref to access it later if needed
    panzoomRef.current = canvas;

    // Cleanup function when the component unmounts or dependencies change
    return () => {
      canvas.dispose(); // Dispose the panzoom instance to free up resources
      document.body.style.overflow = "auto"; // Reset body overflow to default
    };
  }, []); //

  return (
    <div className="rounded-lg cursor-grab active:cursor-grabbing w-9/12 bg-white overflow-hidden shadow-lg mt-6 mb-8 m-auto">
      {/* SVG canvas with panzoom functionality */}
      <svg
        ref={canvasRef} // Reference to the SVG element for panzoom
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
          {/* Render each country using the CountryGroup component */}
          {countriesData.map((country, countryIndex) => {
            return (
              <CountryGroup
                data-test={`country-${country.countryName}`}
                key={countryIndex} // Unique key for each country
                index={countryIndex}
                countryName={country.countryName} // Country name prop
                pathsArray={country.paths} // Array of paths for each country
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default GameMap;
