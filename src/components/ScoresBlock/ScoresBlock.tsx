import ScoreDisplay from "./ScoresDisplay/ScoreDisplay";

function ScoresBlock({ userScore, highScore }) {
  return (
    <div>
      <ScoreDisplay displayType="highScore" score={highScore} />
      <ScoreDisplay score={userScore} displayType={undefined} />

    </div>
  );
}
export default ScoresBlock