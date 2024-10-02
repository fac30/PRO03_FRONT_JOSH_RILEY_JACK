// Import React hooks and the panzoom library
import { useState, useRef, useEffect } from "react";
import panzoom from "panzoom"; // Optional: If you plan to zoom/pan the map in another part of the app
import "./CountryGroup.css"; // Import custom styles for the CountryGroup component

// Define the CountryGroup functional component, which represents a group of country paths on an SVG map
// It accepts several props for handling country interactions and styling
const CountryGroup = ({
  countryName, // The name of the country
  pathsArray, // Array of SVG path data for rendering the country shapes
  userCountryHandler, // Function to handle when the user selects a country
  clickedCountriesHandler, // Function to handle storing clicked countries
  clickedCountries, // Array of countries that have already been clicked
  submitUserChoice, // Function to submit the user's selected country
}) => {
  
  // Function to handle what happens when a country is clicked
  const handleClick = () => {
    // Call the userCountryHandler to set the selected country
    userCountryHandler(countryName);
    
    // Update the clickedCountries array with the clicked country
    clickedCountriesHandler(countryName);

    // Submit the user's country choice, possibly triggering further actions like data fetch
    submitUserChoice(countryName); // Example: Trigger fetch on country selection
  };

  return (
    // <g> is an SVG group element that can contain multiple paths (shapes of the country)
    // onClick triggers the handleClick function when this country group is clicked
    <g
      onClick={handleClick}
      key={`${countryName}`}
      className={
        // Conditional class: If the country is in the clickedCountries array, it is highlighted in yellow
        // Otherwise, it has a default green color and changes to pink on hover
        clickedCountries.includes(countryName)
          ? `fill-yellow-400`
          : `fill-green-700 hover:fill-pink-300 cursor-pointer`
      }
      id={`${countryName}`} // Set the group element's ID to the country name
    >
      {/* Loop through the array of paths (country shapes) and render each one */}
      {pathsArray.map((path: string, pathIndex: number) => {
        return (
          // Render each individual path (a part of the country) with a unique key and path data
          <path
            id={`${countryName} ${pathIndex}`} // Set a unique ID for each path
            key={`${countryName} ${pathIndex}`} // Key for React rendering
            d={path} // The SVG path data that defines the country's shape
          ></path>
        );
      })}
    </g>
  );
};

// Export the CountryGroup component to make it available for use in other files
export default CountryGroup;
