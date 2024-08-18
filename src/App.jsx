import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PaginationComponent from "./projects/pagination/PaginationComponent";
import StopWatch from "./projects/stopwatch/StopWatch";
import Trello from "./projects/trello/Trello";
import ThemeContext from "./projects/trello/ThemeProvider";
import ThemeProvider from "./projects/trello/ThemeProvider";
import Folder from "./projects/folderProj/Folder";

function App() {
  return (
    <>
      {/* <PaginationComponent /> */}
      {/* <StopWatch /> */}
      {/* <ThemeProvider>
        <Trello />
      </ThemeProvider> */}
      <Folder />
    </>
  );
}

export default App;
