const ScoreDisplay = ({ displayType, score }) => {
  return (
    <h1 className="mb-8 ml-28">
      I am a {displayType === "highScore" ? "high" : "user"} score display. The
      score is <span className="text-2xl">{score}</span>
    </h1>
  );
};
export default ScoreDisplay;
