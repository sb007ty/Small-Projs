import { useState, useRef } from "react";
import getFinalData from "./data";
import "./style.css";

function CapitalGame({ data }) {
  const [options, setOptions] = useState(getFinalData(data));
  const [selectedOptions, setSelectedOptions] = useState([]);

  const buttonClick = (e) => {
    console.log(e.target.type);
    const { target } = e;
    if (e.target.tagName === "INPUT" && e.target.type === "button") {
      const value = target.getAttribute("data-value");
      const newSelection = options.find((item) => item.value === value);
      const newSelected = [...selectedOptions, newSelection];
      console.log(newSelected, "newS");
      if (newSelected.length === 2) {
        const data1 = newSelected[0];
        const data2 = newSelected[1];
        if (
          data[data1.value] === data2.value ||
          data[data2.value] === data1.value
        ) {
          const newOptions = options.filter(
            (item) => item.value !== data1.value && item.value !== data2.value
          );
          setSelectedOptions(newSelected);
          setTimeout(() => {
            setSelectedOptions([]);
            setOptions(newOptions);
          }, 1000);
        } else {
          const newOptions = [...options];
          setSelectedOptions(newSelected);
          setTimeout(() => {
            setSelectedOptions([]);
            setOptions(newOptions);
          }, 1000);
        }
      } else {
        setSelectedOptions(newSelected);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "20px",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
      onClick={buttonClick}
    >
      {options.length > 0 && (
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
          {options.map((item) => {
            const { value } = item;
            let borderClass = "normal";
            const option = selectedOptions.find((item) => value === item.value);
            if (option) {
              if (selectedOptions.length === 1) {
                borderClass += " selected";
              } else if (selectedOptions.length === 2) {
                const isSelected =
                  data[selectedOptions[0].value] === selectedOptions[1].value ||
                  data[selectedOptions[1].value] === selectedOptions[0].value;
                if (isSelected) borderClass += " correct";
                else borderClass += " wrong";
              }
            }

            return (
              <input
                type="button"
                key={item.value}
                data-value={item.value}
                style={{
                  padding: "10px",
                  minHeight: "50px",
                  borderRadius: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                className={borderClass}
                value={item.value}
              />
            );
          })}
        </div>
      )}
      {options.length === 0 && (
        <>
          <p>Congrats You won</p>
          <button
            onClick={(e) => {
              setOptions(getFinalData(data));
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
