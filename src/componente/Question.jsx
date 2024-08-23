import Footer from "./Footer";
import Options from "./Options";
import Timer from "./Timer";

function Question({ question, despatch, newAnswer, numberOfremainingSec }) {
  console.log(`Question is ${JSON.stringify(question)}`);

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        <Options
          question={question}
          despatch={despatch}
          newAnswer={newAnswer}
        />
      </div>
      <div>
        {newAnswer != null && (
          <Footer>
            <button
              className="btn btn-ui"
              onClick={() => despatch({ type: "Next" })}
            >
              Next
            </button>
            <Timer
              despatch={despatch}
              numberOfremainingSec={numberOfremainingSec}
            />
          </Footer>
        )}
      </div>
    </div>
  );
}

export default Question;
