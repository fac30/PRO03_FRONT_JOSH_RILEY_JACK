const ScoreDisplay = ({ displayType, score }) => {
  return (
    <h1>
      I am a {displayType === "highScore" ? "high" : "user"} score display. The
      score is {score}
    </h1>
  );
};
export default ScoreDisplay;
