import { useState, useRef } from "react";
import finalData, { countries, DATA, getFinalDataWithColor } from "./data";

const initalBorder = "2px solid black";
const selectedBorder = "2px solid blue";
const wrongBorder = "2px solid red";
const rightBorder = "2px solid green";
function CapitalGame() {
  const [data, setData] = useState(finalData);
  //   const divRef = useRef([]);
  console.log(data, "data");
  function placeClicked(e) {
    console.log("div click");
    const idSelected = e.target.id;
    const placeSelected = data.find((item) => item.id === idSelected);
    // divRef.current.push({ ...data[0] });
    let country;
    let capital;
    console.log(placeSelected, "placese");
    if (countries.includes(placeSelected.value)) {
      console.log("hello");
      country = { ...placeSelected };
      capital = { ...data[0] };
    } else {
      country = { ...data[0] };
      capital = { ...placeSelected };
    }
    // const divRefVal = { ...divRef.current.pop() };
    console.log(country, capital, "bro");
    if (DATA[country.value] === capital.value) {
      const filterData = data.filter((item) => {
        if (item.id !== capital.id && item.id !== country.id)
          return { ...item };
      });
      const oldData = filterData.map((item, index) => {
        if (index === 0) {
          //   divRef.current.push({ ...item, borderColor: "blue" });
          return { ...item, borderColor: "blue" };
        }
        return { ...item, borderColor: "black" };
      });
      const newData = data.map((item) => {
        if (item.id === capital.id || item.id === country.id) {
          return { ...item, borderColor: "green" };
        }
        return { ...item };
      });
      setData(newData);

      setTimeout(() => {
        setData(oldData);
      }, 1000);
    } else {
      const oldData = data.map((item, index) => {
        if (index === 0) {
          //   divRef.current.push({ ...item, borderColor: "blue" });
          return { ...item, borderColor: "blue" };
        }
        return { ...item, borderColor: "black" };
      });
      const newData = data.map((item) => {
        if (item.id === capital.id || item.id === country.id) {
          return { ...item, borderColor: "red" };
        }
        return { ...item };
      });
      setData(newData);

      setTimeout(() => {
        setData(oldData);
      }, 1000);
    }
  }
  return (
    <div
      style={{
        display: "flex",
        padding: "20px",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {data.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "60%",
            backgroundColor: "pink",
            padding: "20px",
            gap: "10px",
          }}
        >
          {data.map((item) => (
            <input
              type="button"
              key={item.id}
              id={item.id}
              style={{
                padding: "10px",
                minHeight: "50px",
                borderRadius: "15px",
                border: `2px solid ${item["borderColor"]}`, //why + not working
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={placeClicked}
              value={item.value}
            />
          ))}
        </div>
      )}
      {data.length === 0 && (
        <>
          <p>Congrats You won</p>
          <button
            onClick={(e) => {
              setData(finalData);
              //   divRef.current = [];
            }}
          >
            Retry
          </button>
        </>
      )}
    </div>
  );
}
function Element({ id, value }) {
  //   function clickDiv() {
  //     setSelectBorder();
  //   }
  return (
    <div
      style={{
        flexBasis: "200px",
        minHeight: "50px",
        borderRadius: "25px",
        border: "2px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={clickDiv}
    >
      {value}
    </div>
  );
}
export default CapitalGame;
