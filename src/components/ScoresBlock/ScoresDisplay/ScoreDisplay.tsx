const ScoreDisplay = ({ displayType, score }) => {
  return (
    <h2 className="text-xl mb-2">
      {displayType === "highScore" ? "High" : "User"} score: {score}
    </h2>
  );
};
export default ScoreDisplay;
