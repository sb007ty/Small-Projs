import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PaginationComponent from "./projects/pagination/PaginationComponent";
import StopWatch from "./projects/stopwatch/StopWatch";

function App() {
  return (
    <>
      {/* <PaginationComponent /> */}
      <StopWatch />
    </>
  );
}

export default App;
