const ScoreDisplay = ({ displayType, score }) => {
  return (
    <h2 className="text-2xl mb-2">
      {displayType === "highScore" ? "High" : "User"} score is {score}
    </h2>
  );
};
export default ScoreDisplay;
