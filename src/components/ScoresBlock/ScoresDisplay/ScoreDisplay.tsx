// ScoreDisplay component takes three props: displayType, score, and data-test
const ScoreDisplay = ({ displayType, score, "data-test": dataTest }) => {
  return (
    <h2 className="text-xl mb-2" data-test={dataTest}>
      {displayType === "highScore" ? "High" : "User"} score: {score}
    </h2>
  );
};

export default ScoreDisplay; // Export the component for use in other parts of the app
