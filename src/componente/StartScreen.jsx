function StartScreen({ noOfQuestions, despatch }) {
  return (
    <div className="start">
      <h2 className="h2">Welcome to The React Quize!</h2>
      <h3>{noOfQuestions} questions to test your React Mastery...</h3>
      <button className="btn" onClick={despatch}>
        let's start!
      </button>
    </div>
  );
}

export default StartScreen;
