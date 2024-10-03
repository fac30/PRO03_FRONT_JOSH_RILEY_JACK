// ScoreDisplay component takes two props: displayType and score
const ScoreDisplay = ({ displayType, score }) => {
  return (
    // Display the score in an h2 element with styling classes for font size and margin
    <h2 className="text-xl mb-2">
      {/* Conditional rendering: If displayType is "highScore", display "High", otherwise display "User" */}
      {displayType === "highScore" ? "High" : "User"} score: {score}
    </h2>
  );
};

export default ScoreDisplay; // Export the component for use in other parts of the app
