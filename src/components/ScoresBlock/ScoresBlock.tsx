import ScoreDisplay from "./ScoresDisplay/ScoreDisplay";

const ScoresBlock = ({ userScore, highScore }) => {
  return (
    <div>
      <ScoreDisplay displayType="highScore" score={highScore} />
      <ScoreDisplay score={userScore} />
    </div>
  );
};
export default ScoresBlock;
