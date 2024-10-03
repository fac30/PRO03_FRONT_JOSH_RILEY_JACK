import ScoreDisplay from "./ScoresDisplay/ScoreDisplay";

const ScoresBlock = ({ userScore, highScore }) => {
  return (
    <div className=" h-[210px] w-[200px] text-center float-right mr-[21px] relative bottom-[400px]">
      <ScoreDisplay displayType="highScore" score={highScore} />
      <ScoreDisplay score={userScore} />
    </div>
  );
};
export default ScoresBlock;
