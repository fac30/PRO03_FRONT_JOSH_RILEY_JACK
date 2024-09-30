const Map = ({ country, paths }) => {
  return (
    <g key={country} className="country-group">
      <title>{country}</title> {/* Optional: Title for accessibility */}
      {paths.map((path, index) => (
        <path
          key={index}
          className="new-country"
          stroke="white"
          fill="green"
          d={path}
          strokeWidth="1"
        />
      ))}
    </g>
  );
};

export default Map;
