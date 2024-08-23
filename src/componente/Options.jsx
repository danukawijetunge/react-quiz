function Options({ question, despatch, newAnswer }) {
  console.log(`new Anstwer is ${newAnswer}`);
  let answered = newAnswer != null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          value={index}
          key={option}
          className={`btn btn-option ${index === newAnswer ? "answer" : ""} ${
            answered
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={(e) =>
            despatch({ type: "newAnswer", payload: Number(e.target.value) })
          }
          disabled={answered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
