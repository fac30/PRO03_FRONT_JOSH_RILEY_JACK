const ScoreDisplay = ({ displayType, score }) => {
  return (
    <h1 className="mb-8 ml-28">
      {displayType === "highScore" ? "High" : "User"} Score :{" "}
      <span className="text-2xl">{score}</span>
    </h1>
  );
};
export default ScoreDisplay;
