function FinishedScrean({ totalPoints, points, highscore, despatch }) {
  let successrate = (points / totalPoints) * 100;

  return (
    <>
      <p className="result">
        You have scored, <strong>{points}</strong> out of {totalPoints} ({" "}
        <strong>{Math.abs(successrate)}</strong>)%
      </p>
      <p className="highscore">(Higher score : {points} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => despatch({ type: "reset" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishedScrean;
