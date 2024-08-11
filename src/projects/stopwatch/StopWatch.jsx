import { useEffect, useRef, useState } from "react";

function StopWatch() {
  const timerRef = useRef();
  const [timeStart, setTimeStart] = useState(null);
  const [timeNow, setTimeNow] = useState(null);
  const [prev, setPrev] = useState(0);
  function startTimer() {
    setTimeStart(Date.now() - prev);
    setTimeNow(Date.now());
    timerRef.current = setInterval(() => {
      //   console.log(timeStart, "timeStart", Date.now());
      setTimeNow(Date.now());
    }, 10);
  }
  function stopTimer() {
    clearInterval(timerRef.current);
    setTimeNow(0);
    setTimeStart(0);
    setPrev(0);
  }
  function pauseTimer() {
    clearInterval(timerRef.current);
    setPrev(timeNow - timeStart);
  }
  useEffect(() => {}, []);
  let seconds = 0;
  //   let mins = timeNow != 0 ? (seconds / 60).toFixed(3) : 0;
  if (timeStart !== null) {
    seconds = ((timeNow - timeStart) / 1000).toFixed(3);
  }
  return (
    <div>
      {/* <div>
        Time- {mins}:{seconds}:{time}
      </div> */}
      <div>Time: {seconds}</div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={pauseTimer}>Pause</button>
    </div>
  );
}

export default StopWatch;
