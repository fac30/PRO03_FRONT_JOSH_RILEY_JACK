import ScoreDisplay from "./ScoresDisplay/ScoreDisplay";

const ScoresBlock = ({ userScore, highScore }) => {
  return (
    <div className=" absolute right-20 w-1/8 bottom-16 p-7 rounded-lg shadow-lg bg-white">
      <ScoreDisplay displayType="highScore" score={highScore} />
      <ScoreDisplay score={userScore} />
    </div>
  );
};
export default ScoresBlock;
