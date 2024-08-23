function Progress({ index, noOfQuestions, totalPoints, points }) {
  return (
    <header className="progress">
      <progress max={noOfQuestions} value={index} />
      <p>
        Questions <strong>{index + 1}</strong>/ <strong>{noOfQuestions}</strong>
      </p>
      <p>
        Points <strong>{points}</strong>/ <strong>{totalPoints}</strong>
      </p>
    </header>
  );
}

export default Progress;
