import { useEffect } from "react";

function Timer({ despatch, numberOfremainingSec }) {
  let minites = Math.floor(numberOfremainingSec / 60);
  let seconds = Math.floor(numberOfremainingSec % 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      despatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [despatch]);
  return (
    <div className="timer">
      {minites} : {seconds}
    </div>
  );
}

export default Timer;
