import countryPaths from "../../data/countries.json"; // Adjust the path as necessary

const GameMap: React.FC<{ country: string }> = ({ country }) => {
  const paths = countryPaths[country] || [];

  return (
    <svg width="200" height="200">
      {paths.map((path, index) => (
        <path key={index} d={path} fill="currentColor" />
      ))}
    </svg>
  );
};
export default GameMap;
