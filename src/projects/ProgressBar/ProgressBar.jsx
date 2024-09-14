import { useState, useRef } from "react";

function ProgressBar({ time }) {
  const [value, setValue] = useState(0);
  const timerRef = useRef(null);
  const countRef = useRef(0);
  const countRef2 = useRef(0);
  const [progCount, setProgCount] = useState([]);
  function addBar() {
    // const count = countRef.current;
    // let fl = 0;
    countRef2.current++;
    const newProgCount = [...progCount, 1];
    setProgCount(newProgCount);
    if (!timerRef.current) {
      let timer = setInterval(() => {
        countRef.current = countRef.current + 1;
        setValue((val) => countRef.current);
        console.log(countRef.current, countRef2.current);
        if (countRef.current >= countRef2.current * 100) {
          clearInterval(timer);
          timerRef.current = null;
          //   countRef2.current = 0;
          //   countRef.current = 0;
        }
        //   if (count == 0 || (count > 0 && !timerRef.current[count - 1])) {

        //     fl = 1;
        //   }
      }, time / 100);
      timerRef.current = timer;
    }

    // setTimeout(() => {
    //   console.log(count, "count");
    //   timerRef.current[count] = null;
    //   clearInterval(timer);
    // }, time);
    // timerRef.current = [...timerRef.current, timer];
    // countRef.current++;
  }

  function getProg() {
    return progCount.map((item, index) => {
      let val = Math.floor(value / 100);
      let progVal;
      if (index === val) progVal = value - 100 * index;
      if (index > val) progVal = 0;
      else if (index < val) progVal = 100;
      //   console.log(val, index, "bro");

      return (
        <div>
          <progress max={"100"} value={progVal} key={index} />
        </div>
      );
    });
  }
  return (
    <div>
      <button onClick={addBar}>Add+</button>
      {getProg()}
    </div>
  );
}

export default ProgressBar;
