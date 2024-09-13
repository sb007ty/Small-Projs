import { useState, useRef, useEffect } from "react";

const Game = ({ total }) => {
  const [colors, setColors] = useState({});
  const [styleArr, setStyleArr] = useState([]);
  const colorsChecker = useRef();
  const prevRef = useRef(null);
  const countRef = useRef(0);
  const [tries, setTries] = useState(0);
  const [restart, setRestart] = useState(true);
  console.log(countRef.current, "INITIALCO*");
  const getColorCheckerObj = () => {
    let s = new Set();
    while (s.size < 6) {
      const color = generateRandomColor();
      if (color === "rgb(FF,FF,FF)") continue;
      s.add(color);
      console.log(s.size, "hello", color);
    }
    let colorObj = {};
    for (let color of s) {
      let randomId1 = generateRandomId();
      while (colorObj[randomId1]) {
        randomId1 = generateRandomId();
      }
      colorObj[randomId1] = color;
      let randomId2 = generateRandomId();
      while (colorObj[randomId2]) {
        randomId2 = generateRandomId();
      }
      colorObj[randomId2] = color;
      console.log(randomId1, randomId2, " random");
    }
    console.log(colorObj, " colorObj");
    return colorObj;
  };

  useEffect(() => {
    if (restart) {
      colorsChecker.current = getColorCheckerObj();
      const newStyleArr = new Array(10).fill(0).map((_) => {});
      setStyleArr(newStyleArr);
      setRestart(false);
    }
  }, [restart]);

  console.log("yo");
  const rows = total / 4;
  const parentBoxStyle = {
    display: "grid",
    padding: "7px",
    gridTemplateRows: `repeat(${rows},1fr)`,
    gridTemplateColumns: "repeat(4,1fr)",
  };
  const childBoxStyle = {
    border: "2px solid black",
    marginRight: "-2px",
    marginBottom: "-2px",
    minHeight: "100px",
    minWidth: "100px",
  };
  function generateRandomColor() {
    let r = Math.floor(Math.random() * 256).toString();
    let g = Math.floor(Math.random() * 256).toString();
    let b = Math.floor(Math.random() * 256).toString();
    let rgb = r + "," + g + "," + b;
    return `rgb(${rgb})`;
  }
  function generateRandomId() {
    return Math.floor(Math.random() * total);
  }

  function clickChild(e) {
    const divId = e.target.dataset.id;
    setTries((tries) => tries + 1);
    if (
      styleArr[divId] &&
      Object.keys(styleArr[divId]).length &&
      styleArr[divId]["backgroundColor"] === colorsChecker.current[divId]
    )
      return;
    countRef.current++;
    console.log(countRef.current, "COUNT****");

    if (countRef.current % 2 == 0) {
      if (prevRef.current) {
        if (
          colorsChecker.current[divId] !==
          colorsChecker.current[prevRef.current]
        ) {
          let revertStyleArr = [...styleArr];
          setTimeout(() => {
            revertStyleArr[divId] = { backgroundColor: "white" };
            revertStyleArr[prevRef.current] = { backgroundColor: "white" };
            setStyleArr(revertStyleArr);
          }, 400);
          let newStyleArr = [...styleArr];
          newStyleArr[divId] = {
            backgroundColor: colorsChecker.current[divId.toString()],
          };
          setStyleArr(newStyleArr);
          return;
        }
      }
    }
    prevRef.current = divId;
    let newStyleArr = [...styleArr];
    newStyleArr[divId] = {
      backgroundColor: colorsChecker.current[divId.toString()],
    };
    setStyleArr(newStyleArr);
  }
  function getChildBoxes() {
    const childBoxes = new Array(total).fill(0).map((item, index) => {
      return (
        <div
          data-id={index}
          style={{ ...childBoxStyle, ...styleArr[index] }}
          onClick={clickChild}
          key={index}
        ></div>
      );
    });
    console.log(childBoxes);
    return childBoxes;
  }
  const allDivFilled = styleArr.every((item) => {
    if (item && Object.keys(item).length > 0 && item.backgroundColor != "white")
      return true;
    return false;
  });
  return (
    <div>
      {!allDivFilled && <div style={parentBoxStyle}>{getChildBoxes()}</div>}
      {allDivFilled && (
        <>
          <p>You won in {tries}</p>
          <button
            onClick={() => {
              setRestart(true);
            }}
          >
            Retry
          </button>{" "}
        </>
      )}
    </div>
  );
};

export default Game;
