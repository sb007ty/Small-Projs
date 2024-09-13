import { useState, useRef } from "react";

function Prac2() {
  const [count, setCount] = useState([]);
  const ref = useRef(0);

  console.log("count*", count, ref.current);
  return (
    <div
      style={{ width: "100px", height: "100px", backgroundColor: "red" }}
      onClick={(e) => {
        // setCount([1, 2]);
        // count.push(1);
        ref.current++;
        console.log("object");
        setCount([...count, 2]);
      }}
    >
      {count}
    </div>
  );
}

export default Prac2;
