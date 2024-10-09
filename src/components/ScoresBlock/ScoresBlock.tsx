import ScoreDisplay from "./ScoresDisplay/ScoreDisplay";

type ScoresBlockProps = {
  userScore: number;
  highScore: number;
};

const ScoresBlock = ({ userScore, highScore }: ScoresBlockProps) => {
  return (
    <div className="h-[210px] w-[200px] text-center float-right mr-[21px] relative bottom-[400px]">
      <ScoreDisplay
        data-test="high-score"
        displayType="highScore"
        score={highScore}
      />
      <ScoreDisplay
        data-test="user-score"
        score={userScore}
        displayType={"userScore"}
      />
    </div>
  );
};

export default ScoresBlock;
