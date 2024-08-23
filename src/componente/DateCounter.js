import { useReducer, useState } from "react";

function reducer(state, action) {
  console.log(JSON.stringify(action));
  switch (action.type) {
    case "inc":
      return {
        ...state,
        count: state.step > 1 ? state.step + state.count : state.count + 1,
      };
    case "dec":
      return {
        ...state,
        count: state.step > 1 ? state.count - state.step : state.count - 1,
      };
    case "defaultValue":
      return { ...state, count: action.payload.count };
    case "step":
      return { ...state, step: action.payload.step };
    case "reset":
      return { count: 0, step: 0 };
    default:
      return new Error("Unkonwn type");
  }
}

function DateCounter() {
  let initialState = { count: 0, step: 0 };
  const [state, despatch] = useReducer(reducer, initialState);

  //const [step, stepDespatch] = useReducer(reducer, 1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    // setCount((count) => count - 1);
    //setCount((count) => count - step);
    despatch({ type: "dec" });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    //setCount((count) => count + step);
    despatch({ type: "inc" });
  };

  const defineCount = function (e) {
    console.log(`defineCount ${e.target.value}`);
    //setCount(Number(e.target.value));
    despatch({
      type: "defaultValue",
      payload: { count: Number(e.target.value) },
    });
  };

  const defineStep = function (e) {
    //stepDespatch({ type: "step", payload: Number(e.target.value) });
    despatch({
      type: "step",
      payload: { step: Number(e.target.value) },
    });
  };

  const reset = function () {
    despatch({ type: "reset" });
    //stepDespatch({ type: "step", value: 1 });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
