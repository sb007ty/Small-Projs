import { useEffect, useMemo, useRef, useState } from "react";
//CAN CODE CONSTANTS BETTER AND SHOULD USE PROPS INSTEAD OF BOX_dATA VARIABLE. NOT DOING FOR NOW
const BOX_DATA = [[1, 1, 1]];
function getNumberOfOnes() {
  let c = 0;
  return BOX_DATA.flat(Infinity).filter((item) => item === 1).length;
}
const boxDataLen = BOX_DATA.flat(Infinity).length;
const initialArr = new Array(boxDataLen).fill(false);
const num1 = getNumberOfOnes();
function Shape() {
  const orderRef = useRef([]);
  const colorsArrRef = useRef(initialArr);
  const [colorsArr, setColorsArr] = useState(initialArr);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const allTrue = orderRef.current.length;
    console.log(!reset, " reset", allTrue === num1);
    if (allTrue === num1 && !reset) {
      setColorsArr(initialArr);
      colorsArrRef.current = initialArr;
      orderRef.current = [];
      console.log("bro", colorsArrRef.current);
    }
  }, [reset]);
  const updateOrder = (id) => {
    if (orderRef.current.includes(id)) return;
    const newOrder = [...orderRef.current, id];
    orderRef.current = newOrder;
    const newColors = [...colorsArr];
    newColors[id] = true;
    colorsArrRef.current = newColors;
    setColorsArr(newColors);
    if (orderRef.current.length === num1) {
      console.log(colorsArrRef.current, "bro");
      setReset(true);
      let orderArr = orderRef.current;
      for (let i = 0; i < orderArr.length; i++) {
        setTimeout(() => {
          const newColorsArr = [...colorsArrRef.current];
          // console.log(orderArr[i], "ind*", orderArr);
          newColorsArr[orderArr[i]] = false;
          setColorsArr(newColorsArr);
          colorsArrRef.current = newColorsArr;
          if (i === orderArr.length - 1) setReset(false);
        }, 1000 * i);
      }
    }
  };
  function getDivs() {
    const divArr = [];
    BOX_DATA.forEach((item) => {
      item.forEach((childItem) => {
        divArr.push(childItem);
      });
    });
    return divArr.map((item, index) => (
      <Box
        key={index}
        value={item}
        orderRef={orderRef}
        id={index}
        updateOrder={updateOrder}
        colorsArr={colorsArr}
        reset={reset}
      />
    ));
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${BOX_DATA.length},1fr)`,
        gridTemplateColumns: "repeat(3,1fr)",
        padding: "10px",
      }}
    >
      {getDivs()}
    </div>
  );
}

function Box({ value, id, updateOrder, colorsArr, reset }) {
  return (
    <div
      style={{
        visibility: value === 0 ? "hidden" : "",
        minWidth: "200px",
        minHeight: "200px",
        border: "2px solid black",
        marginRight: "-2px",
        marginBottom: "-2px",
        backgroundColor: colorsArr[id] ? "green" : "white",
      }}
      onClick={() => {
        // if (reset) return;
        updateOrder(id);
      }}
    >
      {value}
    </div>
  );
}

export default Shape;
