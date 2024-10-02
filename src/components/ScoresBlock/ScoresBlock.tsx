import ScoreDisplay from "./ScoresDisplay/ScoreDisplay";

const ScoresBlock = ({ userScore, highScore }) => {
  return (
    <div className="ml-9 w-9">
      <ScoreDisplay displayType="highScore" score={highScore} />
      <ScoreDisplay score={userScore} />
    </div>
  );
};
export default ScoresBlock;
