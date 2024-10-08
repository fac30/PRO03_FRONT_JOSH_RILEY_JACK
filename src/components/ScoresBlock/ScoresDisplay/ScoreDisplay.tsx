type ScoreDisplayProps = {
  displayType: "highScore" | "userScore";
  score: number;
  "data-test"?: string;
};

const ScoreDisplay = ({
  displayType,
  score,
  "data-test": dataTest,
}: ScoreDisplayProps) => {
  return (
    <h2 className="text-xl mb-2" data-test={dataTest}>
      {displayType === "highScore" ? "High" : "User"} score: {score}
    </h2>
  );
};

export default ScoreDisplay;
