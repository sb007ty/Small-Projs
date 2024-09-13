import React, { useState, useRef, useCallback, useEffect, memo } from "react";

const useThrottle = (fun, delay) => {
  let ref = useRef(null);
  useEffect(() => {
    ref.current = null;
  }, [delay]);
  console.log("yo");
  const finalFun = useCallback(
    (...args) => {
      if (!ref.current) {
        ref.current = setTimeout(() => {
          ref.current = null;
        }, delay * 1000);
        return fun(...args);
      }
    },
    [delay]
  );

  return finalFun;
};

export default function App() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(5);
  const [delayFin, setDelayFin] = useState(5);

  const throttleFun = useThrottle(() => console.log("bro"), delayFin);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <input
        type="text"
        value={delay}
        onChange={(e) => setDelay(+e.target.value)}
      />
      <button onClick={() => setDelayFin(delay)}>delay</button>
      <button onClick={throttleFun}>CLICK</button>
      <Test throttleFun={throttleFun} />
    </div>
  );
}
const Test = memo(function DiffTest({ throttleFun }) {
  console.log("rerender");
  return <div>hello</div>;
});
