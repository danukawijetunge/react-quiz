import "../index.css";
import Main from "../componente/Main";
import Header from "../componente/Header";
import { useEffect, useReducer } from "react";
import Loader from "../componente/Loader";
import Error from "../componente/Error";
import StartScreen from "../componente/StartScreen";
import Question from "../componente/Question";
import Result from "./Result";
import Progress from "./Progress";
import FinishedScrean from "./FinishedScrean";

function App() {
  const initialState = {
    questions: [],
    // loading, error, ready, active,finished
    status: "loading",
    index: 0,
    newAnswer: null,
    points: 0,
    highscore: 0,
    numberOfremainingSec: 400,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" };
      case "datafailed":
        return { ...state, status: "error" };
      case "start":
        return { ...state, status: "active" };
      case "newAnswer":
        const question = state.questions[state.index];

        return {
          ...state,
          newAnswer: action.payload,
          points:
            question.correctOption === action.payload
              ? question.points + state.points
              : state.points,
        };

      case "Next":
        return state.questions.length != state.index + 1
          ? { ...state, index: state.index + 1, newAnswer: null }
          : {
              ...state,
              status: "finished",
              highscore:
                state.points > state.highscore ? state.points : state.highscore,
            };
      case "reset":
        return {
          ...state,
          status: "ready",
          index: 0,
          newAnswer: null,
          points: 0,
        };

      case "tick":
        return {
          ...state,
          numberOfremainingSec: state.numberOfremainingSec - 1,
          status: state.numberOfremainingSec === 0 ? "finished" : state.status,
        };
      default:
        throw new Error(`Unknown action type ${action.type}`);
    }
  }

  console.log("Rendering App");
  const [
    {
      questions,
      status,
      index,
      newAnswer,
      points,
      highscore,
      numberOfremainingSec,
    },
    despatch,
  ] = useReducer(reducer, initialState);

  let numberOfQuestions = questions.length;
  let totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    console.log("Initial rendering");
    async function fetchQuestions() {
      try {
        let response = await fetch("http://localhost:3001/questions");
        let data = await response.json();

        despatch({ type: "dataReceived", payload: data });

        console.log(JSON.stringify(data));
      } catch (error) {
        console.error(
          `Something went wrong when trying to fetch question from the api ${error.message}`
        );
        despatch({ type: "datafailed", payload: error.message });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header totalPoints={totalPoints} points={points} />
      <Main>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen
            noOfQuestions={numberOfQuestions}
            despatch={() => despatch({ type: "start" })}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              noOfQuestions={numberOfQuestions}
              totalPoints={totalPoints}
              points={points}
            />
            <Question
              question={questions[index]}
              despatch={despatch}
              newAnswer={newAnswer}
              numberOfremainingSec={numberOfremainingSec}
            />
          </>
        )}
        {status === "finished" && (
          <FinishedScrean
            totalPoints={totalPoints}
            points={points}
            highscore={highscore}
            despatch={despatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
